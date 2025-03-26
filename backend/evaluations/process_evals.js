"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getModules;
var core_1 = require("@qualweb/core");
var evaluations_pb_1 = require("./protobuf_library/evaluations_pb");
function getModules(report) {
    var modules = [];
    var modules_names = [core_1.ModuleType.WCAG_TECHNIQUES, core_1.ModuleType.ACT_RULES, core_1.ModuleType.BEST_PRACTICES];
    var assertions_quantity = [35, 77, 29];
    var i = 0;
    modules_names.forEach(function (module) {
        var new_module = new evaluations_pb_1.Module();
        if (report.modules[module] !== undefined) {
            var currentModule = report.modules[module];
            new_module.setType(currentModule.type);
            new_module.setPassed(currentModule.metadata.passed);
            new_module.setWarning(currentModule.metadata.warning);
            new_module.setFailed(currentModule.metadata.failed);
            new_module.setInapplicable(currentModule.metadata.inapplicable);
            var assertions = getAssertions(currentModule, assertions_quantity[i]);
            new_module.setAssertionsList(assertions[0]);
            new_module.setAssertionsQuantity(assertions[1]);
            modules.push(new_module);
            i++;
        }
        else {
            console.error("Module not found!");
        }
    });
    return modules;
}
function getAssertions(module, assertions_quantity) {
    var assertions = [];
    var rule_prefix = '';
    var counter = 0;
    switch (module.type) {
        case core_1.ModuleType.WCAG_TECHNIQUES:
            rule_prefix = 'QW-WCAG-T';
            break;
        case core_1.ModuleType.ACT_RULES:
            rule_prefix = 'QW-ACT-R';
            break;
        case core_1.ModuleType.BEST_PRACTICES:
            rule_prefix = 'QW-BP';
            break;
        default:
            break;
    }
    for (var i = 1; i <= assertions_quantity; i++) {
        var new_assertion = new evaluations_pb_1.Assertion();
        var assertion = module.assertions[rule_prefix.concat(i.toString())];
        if (module.assertions[rule_prefix.concat(i.toString())] !== undefined) {
            new_assertion.setPassed(assertion.metadata.passed);
            new_assertion.setWarning(assertion.metadata.warning);
            new_assertion.setFailed(assertion.metadata.failed);
            new_assertion.setInapplicable(assertion.metadata.inapplicable);
            new_assertion.setOutcome(assertion.metadata.outcome);
            new_assertion.setDescription(assertion.metadata.description);
            new_assertion.setMetadata(getMetadata(assertion));
            assertions.push(new_assertion);
            counter++;
        }
    }
    return [assertions, counter];
}
function getMetadata(assertion) {
    var assertion_metadata = new evaluations_pb_1.AssertionMetadata();
    assertion_metadata.setCode(assertion.code);
    assertion_metadata.setName(assertion.name);
    assertion_metadata.setDescription(assertion.description);
    assertion_metadata.setUrl(assertion.metadata.url);
    assertion_metadata.setMapping(assertion.mapping);
    if (assertion.metadata.target.element !== undefined) {
        if (typeof assertion.metadata.target.element === 'string') {
            assertion_metadata.setTargetElementsList([assertion.metadata.target.element]);
        }
        else {
            assertion_metadata.setTargetElementsList(assertion.metadata.target.element);
        }
    }
    if (assertion.metadata.target.attributes !== undefined) {
        if (typeof assertion.metadata.target.attributes === 'string') {
            assertion_metadata.setTargetAttributesList([assertion.metadata.target.attributes]);
        }
        else {
            assertion_metadata.setTargetAttributesList(assertion.metadata.target.attributes);
        }
    }
    assertion_metadata.setSuccessCriteriaList(getSuccessCriteriaList(assertion));
    assertion_metadata.setSuccessCriteriaQuantity(assertion.metadata['success-criteria'].length);
    var results = getResults(assertion);
    assertion_metadata.setResultsList(results[0]);
    assertion_metadata.setResultsQuantity(results[1]);
    return assertion_metadata;
}
function getSuccessCriteriaList(assertion) {
    var success_criteria_list = [];
    assertion.metadata['success-criteria'].forEach(function (success_criteria) {
        var new_success_criteria = new evaluations_pb_1.SuccessCriteria();
        new_success_criteria.setName(success_criteria.name);
        new_success_criteria.setLevel(success_criteria.level);
        new_success_criteria.setPrinciple(success_criteria.principle);
        new_success_criteria.setUrl(success_criteria.url);
        success_criteria_list.push(new_success_criteria);
    });
    return success_criteria_list;
}
function getResults(assertion) {
    var results = [];
    var results_counter = 0;
    assertion.results.forEach(function (result) {
        var new_result = new evaluations_pb_1.Result();
        var elements = [];
        var elements_counter = 0;
        new_result.setVerdict(result.verdict);
        new_result.setDescription(result.description);
        result.elements.forEach(function (element) {
            var new_element = new evaluations_pb_1.Element();
            if (element.htmlCode !== undefined)
                new_element.setHtmlCode(element.htmlCode);
            if (element.pointer !== undefined)
                new_element.setPointer(element.pointer);
            elements.push(new_element);
            elements_counter++;
        });
        new_result.setResultCode(result.resultCode);
        new_result.setElementsList(elements);
        new_result.setElementsQuantity(elements_counter);
        results.push(new_result);
        results_counter++;
    });
    return [results, results_counter];
}
