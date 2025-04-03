import { assert } from "console";
import { AssertionMetadataResponse, AssertionResponse, GetLatestAssertionsByWebpageResponse, IssueElementResponse, IssueResponse, SuccessCriteria, WebpageResponse } from "./protobuf_library/evaluations_pb";

export function convertGetLatestAssertionsResponseToJSON(response: GetLatestAssertionsByWebpageResponse): any {
  const result : any = {
    statusCode: response.getStatusCode(),
    webpages: []
  };

  // Convert each webpage
  const webpages = response.getWebpagesList();
  if (webpages && webpages.length) {
    result.webpages = webpages.map(webpage => convertWebpageToJson(webpage));
  }

  return result;
}

function convertWebpageToJson(webpage: WebpageResponse): any {
  return {
    url: webpage.getUrl(),
    assertions: convertAssertionsList(webpage.getAssertionsList())
  };
}

export function convertAssertionsList(assertionsList: AssertionResponse[]): any {
  if (!assertionsList || !assertionsList.length) {
    return [];
  }

  const passed : any[] = [];
  const warnings : any[] = [];
  const failed : any[] = [];
  const inapplicable : any[] = [];

  assertionsList.forEach(assertion => {
    if (assertion.getOutcome() === 'passed') {
      passed.push(convertAssertionToJson(assertion));
    } else if (assertion.getOutcome() === 'warning') {
      warnings.push(convertAssertionToJson(assertion));
    } else if (assertion.getOutcome() === 'failed') {
      failed.push(convertAssertionToJson(assertion));
    } else {
      inapplicable.push(convertAssertionToJson(assertion));
    }
  });

  return {
    passed: passed,
    warnings: warnings,
    failed: failed,
    inapplicable: inapplicable
  };
}
function convertMetadataToJson(metadata: AssertionMetadataResponse): any {
  return {
    id: metadata.getId(),
    code: metadata.getCode(),
    name: metadata.getName(),
    description: metadata.getDescription(),
    url: metadata.getUrl(),
    mapping: metadata.getMapping(),
    targetElements: metadata.getTargetElementsList(),
    targetAttributes: metadata.getTargetAttributesList(),
    successCriteria: convertSuccessCriteriaList(metadata.getSuccessCriteriaList()),
    successCriteriaQuantity: metadata.getSuccessCriteriaQuantity()
  };
}

function convertSuccessCriteriaList(criteriaList: SuccessCriteria[]): any[] {
  if (!criteriaList || !criteriaList.length) {
    return [];
  }
  
  return criteriaList.map(criteria => ({
    name: criteria.getName(),
    level: criteria.getLevel(),
    principle: criteria.getPrinciple(),
    url: criteria.getUrl()
  }));
}

function convertIssuesToJson(issues: IssueResponse[]): any[] {
  if (!issues || !issues.length) {
    return [];
  }
  
  return issues.map(
    issue => ({
      id: issue.getId(),
      assertion_id: issue.getAssertionId(),
      description: issue.getDescription(),
      verdict: issue.getVerdict(),
      elements: convertElementsToJson(issue.getElementsList())
    })
  );
}

function convertElementsToJson(elements: IssueElementResponse[]): any[] {
  if (!elements || !elements.length) {
    return [];
  }
  
  return elements.map(element => ({
    id: element.getId(),
    html_code: element.getHtmlCode(),
    pointer: element.getPointer(),
    x: element.getX(),
    y: element.getY(),
    width: element.getWidth(),
    height: element.getHeight()
  }));
}

function convertAssertionToJson(assertion: AssertionResponse): any {
  const metadata = assertion.getMetadata();
  const issues = assertion.getIssuesList();
  
  return {
    id: assertion.getId(),
    passed: assertion.getPassed(),
    warning: assertion.getWarning(),
    failed: assertion.getFailed(),
    inapplicable: assertion.getInapplicable(),
    outcome: assertion.getOutcome(),
    description: assertion.getDescription(),
    metadata: metadata ? convertMetadataToJson(metadata) : null,
    issues: issues ? convertIssuesToJson(issues) : null
  };
}
