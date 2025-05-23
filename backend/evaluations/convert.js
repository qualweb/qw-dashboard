"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWebpageComparisonData = exports.convertMonitoringCycle = exports.convertMonitoringRegistry = void 0;
exports.convertLatestEvals = convertLatestEvals;
exports.convertLatestACTAssertions = convertLatestACTAssertions;
exports.convertAssertionResults = convertAssertionResults;
exports.convertResultElement = convertResultElement;
exports.convertEvaluationHistory = convertEvaluationHistory;
exports.convertDate = convertDate;
exports.convertMonitoringRegistries = convertMonitoringRegistries;
exports.convertMonitoringCycles = convertMonitoringCycles;
exports.convertMonitoredWebpages = convertMonitoredWebpages;
function convertLatestEvals(latestEvals) {
    return latestEvals.map(function (element) { return ({
        id: element.getEvaluationId(),
        url: element.getEvaluationUrl()
    }); });
}
function convertLatestACTAssertions(latestACTAssertions) {
    return latestACTAssertions.map(function (element) { return ({
        id: element.getAssertionId(),
        name: element.getAssertionName(),
        rule: element.getAssertionRule(),
        evaluation_id: element.getEvaluationId(),
        webpage_url: element.getWebpageUrl()
    }); });
}
function convertAssertionResults(assertionResults) {
    return assertionResults.map(function (element) { return ({
        id: element.getId(),
        verdict: element.getVerdict(),
        description: element.getDescription()
    }); });
}
function convertResultElement(element) {
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
    };
}
function convertEvaluationHistory(history) {
    return history.map(function (element) { return ({
        id: element.getId(),
        title: element.getTitle(),
        input_url: element.getInputUrl(),
        score: element.getScore(),
        date: convertDate(element.getEvalDate())
    }); });
}
function convertDate(date) {
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
    };
}
function convertMonitoringRegistries(monitoringRegistries) {
    return monitoringRegistries.map(function (element) { return ({
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
    }); });
}
function convertMonitoringCycles(cycles) {
    return cycles.map(function (element) { return ({
        id: element.getId(),
        cycle_date: convertDate(element.getCycleDate())
    }); });
}
function convertMonitoredWebpages(webpages) {
    return webpages.map(function (element) { return ({
        id: element.getId(),
        url: element.getUrl()
    }); });
}
var convertMonitoringRegistry = function (monitoringRegistry) {
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
    };
};
exports.convertMonitoringRegistry = convertMonitoringRegistry;
var convertMonitoringCycle = function (monitoringCycle) {
    return {
        id: monitoringCycle.getId(),
        monitoring_registry_id: monitoringCycle.getMonitoringRegistryId(),
        cycle_date: convertDate(monitoringCycle.getCycleDate()),
    };
};
exports.convertMonitoringCycle = convertMonitoringCycle;
var convertWebpageComparisonData = function (webpage) {
    return {
        score: webpage.getScore(),
        total_fails: webpage.getTotalFails(),
    };
};
exports.convertWebpageComparisonData = convertWebpageComparisonData;
