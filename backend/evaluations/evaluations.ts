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
    GetMonitoringRegistryResponse,
    SetAccessibilityMetricRequest,
    SetAccessibilityMetricResponse,
    CalculateAccessibilityScoreRequest,
    CalculateAccessibilityScoreResponse,
    SetLatestEvaluationRequest,
    SetLatestEvaluationResponse,
    AddWebpagesRequest,
    AddWebpagesResponse,
    SetAccessibilityMetricAllWebsitesResponse,
    SetAccessibilityMetricAllWebsitesRequest,
    AssertionMetadataResponse,
    AssertionResponse,
    GetLatestAssertionsByTestResponse,
    GetLatestAssertionsByTestRequest,
    GetLatestAssertionsByWebpageResponse,
    GetLatestAssertionsByWebpageRequest
} from './protobuf_library/evaluations_pb';
import * as dotenv from 'dotenv';
import { PuppeteerCrawler, RequestQueue, sleep } from 'crawlee';
import { convertGetLatestAssertionsResponseToJSON, convertAssertionsList } from './convert';

dotenv.config();

// Access environment variables
const evaluations_database_ip = process.env.EVALUATIONS_DATABASE_HOST;

const { EvaluationsClient } = require('./protobuf_library/evaluations_grpc_pb.js');

const grpc = require('@grpc/grpc-js');
const express = require('express');
const cors = require('cors');
const evaluate = require('./evaluate');
const app = express();
const port = 8081;

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
    }
));

const client = new EvaluationsClient(
    evaluations_database_ip + ':6000', 
    grpc.credentials.createInsecure(),
    {
        "grpc.max_receive_message_length": 100 * 1024 * 1024,
        "grpc.max_send_message_length": 100 * 1024 * 1024
    }
);

// This endpoint executes the crawling of the URLs in the domain of the input URL
app.post('/api/evaluations/crawl', (req: Request, res: Response) => { 
    const main_url = req.body.url
    const domain_name = new URL(main_url).hostname;
    const is_mobile = req.body.is_mobile;
    const is_landscape = req.body.is_landscape;
    const display_width = req.body.display_width;
    const display_height = req.body.display_height;

    console.log(main_url);

    const puppeteerOptions = {
        headless: true,
        args: ['--no-sandbox']
    };

    async function run(urlToCrawl: string) {
        const urls: string[] = [];
        
        const requestQueue = await RequestQueue.open();
        
        const crawler = new PuppeteerCrawler({
            requestQueue,
            async requestHandler({ request, page, enqueueLinks, log }) {
                urls.push(request.url);
                
                await enqueueLinks({
                    globs: [`http?(s)://${new URL(urlToCrawl).hostname}/**`],
                    requestQueue,
                });
            },
            maxRequestsPerCrawl: 10,
            launchContext: {
                launchOptions: {
                    ...puppeteerOptions,
                    args: [...(puppeteerOptions.args || []), '--incognito'],
                },
            },
            navigationTimeoutSecs: 60,
        });
        
        await crawler.addRequests([urlToCrawl]);
        
        try {
            await crawler.run();
        } finally {
            await crawler.teardown();
            await requestQueue.drop();
        }
        
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

                const response = await new Promise<AddMonitoringRegistryResponse>((resolve, reject) => {
                    client.addMonitoringRegistry(monitoring_registry_request, (err : Error, response : AddMonitoringRegistryResponse) => {
                        if (err) reject(err);
                        else resolve(response);
                    });
                });

                console.log('Successfully added monitoring registry');
                res.send(
                    {
                        status: response.getStatusCode(),
                        monitoring_registry_id: response.getMonitoringRegistryId()
                    }
                );
                
            } catch (error) {
                console.error('Error adding monitoring registry:', error);
                res.send(500);
            }
        }).catch(error => {
            console.error('Error during crawling:', error);
            res.send(500);
        });
});

