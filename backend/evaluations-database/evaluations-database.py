import psycopg2.pool
import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
from dotenv import load_dotenv
from score import calculate_website_a3_score
from urllib.parse import urlparse
import requests

from protobuf_library.evaluations_pb2 import (
    AddEvaluationResponse,
    SetAccessibilityMetricResponse,
    CalculateAccessibilityScoreResponse,
    SetLatestEvaluationResponse,
    SetAccessibilityMetricAllWebsitesResponse,
    AddMonitoringRegistryResponse,
    AssertionResponse,
    AssertionMetadataResponse,
    SuccessCriteria,
    IssueElementResponse,
    IssueResponse,
    GetLatestAssertionsByTestResponse,
    GetCurrentWarningsResponse,
    GetMonitoredWebsitesResponse,
    GetWebsiteScoreResponse,
    GetMonitoringRegistryResponse,
    GetIssuesStatsResponse,
    GetWebpageScreenshotResponse,
    EvaluationIdUrl,
    GetLatestEvaluationsResponse,
    GetLatestACTAssertionsResponse,
    ResultResponse,
    GetAssertionResultsResponse,
    ElementResponse,
    GetResultElementsResponse,
    GetEvaluationHistoryResponse,
    EvaluationHistory,
    EvalDate,
    MonitoringRegistry,
    GetUserMonitoringRegistriesResponse
)

