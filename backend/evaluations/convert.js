"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLatestEvals = convertLatestEvals;
exports.convertLatestACTAssertions = convertLatestACTAssertions;
exports.convertAssertionResults = convertAssertionResults;
exports.convertResultElement = convertResultElement;
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
        rule: element.getAssertionRule()
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
        pointer: element.getPointer()
    };
}
