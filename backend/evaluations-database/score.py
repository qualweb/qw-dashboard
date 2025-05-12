from typing import List, Tuple, Optional, Dict, Any
from functools import lru_cache
import sys

def calculate_website_a3_score(
    webpages: List[str], 
    monitoring_registry_id: int, 
    cursor: Any
) -> float:
    """
    Calculate the A3 score for a website based on multiple webpages.
    
    Args:
        webpages: List of webpage URLs to evaluate
        monitoring_registry_id: ID of the monitoring registry to update
        cursor: Database cursor for executing queries
        
    Returns:
        The average A3 score across all webpages, or -1 if calculation failed
    """
    # Get all Assertion codes from Assertion_Metadata once
    cursor.execute('''
        SELECT code
        FROM Assertion_Metadata
        WHERE parent_module_type = 'act-rules'
    ''')
    assertion_codes = [code[0] for code in cursor.fetchall()]
    
    # Calculate A3 score for each webpage
    webpage_scores = []
    nr_webpages = 0
    for i, webpage in enumerate(webpages):
        bp = get_fails_for_webpage(cursor, webpage, assertion_codes)

        webpage_a3_score = calculate_webpage_a3_score(
            webpage, 
            cursor, 
            assertion_codes,
            bp
        )
        
        if webpage_a3_score != -1:
            webpage_scores.append(webpage_a3_score)
            nr_webpages += 1
    
    if nr_webpages == 0:
        return -1

    # Calculate average score
    website_score = sum(webpage_scores) / nr_webpages if webpage_scores else -1
    
    # Store the result
    store_website_a3_score(cursor, monitoring_registry_id, website_score)
    
    return website_score

def calculate_webpage_a3_score(
    webpage: str, 
    cursor: Any, 
    assertion_codes: List[str],
    bp: int
) -> float:
    """
    Calculate the A3 score for a single webpage.
    
    Args:
        webpage: URL of the webpage to evaluate
        evaluation_ids: List of all evaluation IDs
        cursor: Database cursor for executing queries
        assertion_codes: List of assertion codes to check
        
    Returns:
        The A3 score for the webpage, or -1 if calculation failed
    """
    a3_score = 1.0
    current_page_evaluation_id = get_most_recent_evaluation(cursor, webpage)

    if current_page_evaluation_id == -1:
        return -1

    for assertion_code in assertion_codes:
        results = get_assertion_results(cursor, assertion_code, current_page_evaluation_id)

        passed = results[0] # passed count
        warning = results[1] # warning count
        failed = results[2] # failed count
        npb = passed + warning + failed
        bpb = failed

        print(f'Assertion: {assertion_code}, Passed: {passed}, Warning: {warning}, Failed: {failed}, NPB: {npb}, BPB: {bpb}, BP: {bp}', file=sys.stderr)

        if npb == 0:
            continue

        # Calculate barrier score
        barrier_score = get_barrier_score(cursor, assertion_code)

        if barrier_score != -1:
            a3_exp = 0

            if bp != 0:
                a3_exp = (bpb / npb) + (bpb / bp)

            a3_score *= (1 - barrier_score) ** a3_exp

            print(f'Assertion: {assertion_code}, Barrier: {barrier_score}, A3 exp: {a3_exp}, A3 Score: {a3_score}', file=sys.stderr)

     # Store and return the score
    store_webpage_a3_score(cursor, current_page_evaluation_id, a3_score)

    return a3_score

@lru_cache(maxsize=128)
def get_barrier_score(
    cursor: Any, 
    assertion_code: str
) -> float:
    """
    Calculate the barrier score for an assertion code based on its success criteria.
    Uses caching to avoid repeated database lookups.
    
    Args:
        cursor: Database cursor for executing queries
        assertion_code: The assertion code to evaluate
        
    Returns:
        Barrier score (-1 if not found)
    """
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
    ''', (assertion_code,))
    
    success_criteria = cursor.fetchall()
    
    if not success_criteria:
        return -1
        
    # Determine score based on criteria level and number of success criteria
    level = success_criteria[0][0]
    multiple_criteria = len(success_criteria) > 1
    
    print(success_criteria, file=sys.stderr, flush=True)

    barrier_scores = {
        "A": 0.81 if multiple_criteria else 0.8,
        "AA": 0.17 if multiple_criteria else 0.16,
        "AAA": 0.05 if multiple_criteria else 0.04
    }
    
    return barrier_scores.get(level, -1)

def get_most_recent_evaluation(
    cursor: Any, 
    webpage_url: str
) -> int:
    """
    Get the ID of the most recent evaluation for a webpage.
    
    Args:
        cursor: Database cursor for executing queries
        webpage_url: URL of the webpage
        
    Returns:
        Evaluation ID
    """
    cursor.execute('''
        SELECT id
        FROM Evaluation
        WHERE input_url = %s
        ORDER BY evaluation_date DESC
        LIMIT 1
    ''', (webpage_url,))
    
    result = cursor.fetchone()

    return result[0] if result else -1

def get_assertion_results(
    cursor: Any, 
    assertion_code: str, 
    page_evaluation_id: int
) -> Optional[Tuple]:
    """
    Get the results of an assertion for a specific evaluation.
    
    Args:
        cursor: Database cursor for executing queries
        assertion_code: Code of the assertion to check
        page_evaluation_id: ID of the evaluation
        
    Returns:
        Tuple of (passed, warning, failed, inapplicable) counts or None if not found
    """
    cursor.execute('''
        SELECT id
        FROM Module
        WHERE evaluation_id = %s
        AND module_type = 'act-rules'
    ''', (page_evaluation_id,))
    
    module_result = cursor.fetchone()
    if not module_result:
        return None
        
    act_module_id = module_result[0]
    
    cursor.execute('''
        SELECT a.passed, a.warning, a.failed, a.inapplicable
        FROM Assertion a
        JOIN Assertion_Metadata am ON a.assertion_metadata_id = am.id
        WHERE am.code = %s
        AND a.module_id = %s
    ''', (assertion_code, act_module_id))
    
    return cursor.fetchone()

def store_webpage_a3_score(
    cursor: Any, 
    page_evaluation_id: int, 
    a3_score: float
) -> None:
    """
    Store the A3 score for a webpage.
    
    Args:
        cursor: Database cursor for executing queries
        page_evaluation_id: ID of the evaluation
        a3_score: A3 score to store
    """
    cursor.execute('''
        UPDATE Evaluation
        SET score = %s
        WHERE id = %s
    ''', (a3_score, page_evaluation_id))

def store_website_a3_score(
    cursor: Any, 
    monitoring_registry_id: int, 
    a3_score: float
) -> None:
    """
    Store the A3 score for a website.
    
    Args:
        cursor: Database cursor for executing queries
        monitoring_registry_id: ID of the monitoring registry
        a3_score: A3 score to store
    """
    cursor.execute('''
        UPDATE MonitoringRegistry
        SET score = %s
        WHERE id = %s
    ''', (a3_score, monitoring_registry_id))

def get_fails_for_webpage(
    cursor: Any, 
    webpage_url: str,
    assertion_codes: List[str]
) -> int:
    """
    Get the number of failed assertions for a webpage.
    
    Args:
        cursor: Database cursor for executing queries
        webpage_url: URL of the webpage
        
    Returns:
        Number of failed assertions
    """
    failed = 0

    for assertion_code in assertion_codes:
        evaluation_id = get_most_recent_evaluation(cursor, webpage_url)

        if evaluation_id != -1:
            results = get_assertion_results(cursor, assertion_code, evaluation_id)

            if results:
                failed += results[2]

    return failed