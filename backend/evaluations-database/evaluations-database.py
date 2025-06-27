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
    GetCurrentWarningsResponse,
    GetWebsiteScoreResponse,
    GetIssuesStatsResponse,
    GetWebpageScreenshotResponse,
    EvaluationIdUrl,
    GetLatestEvaluationsResponse,
    GetLatestAssertionsResponse,
    ResultResponse,
    GetAssertionResultsResponse,
    ElementResponse,
    GetResultElementsResponse,
    GetEvaluationHistoryResponse,
    EvaluationHistory,
    EvalDate,
    MonitoringRegistry,
    GetUserMonitoringRegistriesResponse,
    GetWebsiteMonitoringCyclesResponse,
    MonitoringCycle,
    SetNewMonitoringCycleResponse,
    GetMonitoredWebpagesResponse,
    Webpage,
    GetEvaluationInfoResponse,
    DeleteWebpageResponse,
    AddLatestEvaluationsToMonitoringCycleResponse,
    GetMonitoringRegistryResponse,
    GetMonitoringCycleResponse,
    GetWebpageComparisonDataResponse,
    FailedTestStats,
    GetFailedTestsStatsResponse,
    GetIntermediateCyclesResponse
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
                    main_url, domain_name, is_mobile, is_landscape, display_width, display_height, user_id, website_name
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            ''', (
                request.main_url, request.domain_name, request.is_mobile, request.is_landscape, 
                request.display_width, request.display_height, request.user_id, request.website_name
            ))

            monitoring_registry_id = cursor.fetchone()[0]

            for webpage in request.webpages:
                cursor.execute('''
                    INSERT INTO Webpage (
                        url, monitoring_registry_id
                    ) VALUES (
                        %s, %s
                    )
                ''', (webpage, monitoring_registry_id))

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
            conn.autocommit = False
            
            with conn.cursor() as cursor:
                cursor.execute('''
                    UPDATE Webpage
                    SET num_elements = %s, page_size_kb = %s
                    WHERE url = %s AND monitoring_registry_id = %s
                ''', (
                    request.element_count, 
                    request.webpage_size_kb, 
                    request.input_url, 
                    request.monitored_website_id
                ))

                cursor.execute('''
                    INSERT INTO Evaluation (
                        qualweb_version, monitored_website_id, input_url, complete_url,
                        dom, title, element_count, passed, warning, failed, inapplicable, screenshot
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                ''', (
                    request.qualweb_version, request.monitored_website_id, request.input_url,
                    request.complete_url, request.dom, request.title, request.element_count,
                    int(request.passed), int(request.warning), int(request.failed), 
                    int(request.inapplicable), request.screenshot
                ))
                
                evaluation_id = cursor.fetchone()[0]

                module_data = []
                for module in request.modules:
                    module_data.append((
                        evaluation_id, module.type, module.passed, module.warning,
                        module.failed, module.inapplicable
                    ))
                
                cursor.executemany('''
                    INSERT INTO Module (evaluation_id, module_type, passed, warning, failed, inapplicable)
                    VALUES (%s, %s, %s, %s, %s, %s)
                ''', module_data)
                
                cursor.execute('''
                    SELECT id FROM Module 
                    WHERE evaluation_id = %s 
                    ORDER BY id DESC 
                    LIMIT %s
                ''', (evaluation_id, len(request.modules)))
                
                module_ids = [row[0] for row in cursor.fetchall()]
                module_ids.reverse()

                self.process_assertions_batch(cursor, request.modules, module_ids)
                
                conn.commit()
                print(f"Successfully inserted evaluation {evaluation_id}", file=sys.stderr, flush=True)
                
            return AddEvaluationResponse(status_code=200)
            
        except Exception as e:
            print(f"Error in AddEvaluation: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
            return AddEvaluationResponse(status_code=500)
            
        finally:
            if conn:
                connection_pool.putconn(conn)


    def process_assertions_batch(self, cursor, modules, module_ids):
        all_codes = set()
        for module in modules:
            for assertion in module.assertions:
                all_codes.add(assertion.metadata.code)
        
        existing_metadata = {}
        if all_codes:
            code_list = list(all_codes)
            cursor.execute('''
                SELECT code, id FROM Assertion_Metadata 
                WHERE code = ANY(%s::text[])
            ''', (code_list,))
            
            existing_metadata = {code: id for code, id in cursor.fetchall()}
        
        new_metadata = []
        for module in modules:
            for assertion in module.assertions:
                if assertion.metadata.code not in existing_metadata:
                    target_elements = [str(x) for x in assertion.metadata.target_elements] if assertion.metadata.target_elements else []
                    target_attributes = [str(x) for x in assertion.metadata.target_attributes] if assertion.metadata.target_attributes else []
                    
                    new_metadata.append((
                        assertion.metadata.code, assertion.metadata.name,
                        assertion.metadata.description, assertion.metadata.url,
                        assertion.metadata.mapping,
                        target_elements,
                        target_attributes,
                        module.type
                    ))
        
        if new_metadata:
            cursor.executemany('''
                INSERT INTO Assertion_Metadata (
                    code, assertion_name, description, url, mapping, 
                    target_elements, target_attributes, parent_module_type
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ''', new_metadata)
            
            new_codes = [meta[0] for meta in new_metadata]
            cursor.execute('''
                SELECT code, id FROM Assertion_Metadata 
                WHERE code = ANY(%s::text[])
            ''', (new_codes,))
            
            for code, id in cursor.fetchall():
                existing_metadata[code] = id

        assertion_data = []
        assertion_lookup = []
        
        for module_idx, module in enumerate(modules):
            module_id = module_ids[module_idx]
            for assertion_idx, assertion in enumerate(module.assertions):
                metadata_id = existing_metadata[assertion.metadata.code]
                assertion_data.append((
                    module_id, metadata_id, assertion.passed, assertion.warning,
                    assertion.failed, assertion.inapplicable, assertion.outcome,
                    assertion.description
                ))
                assertion_lookup.append((module_idx, assertion_idx, metadata_id))
        
        if assertion_data:
            cursor.executemany('''
                INSERT INTO Assertion (
                    module_id, assertion_metadata_id, passed, warning, failed, 
                    inapplicable, outcome, description
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ''', assertion_data)
            
            cursor.execute('''
                SELECT id FROM Assertion 
                WHERE module_id = ANY(%s::integer[]) 
                ORDER BY id DESC 
                LIMIT %s
            ''', (module_ids, len(assertion_data)))
            
            assertion_ids = [row[0] for row in cursor.fetchall()]
            assertion_ids.reverse()

            self.process_success_criteria_batch(cursor, modules, assertion_lookup, assertion_ids)
            self.process_results_batch(cursor, modules, assertion_lookup, assertion_ids)

    def process_success_criteria_batch(self, cursor, modules, assertion_lookup, assertion_ids):
        all_criteria = set()
        for module in modules:
            for assertion in module.assertions:
                for criteria in assertion.metadata.success_criteria:
                    all_criteria.add((criteria.name, criteria.level))
        
        if not all_criteria:
            return
        
        criteria_list = list(all_criteria)
        if criteria_list:
            placeholders = ','.join(['(%s,%s)'] * len(criteria_list))
            query = f'''
                SELECT success_criteria_name, success_criteria_level 
                FROM Success_Criteria 
                WHERE (success_criteria_name, success_criteria_level) IN ({placeholders})
            '''
            flattened_params = [item for pair in criteria_list for item in pair]
            cursor.execute(query, flattened_params)
            
            existing_criteria = set((row[0], row[1]) for row in cursor.fetchall())
            new_criteria = all_criteria - existing_criteria
            
            if new_criteria:
                criteria_to_insert = []
                for name, level in new_criteria:
                    principle = next((c.principle for m in modules for a in m.assertions 
                                    for c in a.metadata.success_criteria 
                                    if c.name == name and c.level == level), None)
                    url = next((c.url for m in modules for a in m.assertions 
                            for c in a.metadata.success_criteria 
                            if c.name == name and c.level == level), None)
                    criteria_to_insert.append((name, level, principle, url))
                
                cursor.executemany('''
                    INSERT INTO Success_Criteria (
                        success_criteria_name, success_criteria_level, principle, success_criteria_url
                    ) VALUES (%s, %s, %s, %s)
                ''', criteria_to_insert)
        
        relationship_data = []
        for idx, (module_idx, assertion_idx, metadata_id) in enumerate(assertion_lookup):
            assertion = modules[module_idx].assertions[assertion_idx]
            
            for criteria in assertion.metadata.success_criteria:
                relationship_data.append((metadata_id, criteria.name, criteria.level))
        
        if relationship_data:
            unique_metadata_ids = list(set(r[0] for r in relationship_data))
            cursor.execute('''
                SELECT assertion_metadata_id, success_criteria_name, success_criteria_level
                FROM Assertion_Metadata_Success_Criteria
                WHERE assertion_metadata_id = ANY(%s::integer[])
            ''', (unique_metadata_ids,))
            
            existing_relationships = set((row[0], row[1], row[2]) for row in cursor.fetchall())
            new_relationships = [r for r in relationship_data if tuple(r) not in existing_relationships]
            
            if new_relationships:
                cursor.executemany('''
                    INSERT INTO Assertion_Metadata_Success_Criteria (
                        assertion_metadata_id, success_criteria_name, success_criteria_level
                    ) VALUES (%s, %s, %s)
                ''', new_relationships)

    def process_results_batch(self, cursor, modules, assertion_lookup, assertion_ids):
        issue_data = []
        issue_lookup = []
        
        for idx, (module_idx, assertion_idx, metadata_id) in enumerate(assertion_lookup):
            assertion_id = assertion_ids[idx]
            assertion = modules[module_idx].assertions[assertion_idx]
            
            for result_idx, result in enumerate(assertion.metadata.results):
                issue_data.append((
                    assertion_id, result.verdict, result.description, result.result_code
                ))
                issue_lookup.append((module_idx, assertion_idx, result_idx))
        
        if not issue_data:
            return
        
        existing_issues = {}
        
        if issue_data:
            unique_assertion_ids = list(set(item[0] for item in issue_data))
            
            cursor.execute('''
                SELECT id, assertion_id, verdict, description 
                FROM Issue 
                WHERE assertion_id = ANY(%s::integer[])
            ''', (unique_assertion_ids,))
            
            for id, assertion_id, verdict, description in cursor.fetchall():
                existing_issues[(assertion_id, verdict, description)] = id
            
            new_issues = []
            for assertion_id, verdict, description, result_code in issue_data:
                key = (assertion_id, verdict, description)
                if key not in existing_issues:
                    new_issues.append((assertion_id, verdict, description, result_code))
            
            if new_issues:
                cursor.executemany('''
                    INSERT INTO Issue (assertion_id, verdict, description, result_code)
                    VALUES (%s, %s, %s, %s)
                ''', new_issues)
                
                cursor.execute('''
                    SELECT id, assertion_id, verdict, description 
                    FROM Issue 
                    WHERE assertion_id = ANY(%s::integer[]) AND id > (
                        SELECT COALESCE(MAX(id), 0) FROM Issue WHERE assertion_id = ANY(%s::integer[])
                    ) - %s
                ''', (unique_assertion_ids, unique_assertion_ids, len(new_issues)))
                
                for id, assertion_id, verdict, description in cursor.fetchall():
                    existing_issues[(assertion_id, verdict, description)] = id
        
        element_data = []
        for idx, (module_idx, assertion_idx, result_idx) in enumerate(issue_lookup):
            assertion_id = assertion_ids[
                next(i for i, (m, a, _) in enumerate(assertion_lookup) 
                    if m == module_idx and a == assertion_idx)
            ]
            result = modules[module_idx].assertions[assertion_idx].metadata.results[result_idx]
            issue_key = (assertion_id, result.verdict, result.description)
            
            if issue_key in existing_issues:
                issue_id = existing_issues[issue_key]
                
                for element in result.elements:
                    element_data.append((
                        issue_id, element.html_code, element.pointer,
                        element.x, element.y, element.width, element.height
                    ))
        
        if element_data:
            cursor.executemany('''
                INSERT INTO Element (
                    issue_id, html_code, pointer, x, y, width, height
                ) VALUES (%s, %s, %s, %s, %s, %s, %s)
            ''', element_data)

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
            
            webpages = []

            cursor.execute('''
                SELECT url FROM Webpage
                WHERE monitoring_registry_id = %s
            ''', (request.monitoring_registry_id, ))

            result = cursor.fetchall()

            for webpage in result:
                webpages.append(webpage[0])

            score = calculate_website_a3_score(webpages, request.monitoring_registry_id, cursor)

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

        return CalculateAccessibilityScoreResponse(status_code=200, accessibility_score=score)

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

            login_webpage_id = None

            if request.needs_authentication:
                cursor.execute('''
                    INSERT INTO LoginWebpage (
                        username_field, password_field, submit_button
                    ) VALUES (
                        %s, %s, %s
                    ) RETURNING id
                ''', (request.username_field_selector, request.password_field_selector, request.login_button_selector))

                login_webpage_id = cursor.fetchone()[0]

            for webpage in request.webpages:
                cursor.execute('''
                    SELECT EXISTS (
                        SELECT 1 FROM Webpage 
                        WHERE monitoring_registry_id = %s AND url = %s
                    )
                ''', (request.monitoring_registry_id, webpage))
                
                exists_webpage = cursor.fetchone()[0]

                if not exists_webpage:
                    cursor.execute('''
                        INSERT INTO Webpage (
                            url, monitoring_registry_id, needs_authentication, login_webpage_id
                        ) VALUES (
                            %s, %s, %s, %s
                        )
                    ''', (webpage, request.monitoring_registry_id, request.needs_authentication, login_webpage_id))

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
                SELECT url FROM Webpage
                WHERE monitoring_registry_id = %s
            ''', (request.monitoring_registry_id, ))
            
            result = cursor.fetchall()

            webpages = []
            for webpage in result:
                webpages.append(webpage[0])

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
                    return GetCurrentWarningsResponse(status_code=404)
                else:
                    cursor.execute('''
                        SELECT * FROM Module
                        WHERE evaluation_id = %s
                        AND module_type = 'act-rules'
                    ''', (evaluation_id[0],))

                    result = cursor.fetchone()

                    if result is None:
                        return GetCurrentWarningsResponse(status_code=404)
                    
                    cursor.execute('''
                        SELECT * FROM Assertion
                        WHERE module_id = %s
                        AND outcome = 'warning'
                    ''', (result[0],))

                    assertions = cursor.fetchall()

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
    
    def GetIssuesStats(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT url FROM Webpage
                WHERE monitoring_registry_id = %s
            ''', (request.monitoring_registry_id, ))
            
            result = cursor.fetchall()

            webpages = []
            for webpage in result:
                webpages.append(webpage[0])

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
                SELECT url FROM Webpage
                WHERE monitoring_registry_id = %s
            ''', (request.monitoring_id, ))
            
            result = cursor.fetchall()

            webpages = []
            for webpage in result:
                webpages.append(webpage[0])

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

                if evaluation_id:
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
    
    def GetLatestAssertions(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT input_url FROM Evaluation
                WHERE id = %s
            ''', (request.evaluation_id, ))

            webpage = cursor.fetchone()[0]

            cursor.execute('''
                SELECT id FROM Module
                WHERE evaluation_id = %s
                AND module_type = %s
            ''', (request.evaluation_id, request.module_type))

            module_id = cursor.fetchone()[0]

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

                wcagGuidelinesFilters = list(request.wcagGuidelinesFilters)

                if len(wcagFilters) > 0 and len(wcagGuidelinesFilters) == 0:
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

                    if count > 0:
                        assertions_response.append(
                            AssertionResponse(
                                assertion_id=assertion_id,
                                assertion_name=assertion_metadata[1],
                                assertion_rule=assertion_metadata[0],
                                evaluation_id=request.evaluation_id,
                                webpage_url=webpage
                            )
                        )

                elif len(wcagGuidelinesFilters) > 0 and len(wcagFilters) == 0:
                    guideline_patterns = [f"{guideline}%" for guideline in wcagGuidelinesFilters]
    
                    cursor.execute('''
                        SELECT COUNT(*) FROM Assertion_Metadata_Success_Criteria
                        WHERE assertion_metadata_id = %s
                        AND success_criteria_name LIKE ANY(%s)
                    ''', [assertion_metadata_id, guideline_patterns])

                    count = cursor.fetchone()[0]

                    cursor.execute('''
                        SELECT code, assertion_name FROM Assertion_Metadata
                        WHERE id = %s
                    ''', (assertion_metadata_id, ))

                    assertion_metadata = cursor.fetchone()

                    if count > 0:
                        assertions_response.append(
                            AssertionResponse(
                                assertion_id=assertion_id,
                                assertion_name=assertion_metadata[1],
                                assertion_rule=assertion_metadata[0],
                                evaluation_id=request.evaluation_id,
                                webpage_url=webpage
                            )
                        )

                elif len(wcagGuidelinesFilters) == 0 and len(wcagFilters) == 0:
                    cursor.execute('''
                        SELECT code, assertion_name FROM Assertion_Metadata
                        WHERE id = %s
                    ''', (assertion_metadata_id, ))

                    assertion_metadata = cursor.fetchone()

                    assertions_response.append(
                        AssertionResponse(
                            assertion_id=assertion_id,
                            assertion_name=assertion_metadata[1],
                            assertion_rule=assertion_metadata[0],
                            evaluation_id=request.evaluation_id,
                            webpage_url=webpage
                        )
                    )

                else:
                    guideline_patterns = [f"{guideline}.%" for guideline in wcagGuidelinesFilters]
    
                    cursor.execute('''
                        SELECT COUNT(*) FROM Assertion_Metadata_Success_Criteria
                        WHERE assertion_metadata_id = %s
                        AND success_criteria_level = ANY(%s::success_criteria_level[])
                        AND success_criteria_name LIKE ANY(%s)
                    ''', [assertion_metadata_id, list(request.wcagLevelFilters), guideline_patterns])

                    count = cursor.fetchone()[0]

                    cursor.execute('''
                        SELECT code, assertion_name FROM Assertion_Metadata
                        WHERE id = %s
                    ''', (assertion_metadata_id, ))

                    assertion_metadata = cursor.fetchone()

                    if count > 0:
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

            return GetLatestAssertionsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetLatestAssertionsResponse(status_code=200, assertions=assertions_response)
    
    def GetAssertionResults(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT * FROM Issue
                WHERE assertion_id = %s
                ORDER BY 
                    CASE verdict
                        WHEN 'passed' THEN 1
                        WHEN 'warning' THEN 2
                        WHEN 'failed' THEN 3
                        WHEN 'inapplicable' THEN 4
                    END;
            ''', (request.assertion_id, ))

            results = cursor.fetchall()

            response = []
            for result in results:
                cursor.execute('''
                    SELECT id, html_code, pointer, x, y, width, height FROM Element
                    WHERE issue_id = %s
                ''', (result[0], )) 

                elements = cursor.fetchall()            

                elements_list = []
                for element in elements:
                    elements_list.append(
                        ElementResponse(
                            id=element[0],
                            html_code=element[1],
                            pointer=element[2],
                            x=element[3],
                            y=element[4],
                            width=element[5],
                            height=element[6]
                        )
                    )

                response.append(
                    ResultResponse(
                        id=result[0],
                        description=result[3],
                        verdict=result[2],
                        elements=elements_list,
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
                WHERE monitored_website_id = %s AND score > -1.0
                ORDER BY evaluation_date DESC
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
                            year=eval[4].year,
                            hour=eval[4].hour,
                            minute=eval[4].minute,
                            second=eval[4].second
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
                        display_width, display_height, 
                        latest_evaluation, score FROM MonitoringRegistry
                WHERE user_id = %s AND score != -1.0
                ORDER BY latest_evaluation DESC
            ''', (request.user_id, ))

            registries = cursor.fetchall()

            response = []
            for registry in registries:
                passed = 0
                warnings = 0
                failed = 0
                inapplicable = 0

                cursor.execute('''
                    SELECT url FROM Webpage
                    WHERE monitoring_registry_id = %s
                ''', (registry[0], ))
                
                result = cursor.fetchall()

                webpages = []
                for webpage in result:
                    webpages.append(webpage[0])

                for webpage in webpages:
                    cursor.execute('''
                        SELECT id 
                        FROM Evaluation
                        WHERE monitored_website_id = %s
                        AND input_url = %s
                        ORDER BY evaluation_date DESC
                        LIMIT 1
                    ''', (registry[0], webpage))

                    eval_id = cursor.fetchone()

                    if eval_id is not None:
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
                        webpages=webpages,
                        latest_evaluation=EvalDate(
                            day=registry[8].day,
                            month=registry[8].month,
                            year=registry[8].year,
                            hour=registry[8].hour,
                            minute=registry[8].minute,
                            second=registry[8].second
                        ),
                        score=registry[9],
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
    
    def GetWebsiteMonitoringCycles(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT id, cycle_date FROM Monitoring_Cycle
                WHERE monitoring_registry_id = %s
                ORDER BY cycle_date DESC
            ''', (request.monitoring_id, ))

            response = cursor.fetchall()

            monitoring_cycles=[]

            for cycle in response:
                monitoring_cycles.append(
                    MonitoringCycle(
                        id=cycle[0],
                        cycle_date=EvalDate(
                            day=cycle[1].day,
                            month=cycle[1].month,
                            year=cycle[1].year,
                            hour=cycle[1].hour,
                            minute=cycle[1].minute,
                            second=cycle[1].second
                        )
                    )
                )

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetWebsiteMonitoringCyclesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return GetWebsiteMonitoringCyclesResponse(status_code=200, monitoring_cycles=monitoring_cycles)
    
    def SetNewMonitoringCycle(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                INSERT INTO Monitoring_Cycle (
                    monitoring_registry_id
                ) VALUES (
                    %s
                ) RETURNING id
            ''', (
                request.monitoring_registry_id, 
            ))

            monitoring_cycle_id = cursor.fetchone()[0]
            print(monitoring_cycle_id, file=sys.stderr, flush=True)

            conn.commit()
            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return SetNewMonitoringCycleResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return SetNewMonitoringCycleResponse(status_code=200, monitoring_cycle_id=monitoring_cycle_id)

    def GetMonitoredWebpages(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT id, url, needs_authentication, num_elements, page_size_kb FROM Webpage
                WHERE monitoring_registry_id = %s
            ''', (request.monitoring_registry_id, ))

            response = cursor.fetchall()

            webpages = []
            for webpage in response:
                webpages.append(
                    Webpage(
                        id=webpage[0],
                        url=webpage[1],
                        needs_authentication=webpage[2],
                        num_elements=webpage[3],
                        page_size_kb=webpage[4]
                    )
                )

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetMonitoredWebpagesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetMonitoredWebpagesResponse(status_code=200, monitored_webpages=webpages)

    def GetEvaluationInfo(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT display_width, display_height, is_mobile, is_landscape
                FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))

            response = cursor.fetchone()

            cursor.execute('''
                SELECT url, needs_authentication, login_webpage_id
                FROM Webpage
                WHERE id = %s
            ''', (request.webpage_id, ))

            webpage_info = cursor.fetchone()

            needs_authentication = webpage_info[1]

            if needs_authentication:
                login_webpage_id = webpage_info[2]

                cursor.execute('''
                    SELECT username_field, password_field, submit_button
                    FROM LoginWebpage
                    WHERE id = %s
                ''', (login_webpage_id, ))

                login_info = cursor.fetchone()

                if login_info is None:
                    return GetEvaluationInfoResponse(status_code=404)

                username_field = login_info[0]
                password_field = login_info[1]
                login_button = login_info[2]

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetEvaluationInfoResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetEvaluationInfoResponse(
            status_code=200, 
            display_width=response[0],
            display_height=response[1],
            is_mobile=response[2],
            is_landscape=response[3],
            webpage_url=webpage_info[0],
            needs_authentication=needs_authentication,
            username_field_selector=username_field if needs_authentication else "",
            password_field_selector=password_field if needs_authentication else "",
            login_button_selector=login_button if needs_authentication else ""
        )
    
    def DeleteWebpage(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                DELETE FROM Webpage
                WHERE id = %s
            ''', (request.webpage_id, ))

            conn.commit()
            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return DeleteWebpageResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return DeleteWebpageResponse(status_code=200)
    
    def AddLatestEvaluationsToMonitoringCycle(self, request, context):
        conn = None
        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT monitoring_registry_id FROM Monitoring_Cycle 
                WHERE id = %s
            ''', (request.monitoring_cycle_id, ))

            monitoring_registry_id = cursor.fetchone()[0]

            if monitoring_registry_id:
                cursor.execute('''
                SELECT url FROM Webpage
                WHERE monitoring_registry_id = %s
                ''', (monitoring_registry_id, ))

                webpages = cursor.fetchall()

                for webpage in webpages:
                    cursor.execute('''
                        SELECT id FROM Evaluation
                        WHERE monitored_website_id = %s
                        AND input_url = %s
                        ORDER BY evaluation_date DESC
                        LIMIT 1
                    ''', (monitoring_registry_id, webpage[0]))

                    evaluation_id = cursor.fetchone()

                    if evaluation_id:
                        cursor.execute('''
                            INSERT INTO Monitoring_Cycle_Evaluation (
                                monitoring_cycle_id, evaluation_id
                            ) VALUES (
                                %s, %s
                            )
                        ''', (request.monitoring_cycle_id, evaluation_id))

            conn.commit()
            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return AddLatestEvaluationsToMonitoringCycleResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return AddLatestEvaluationsToMonitoringCycleResponse(status_code=200)

    def GetMonitoringRegistry(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT accessibility_metric, website_name,
                        main_url, is_mobile, is_landscape, 
                        display_width, display_height, 
                        latest_evaluation, score FROM MonitoringRegistry
                WHERE id = %s
            ''', (request.monitoring_registry_id, ))

            registry = cursor.fetchone()

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
            accessibility_metric=registry[0],
            name=registry[1],
            main_url=registry[2],
            is_mobile=registry[3],
            is_landscape=registry[4],
            display_width=registry[5],
            display_height=registry[6],
            latest_evaluation=EvalDate(
                day=registry[7].day,
                month=registry[7].month,
                year=registry[7].year,
                hour=registry[7].hour,
                minute=registry[7].minute,
                second=registry[7].second
            ),
            score=registry[8]
        )
    
    def GetMonitoringCycle(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT * FROM Monitoring_Cycle
                WHERE id = %s
            ''', (request.monitoring_cycle_id, ))

            cycle = cursor.fetchone()

            cursor.close()

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetMonitoringCycleResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetMonitoringCycleResponse(
            status_code=200,
            id=cycle[0],
            monitoring_registry_id=cycle[1],
            cycle_date=EvalDate(
                day=cycle[2].day,
                month=cycle[2].month,
                year=cycle[2].year,
                hour=cycle[2].hour,
                minute=cycle[2].minute,
                second=cycle[2].second
            )
        )
    
    def GetWebpageComparisonData(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT url FROM Webpage
                WHERE id = %s
            ''', (request.webpage_id, ))

            url = cursor.fetchone()

            if url:
                cursor.execute('''
                    SELECT evaluation_id FROM Monitoring_Cycle_Evaluation
                    WHERE monitoring_cycle_id = %s
                ''', (request.cycle_id, ))

                evaluation_ids = cursor.fetchall()

                evaluation = -1
                score = 0.0
                total_fails = 0

                for evaluation_id in evaluation_ids:
                    cursor.execute('''
                        SELECT id, score FROM Evaluation
                        WHERE id = %s AND input_url = %s
                    ''', (evaluation_id[0], url[0] ))

                    result = cursor.fetchone()

                    if result:
                        evaluation = result[0]
                        score = result[1]
                        break

                cursor.execute('''
                    SELECT id, failed FROM Module
                    WHERE evaluation_id = %s
                    AND module_type = 'act-rules'
                ''', (evaluation, ))

                result = cursor.fetchone()

                module_id = result[0]
                total_fails = result[1]

                cursor.execute('''
                    SELECT id FROM Assertion
                    WHERE module_id = %s
                ''', (module_id, ))

                assertions = cursor.fetchall()

                passed_instances = 0
                applicable_instances = 0

                for assertion in assertions:
                    cursor.execute('''
                        SELECT passed, warning, failed FROM Assertion
                        WHERE id = %s
                    ''', (assertion[0], ))

                    module_stats = cursor.fetchone()

                    passed_instances += module_stats[0]
                    applicable_instances += (module_stats[0] + module_stats[1] + module_stats[2])

            cursor.close()

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetWebpageComparisonDataResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetWebpageComparisonDataResponse(status_code=200, score=score, total_fails=total_fails, passed_instances=passed_instances, applicable_instances=applicable_instances)
    
    def GetFailedTestsStats(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT evaluation_id FROM Monitoring_Cycle_Evaluation
                WHERE monitoring_cycle_id = %s
            ''', (request.cycle_id, ))

            evaluation_ids = cursor.fetchall()

            tests = {}
            failed_tests_stats = {}

            for evaluation_id in evaluation_ids:
                cursor.execute('''
                    SELECT input_url FROM Evaluation
                    WHERE id = %s
                ''', (evaluation_id[0], ))

                webpage = cursor.fetchone()[0]

                cursor.execute('''
                    SELECT id, failed FROM Module
                    WHERE evaluation_id = %s
                    AND module_type = 'act-rules'
                ''', (evaluation_id[0], ))

                module_result = cursor.fetchone()

                if module_result:
                    cursor.execute('''
                        SELECT id, assertion_metadata_id FROM Assertion
                        WHERE module_id = %s AND outcome = 'failed'
                    ''', (module_result[0], ))

                    assertion_metadata_ids = cursor.fetchall()

                    for assertion_metadata_id in assertion_metadata_ids:
                        cursor.execute('''
                            SELECT code, assertion_name FROM Assertion_Metadata
                            WHERE id = %s
                        ''', (assertion_metadata_id[1], ))

                        assertion_metadata = cursor.fetchone()

                        if assertion_metadata:
                            if assertion_metadata[0] not in tests:
                                tests[assertion_metadata[0]] = assertion_metadata[1]

                            if assertion_metadata[0] not in failed_tests_stats:
                                failed_tests_stats[assertion_metadata[0]] = [webpage]
                            else:
                                failed_tests_stats[assertion_metadata[0]].append(webpage)

            failed_tests = []

            print("OLAAAA", file=sys.stderr, flush=True)

            print(tests, file=sys.stderr, flush=True)
            print(failed_tests_stats, file=sys.stderr, flush=True)

            codes = set(tests.keys())

            for test in codes:
                failed_tests.append(
                    FailedTestStats(
                        assertion_name=tests[test],
                        assertion_code=test,
                        webpages=failed_tests_stats[test]
                    )
                )

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetFailedTestsStatsResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetFailedTestsStatsResponse(status_code=200, failed_tests=failed_tests)

    def GetIntermediateCycles(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()

            cursor.execute('''
                SELECT monitoring_registry_id FROM Monitoring_Cycle
                WHERE id = %s
            ''', (request.first_cycle_id, ))

            monitoring_registry_id = cursor.fetchone()[0]

            if monitoring_registry_id is None:
                return GetIntermediateCyclesResponse(status_code=404)
            
            cursor.execute('''
                SELECT id, cycle_date FROM Monitoring_Cycle
                WHERE monitoring_registry_id = %s
                AND id >= %s AND id <= %s
                ORDER BY cycle_date DESC
            ''', (monitoring_registry_id, request.first_cycle_id, request.second_cycle_id))

            response = cursor.fetchall()

            intermediate_cycles = []

            for cycle in response:
                intermediate_cycles.append(
                    MonitoringCycle(
                        id=cycle[0],
                        cycle_date=EvalDate(
                            day=cycle[1].day,
                            month=cycle[1].month,
                            year=cycle[1].year,
                            hour=cycle[1].hour,
                            minute=cycle[1].minute,
                            second=cycle[1].second
                        )
                    )
                )

        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()

            return GetIntermediateCyclesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetIntermediateCyclesResponse(status_code=200, intermediate_cycles=intermediate_cycles)

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
        maxconn = 50,
        dbname = POSTGRES_DB,
        user = POSTGRES_USER,
        password = POSTGRES_PASSWORD,
        host = DATABASE_HOST,
        port = POSTGRES_PORT
    )

    serve()