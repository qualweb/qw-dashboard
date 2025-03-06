import psycopg2.pool
import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
from dotenv import load_dotenv
import datetime
from score import calculateWebsiteA3Score

from protobuf_library.evaluations_pb2 import (
    AddEvaluationResponse,
    GetMonitoringRegistryResponse,
    SetAccessibilityMetricResponse,
    CalculateAccessibilityScoreResponse,
    SetLatestEvaluationResponse
)

import protobuf_library.evaluations_pb2_grpc as evaluations_pb2_grpc

from protobuf_library.issues_pb2 import AddIssuesRequest, Issue, IssueElement
from protobuf_library.issues_pb2_grpc import IssuesStub

issues_database_host = os.getenv("ISSUES_DATABASE_HOST")
issues_database_channel = grpc.insecure_channel(f"{issues_database_host}:6001")
issues_database_client = IssuesStub(issues_database_channel)

load_dotenv()
MS_PORT = os.getenv("MS_PORT")
DATABASE_HOST = os.getenv("DATABASE_HOST")
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT"))
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")

connection_pool = None

class EvaluationsDatabaseService(evaluations_pb2_grpc.EvaluationsServicer):
    def AddMonitoringRegistry(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                INSERT INTO MonitoringRegistry (
                    main_url, domain_name, is_mobile, is_landscape, display_width, display_height, webpages
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s
                )
            ''', (
                request.main_url, request.domain_name, request.is_mobile, request.is_landscape, 
                request.display_width, request.display_height, list(request.webpages)
            ))

            conn.commit()
            cursor.close()
            print("Insert successful", file=sys.stderr, flush=True)

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            return AddEvaluationResponse(status_code=500)
        
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return AddEvaluationResponse(status_code=200)
    
    def AddEvaluation(self, request, context):

        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            issues = list()

            cursor.execute('''
                INSERT INTO Evaluation (
                    qualweb_version, monitored_website_id, input_url,
                    complete_url,
                    dom, title, element_count, passed, warning, failed, inapplicable
                ) VALUES (
                    %s, %s, %s,
                    %s,
                    %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            ''', (
                str(request.qualweb_version), str(request.monitored_website_id), str(request.input_url), 
                str(request.complete_url),
                str(request.dom), str(request.title), str(request.element_count), 
                str(int(request.passed)), str(int(request.warning)), str(int(request.failed)), str(int(request.inapplicable))
            ))

            evaluation_id = cursor.fetchone()[0]

            for i in range(request.modules_quantity):
                cursor.execute('''
                    INSERT INTO Module (
                        evaluation_id, module_type, passed, warning, failed, inapplicable               
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s
                    ) RETURNING id
                ''', (
                    evaluation_id, str(request.modules[i].type), request.modules[i].passed, request.modules[i].warning, 
                    request.modules[i].failed, request.modules[i].inapplicable
                ))

                module_id = cursor.fetchone()[0]

                for k in range(request.modules[i].assertions_quantity):
                    cursor.execute('''
                        SELECT id FROM Assertion_Metadata               
                        WHERE code = %s
                    ''', (request.modules[i].assertions[k].metadata.code, ))

                    exists_assertion_metadata_id = cursor.fetchone()

                    if exists_assertion_metadata_id is None:
                        cursor.execute('''
                            INSERT INTO Assertion_Metadata (
                                code, assertion_name, description, url, mapping, target_elements, target_attributes, parent_module_type
                            ) VALUES (
                                %s, %s, %s, %s, %s, %s, %s, %s
                            ) RETURNING id
                        ''', (
                            request.modules[i].assertions[k].metadata.code, request.modules[i].assertions[k].metadata.name,
                            request.modules[i].assertions[k].metadata.description, request.modules[i].assertions[k].metadata.url, 
                            request.modules[i].assertions[k].metadata.mapping, 
                            [str(x) for x in request.modules[i].assertions[k].metadata.target_elements],
                            [str(x) for x in request.modules[i].assertions[k].metadata.target_attributes],
                            str(request.modules[i].type)
                        ))

                        assertion_metadata_id = cursor.fetchone()[0]
                    else:
                        assertion_metadata_id = exists_assertion_metadata_id[0]

                    cursor.execute('''
                        INSERT INTO Assertion (
                            module_id, assertion_metadata_id,  passed, warning, failed, inapplicable, outcome, description              
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s, %s
                        ) RETURNING id
                    ''', (
                        module_id, assertion_metadata_id, request.modules[i].assertions[k].passed, request.modules[i].assertions[k].warning, 
                        request.modules[i].assertions[k].failed, request.modules[i].assertions[k].inapplicable,
                        str(request.modules[i].assertions[k].outcome), str(request.modules[i].assertions[k].description)
                    ))

                    assertion_id = cursor.fetchone()[0]

                    for h in range(request.modules[i].assertions[k].metadata.success_criteria_quantity):

                        cursor.execute('''
                            INSERT INTO Success_Criteria (
                                success_criteria_name, success_criteria_level, principle, success_criteria_url
                            ) VALUES (
                                %s, %s, %s, %s
                            ) ON CONFLICT (success_criteria_name, success_criteria_level) DO NOTHING
                        ''', (
                            request.modules[i].assertions[k].metadata.success_criteria[h].name,
                            request.modules[i].assertions[k].metadata.success_criteria[h].level,
                            request.modules[i].assertions[k].metadata.success_criteria[h].principle,
                            request.modules[i].assertions[k].metadata.success_criteria[h].url
                        ))

                        # Then select the values - they'll either be from the just-inserted row or the pre-existing one
                        cursor.execute('''
                            SELECT success_criteria_name, success_criteria_level FROM Success_Criteria               
                            WHERE success_criteria_name = %s AND success_criteria_level = %s
                        ''', (
                            request.modules[i].assertions[k].metadata.success_criteria[h].name,
                            request.modules[i].assertions[k].metadata.success_criteria[h].level      
                        ))

                        success_criteria_name_level = cursor.fetchone()
                        success_criteria_name = success_criteria_name_level[0]
                        success_criteria_level = success_criteria_name_level[1]

                        cursor.execute('''
                            INSERT INTO Assertion_Metadata_Success_Criteria (
                                assertion_metadata_id,
                                success_criteria_name,
                                success_criteria_level       
                            ) VALUES (
                                %s, %s, %s
                            ) ON CONFLICT (assertion_metadata_id, success_criteria_name, success_criteria_level) DO NOTHING
                        ''', (
                            assertion_metadata_id, success_criteria_name, success_criteria_level
                        ))

                    for g in range(request.modules[i].assertions[k].metadata.results_quantity):
                        elements = list()
                        for y in range(request.modules[i].assertions[k].metadata.results[g].elements_quantity):
                            elements.append(
                                IssueElement(
                                    html_code = request.modules[i].assertions[k].metadata.results[g].elements[y].html_code,
                                    pointer = request.modules[i].assertions[k].metadata.results[g].elements[y].pointer
                                )
                            )
                        issues.append(Issue(
                            assertion_id = assertion_id,
                            verdict = request.modules[i].assertions[k].metadata.results[g].verdict,
                            description = request.modules[i].assertions[k].metadata.results[g].description,
                            result_code = request.modules[i].assertions[k].metadata.results[g].result_code,
                            elements = elements,
                            elements_quantity = len(elements)
                        ))

            add_issues_request = AddIssuesRequest(issues=issues, issues_quantity=len(issues))
            add_issues_response = issues_database_client.AddIssues(add_issues_request)

            if add_issues_response.status_code == 500:
                raise Exception("Results insertion failed!")
            
            conn.commit()
            cursor.close()
            
            print("Insert successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return AddEvaluationResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return AddEvaluationResponse(status_code=200)
    
    def GetMonitoringRegistry(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT * FROM MonitoringRegistry
                WHERE id = %s
            ''', (str(int(request.monitoring_registry_id)), ))

            result = cursor.fetchone()
            cursor.close()

            print(result, file=sys.stderr, flush=True)

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetMonitoringRegistryResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return GetMonitoringRegistryResponse(
                status_code=200,
                id=result[0],
                main_url=result[2],
                domain_name=result[3],
                is_mobile=result[4],
                is_landscape=result[5],
                display_width=result[6],
                display_height=result[7],
                webpages=result[8]                                 
            )
    
    def SetAccessibilityMetric(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                UPDATE MonitoringRegistry
                    SET accessibility_metric = %s
                    WHERE id = %s
            ''', (request.accessibility_metric, request.monitoring_registry_id))

            conn.commit()
            cursor.close()
            print("Update successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return SetAccessibilityMetricResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return SetAccessibilityMetricResponse(status_code=200)
    

    def CalculateAccessibilityScore(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)
            
            # Get all webpages from the monitoring registry
            cursor.execute('''
                SELECT webpages FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))

            webpages = cursor.fetchone()[0]

            a3_website = calculateWebsiteA3Score(webpages, request.monitoring_registry_id, cursor)

            print("Website A3 score: " + str(a3_website), file=sys.stderr, flush=True)

            conn.commit()
            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
    
            return CalculateAccessibilityScoreResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return CalculateAccessibilityScoreResponse(status_code=200)

    def SetLatestEvaluation(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT id FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))

            exists_monitoring_registry = cursor.fetchone()

            if exists_monitoring_registry is None:
                return SetLatestEvaluationResponse(status_code=404)

            cursor.execute('''
                SELECT evaluation_date 
                FROM Evaluation
                WHERE monitored_website_id = %s
                ORDER BY evaluation_date DESC
                LIMIT 1
            ''', (request.monitoring_registry_id, ))

            exists_evaluation = cursor.fetchone()

            if exists_evaluation is None:
                return SetLatestEvaluationResponse(status_code=404)

            cursor.execute('''
                UPDATE MonitoringRegistry
                SET latest_evaluation = %s
                WHERE id = %s
            ''', (exists_evaluation[0], request.monitoring_registry_id))

            conn.commit()
            cursor.close()
            print("Update successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return SetLatestEvaluationResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return SetLatestEvaluationResponse(status_code=200)
    
def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), 
        interceptors=interceptors,
        options=[
            ("grpc.max_receive_message_length", 100 * 1024 * 1024),
            ("grpc.max_send_message_length", 100 * 1024 * 1024)
        ]
    )
    evaluations_pb2_grpc.add_EvaluationsServicer_to_server(
        EvaluationsDatabaseService(), server
    )

    server.add_insecure_port("[::]:" + MS_PORT)
    server.start()
    server.wait_for_termination()

    if connection_pool:
        connection_pool.closeall()

if __name__ == "__main__":
    connection_pool = psycopg2.pool.ThreadedConnectionPool(
        minconn = 1,
        maxconn = 10,
        dbname = POSTGRES_DB,
        user = POSTGRES_USER,
        password = POSTGRES_PASSWORD,
        host = DATABASE_HOST,
        port = POSTGRES_PORT
    )

    serve()