app.post('/api/evaluations/set-accessibility-metric', async (req: Request, res: Response) => {
    const monitoring_registry_id = req.body.monitoring_registry_id  ;
    const accessibility_metric = req.body.accessibility_metric;

    try {
        const accessibility_metric_request = new SetAccessibilityMetricRequest();
        accessibility_metric_request.setMonitoringRegistryId(monitoring_registry_id);
        accessibility_metric_request.setAccessibilityMetric(accessibility_metric);

        const response = await new Promise((resolve, reject) => {
            client.setAccessibilityMetric(accessibility_metric_request, (err : Error, response : SetAccessibilityMetricResponse) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    }
    catch (error) {
        console.error('Error setting accessibility metric:', error);
        res.send(500);
    }

    res.send(200);
});

// This endpoint executes the evaluations
app.post('/api/evaluations/evaluate', async (req: Request, res: Response) => {
    const monitoring_registry_id = req.body.monitoring_registry_id;

    try {
        const getWebpagesRequest = new GetMonitoringRegistryRequest();
        getWebpagesRequest.setMonitoringRegistryId(monitoring_registry_id);

        const response = await new Promise<GetMonitoringRegistryResponse>((resolve, reject) => {
            client.getMonitoringRegistry(getWebpagesRequest, (err: Error, callResponse: GetMonitoringRegistryResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        const urls = response.getWebpagesList();
        
        type ReportMap = { [url: string]: any };
        const reports: ReportMap = {};

        for (const url of urls) {
            const report = await evaluate(
                url,
                response.getDisplayWidth(),
                response.getDisplayHeight(),
                response.getIsMobile(),
                response.getIsLandscape()
            );
            
            reports[url] = report[url];
            
            if (url !== urls[urls.length - 1]) {
                await sleep(500);
            }
        }

        const validReports = urls
            .filter(url => reports[url])
            .map(url => ({
                url,
                report: reports[url]
            }));

        if (validReports.length === 0) {
            res.send(404);
            return;
        }

        if (validReports.length < urls.length) {
            res.status(207).json({ 
                message: 'Some URLs could not be evaluated',
                urls: urls.filter(url => !reports[url])
            });
        }

        const processPromises = validReports.map(async ({ url, report }) => {
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
                    client.addEvaluation(evaluations_request, (err: Error, response: AddEvaluationResponse) => {
                        if (err) reject(err);
                        else resolve(response);
                    });
                });
                
                console.log(`Successfully added evaluation for URL ${url}`);
                return { url, success: true, statusCode: response.getStatusCode() };
            } catch (error) {
                console.error(`Error adding evaluation for URL ${url}:`, error);
                return { url, success: false, error };
            }
        });
        
        const results = await Promise.all(processPromises);
        
        const successful = results.filter(result => result.success).length;
        const failed = results.length - successful;
        
        console.log(`Processing complete. Successful: ${successful}, Failed: ${failed}`);
        
        if (successful === 0 && failed > 0) {
            res.status(500).json({ 
                message: 'All evaluations failed',
                results 
            });
            return;
        }

        const setLatestEvalRequest = new SetLatestEvaluationRequest();
        setLatestEvalRequest.setMonitoringRegistryId(monitoring_registry_id);

        const setLatestEvalResponse = await new Promise<SetLatestEvaluationResponse>((resolve, reject) => {
            client.setLatestEvaluation(setLatestEvalRequest, (err: Error, callResponse: SetLatestEvaluationResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (setLatestEvalResponse.getStatusCode() !== 200) {
            res.send(setLatestEvalResponse.getStatusCode());
            return;
        }

        res.status(200).json({ 
            message: 'Evaluation processing complete',
            total: results.length,
            successful,
            failed
        });
        
    } catch (error) {
        console.error('Error during evaluation:', error);
        res.status(500).json({ message: 'Error processing evaluations', error });
    }
});

app.post('/api/evaluations/calculate-score', async (req: Request, res: Response) => {
    const monitoring_registry_id = req.body.monitoring_registry_id;

    try {
        const calculateScoreRequest = new CalculateAccessibilityScoreRequest();
        calculateScoreRequest.setMonitoringRegistryId(monitoring_registry_id);

        const response = await new Promise<CalculateAccessibilityScoreResponse>((resolve, reject) => {
            client.calculateAccessibilityScore(calculateScoreRequest, (err: Error, callResponse: CalculateAccessibilityScoreResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }
    }
    catch (error) {
        console.error('Error calculating the accessibility score:', error);
        res.send(500);
    }

    res.send(200);
});

app.post('/api/evaluations/add-webpages', async (req: Request, res: Response) => {
    const monitoring_registry_id = req.body.monitoring_registry_id;
    const urls = req.body.urls;

    try {
        const add_webpages_request = new AddWebpagesRequest();
        
        add_webpages_request.setMonitoringRegistryId(monitoring_registry_id);
        add_webpages_request.setWebpagesList(urls);

        const response = await new Promise<AddWebpagesResponse>((resolve, reject) => {
            client.addWebpages(add_webpages_request, (err : Error, response : AddWebpagesResponse) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
        
        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }
        
        console.log('Successfully added webpages');
        res.send(200);
    } catch (error) {
        console.error('Error adding webpages:', error);
        res.send(500);
    }
});

app.post('/api/evaluations/set-accessibility-metric-all-websites', async (req: Request, res: Response) => {
    const accessibility_metric = req.body.accessibility_metric;

    try {
        const setMetricRequest = new SetAccessibilityMetricAllWebsitesRequest();
        setMetricRequest.setAccessibilityMetric(accessibility_metric);

        const response = await new Promise<SetAccessibilityMetricAllWebsitesResponse>((resolve, reject) => {
            client.setAccessibilityMetricAllWebsites(setMetricRequest, (err: Error, callResponse: SetAccessibilityMetricAllWebsitesResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }
        
        console.log('Successfully set accessibility metric for all websites');
        res.send(200);
    }
    catch (error) {
        console.error('Error setting accessibility metric:', error);
        res.send(500);
    }
});

app.get('/api/evaluations/monitoring/:id', async (req: Request, res: Response) => {
    const monitoring_id = req.params.id;

    try {
        const getWebpagesRequest = new GetMonitoringRegistryRequest();
        getWebpagesRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetMonitoringRegistryResponse>((resolve, reject) => {
            client.getMonitoringRegistry(getWebpagesRequest, (err: Error, callResponse: GetMonitoringRegistryResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            monitoring_registry_id: response.getId(),
            accessibility_metric: response.getAccessibilityMetric(),
            main_url: response.getMainUrl(),
            domain_name: response.getDomainName(),
            is_mobile: response.getIsMobile(),
            is_landscape: response.getIsLandscape(),
            display_width: response.getDisplayWidth(),
            display_height: response.getDisplayHeight(),
            webpages: response.getWebpagesList(),
            latest_evaluation: response.getLatestEvaluation(),
            accessibility_score: response.getAccessibilityScore()
        });
    } catch (error) {
        console.error('Error fetching monitoring registry:', error);
        res.send(500);
    }
});

app.get('/api/evaluations/monitoring/:id/latest-assertions/by-webpage', async (req: Request, res: Response) => {
    const monitoring_id = req.params.id;

    try {
        const getLatestAssertionsByWebpageRequest = new GetLatestAssertionsByWebpageRequest();
        getLatestAssertionsByWebpageRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetLatestAssertionsByWebpageResponse>((resolve, reject) => {
            client.getLatestAssertionsByWebpage(getLatestAssertionsByWebpageRequest, (err: Error, callResponse: GetLatestAssertionsByWebpageResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }
        
        res.send(convertGetLatestAssertionsResponseToJSON(response).webpages);
    } catch (error) {
        console.error('Error fetching latest assertions:', error);
        res.send(500);
    }
});

app.get('/api/evaluations/monitoring/:id/latest-assertions/by-test', async (req: Request, res: Response) => {
    const monitoring_id = req.params.id;

    try {
        const getLatestAssertionsByTestRequest = new GetLatestAssertionsByTestRequest();
        getLatestAssertionsByTestRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetLatestAssertionsByTestResponse>((resolve, reject) => {
            client.getLatestAssertionsByTest(getLatestAssertionsByTestRequest, (err: Error, callResponse: GetLatestAssertionsByTestResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }
        
        res.send(convertAssertionsList(response.getAssertionsList()));
    } catch (error) {
        console.error('Error fetching latest assertions:', error);
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