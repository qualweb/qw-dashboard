import { AssertionResponse, ElementResponse, EvaluationIdUrl, ResultResponse } from "./protobuf_library/evaluations_pb";

export function convertLatestEvals(latestEvals: EvaluationIdUrl[]) {
  return latestEvals.map(element => ({
    id: element.getEvaluationId(),
    url: element.getEvaluationUrl()
  }))
}

export function convertLatestACTAssertions(latestACTAssertions: AssertionResponse[]) {
  return latestACTAssertions.map(element => ({
    id: element.getAssertionId(),
    name: element.getAssertionName(),
    rule: element.getAssertionRule()
  }))
}

export function convertAssertionResults(assertionResults: ResultResponse[]) {
  return assertionResults.map(element => ({
    id: element.getId(),
    verdict: element.getVerdict(),
    description: element.getDescription()
  }))
}

export function convertResultElement(element: ElementResponse | undefined) {
  if (!element) {
    return undefined;
  }

  return {
    id: element.getId(),
    htmlCode: element.getHtmlCode(),
    pointer: element.getPointer()
  }
}