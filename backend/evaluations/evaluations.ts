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
    Element,
    AddMonitoringRegistryRequest,
    GetMonitoringRegistryRequest,
    AddMonitoringRegistryResponse,
    GetMonitoringRegistryResponse
} from './protobuf_library/evaluations_pb';
import * as dotenv from 'dotenv';
import { PuppeteerCrawler } from 'crawlee';

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

const client = new EvaluationsClient(
    evaluations_database_ip + ':6000', 
    grpc.credentials.createInsecure(),
    {
        "grpc.max_receive_message_length": 100 * 1024 * 1024,
        "grpc.max_send_message_length": 100 * 1024 * 1024
    }
);

// This endpoint executes the crawling of the URLs in the domain of the input URL
app.post('/api/crawl', (req: Request, res: Response) => { 
    const main_url = req.body.url
    const domain_name = new URL(main_url).hostname;
    const is_mobile = req.body.is_mobile;
    const is_landscape = req.body.is_landscape;
    const display_width = req.body.display_width;
    const display_height = req.body.display_height;

    const puppeteerOptions = {
        headless: true,
        args: ['--no-sandbox']
    };

    async function run (urlToCrawl : string) {
        const urls: string[] = [];
      
        const crawler = new PuppeteerCrawler({
          async requestHandler({ request, page, enqueueLinks, log }) {
              urls.push(request.url);
      
              await enqueueLinks({
                  globs: [`http?(s)://${new URL(urlToCrawl).hostname}/**`],
              });
          },
          maxRequestsPerCrawl: 10,
          launchContext: {
            launchOptions: puppeteerOptions,
          },
        });
      
        await crawler.addRequests([urlToCrawl]);
      
        await crawler.run();
      
        return urls;
    }

    run(main_url)
        .then(async (urls) => {
            try {
                const monitoring_registry_request = new AddMonitoringRegistryRequest();
                
                monitoring_registry_request.setMainUrl(main_url);
                monitoring_registry_request.setDomainName(domain_name);
                monitoring_registry_request.setIsMobile(is_mobile);
                monitoring_registry_request.setIsLandscape(is_landscape);
                monitoring_registry_request.setDisplayWidth(display_width);
                monitoring_registry_request.setDisplayHeight(display_height);
                monitoring_registry_request.setWebpagesList(urls);

                const response = await new Promise((resolve, reject) => {
                    client.addMonitoringRegistry(monitoring_registry_request, (err : Error, response : AddMonitoringRegistryResponse) => {
                        if (err) reject(err);
                        else resolve(response);
                    });
                });

                console.log('Successfully added monitoring registry');
                res.send(200);
            } catch (error) {
                console.error('Error adding monitoring registry:', error);
                res.send(500);
            }
        }).catch(error => {
            console.error('Error during crawling:', error);
            res.send(500);
        });
});

// This endpoint executes the evaluations
app.post('/api/evaluate', async (req: Request, res: Response) => {
    const monitoring_registry_id = req.body.monitoring_registry_id;

    const getWebpagesRequest = new GetMonitoringRegistryRequest();
    getWebpagesRequest.setMonitoringRegistryId(monitoring_registry_id);

    const response = await new Promise<GetMonitoringRegistryResponse>((resolve, reject) => {
        client.getMonitoringRegistry(getWebpagesRequest, (err: Error, callResponse: GetMonitoringRegistryResponse) => {
          if (err) reject(err);
          else resolve(callResponse);
        });
    });

    console.log(response)

    if (response.getStatusCode() !== 200) {
        res.send(response.getStatusCode());
        return;
    }

    const urls = response.getWebpagesList();
    
    urls.forEach(url => {
        console.log(url);
    });

    try {
        const reports = await evaluate(
            urls,
            response.getDisplayWidth(),
            response.getDisplayHeight(),
            response.getIsMobile(),
            response.getIsLandscape()
        );
        
        const validReports = urls
            .filter(url => reports[url])
            .map(url => (
                {
                    url,
                    report: reports[url]
                }
            ));

        if (validReports.length === 0) {
            res.send(404);
            return;
        }

        async function processReport(index : number): Promise<void> {
            if (index >= validReports.length) {
                res.send(200);
                return;
            }
            
            const { url, report } = validReports[index];
            
            try {
                const evaluations_request = new AddEvaluationRequest();
                evaluations_request.setQualwebVersion(report.system.version);
                evaluations_request.setInputUrl(report.system.url?.inputUrl ?? "");
                evaluations_request.setCompleteUrl(report.system.url?.completeUrl ?? "");
                evaluations_request.setDom(report.system.page.dom.html);
                evaluations_request.setTitle(report.system.page.dom.title ?? "");
                evaluations_request.setElementCount(report.system.page.dom.elementCount ?? 0);
                evaluations_request.setPassed(report.metadata.passed);
                evaluations_request.setWarning(report.metadata.warning);
                evaluations_request.setFailed(report.metadata.failed);
                evaluations_request.setInapplicable(report.metadata.inapplicable);
                evaluations_request.setModulesList(getModules(report));
                evaluations_request.setModulesQuantity(2);
                evaluations_request.setMonitoredWebsiteId(monitoring_registry_id);
                
                const response = await new Promise<AddEvaluationResponse>((resolve, reject) => {
                    client.addEvaluation(evaluations_request, (err : Error, response : AddEvaluationResponse) => {
                        if (err) reject(err);
                        else resolve(response);
                    });
                });
                
                console.log(`Successfully added evaluation for URL ${url}`);
            } catch (error) {
                console.error(`Error adding evaluation for URL ${url}:`, error);
            }
            
            return processReport(index + 1);
        }
        
        await processReport(0);
        
    } catch (error) {
        console.error('Error during evaluation:', error);
        res.send(500);
    }
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

    const results = getResults(assertion)
    assertion_metadata.setResultsList(results[0]);
    assertion_metadata.setResultsQuantity(results[1]);

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

function getResults(assertion : QualwebAssertion) : [Result[], number] {
    var results : Result[] = [];
    var results_counter : number = 0;

    assertion.results.forEach((result : TestResult) => {
        var new_result = new Result();

        var elements : Element[] = [];
        var elements_counter : number = 0;

        new_result.setVerdict(result.verdict);
        new_result.setDescription(result.description);
    
        result.elements.forEach((element : EvaluationElement) => {
            var new_element = new Element();
            
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

    return  [results, results_counter];
}