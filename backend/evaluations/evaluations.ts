import { Request, Response } from 'express';
import { 
    AddEvaluationRequest, 
    AddEvaluationResponse, 
    AddMonitoringRegistryRequest,
    AddMonitoringRegistryResponse,
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
    GetCurrentWarningsRequest,
    GetCurrentWarningsResponse,
    GetMonitoredWebsitesRequest,
    GetMonitoredWebsitesResponse,
    GetWebsiteScoreRequest,
    GetWebsiteScoreResponse,
    GetIssuesStatsRequest,
    GetIssuesStatsResponse,
    GetWebpageScreenshotRequest,
    GetWebpageScreenshotResponse,
    GetLatestEvaluationsRequest,
    GetLatestEvaluationsResponse,
    GetLatestACTAssertionsRequest,
    GetLatestACTAssertionsResponse,
    GetAssertionResultsRequest,
    GetAssertionResultsResponse,
    GetResultElementsRequest,
    GetResultElementsResponse,
    GetEvaluationHistoryRequest,
    GetEvaluationHistoryResponse,
    GetUserMonitoringRegistriesRequest,
    GetUserMonitoringRegistriesResponse,
    GetWebsiteMonitoringCyclesRequest,
    GetWebsiteMonitoringCyclesResponse,
    SetNewMonitoringCycleRequest,
    SetNewMonitoringCycleResponse,
    GetMonitoredWebpagesRequest,
    GetMonitoredWebpagesResponse,
    GetEvaluationInfoRequest,
    GetEvaluationInfoResponse,
    DeleteWebpageRequest,
    DeleteWebpageResponse
} from './protobuf_library/evaluations_pb';
import * as dotenv from 'dotenv';
import { PuppeteerCrawler, RequestQueue, sleep } from 'crawlee';
import { convertAssertionResults, convertEvaluationHistory, convertLatestACTAssertions, convertLatestEvals, convertMonitoredWebpages, convertMonitoringCycles, convertMonitoringRegistries, convertResultElement } from './convert';
import getModules, { takeWebpageScreenshot } from './process_evals';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';

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
        origin: "*",
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
app.post('/api/monitoring/crawl', (req: Request, res: Response) => { 
    const main_url = req.body.url
    const domain_name = new URL(main_url).hostname;
    const is_mobile = req.body.is_mobile;
    const is_landscape = req.body.is_landscape;
    const display_width = req.body.display_width;
    const display_height = req.body.display_height;
    const website_name = req.body.website_name;
    const user_id = req.body.user_id;

    const puppeteerOptions = {
        headless: true,
        args: ['--no-sandbox']
    };

    async function run(urlToCrawl: string) {
        const urls: string[] = [];
        
        const requestQueue = await RequestQueue.open();
        const seenUrls = new Set<string>();
        
        const crawler = new PuppeteerCrawler({
            requestQueue,
            async requestHandler({ request, page, enqueueLinks, log }) {
                // Get the final URL after any redirects
                const finalUrl = page.url();
                
                // Only add URLs we haven't seen before
                if (!seenUrls.has(finalUrl)) {
                    urls.push(finalUrl);
                    seenUrls.add(finalUrl);
                }
                
                await enqueueLinks({
                    globs: [`http?(s)://${new URL(urlToCrawl).hostname}/**`],
                    requestQueue,
                });
            },
            maxRequestsPerCrawl: 10,
            launchContext: {
                launchOptions: {
                    args: [
                        '--disable-gpu',
                        '--no-sandbox',
                    ],
                    headless: true,
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
                
                monitoring_registry_request.setWebsiteName(website_name);
                monitoring_registry_request.setMainUrl(main_url);
                monitoring_registry_request.setDomainName(domain_name);
                monitoring_registry_request.setIsMobile(is_mobile);
                monitoring_registry_request.setIsLandscape(is_landscape);
                monitoring_registry_request.setDisplayWidth(display_width);
                monitoring_registry_request.setDisplayHeight(display_height);
                monitoring_registry_request.setWebpagesList(urls);
                monitoring_registry_request.setUserId(user_id);

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

app.post('/api/monitoring/set-accessibility-metric', async (req: Request, res: Response) => {
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

app.post('/api/monitoring/:monitoring_id/evaluate/:monitoring_cycle_id/:webpage_id', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;
    const monitoring_cycle_id = req.params.monitoring_cycle_id;
    const webpage_id = req.params.webpage_id;

    try {
        const getEvaluationInfoRequest = new GetEvaluationInfoRequest();
        getEvaluationInfoRequest.setMonitoringRegistryId(Number(monitoring_id));
        getEvaluationInfoRequest.setWebpageId(Number(webpage_id));

        const response = await new Promise<GetEvaluationInfoResponse>((resolve, reject) => {
            client.getEvaluationInfo(getEvaluationInfoRequest, (err: Error, response : GetEvaluationInfoResponse) => {
                if (err) reject(err);
                else resolve(response);
            });
        });

        const screen_width = response.getDisplayWidth();
        const screen_height = response.getDisplayHeight();
        const webpage_url = response.getWebpageUrl();
        const is_mobile = response.getIsMobile();
        const is_landscape = response.getIsLandscape();

        console.log(`Evaluating URL ${webpage_url}`);

        let report = await evaluate(
            webpage_url,
            screen_width,
            screen_height,
            is_mobile,
            is_landscape
        );
        
        if (report[webpage_url] !== undefined) {
            report = report[webpage_url];
            console.log(`Successfully evaluated URL ${webpage_url}`);
        }
        else {
            console.error(`Error evaluating URL ${webpage_url}`);

            return res.status(200).json({ 
                message: 'Evaluation failed',
                url: webpage_url
            });
        }

        const result = await ( async () => {
            try {
                const browser : Browser = await puppeteer.launch({
                    headless: true,
                    args: [
                        '--disable-gpu',
                        '--no-sandbox',
                        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', // Modern UA
                      ],
                    timeout: 5000,
                });
                
                const page : Page = await browser.newPage();

                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

                await page.setViewport({
                    width: screen_width,
                    height: screen_height,
                    deviceScaleFactor: 1,
                });
                
                await page.goto(webpage_url, { waitUntil: 'networkidle0' });

                const screenshot = await takeWebpageScreenshot(webpage_url, screen_width, screen_height);

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
                evaluations_request.setModulesList(await getModules(report, page));
                evaluations_request.setModulesQuantity(2);
                evaluations_request.setMonitoredWebsiteId(Number(monitoring_id));
                evaluations_request.setMonitoringCycleId(Number(monitoring_cycle_id));

                if (screenshot) {
                    evaluations_request.setScreenshot(screenshot);
                }

                const response = await new Promise<AddEvaluationResponse>((resolve, reject) => {
                    client.addEvaluation(evaluations_request, (err: Error, response: AddEvaluationResponse) => {
                        if (err) reject(err);
                        else resolve(response);
                    });
                });
                
                console.log(`Successfully added evaluation for URL ${webpage_url}`);
                return { webpage_url, success: true, statusCode: response.getStatusCode() };
            } catch (error) {
                console.error(`Error adding evaluation for URL ${webpage_url}:`, error);
                return { webpage_url, success: false, error };
            }
        })();
        
        if (!result.success) {
            return res.status(500).json({ 
                message: 'Evaluation failed',
                result 
            });
        }

        const setLatestEvalRequest = new SetLatestEvaluationRequest();
        setLatestEvalRequest.setMonitoringRegistryId(Number(monitoring_id));

        const setLatestEvalResponse = await new Promise<SetLatestEvaluationResponse>((resolve, reject) => {
            client.setLatestEvaluation(setLatestEvalRequest, (err: Error, callResponse: SetLatestEvaluationResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (setLatestEvalResponse.getStatusCode() !== 200) {
            return res.status(setLatestEvalResponse.getStatusCode()).json({
                message: 'Failed to set latest evaluation',
                statusCode: setLatestEvalResponse.getStatusCode()
            });
        }

        return res.status(200).json({ 
            message: 'Evaluation processing complete',
            webpage_url,
            success: true
        });
        
    } catch (error) {
        console.error('Error during evaluation:', error);
        res.status(500).json({ message: 'Error processing evaluations', error });
    }
});

app.post('/api/monitoring/:monitoring_id/calculate-score', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const getScoreRequest = new CalculateAccessibilityScoreRequest();
        getScoreRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<CalculateAccessibilityScoreResponse>((resolve, reject) => {
            client.calculateAccessibilityScore(getScoreRequest, (err: Error, callResponse: CalculateAccessibilityScoreResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        return res.send(response.getStatusCode());
    } catch (error) {
        console.error('Error fetching score:', error);
        return res.send(500);
    }
});

app.post('/api/monitoring/:monitoring_id/add-webpages', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;
    const urls = req.body.urls;

    console.log('Monitoring ID:', monitoring_id);
    console.log('Adding webpages:', urls);

    try {
        const add_webpages_request = new AddWebpagesRequest();
        
        add_webpages_request.setMonitoringRegistryId(Number(monitoring_id));
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

app.post('/api/monitoring/set-accessibility-metric-all-websites', async (req: Request, res: Response) => {
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

app.get('/api/monitoring/monitored-websites', async (req: Request, res: Response) => {
    try {
        const getWebpagesRequest = new GetMonitoredWebsitesRequest();

        const response = await new Promise<GetMonitoredWebsitesResponse>((resolve, reject) => {
            client.getMonitoredWebsites(getWebpagesRequest, (err: Error, callResponse: GetMonitoredWebsitesResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            websites: response.getWebsitesList()
        });
    } catch (error) {
        console.error('Error fetching monitoring registry:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:id/current-warnings', async (req: Request, res: Response) => {
    const monitoring_id = req.params.id;

    try {
        const getCurrentWarningsRequest = new GetCurrentWarningsRequest();
        getCurrentWarningsRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetCurrentWarningsResponse>((resolve, reject) => {
            client.getCurrentWarnings(getCurrentWarningsRequest, (err: Error, callResponse: GetCurrentWarningsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }
        
        res.send(response.getWarningsList());
    } catch (error) {
        console.error('Error fetching current warnings:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:monitoring_id/score', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const getScoreRequest = new GetWebsiteScoreRequest();
        getScoreRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetWebsiteScoreResponse>((resolve, reject) => {
            client.getWebsiteScore(getScoreRequest, (err: Error, callResponse: GetWebsiteScoreResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            score: response.getScore()
        });
    } catch (error) {
        console.error('Error fetching score:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:monitoring_id/issues-stats', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const getIssuesStatsRequest = new GetIssuesStatsRequest();
        getIssuesStatsRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetIssuesStatsResponse>((resolve, reject) => {
            client.getIssuesStats(getIssuesStatsRequest, (err: Error, callResponse: GetIssuesStatsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            passed: response.getPassed(),
            warnings: response.getWarnings(),
            failed: response.getFailed(),
            inapplicable: response.getInapplicable()
        });
    } catch (error) {
        console.error('Error fetching score:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/evaluations/:evaluation_id/webpage-screenshot', async (req: Request, res: Response) => {
    const evaluation_id = req.params.evaluation_id;
    
    try {
        const getWebpageScreenshotRequest = new GetWebpageScreenshotRequest();
        getWebpageScreenshotRequest.setEvaluationId(Number(evaluation_id));

        const response = await new Promise<GetWebpageScreenshotResponse>((resolve, reject) => {
            client.getWebpageScreenshot(getWebpageScreenshotRequest, (err: Error, callResponse: GetWebpageScreenshotResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        const screenshot = response.getScreenshot_asU8();

        if (!screenshot) {
            res.send(404);
            return;
        }

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Length', screenshot.length);
        return res.status(200).send(Buffer.from(screenshot));
    } catch (error) {
        console.error('Error fetching screenshot:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:monitoring_id/latest-evaluations', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id
    
    try {
        const getLatestEvaluationsRequest = new GetLatestEvaluationsRequest();
        getLatestEvaluationsRequest.setMonitoringId(Number(monitoring_id));

        const response = await new Promise<GetLatestEvaluationsResponse>((resolve, reject) => {
            client.getLatestEvaluations(getLatestEvaluationsRequest, (err: Error, callResponse: GetLatestEvaluationsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            evaluations: convertLatestEvals(response.getEvaluationsList())
        });
    } catch (error) {
        console.error('Error fetching latest evaluations:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/evaluations/:evaluation_id/latest-act-assertions', async (req: Request, res: Response) => {
    const evaluation_id = req.params.evaluation_id;
    
    try {
        const wcagLevelFilters = req.query.wcagLevelFilters;
        const outcome = req.query.outcome;

        let wcagLevels: string[] = [];

        if (typeof wcagLevelFilters === 'string' && wcagLevelFilters.trim() !== '') {
            wcagLevels = wcagLevelFilters.split(',');
        }
        
        const getLatestACTAssertionsRequest = new GetLatestACTAssertionsRequest();
        getLatestACTAssertionsRequest.setEvaluationId(Number(evaluation_id));
        getLatestACTAssertionsRequest.setWcaglevelfiltersList(wcagLevels);
        getLatestACTAssertionsRequest.setOutcome(outcome as string);

        const reponse = await new Promise<GetLatestACTAssertionsResponse>((resolve, reject) => {
            client.getLatestACTAssertions(getLatestACTAssertionsRequest, (err: Error, callResponse: GetLatestACTAssertionsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (reponse.getStatusCode() !== 200) {
            res.send(reponse.getStatusCode());
            return;
        }

        res.status(200).json({
            assertions: convertLatestACTAssertions(reponse.getAssertionsList())
        });

    } catch (error) {
        console.error('Error fetching latest assertions:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/assertions/:assertion_id/results', async (req: Request, res: Response) => {
    const assertion_id = req.params.assertion_id

    try {
        const getAssertionResultsRequest = new GetAssertionResultsRequest();
        getAssertionResultsRequest.setAssertionId(Number(assertion_id));

        const response = await new Promise<GetAssertionResultsResponse>((resolve, reject) => {
            client.getAssertionResults(getAssertionResultsRequest, (err: Error, callResponse: GetAssertionResultsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
                });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            results: convertAssertionResults(response.getResultsList())
        });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/issues/:issue_id/elements', async (req: Request, res: Response) => {
    const issue_id = req.params.issue_id

    try {
        const getResultElementsRequest = new GetResultElementsRequest();
        getResultElementsRequest.setIssueId(Number(issue_id));

        const response = await new Promise<GetResultElementsResponse>((resolve, reject) => {
            client.getResultElement(getResultElementsRequest, (err: Error, callResponse: GetResultElementsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            element: convertResultElement(response.getElement())
        });
    } catch (error) {
        console.error('Error fetching elements:', error);
        res.send(500)
    }
});

app.get('/api/monitoring/:monitoring_id/history', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const getEvaluationHistoryRequest = new GetEvaluationHistoryRequest();
        getEvaluationHistoryRequest.setMonitoringId(Number(monitoring_id));

        const response = await new Promise<GetEvaluationHistoryResponse>((resolve, reject) => {
            client.getEvaluationHistory(getEvaluationHistoryRequest, (err: Error, callResponse: GetEvaluationHistoryResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            history: convertEvaluationHistory(response.getHistoryList())
        });

    } catch (error) {
        console.error('Error fetching history:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:user_id', async (req: Request, res: Response) => {
    const user_id = req.params.user_id;

    try {
        const getUserMonitoringRegistries = new GetUserMonitoringRegistriesRequest();
        getUserMonitoringRegistries.setUserId(Number(user_id));

        const response = await new Promise<GetUserMonitoringRegistriesResponse>((resolve, reject) => {
            client.getUserMonitoringRegistries(getUserMonitoringRegistries, (err: Error, callResponse: GetUserMonitoringRegistriesResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            monitoring_registries: convertMonitoringRegistries(response.getMonitoringRegistriesList())
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.send(500);
    }
});

app.post('/api/monitoring/:monitoring_id/monitoring-cycle', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const setNewMonitoringCycle = new SetNewMonitoringCycleRequest();
        setNewMonitoringCycle.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<SetNewMonitoringCycleResponse>((resolve, reject) => {
            client.setNewMonitoringCycle(setNewMonitoringCycle, (err: Error, callResponse: SetNewMonitoringCycleResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            monitoring_cycle_id: response.getMonitoringCycleId()
        });
    } catch (error) {
        console.error('Error setting evaluation cycle:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:monitoring_id/monitoring-cycles', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const getWebsiteMonitoringCycles = new GetWebsiteMonitoringCyclesRequest();
        getWebsiteMonitoringCycles.setMonitoringId(Number(monitoring_id));

        const response = await new Promise<GetWebsiteMonitoringCyclesResponse>((resolve, reject) => {
            client.getWebsiteMonitoringCycles(getWebsiteMonitoringCycles, (err: Error, callResponse: GetWebsiteMonitoringCyclesResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            monitoring_cycles: convertMonitoringCycles(response.getMonitoringCyclesList())
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:monitoring_id/monitored-webpages', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const getWebpagesRequest = new GetMonitoredWebpagesRequest();
        getWebpagesRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetMonitoredWebpagesResponse>((resolve, reject) => {
            client.getMonitoredWebpages(getWebpagesRequest, (err: Error, callResponse: GetMonitoredWebpagesResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            monitored_webpages: convertMonitoredWebpages(response.getMonitoredWebpagesList())
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.send(500);
    }
});

app.delete('/api/monitoring/webpage/:webpage_id', async (req: Request, res: Response) => {
    const webpage_id = req.params.webpage_id;

    try {
        const deleteWebpageRequest = new DeleteWebpageRequest();
        deleteWebpageRequest.setWebpageId(webpage_id);

        const response = await new Promise<DeleteWebpageResponse>((resolve, reject) => {
            client.deleteWebpage(deleteWebpageRequest, (err: Error, callResponse: DeleteWebpageResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            message: 'Successfully deleted webpage'
        });
    } catch (error) {
        console.error('Error deleting webpage:', error);
        res.send(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});