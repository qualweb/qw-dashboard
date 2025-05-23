import { AssertionResponse, ElementResponse, EvalDate, MonitoringCycle, EvaluationHistory, EvaluationIdUrl, MonitoringRegistry, ResultResponse, Webpage, GetMonitoringRegistryResponse, GetMonitoringCycleResponse, GetWebpageComparisonDataResponse } from "./protobuf_library/evaluations_pb";

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
    year: date.getYear(),
    hour: date.getHour(),
    minute: date.getMinute(),
    second: date.getSecond()
  }
}

export function convertMonitoringRegistries( monitoringRegistries: MonitoringRegistry[]) {
  return monitoringRegistries.map(element => ({
    id: element.getId(),
    accessibility_metric: element.getAccessibilityMetric(),
    name: element.getName(),
    main_url: element.getMainUrl(),
    is_mobile: element.getIsMobile(),
    is_landscape: element.getIsLandscape(),
    display_width: element.getDisplayWidth(),
    display_height: element.getDisplayHeight(),
    webpages: element.getWebpagesList(),
    score: element.getScore(),
    latest_evaluation: convertDate(element.getLatestEvaluation()),
    passed: element.getPassed(),
    warnings: element.getWarnings(),
    failed: element.getFailed(),
    inapplicable: element.getInapplicable()
  }))
}

export function convertMonitoringCycles(cycles: MonitoringCycle[]) {
  return cycles.map(element => ({
    id: element.getId(),
    cycle_date: convertDate(element.getCycleDate())
  }))
}

export function convertMonitoredWebpages(webpages: Webpage[]) {
  return webpages.map(element => ({
    id: element.getId(),
    url: element.getUrl()
  }))
}

export const convertMonitoringRegistry = (monitoringRegistry: GetMonitoringRegistryResponse) => {
  return {
    accessibility_metric: monitoringRegistry.getAccessibilityMetric(),
    name: monitoringRegistry.getName(),
    main_url: monitoringRegistry.getMainUrl(),
    is_mobile: monitoringRegistry.getIsMobile(),
    is_landscape: monitoringRegistry.getIsLandscape(),
    display_width: monitoringRegistry.getDisplayWidth(),
    display_height: monitoringRegistry.getDisplayHeight(),
    latest_evaluation: convertDate(monitoringRegistry.getLatestEvaluation()),
    score: monitoringRegistry.getScore(),
  }
}

export const convertMonitoringCycle = (monitoringCycle: GetMonitoringCycleResponse) => {
  return {
    id: monitoringCycle.getId(),
    monitoring_registry_id: monitoringCycle.getMonitoringRegistryId(),
    cycle_date: convertDate(monitoringCycle.getCycleDate()),
  }
}

export const convertWebpageComparisonData = (webpage: GetWebpageComparisonDataResponse) => {
  return {
    score: webpage.getScore(),
    total_fails: webpage.getTotalFails(),
  }
}