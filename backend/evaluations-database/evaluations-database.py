import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
import psycopg2
from dotenv import load_dotenv

from protobuf_library.evaluations_pb2 import (
    AddEvaluationResponse
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

class EvaluationsDatabaseService(evaluations_pb2_grpc.EvaluationsServicer):
    global database

    def AddEvaluation(self, request, context):
        cursor = database.cursor()

        issues = list()

        try:
            cursor.execute('''
                INSERT INTO Evaluation (
                    qualweb_version, input_url, domainName, domain, uri, 
                    complete_url, is_mobile, is_landscape, display_width, display_height, 
                    dom, title, element_count, passed, warning, failed, inapplicable
                ) VALUES (
                    %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            ''', (
                str(request.qualweb_version), str(request.input_url), 
                str(request.domain_name), str(request.domain), str(request.uri), 
                str(request.complete_url), str(bool(request.mobile)).upper(), str(bool(request.landscape)).upper(), 
                str(int(request.display_width)), str(int(request.display_height)), 
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
                                code, assertion_name, description, url, mapping, target_elements, target_attributes    
                            ) VALUES (
                                %s, %s, %s, %s, %s, %s, %s
                            ) RETURNING id
                        ''', (
                            request.modules[i].assertions[k].metadata.code, request.modules[i].assertions[k].metadata.name,
                            request.modules[i].assertions[k].metadata.description, request.modules[i].assertions[k].metadata.url, 
                            request.modules[i].assertions[k].metadata.mapping, 
                            [str(x) for x in request.modules[i].assertions[k].metadata.target_elements],
                            [str(x) for x in request.modules[i].assertions[k].metadata.target_attributes]
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
                            SELECT success_criteria_name, success_criteria_level FROM Success_Criteria               
                            WHERE success_criteria_name = %s AND success_criteria_level = %s
                        ''', (
                            request.modules[i].assertions[k].metadata.success_criteria[h].name,
                            request.modules[i].assertions[k].metadata.success_criteria[h].level      
                        ))

                        exists_success_criteria_id = cursor.fetchone()

                        if exists_success_criteria_id is None:
                            cursor.execute('''
                                INSERT INTO Success_Criteria (
                                    success_criteria_name, success_criteria_level, principle, success_criteria_url
                                ) VALUES (
                                    %s, %s, %s, %s
                                ) RETURNING success_criteria_name, success_criteria_level
                            ''', (
                                request.modules[i].assertions[k].metadata.success_criteria[h].name,
                                request.modules[i].assertions[k].metadata.success_criteria[h].level,
                                request.modules[i].assertions[k].metadata.success_criteria[h].principle,
                                request.modules[i].assertions[k].metadata.success_criteria[h].url
                            ))

                            success_criteria_name_level = cursor.fetchone()
                            success_criteria_name = success_criteria_name_level[0]
                            success_criteria_level = success_criteria_name_level[1]
                        else:
                            success_criteria_name = exists_success_criteria_id[0]
                            success_criteria_level = exists_success_criteria_id[1]

                        cursor.execute('''
                            SELECT assertion_metadata_id, success_criteria_name, success_criteria_level FROM Assertion_Metadata_Success_Criteria               
                            WHERE assertion_metadata_id = %s AND success_criteria_name = %s AND success_criteria_level = %s
                        ''', (
                            assertion_metadata_id,
                            success_criteria_name,
                            success_criteria_level     
                        ))

                        exists_assertion_metadata_success_criteria_id = cursor.fetchone()
                        
                        if exists_assertion_metadata_success_criteria_id is None:
                            cursor.execute('''
                                INSERT INTO Assertion_Metadata_Success_Criteria (
                                    assertion_metadata_id,
                                    success_criteria_name,
                                    success_criteria_level       
                                ) VALUES (
                                    %s, %s, %s
                                )
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
                    
            database.commit()
            print("Insert successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            database.rollback()
            return AddEvaluationResponse(status_code=500)

        cursor.close()

        return AddEvaluationResponse(status_code=200)


def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), 
        interceptors=interceptors,
        options=[
            ("grpc.max_receive_message_length", 100 * 1024 * 1024),  # 100 MB
            ("grpc.max_send_message_length", 100 * 1024 * 1024)      # 100 MB
        ]
    )
    evaluations_pb2_grpc.add_EvaluationsServicer_to_server(
        EvaluationsDatabaseService(), server
    )

    server.add_insecure_port("[::]:" + MS_PORT)
    server.start()
    server.wait_for_termination()

    database.close()

database = None
if __name__ == "__main__":
    database = psycopg2.connect(
        dbname = POSTGRES_DB,
        user = POSTGRES_USER,
        password = POSTGRES_PASSWORD,
        host = DATABASE_HOST,
        port = POSTGRES_PORT
    )

    serve()