import protobuf_library.evaluations_pb2_grpc as evaluations_pb2_grpc

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
                    main_url, domain_name, is_mobile, is_landscape, display_width, display_height, webpages, user_id, website_name
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            ''', (
                request.main_url, request.domain_name, request.is_mobile, request.is_landscape, 
                request.display_width, request.display_height, list(request.webpages), request.user_id, request.website_name
            ))

            monitoring_registry_id = cursor.fetchone()[0]

            conn.commit()
            cursor.close()
            print("Insert successful", file=sys.stderr, flush=True)

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
                
            return AddMonitoringRegistryResponse(status_code=500, monitoring_registry_id=-1)
        
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return AddMonitoringRegistryResponse(status_code=200, monitoring_registry_id=monitoring_registry_id)
    
    def AddEvaluation(self, request, context):

        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                INSERT INTO Evaluation (
                    qualweb_version, monitored_website_id, input_url,
                    complete_url,
                    dom, title, element_count, passed, warning, failed, inapplicable, screenshot
                ) VALUES (
                    %s, %s, %s,
                    %s,
                    %s, %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            ''', (
                str(request.qualweb_version), str(request.monitored_website_id), str(request.input_url), 
                str(request.complete_url),
                str(request.dom), str(request.title), str(request.element_count), 
                str(int(request.passed)), str(int(request.warning)), str(int(request.failed)), str(int(request.inapplicable)),
                request.screenshot
            ))

            print("Hello", file=sys.stderr, flush=True)

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
                        cursor.execute('''
                            INSERT INTO Issue (
                                assertion_id, verdict, description, result_code
                            ) VALUES (
                                %s, %s, %s, %s
                            ) RETURNING id
                        ''', (
                            assertion_id, 
                            request.modules[i].assertions[k].metadata.results[g].verdict, 
                            request.modules[i].assertions[k].metadata.results[g].description, 
                            request.modules[i].assertions[k].metadata.results[g].result_code
                        ))

                        issue_id = cursor.fetchone()[0]

                        for y in range(request.modules[i].assertions[k].metadata.results[g].elements_quantity):

                            cursor.execute('''
                                INSERT INTO Element (
                                    issue_id, html_code, pointer, x, y, width, height
                                ) VALUES (
                                    %s, %s, %s, %s, %s, %s, %s
                                )
                            ''', (
                                issue_id, 
                                request.modules[i].assertions[k].metadata.results[g].elements[y].html_code, 
                                request.modules[i].assertions[k].metadata.results[g].elements[y].pointer,
                                request.modules[i].assertions[k].metadata.results[g].elements[y].x,
                                request.modules[i].assertions[k].metadata.results[g].elements[y].y,
                                request.modules[i].assertions[k].metadata.results[g].elements[y].width,
                                request.modules[i].assertions[k].metadata.results[g].elements[y].height
                            ))

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
    
    def GetMonitoredWebsites(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT main_url FROM MonitoringRegistry
            ''')

            websites = cursor.fetchall()

            websites_response = list()
            for website in websites:
                print(website, file=sys.stderr, flush=True)
                print(website[0], file=sys.stderr, flush=True)
                websites_response.append(website[0])

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetMonitoredWebsitesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return GetMonitoredWebsitesResponse(
            status_code=200,
            websites=websites_response
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

            print(webpages, file=sys.stderr, flush=True)

            calculate_website_a3_score(webpages, request.monitoring_registry_id, cursor)

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

    def AddWebpages(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT webpages, domain_name FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))

            result = cursor.fetchone()
            webpages = result[0]
            domain = result[1]

            for webpage in request.webpages:
                if webpage in webpages:
                    return SetLatestEvaluationResponse(status_code=400)

                # Check if the webpage is from the same domain as the monitoring registry
                url = urlparse(webpage)
                if url.hostname != domain:
                    return SetLatestEvaluationResponse(status_code=400)
                
                # Check if the webpage is accessible
                try:
                    response = requests.head(webpage, timeout=5)

                    if response.status_code >= 400:
                        return SetLatestEvaluationResponse(status_code=400)
                except requests.RequestException as e:
                    return SetLatestEvaluationResponse(status_code=400)
                
                webpages.append(webpage)

            cursor.execute('''
                UPDATE MonitoringRegistry
                SET webpages = %s
                WHERE id = %s
            ''', (webpages, request.monitoring_registry_id))

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
    
    def SetAccessibilityMetricAllWebsites(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                UPDATE MonitoringRegistry
                    SET accessibility_metric = %s
            ''', (request.accessibility_metric,))

            conn.commit()
            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return SetAccessibilityMetricAllWebsitesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return SetAccessibilityMetricAllWebsitesResponse(status_code=200)

    def GetCurrentWarnings(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT webpages FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))
            
            webpages = cursor.fetchone()[0]

            current_warnings = []

            for webpage in webpages:
                cursor.execute('''
                    SELECT id 
                    FROM Evaluation
                    WHERE monitored_website_id = %s
                    AND input_url = %s
                    ORDER BY evaluation_date DESC
                    LIMIT 1
                ''', (request.monitoring_registry_id, webpage))

                evaluation_id = cursor.fetchone()

                if evaluation_id is None:
                    return GetLatestAssertionsByTestResponse(status_code=404)
                else:
                    cursor.execute('''
                        SELECT * FROM Module
                        WHERE evaluation_id = %s
                        AND module_type = 'act-rules'
                    ''', (evaluation_id[0],))

                    result = cursor.fetchone()

                    if result is None:
                        return GetLatestAssertionsByTestResponse(status_code=404)
                    
                    cursor.execute('''
                        SELECT * FROM Assertion
                        WHERE module_id = %s
                        AND outcome = 'warning'
                    ''', (result[0],))

                    assertions = cursor.fetchall()

                    # Get the success criteria and results for each assertion
                    for assertion in assertions:
                        cursor.execute('''
                            SELECT * FROM Assertion_Metadata
                            WHERE id = %s
                        ''', (assertion[2],))

                        assertion_metadata = cursor.fetchone()

                        cursor.execute('''
                            SELECT success_criteria_name, success_criteria_level
                            FROM Assertion_Metadata_Success_Criteria
                            WHERE assertion_metadata_id = %s
                        ''', (assertion[2],))

                        success_criteria = cursor.fetchall()

                        success_criteria_response = []
                        for success_criterion in success_criteria:
                            cursor.execute('''
                                SELECT * FROM Success_Criteria
                                WHERE success_criteria_name = %s AND success_criteria_level = %s
                            ''', (success_criterion[0], success_criterion[1]))

                            result = cursor.fetchone()

                            if result is not None:
                                success_criteria_response.append(
                                    SuccessCriteria(
                                        name=result[1],
                                        level=result[2],
                                        principle=result[3],
                                        url=result[4]
                                    )
                                )

                        issues_response = list()

                        cursor.execute('''
                            SELECT * FROM Issue
                            WHERE assertion_id = %s
                        ''', (assertion[0],))

                        issues = cursor.fetchall()

                        for issue in issues:
                            cursor.execute('''
                                SELECT * FROM Element
                                WHERE issue_id = %s
                            ''', (issue[0],))

                            elements = cursor.fetchall()

                            elements_response = []
                            for element in elements:
                                elements_response.append(
                                    IssueElementResponse(
                                        id=element[0],
                                        html_code=element[2],
                                        pointer=element[3],
                                        x=element[4],
                                        y=element[5],
                                        width=element[6],
                                        height=element[7],
                                        evaluation_id=evaluation_id,
                                        webpage_url=webpage
                                    )
                                )
                            
                            issues_response.append(
                                IssueResponse(
                                    id=issue[0],
                                    verdict=issue[2],
                                    description=issue[3],
                                    result_code=issue[4],
                                    elements=elements_response
                                )
                            )

                        assertion_response = AssertionResponse(
                            id=assertion[0],
                            passed = assertion[3],
                            warning = assertion[4],
                            failed = assertion[5],
                            inapplicable = assertion[6],
                            outcome = assertion[7],
                            description = assertion[8],
                            metadata = AssertionMetadataResponse (
                                id=assertion_metadata[0],
                                code=assertion_metadata[1],
                                name=assertion_metadata[3],
                                description=assertion_metadata[4],
                                url=assertion_metadata[5],
                                mapping=assertion_metadata[6],
                                target_elements=assertion_metadata[7],
                                target_attributes=assertion_metadata[8],
                                success_criteria=success_criteria_response,
                                success_criteria_quantity=len(success_criteria_response)
                            ),
                            issues = issues_response
                        )

                        current_warnings.append(assertion_response)

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetCurrentWarningsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetCurrentWarningsResponse(status_code=200, warnings=current_warnings)
    
    def GetWebsiteScore(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT score FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))

            score = cursor.fetchone()[0]

            print(score, file=sys.stderr, flush=True)

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetWebsiteScoreResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetWebsiteScoreResponse(status_code=200, score=score)
    
    def GetMonitoringRegistry(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT * FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))

            result = cursor.fetchone()
            cursor.close()

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
            accessibility_metric=result[1],
            main_url=result[2],
            domain_name=result[3],
            is_mobile=result[4],
            is_landscape=result[5],
            display_width=result[6],
            display_height=result[7],
            webpages=result[8],
            latest_evaluation=str(result[9]),
            accessibility_score=result[10]
        )
    
    def GetIssuesStats(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT webpages FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))
            
            webpages = cursor.fetchone()[0]

            issues_stats = {
                "passed": 0,
                "warnings": 0,
                "failed": 0,
                "inapplicable": 0
            }

            for webpage in webpages:
                cursor.execute('''
                    SELECT id 
                    FROM Evaluation
                    WHERE monitored_website_id = %s
                    AND input_url = %s
                    ORDER BY evaluation_date DESC
                    LIMIT 1
                ''', (request.monitoring_registry_id, webpage))

                evaluation_id = cursor.fetchone()

                if evaluation_id is not None:
                    cursor.execute('''
                        SELECT passed, warning, failed, inapplicable
                        FROM Module
                        WHERE evaluation_id = %s
                        AND module_type = 'act-rules'
                    ''', (evaluation_id[0],))

                    result = cursor.fetchone()

                    issues_stats["passed"] += result[0]
                    issues_stats["warnings"] += result[1]
                    issues_stats["failed"] += result[2]
                    issues_stats["inapplicable"] += result[3]

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetIssuesStatsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetIssuesStatsResponse(
            status_code=200, 
            passed = issues_stats["passed"],
            warnings = issues_stats["warnings"],
            failed = issues_stats["failed"],
            inapplicable = issues_stats["inapplicable"]
        )
        
    def GetWebpageScreenshot(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT screenshot FROM Evaluation
                WHERE id = %s
            ''', (request.evaluation_id,))

            screenshot = bytes(cursor.fetchone()[0])

            print("eval id: " + str(request.evaluation_id) + " after -" + str(len(screenshot)), file=sys.stderr, flush=True)

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetWebpageScreenshotResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetWebpageScreenshotResponse(status_code=200, screenshot=screenshot)

    def GetLatestEvaluations(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT webpages FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_id, ))
            
            webpages = cursor.fetchone()[0]

            response = []
            for webpage in webpages:
                cursor.execute('''
                    SELECT id 
                    FROM Evaluation
                    WHERE monitored_website_id = %s
                    AND input_url = %s
                    ORDER BY evaluation_date DESC
                    LIMIT 1
                ''', (request.monitoring_id, webpage))

                evaluation_id = cursor.fetchone()

                response.append(
                    EvaluationIdUrl(
                        evaluation_id=evaluation_id[0],
                        evaluation_url=webpage
                    )
                )
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetLatestEvaluationsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetLatestEvaluationsResponse(status_code=200, evaluations=response)
    
    def GetLatestACTAssertions(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT input_url FROM Evaluation
                WHERE id = %s
            ''', (request.evaluation_id, ))

            webpage = cursor.fetchone()[0]

            # Get ACT module with evaluation id
            cursor.execute('''
                SELECT id FROM Module
                WHERE evaluation_id = %s
                AND module_type = 'act-rules'
            ''', (request.evaluation_id, ))

            module_id = cursor.fetchone()[0]

            # Get the assertions that have a given outcome and that their assertion metadata is connected to success criteria in a given list
            cursor.execute('''
                SELECT * FROM Assertion
                WHERE module_id = %s
                AND outcome = %s
            ''', (module_id, request.outcome))

            assertions = cursor.fetchall()
            assertions_response = []

            for assertion in assertions:
                assertion_id = assertion[0]
                assertion_metadata_id = assertion[2]

                wcagFilters = list(request.wcagLevelFilters)
                
                # Check if this assertion's metadata is related to any success criteria in the wcagFilters
                cursor.execute('''
                    SELECT COUNT(*) FROM Assertion_Metadata_Success_Criteria
                    WHERE assertion_metadata_id = %s
                    AND success_criteria_level = ANY(%s::success_criteria_level[])
                ''', (assertion_metadata_id, list(request.wcagLevelFilters)))
                
                count = cursor.fetchone()[0]

                cursor.execute('''
                    SELECT code, assertion_name FROM Assertion_Metadata
                    WHERE id = %s
                ''', (assertion_metadata_id, ))
                
                assertion_metadata = cursor.fetchone()
                
                # If this assertion is related to any of the requested WCAG levels, add its ID to the result
                if len(wcagFilters) > 0 and count > 0:
                    assertions_response.append(
                        AssertionResponse(
                            assertion_id=assertion_id,
                            assertion_name=assertion_metadata[1],
                            assertion_rule=assertion_metadata[0],
                            evaluation_id=request.evaluation_id,
                            webpage_url=webpage
                        )
                    )
                elif len(wcagFilters) == 0:
                    assertions_response.append(
                        AssertionResponse(
                            assertion_id=assertion_id,
                            assertion_name=assertion_metadata[1],
                            assertion_rule=assertion_metadata[0],
                            evaluation_id=request.evaluation_id,
                            webpage_url=webpage
                        )
                    )

            cursor.close()
            
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetLatestACTAssertionsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetLatestACTAssertionsResponse(status_code=200, assertions=assertions_response)
    
    def GetAssertionResults(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT * FROM Issue
                WHERE assertion_id = %s
            ''', (request.assertion_id, ))

            results = cursor.fetchall()

            response = []
            for result in results:
                response.append(
                    ResultResponse(
                        id=result[0],
                        description=result[3],
                        verdict=result[2]
                    )
                )

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetAssertionResultsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return GetAssertionResultsResponse(status_code=200, results=response)
    
    def GetResultElement(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT id, html_code, pointer, x, y, width, height FROM Element
                WHERE issue_id = %s
            ''', (request.issue_id, ))

            element = cursor.fetchone()

            element_response = ElementResponse(
                id=element[0],
                html_code=element[1],
                pointer=element[2],
                x=element[3],
                y=element[4],
                width=element[5],
                height=element[6]
            )

            cursor.close()

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetResultElementsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return GetResultElementsResponse(status_code=200, element=element_response)

    def GetEvaluationHistory(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT id, title, input_url, score, evaluation_date FROM Evaluation
                WHERE monitored_website_id = %s
            ''', (request.monitoring_id, ))

            evals = cursor.fetchall()
                
            response = []
            for eval in evals:
                response.append(
                    EvaluationHistory(
                        id=eval[0],
                        title=eval[1],
                        input_url=eval[2],
                        score=eval[3],
                        eval_date=EvalDate(
                            day=eval[4].day,
                            month=eval[4].month,
                            year=eval[4].year
                        )
                    )
                )


            cursor.close()

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetEvaluationHistoryResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetEvaluationHistoryResponse(status_code=200, history=response)
    
    def GetUserMonitoringRegistries(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT  id, accessibility_metric, website_name,
                        main_url, is_mobile, is_landscape, 
                        display_width, display_height, webpages, 
                        latest_evaluation, score FROM MonitoringRegistry
                WHERE user_id = %s
            ''', (request.user_id, ))

            registries = cursor.fetchall()

            response = []
            for registry in registries:
                passed = 0
                warnings = 0
                failed = 0
                inapplicable = 0

                for webpage in registry[8]:
                    cursor.execute('''
                        SELECT id 
                        FROM Evaluation
                        WHERE monitored_website_id = %s
                        AND input_url = %s
                        ORDER BY evaluation_date DESC
                        LIMIT 1
                    ''', (registry[0], webpage))

                    eval_id = cursor.fetchone()

                    cursor.execute('''
                        SELECT passed, warning, failed, inapplicable
                        FROM Module
                        WHERE evaluation_id = %s
                        AND module_type = 'act-rules'
                    ''', (eval_id,))

                    stats = cursor.fetchone()

                    passed += stats[0]
                    warnings += stats[1]
                    failed += stats[2]
                    inapplicable += stats[3]

                response.append(
                    MonitoringRegistry(
                        id=registry[0],
                        accessibility_metric=registry[1],
                        name=registry[2],
                        main_url=registry[3],
                        is_mobile=registry[4],
                        is_landscape=registry[5],
                        display_width=registry[6],
                        display_height=registry[7],
                        webpages=registry[8],
                        latest_evaluation=EvalDate(
                            day=registry[9].day,
                            month=registry[9].month,
                            year=registry[9].year
                        ),
                        score=registry[10],
                        passed=passed,
                        warnings=warnings,
                        failed=failed,
                        inapplicable=inapplicable
                    )
                )

            cursor.close()

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetUserMonitoringRegistriesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetUserMonitoringRegistriesResponse(status_code=200, monitoring_registries=response)

def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), 
        interceptors=interceptors,
        options=[
            ("grpc.max_receive_message_length", 100 * 1024 * 1024),
            ("grpc.max_send_message_length", 100 * 1024 * 1024),
            ("grpc.keepalive_time_ms", 10000),
            ("grpc.keepalive_timeout_ms", 5000),
            ("grpc.keepalive_permit_without_calls", 1),
            ("grpc.http2.max_pings_without_data", 0)
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
