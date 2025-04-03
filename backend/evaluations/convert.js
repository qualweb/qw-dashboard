"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertGetLatestAssertionsResponseToJSON = convertGetLatestAssertionsResponseToJSON;
exports.convertAssertionsList = convertAssertionsList;
function convertGetLatestAssertionsResponseToJSON(response) {
    var result = {
        statusCode: response.getStatusCode(),
        webpages: []
    };
    // Convert each webpage
    var webpages = response.getWebpagesList();
    if (webpages && webpages.length) {
        result.webpages = webpages.map(function (webpage) { return convertWebpageToJson(webpage); });
    }
    return result;
}
function convertWebpageToJson(webpage) {
    return {
        url: webpage.getUrl(),
        assertions: convertAssertionsList(webpage.getAssertionsList())
    };
}
function convertAssertionsList(assertionsList) {
    if (!assertionsList || !assertionsList.length) {
        return [];
    }
    var passed = [];
    var warnings = [];
    var failed = [];
    var inapplicable = [];
    assertionsList.forEach(function (assertion) {
        if (assertion.getOutcome() === 'passed') {
            passed.push(convertAssertionToJson(assertion));
        }
        else if (assertion.getOutcome() === 'warning') {
            warnings.push(convertAssertionToJson(assertion));
        }
        else if (assertion.getOutcome() === 'failed') {
            failed.push(convertAssertionToJson(assertion));
        }
        else {
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
function convertMetadataToJson(metadata) {
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
function convertSuccessCriteriaList(criteriaList) {
    if (!criteriaList || !criteriaList.length) {
        return [];
    }
    return criteriaList.map(function (criteria) { return ({
        name: criteria.getName(),
        level: criteria.getLevel(),
        principle: criteria.getPrinciple(),
        url: criteria.getUrl()
    }); });
}
function convertIssuesToJson(issues) {
    if (!issues || !issues.length) {
        return [];
    }
    return issues.map(function (issue) { return ({
        id: issue.getId(),
        assertion_id: issue.getAssertionId(),
        description: issue.getDescription(),
        verdict: issue.getVerdict(),
        elements: convertElementsToJson(issue.getElementsList())
    }); });
}
function convertElementsToJson(elements) {
    if (!elements || !elements.length) {
        return [];
    }
    return elements.map(function (element) { return ({
        id: element.getId(),
        html_code: element.getHtmlCode(),
        pointer: element.getPointer(),
        x: element.getX(),
        y: element.getY(),
        width: element.getWidth(),
        height: element.getHeight()
    }); });
}
function convertAssertionToJson(assertion) {
    var metadata = assertion.getMetadata();
    var issues = assertion.getIssuesList();
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
