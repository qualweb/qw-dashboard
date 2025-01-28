import { 
    QualwebReport, 
    ModuleType, 
    EvaluationReport, 
    Assertion as QualwebAssertion, 
    SuccessCriteria as QualwebSuccessCriteria, 
    TestResult, 
    EvaluationElement
} from '@qualweb/core';
import { Request, Response, NextFunction } from 'express';
import { 
    AddEvaluationRequest, 
    AddEvaluationResponse, 
    Module,
    Assertion,
    AssertionMetadata,
    SuccessCriteria,
    Result,
    Element
} from './protobuf_library/evaluations_pb';
import * as dotenv from 'dotenv';

dotenv.config();

// Access environment variables
const evaluations_database_ip = process.env.EVALUATIONS_DATABASE_HOST;

const { EvaluationsClient } = require('./protobuf_library/evaluations_grpc_pb.js');

const grpc = require('@grpc/grpc-js');
const express = require('express');
const evaluate = require('./evaluate');
const app = express();
const port = 8081;

app.use(express.json());

console.debug(evaluations_database_ip);
const client = new EvaluationsClient(evaluations_database_ip + ':6000', grpc.credentials.createInsecure());
console.debug(client);

// This endpoint executes the evaluations
app.post('/api/evaluate', (req: Request, res: Response) => {
    const urlToEvaluate = req.body.url

    evaluate(urlToEvaluate).then((report: QualwebReport) => {
        if (report) {

            const evaluations_request = new AddEvaluationRequest();

            evaluations_request.setQualwebVersion(report.system.version);
            evaluations_request.setInputUrl(report.system.url?.inputUrl ?? "");
            evaluations_request.setDomainName(report.system.url?.domainName ?? "");
            evaluations_request.setDomain(report.system.url?.domain ?? "");
            evaluations_request.setUri(report.system.url?.uri ?? "");
            evaluations_request.setCompleteUrl(report.system.url?.completeUrl ?? "");
            evaluations_request.setMobile(report.system.page.viewport.mobile ?? false);
            evaluations_request.setLandscape(report.system.page.viewport.landscape ?? false);
            evaluations_request.setDisplayWidth(report.system.page.viewport.resolution?.width ?? 0);
            evaluations_request.setDisplayHeight(report.system.page.viewport.resolution?.height ?? 0);
            evaluations_request.setDom(report.system.page.dom.html);
            evaluations_request.setTitle(report.system.page.dom.title ?? "");
            evaluations_request.setElementCount(report.system.page.dom.elementCount ?? 0);
            evaluations_request.setPassed(report.metadata.passed);
            evaluations_request.setWarning(report.metadata.warning);
            evaluations_request.setFailed(report.metadata.failed);
            evaluations_request.setInapplicable(report.metadata.inapplicable);
            evaluations_request.setModulesList(getModules(report));
            evaluations_request.setModulesQuantity(2);

            client.addEvaluation(evaluations_request, (err : Error , response : AddEvaluationResponse) => {
                res.send(response.getStatusCode());
            });
            
        }
        else
            res.status(400).send('Could not find the URL send to evaluate.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function getModules(report : QualwebReport) : Module[] {
    var modules : Module[] = [];
    const modules_names : ModuleType[] = [ModuleType.WCAG_TECHNIQUES, ModuleType.ACT_RULES, ModuleType.BEST_PRACTICES];
    const assertions_quantity : number[] = [35, 77, 29];

    var i = 0;

    modules_names.forEach((module : ModuleType) => {
        var new_module = new Module();

        if (report.modules[module] !== undefined) {
            const currentModule : EvaluationReport = report.modules[module] as EvaluationReport;

            new_module.setType(currentModule.type);
            new_module.setPassed(currentModule.metadata.passed);
            new_module.setWarning(currentModule.metadata.warning);
            new_module.setFailed(currentModule.metadata.failed);
            new_module.setInapplicable(currentModule.metadata.inapplicable);

            const assertions = getAssertions(currentModule, assertions_quantity[i])
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

function getAssertions(module : EvaluationReport, assertions_quantity : number) : [Assertion[], number] {
    var assertions : Assertion[] = [];
    var rule_prefix = '';
    var counter = 0;

    switch(module.type) {
        case ModuleType.WCAG_TECHNIQUES:
            rule_prefix = 'QW-WCAG-T';
            break;
        case ModuleType.ACT_RULES:
            rule_prefix = 'QW-ACT-R';
            break;
        case ModuleType.BEST_PRACTICES:
            rule_prefix = 'QW-BP';
        break;
        default:
            break;
    }

    for(var i = 1; i <= assertions_quantity; i++) {
        var new_assertion = new Assertion();
        const assertion = module.assertions[rule_prefix.concat(i.toString())];
        console.debug(rule_prefix.concat(i.toString()));
        
        if(module.assertions[rule_prefix.concat(i.toString())] !== undefined) {
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

    return [assertions, counter]
}

function getMetadata(assertion : QualwebAssertion) : AssertionMetadata {
    var assertion_metadata = new AssertionMetadata();

    assertion_metadata.setCode(assertion.code);
    assertion_metadata.setName(assertion.name);
    assertion_metadata.setDescription(assertion.description);
    assertion_metadata.setUrl(assertion.metadata.url);
    assertion_metadata.setMapping(assertion.mapping);

    if(assertion.metadata.target.element !== undefined) {
        if(typeof assertion.metadata.target.element === 'string' ) {
            assertion_metadata.setTargetElementsList([assertion.metadata.target.element])
        }
        else {
            assertion_metadata.setTargetElementsList(assertion.metadata.target.element)
        }
    }

    if(assertion.metadata.target.attributes !== undefined) {
        if(typeof assertion.metadata.target.attributes === 'string' ) {
            assertion_metadata.setTargetAttributesList([assertion.metadata.target.attributes])
        }
        else {
            assertion_metadata.setTargetAttributesList(assertion.metadata.target.attributes)
        }
    }

    assertion_metadata.setSuccessCriteriaList(getSuccessCriteriaList(assertion));
    assertion_metadata.setSuccessCriteriaQuantity(assertion.metadata['success-criteria'].length);

    assertion_metadata.setResultsList(getResults(assertion));

    return assertion_metadata;
}

function getSuccessCriteriaList(assertion : QualwebAssertion) : SuccessCriteria[] {
    var success_criteria_list : SuccessCriteria[] = [];

    assertion.metadata['success-criteria'].forEach((success_criteria : QualwebSuccessCriteria) => {
        var new_success_criteria = new SuccessCriteria();

        new_success_criteria.setName(success_criteria.name);
        new_success_criteria.setLevel(success_criteria.level);
        new_success_criteria.setPrinciple(success_criteria.principle);
        new_success_criteria.setUrl(success_criteria.url);

        success_criteria_list.push(new_success_criteria);
    });

    return success_criteria_list;
}

function getResults(assertion : QualwebAssertion) : Result[] {
    var results : Result[] = [];

    assertion.results.forEach((result : TestResult) => {
        var new_result = new Result();

        new_result.setVerdict(result.verdict);
        new_result.setDescription(result.description);
        
        var elements : Element[] = [];
        result.elements.forEach((element : EvaluationElement) => {
            var new_element = new Element();
            
            if (element.htmlCode !== undefined)
                new_element.setHtmlCode(element.htmlCode);

            if (element.pointer !== undefined)
                new_element.setPointer(element.pointer);

            elements.push(new_element);
        });

        new_result.setElementsList(elements);
    });

    return  results;
}