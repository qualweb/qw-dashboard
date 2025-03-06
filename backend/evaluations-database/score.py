import sys

def calculateWebsiteA3Score(webpages, monitoring_registry_id, cursor):
    a3_score = 0

    # Get all Assertion codes from Assertion_Metadata
    cursor.execute('''
        SELECT code
        FROM Assertion_Metadata
        WHERE parent_module_type = 'act-rules'
    ''')

    assertion_codes = cursor.fetchall()
    
    # Get all evaluation ids
    all_evaluation_ids = []

    for webpage_url in webpages:
        all_evaluation_ids.append(getMostRecentEvaluation(cursor, webpage_url))

    for i in range(len(webpages)):
        webpage_a3_score = calculateWebpageA3Score(webpages[i], all_evaluation_ids, cursor, assertion_codes)

        if webpage_a3_score == -1:
            return -1

        a3_score += webpage_a3_score
    
    storeWebsiteA3Score(cursor, monitoring_registry_id, a3_score / len(webpages))

    return a3_score / len(webpages)

def calculateWebpageA3Score(webpage, evaluations_ids, cursor, assertion_codes):
    a3_score = 1

    current_page_evaluation_id = getMostRecentEvaluation(cursor, webpage)

    for assertion_code in assertion_codes:
        assertion_code = assertion_code[0]

        results = getAssertionResults(cursor, assertion_code, current_page_evaluation_id)
        npb = results[1]
        bpb = results[2]
        
        bp = 0

        for evaluation_id in evaluations_ids:
            results = getAssertionResults(cursor, assertion_code, evaluation_id)
            bp += results[2]

        # Calculate barrier score
        barrier_score = calculateBarrierScore(cursor, assertion_code)

        if barrier_score != -1:
            a3_exp = 0

            if bpb != 0 and npb != 0:
                a3_exp = (bpb / npb) + (bpb / bp)

            a3_score *= (1 - barrier_score) ** a3_exp

    storeWebpageA3Score(cursor, current_page_evaluation_id, a3_score)

    return a3_score

def calculateBarrierScore(cursor, assertion_code):
    cursor.execute('''
        SELECT sc.success_criteria_level
        FROM Success_Criteria sc
        JOIN Assertion_Metadata_Success_Criteria amsc 
            ON sc.success_criteria_name = amsc.success_criteria_name 
            AND sc.success_criteria_level = amsc.success_criteria_level
        JOIN Assertion_Metadata am 
            ON amsc.assertion_metadata_id = am.id
        WHERE am.code = %s
        ORDER BY LENGTH(sc.success_criteria_level::text) DESC
    ''', (assertion_code, ))

    success_criteria = cursor.fetchall()

    if len(success_criteria) == 0:
        return -1

    if success_criteria[0][0] == "A":
        if len(success_criteria) > 1:
            return 0.8
        else:
            return 0.9
    elif success_criteria[0][0] == "AA":
        if len(success_criteria) > 1:
            return 0.4
        else:
            return 0.5
    elif success_criteria[0][0] == "AAA":
        if len(success_criteria) > 1:
            return 0.1
        else:
            return 0.2

def getMostRecentEvaluation(cursor, webpage_url):
    cursor.execute('''
        SELECT id
        FROM Evaluation
        WHERE input_url = %s
        ORDER BY evaluation_date DESC
        LIMIT 1
    ''', (webpage_url, ))

    return cursor.fetchone()[0]

def getAssertionResults(cursor, assertion_code, page_evaluation_id):

    cursor.execute('''
        SELECT id
        FROM Module
        WHERE evaluation_id = %s
        AND module_type = 'act-rules'
    ''', (page_evaluation_id, ))

    act_module_id = cursor.fetchone()[0]

    cursor.execute('''
        SELECT a.passed, a.warning, a.failed, a.inapplicable
        FROM Assertion a
        JOIN Assertion_Metadata am ON a.assertion_metadata_id = am.id
        WHERE am.code = %s
        AND a.module_id = %s
    ''', (assertion_code, act_module_id))

    results = cursor.fetchone()

    return results

def storeWebpageA3Score(cursor, page_evaluation_id, a3_score):
    cursor.execute('''
        UPDATE Evaluation
        SET score = %s
        WHERE id = %s
    ''', (a3_score, page_evaluation_id))

def storeWebsiteA3Score(cursor, monitoring_registry_id, a3_score):
    cursor.execute('''
        UPDATE MonitoringRegistry
        SET score = %s
        WHERE id = %s
    ''', (a3_score, monitoring_registry_id))