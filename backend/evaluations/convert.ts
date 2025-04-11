import { AssertionResponse, ElementResponse, EvalDate, EvaluationHistory, EvaluationIdUrl, ResultResponse } from "./protobuf_library/evaluations_pb";

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
    rule: element.getAssertionRule(),
    evaluation_id: element.getEvaluationId(),
    webpage_url: element.getWebpageUrl()
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
    pointer: element.getPointer(),
    x: element.getX(),
    y: element.getY(),
    width: element.getWidth(),
    height: element.getHeight()
  }
}

export function convertEvaluationHistory(history: EvaluationHistory[]) {
  return history.map(element => ({
    id: element.getId(),
    title: element.getTitle(),
    input_url: element.getInputUrl(),
    score: element.getScore(),
    date: convertDate(element.getEvalDate())
  }))
}

export function convertDate(date: EvalDate | undefined) {
  if (!date) {
    return undefined;
  }

  return {
    day: date.getDay(),
    month: date.getMonth(),
    year: date.getYear()
  }
}