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
    GetWebsiteScoreRequest,
    GetWebsiteScoreResponse,
    GetIssuesStatsRequest,
    GetIssuesStatsResponse,
    GetWebpageScreenshotRequest,
    GetWebpageScreenshotResponse,
    GetLatestEvaluationsRequest,
    GetLatestEvaluationsResponse,
    GetLatestAssertionsRequest,
    GetLatestAssertionsResponse,
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
    DeleteWebpageResponse,
    AddLatestEvaluationsToMonitoringCycleRequest,
    AddLatestEvaluationsToMonitoringCycleResponse,
    GetMonitoringRegistryRequest,
    GetMonitoringRegistryResponse,
    GetMonitoringCycleRequest,
    GetMonitoringCycleResponse,
    GetWebpageComparisonDataRequest,
    GetWebpageComparisonDataResponse,
    GetFailedTestsStatsResponse,
    GetFailedTestsStatsRequest,
    GetIntermediateCyclesRequest,
    GetIntermediateCyclesResponse
} from './protobuf_library/evaluations_pb';
import * as dotenv from 'dotenv';
import { PuppeteerCrawler, RequestQueue } from 'crawlee';
import { convertAssertionResults, convertDate, convertEvaluationHistory, convertFailedTestsStats, convertLatestACTAssertions, convertLatestEvals, convertMonitoredWebpages, convertMonitoringCycle, convertMonitoringCycles, convertMonitoringRegistries, convertMonitoringRegistry, convertResultElement, convertWebpageComparisonData } from './convert';
import getModules, { takeWebpageScreenshot } from './process_evals';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import RedisConnection from './RedisConnection';
import { v4 as uuidv4 } from 'uuid';

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

const redis_ip = process.env.REDIS_HOST;
const redisConnection = new RedisConnection(String(redis_ip), 6379);
const redis = redisConnection.getClient();

const initializeRedis = async (): Promise<void> => {
    try {
        await redisConnection.testConnection();
        console.log('🚀 Redis initialized successfully');
    } catch (error) {
        console.error('💥 Failed to initialize Redis:', error);
    }
};

const startEvaluationJob = async (
    jobId: string,
    monitoring_id: string,
    webpage_ids: string[],
    username?: string,
    password?: string
): Promise<string> => {
    try {
        await redis.hset(`job:${jobId}`, {
            total: webpage_ids.length,
            completed: 0,
            status: 'queued',
            created: Date.now().toString(),
            monitoring_id,
            current_webpage: '',
            error_count: 0
        });
        
        await redis.lpush('evaluation_queue', JSON.stringify({
            jobId,
            monitoring_id,
            webpage_ids,
            username,
            password
        }));

        await updateJobProgress(jobId, 0, `Waiting to process website`, 'queued');
        
        console.log(`📋 Job ${jobId} queued for processing`);
        return jobId;
    } catch (error) {
        console.error('Error creating evaluation job:', error);
        throw error;
    }
};

const updateJobProgress = async (
    jobId: string,
    completed: number,
    currentWebpage: string,
    status: string = 'running'
): Promise<void> => {
    try {
        await redis.hset(`job:${jobId}`, {
            completed: completed.toString(),
            status,
            current_webpage: currentWebpage,
            last_updated: Date.now().toString()
        });
        
        console.log(`📊 Job ${jobId}: ${completed} webpages completed`);
    } catch (error) {
        console.error('Error updating job progress:', error);
    }
};

const markJobCompleted = async (jobId: string, success: boolean = true): Promise<void> => {
    try {
        await redis.hset(`job:${jobId}`, {
            status: success ? 'completed' : 'failed',
            completed_at: Date.now().toString()
        });
        
        console.log(`✅ Job ${jobId} marked as ${success ? 'completed' : 'failed'}`);
    } catch (error) {
        console.error('Error marking job completed:', error);
    }
};

const incrementJobErrors = async (jobId: string): Promise<void> => {
    try {
        await redis.hincrby(`job:${jobId}`, 'error_count', 1);
    } catch (error) {
        console.error('Error incrementing job errors:', error);
    }
};

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

    function isSameDomain(url: string, targetDomain: string): boolean {
        try {
            const urlDomain = new URL(url).hostname;
            return urlDomain === targetDomain || urlDomain === `www.${targetDomain}` || targetDomain === `www.${urlDomain}`;
        } catch {
            return false;
        }
    }

    async function run(urlToCrawl: string) {
        const urls: string[] = [];
        
        const requestQueue = await RequestQueue.open();
        const seenUrls = new Set<string>();
        
        const crawler = new PuppeteerCrawler({
            requestQueue,
            async requestHandler({ request, page, enqueueLinks, log }) {
                const originalUrl = request.url;
                const finalUrl = page.url();
                
                const originalInSameDomain = isSameDomain(originalUrl, domain_name);
                const finalInSameDomain = isSameDomain(finalUrl, domain_name);
                
                if (!seenUrls.has(finalUrl) && originalInSameDomain && finalInSameDomain) {
                    urls.push(finalUrl);
                    seenUrls.add(finalUrl);
                    log.info(`Added URL from same domain: ${originalUrl} -> ${finalUrl}`);
                } else if (originalInSameDomain && !finalInSameDomain) {
                    log.info(`Skipped URL that redirected to different domain: ${originalUrl} -> ${finalUrl}`);
                } else if (!originalInSameDomain) {
                    log.info(`Skipped URL from different domain: ${originalUrl}`);
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

app.post('/api/monitoring/:monitoring_id/evaluate', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;
    const webpage_ids = req.body.webpage_ids;
    const username = req.body.username;
    const password = req.body.password;

    if (!webpage_ids || webpage_ids.length === 0) {
        return res.status(400).json({ message: 'No webpages to evaluate' });
    }

    try {
        const jobId = uuidv4();

        // Start the job and return immediately
        res.status(200).json({ 
            message: 'Evaluation job started',
            jobId,
            total_webpages: webpage_ids.length,
            status: 'queued'
        });

        await startEvaluationJob(jobId,monitoring_id, webpage_ids, username, password);
        
        return;
    } catch (error) {
        console.error('Error starting evaluation job:', error);
        return res.status(500).json({ 
            message: 'Failed to start evaluation job', 
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Job worker process (runs separately or in background)
const processEvaluationJobs = async () => {
    console.log('🚀 Starting evaluation job worker...');
    
    while (true) {
        try {
            
            // Block for up to 10 seconds waiting for a job
            const result = await redis.brpop('evaluation_queue', 10);
            
            
            if (!result) {
                // No job available, continue polling
                continue;
            }
            
            const [, jobData] = result;
            const job = JSON.parse(jobData);
            const { jobId, monitoring_id, webpage_ids, username, password } = job;
            
            console.log(`🔄 Processing job ${jobId} with ${webpage_ids.length} webpages`);
            
            // Update job status to running
            await redis.hset(`job:${jobId}`, 'status', 'running');
            
            let completedCount = 0;
            
            for (const webpage_id of webpage_ids) {
                try {
                    await updateJobProgress(jobId, completedCount, `Processing webpage ${webpage_id}`, 'running');
                    
                    // Your existing evaluation logic here
                    const result = await evaluateWebpage(monitoring_id, webpage_id, username, password);
                    
                    if (result) {
                        if (result.success) {
                            completedCount++;
                            await updateJobProgress(jobId, completedCount, `Completed webpage ${webpage_id}`, 'running');
                        } else {
                            await incrementJobErrors(jobId);
                            console.error(`Failed to evaluate webpage ${webpage_id}:`);
                        }
                    }
                    
                } catch (error) {
                    await incrementJobErrors(jobId);
                    console.error(`Error evaluating webpage ${webpage_id}:`, error);
                }
            }
            
            try {
                const monitoring_cycle_id = await createMonitoringCycle(monitoring_id);
                await addLatestEvalsMonitoringCycle(monitoring_cycle_id);
                await calculateScores(monitoring_id);
                
                await markJobCompleted(jobId, true);
                console.log(`✅ Job ${jobId} completed successfully`);
            } catch (error) {
                await markJobCompleted(jobId, false);
                console.error(`❌ Job ${jobId} failed during post-processing:`, error);
            }
            
        } catch (error) {
            console.error('Error in job worker:', error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

const evaluateWebpage = async (monitoring_id: string, webpage_id: string, username?: string, password?: string) => {
    console.log(`Evaluating webpage with ID: ${webpage_id}`);
    let webpage_url = "";
    
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
        webpage_url = response.getWebpageUrl();
        const is_mobile = response.getIsMobile();
        const is_landscape = response.getIsLandscape();

        const needs_authentication = response.getNeedsAuthentication();
        const username_field_selector = response.getUsernameFieldSelector();
        const password_field_selector = response.getPasswordFieldSelector();
        const login_button_selector = response.getLoginButtonSelector();

        console.log(`Evaluating URL ${webpage_url}`);

        let report = await evaluate(
            webpage_url,
            screen_width,
            screen_height,
            is_mobile,
            is_landscape,
            needs_authentication,
            username_field_selector,
            password_field_selector,
            login_button_selector,
            username,
            password
        );

        const decodedUrl = decodeURIComponent(webpage_url);
        const neededEnconding = webpage_url !== decodedUrl;
        
        if (!needs_authentication && report[decodedUrl] !== undefined) {
            report = report[decodedUrl];
            console.log(`Successfully evaluated URL ${decodedUrl}`);
        }
        else if (needs_authentication && report.customHtml !== undefined) {
            report = report.customHtml;
            console.log(`Successfully evaluated URL ${webpage_url} behind authentication`);
        }
        else {
            console.error(`Error evaluating URL ${webpage_url}`);
            return;
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

                let goto;

                if (needs_authentication && username && password) {
                    goto = await page.goto(webpage_url, { waitUntil: 'networkidle0' });
        
                    await bypassLogin(
                        page, 
                        username_field_selector, 
                        password_field_selector, 
                        login_button_selector,
                        username,
                        password
                    );
                } else {
                    goto = await page.goto(webpage_url, { waitUntil: 'networkidle0' });
                }

                let webpageSizeInKB;

                if (goto && goto.ok()) {
                    const buffer = await goto.buffer();
                    webpageSizeInKB = buffer.length / 1024;
                    console.log(`Webpage size for ${webpage_url}: ${webpageSizeInKB} KB`);
                }
                
                const screenshot = await takeWebpageScreenshot(page, screen_width, screen_height);

                const evaluations_request = new AddEvaluationRequest();
                evaluations_request.setQualwebVersion(report.system.version);
                evaluations_request.setInputUrl(neededEnconding ? encodeURIComponent(!needs_authentication ? (report.system.url?.inputUrl ?? "") : webpage_url) : !needs_authentication ? (report.system.url?.inputUrl ?? "") : webpage_url);
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
                evaluations_request.setWebpageSizeKb(webpageSizeInKB ?? 0);

                if (screenshot) {
                    evaluations_request.setScreenshot(screenshot);
                }

                browser.close(); 

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
            console.log(`Error evaluating URL ${webpage_url}`);
            return { success: false };
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
            console.log(`Error evaluating URL ${webpage_url}`);
            return { success: false };
        }

        console.log(`Successfully evaluated URL ${webpage_url}`);
        return { success: true };
        
    } catch (error) {
        console.log(`Successfully evaluated URL ${webpage_url}`);
        return { success: false };
    }
};

app.get('/api/monitoring/job-progress/:jobId', async (req: Request, res: Response) => {
    const jobId = req.params.jobId;
    
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    });

    const sendUpdate = async () => {
        try {
            const job = await redis.hgetall(`job:${jobId}`);
            if (job && Object.keys(job).length > 0) {
                const jobData = {
                    total: parseInt(job.total) || 0,
                    completed: parseInt(job.completed) || 0,
                    status: job.status || 'unknown',
                    current_webpage: job.current_webpage || '',
                    error_count: parseInt(job.error_count) || 0,
                    created: job.created ? new Date(parseInt(job.created)).toISOString() : null,
                    last_updated: job.last_updated ? new Date(parseInt(job.last_updated)).toISOString() : null
                };
                
                res.write(`data: ${JSON.stringify(jobData)}\n\n`);
                return job.status !== 'completed' && job.status !== 'failed';
            } else {
                res.write(`data: ${JSON.stringify({ error: 'Job not found' })}\n\n`);
                return false;
            }
        } catch (error) {
            console.error('Error fetching job progress:', error);
            res.write(`data: ${JSON.stringify({ error: 'Failed to fetch job progress' })}\n\n`);
            return false;
        }
    };

    // Send initial state
    const shouldContinue = await sendUpdate();
    
    if (shouldContinue) {
        const interval = setInterval(async () => {
            const continues = await sendUpdate();
            if (!continues) {
                clearInterval(interval);
                res.end();
            }
        }, 1000);
        
        req.on('close', () => {
            clearInterval(interval);
            console.log(`Client disconnected from job ${jobId} progress stream`);
        });
    } else {
        res.end();
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
    const needs_authentication = req.body.needs_authentication;
    const username_field_selector = req.body.username_field_selector;
    const password_field_selector = req.body.password_field_selector;
    const login_button_selector = req.body.login_button_selector;

    console.log('Monitoring ID:', monitoring_id);
    console.log('Adding webpages:', urls);

    try {
        const add_webpages_request = new AddWebpagesRequest();
        
        add_webpages_request.setMonitoringRegistryId(Number(monitoring_id));
        add_webpages_request.setWebpagesList(urls);
        add_webpages_request.setNeedsAuthentication(needs_authentication);
        add_webpages_request.setUsernameFieldSelector(username_field_selector);
        add_webpages_request.setPasswordFieldSelector(password_field_selector);
        add_webpages_request.setLoginButtonSelector(login_button_selector);

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

app.get('/api/monitoring/evaluations/:evaluation_id/latest-assertions', async (req: Request, res: Response) => {
    const evaluation_id = req.params.evaluation_id;
    
    try {
        const moduleType = String(req.query.moduleType);
        const wcagGuidelinesFilters = req.query.wcagGuidelinesFilters;
        const wcagLevelFilters = req.query.wcagLevelFilters;
        const outcome = String(req.query.outcome);

        let wcagLevels: string[] = [];
        let wcagGuidelines: string[] = [];

        if (typeof wcagGuidelinesFilters === 'string' && wcagGuidelinesFilters.trim() !== '') {
            wcagGuidelines = wcagGuidelinesFilters.split(',');
        }

        if (typeof wcagLevelFilters === 'string' && wcagLevelFilters.trim() !== '') {
            wcagLevels = wcagLevelFilters.split(',');
        }

        console.log(wcagGuidelines);
        
        const getLatestAssertionsRequest = new GetLatestAssertionsRequest();
        getLatestAssertionsRequest.setEvaluationId(Number(evaluation_id));
        getLatestAssertionsRequest.setModuleType(moduleType);
        getLatestAssertionsRequest.setWcagguidelinesfiltersList(wcagGuidelines);
        getLatestAssertionsRequest.setWcaglevelfiltersList(wcagLevels);
        getLatestAssertionsRequest.setOutcome(outcome);

        const reponse = await new Promise<GetLatestAssertionsResponse>((resolve, reject) => {
            client.getLatestAssertions(getLatestAssertionsRequest, (err: Error, callResponse: GetLatestAssertionsResponse) => {
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

app.post('/api/monitoring/monitoring-cycle/:monitoring_cycle_id/evaluations', async (req: Request, res: Response) => {
    const monitoring_cycle_id = req.params.monitoring_cycle_id;

    try {
        const addLatestEvaluationsToMonitoringCycle = new AddLatestEvaluationsToMonitoringCycleRequest();
        addLatestEvaluationsToMonitoringCycle.setMonitoringCycleId(Number(monitoring_cycle_id));
        
        const response = await new Promise<AddLatestEvaluationsToMonitoringCycleResponse>((resolve, reject) => {
            client.addLatestEvaluationsToMonitoringCycle(addLatestEvaluationsToMonitoringCycle, (err: Error, callResponse: AddLatestEvaluationsToMonitoringCycleResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            message: 'Successfully set latest evaluations'
        });
    } catch (error) {
        console.error('Error setting latest evaluations:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/:monitoring_id/monitoring-registry/', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;

    try {
        const getMonitoringRegistryRequest = new GetMonitoringRegistryRequest();
        getMonitoringRegistryRequest.setMonitoringRegistryId(Number(monitoring_id));

        const response = await new Promise<GetMonitoringRegistryResponse>((resolve, reject) => {
            client.getMonitoringRegistry(getMonitoringRegistryRequest, (err: Error, callResponse: GetMonitoringRegistryResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            monitoring_registry: convertMonitoringRegistry(response)
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/monitoring-cycle/:cycle', async (req: Request, res: Response) => {
    const cycle = req.params.cycle;

    try {
        const getMonitoringCycleRequest = new GetMonitoringCycleRequest();
        getMonitoringCycleRequest.setMonitoringCycleId(Number(cycle));

        const response = await new Promise<GetMonitoringCycleResponse>((resolve, reject) => {
            client.getMonitoringCycle(getMonitoringCycleRequest, (err: Error, callResponse: GetMonitoringCycleResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response.getStatusCode() !== 200) {
            res.send(response.getStatusCode());
            return;
        }

        res.status(200).json({
            monitoring_cycle: convertMonitoringCycle(response)
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.send(500);
    }
});

app.get ('/api/monitoring/webpage/:webpage_id/comparison/:first_cycle/:second_cycle', async (req: Request, res: Response) => {
    const webpage_id = req.params.webpage_id;
    const first_cycle_id = req.params.first_cycle;
    const second_cycle_id = req.params.second_cycle;

    try {
        const getWebpageComparisonDataFirstCycleRequest = new GetWebpageComparisonDataRequest();
        getWebpageComparisonDataFirstCycleRequest.setWebpageId(Number(webpage_id));
        getWebpageComparisonDataFirstCycleRequest.setCycleId(Number(first_cycle_id));

        const response1 = await new Promise<GetWebpageComparisonDataResponse>((resolve, reject) => {
            client.getWebpageComparisonData(getWebpageComparisonDataFirstCycleRequest, (err: Error, callResponse: GetWebpageComparisonDataResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response1.getStatusCode() !== 200) {
            res.send(response1.getStatusCode());
            return;
        }

        const getWebpageComparisonDataSecondCycleRequest = new GetWebpageComparisonDataRequest();
        getWebpageComparisonDataSecondCycleRequest.setWebpageId(Number(webpage_id));
        getWebpageComparisonDataSecondCycleRequest.setCycleId(Number(second_cycle_id));

        const response2 = await new Promise<GetWebpageComparisonDataResponse>((resolve, reject) => {
            client.getWebpageComparisonData(getWebpageComparisonDataSecondCycleRequest, (err: Error, callResponse: GetWebpageComparisonDataResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response2.getStatusCode() !== 200) {
            res.send(response2.getStatusCode());
            return;
        }

        res.status(200).json({
            first_cycle: convertWebpageComparisonData(response1),
            second_cycle: convertWebpageComparisonData(response2)
        });
    } catch (error) {
        console.error('Error fetching comparison data:', error);
        res.send(500);
    }
});

app.get('/api/monitoring/webpage/:webpage_id/comparison/:first_cycle/:second_cycle/chart-data', async (req: Request, res: Response) => {
    const webpage_id = req.params.webpage_id;
    const first_cycle_id = req.params.first_cycle;
    const second_cycle_id = req.params.second_cycle;

    const getIntermediateCyclesRequest = new GetIntermediateCyclesRequest();
    getIntermediateCyclesRequest.setFirstCycleId(Number(first_cycle_id));
    getIntermediateCyclesRequest.setSecondCycleId(Number(second_cycle_id));

    const intermediateCyclesResponse = await new Promise<GetIntermediateCyclesResponse>((resolve, reject) => {
        client.getIntermediateCycles(getIntermediateCyclesRequest, (err: Error, callResponse: GetIntermediateCyclesResponse) => {
            if (err) reject(err);
            else resolve(callResponse);
        });
    });
    
    if (intermediateCyclesResponse.getStatusCode() !== 200) {
        res.send(intermediateCyclesResponse.getStatusCode());
        return;
    }

    const intermediate_cycles = intermediateCyclesResponse.getIntermediateCyclesList();

    console.log('Intermediate cycles:', intermediate_cycles);
    
    try {
        const cycles = await Promise.all(
            intermediate_cycles.map(async (cycle) => {
                
                console.log('Webpage ID:', webpage_id);
                console.log('Processing cycle:', cycle.getId());

                const getWebpageComparisonDataFirstCycleRequest = new GetWebpageComparisonDataRequest();
                getWebpageComparisonDataFirstCycleRequest.setWebpageId(Number(webpage_id));
                getWebpageComparisonDataFirstCycleRequest.setCycleId(Number(cycle.getId()));
                
                const response1 = await new Promise<GetWebpageComparisonDataResponse>((resolve, reject) => {
                    client.getWebpageComparisonData(getWebpageComparisonDataFirstCycleRequest, (err: Error, callResponse: GetWebpageComparisonDataResponse) => {
                        if (err) reject(err);
                        else resolve(callResponse);
                    });
                });
                
                if (response1.getStatusCode() !== 200) {
                    throw new Error(`Request failed with status: ${response1.getStatusCode()}`);
                }
                
                return {
                    cycle_id: cycle.getId(),
                    cycle_date: convertDate(cycle.getCycleDate()),
                    data: convertWebpageComparisonData(response1)
                };
            })
        );
        
        return res.status(200).json({
            graph_data: cycles    
        });
    } catch (error) {
        console.error('Error:', error);
        res.send(500);
        return;
    }
    
});

app.get('/api/monitoring/:monitoring_id/comparison/:first_cycle/:second_cycle/failed-tests-stats', async (req: Request, res: Response) => {
    const monitoring_id = req.params.monitoring_id;
    const first_cycle_id = req.params.first_cycle;
    const second_cycle_id = req.params.second_cycle;

    try {
        const getFailedTestsStatsRequest1 = new GetFailedTestsStatsRequest();
        getFailedTestsStatsRequest1.setCycleId(Number(first_cycle_id));

        const response1 = await new Promise<GetFailedTestsStatsResponse>((resolve, reject) => {
            client.getFailedTestsStats(getFailedTestsStatsRequest1, (err: Error, callResponse: GetFailedTestsStatsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response1.getStatusCode() !== 200) {
            res.send(response1.getStatusCode());
            return;
        }

        const getFailedTestsStatsRequest2 = new GetFailedTestsStatsRequest();
        getFailedTestsStatsRequest2.setCycleId(Number(second_cycle_id));

        const response2 = await new Promise<GetFailedTestsStatsResponse>((resolve, reject) => {
            client.getFailedTestsStats(getFailedTestsStatsRequest2, (err: Error, callResponse: GetFailedTestsStatsResponse) => {
                if (err) reject(err);
                else resolve(callResponse);
            });
        });

        if (response2.getStatusCode() !== 200) {
            res.send(response2.getStatusCode());
            return;
        }

        res.status(200).json({
            first_cycle_failed_tests: convertFailedTestsStats(response1),
            second_cycle_failed_tests: convertFailedTestsStats(response2)
        });
    } catch (error) {
        console.error('Error fetching failed tests stats:', error);
        res.send(500);
    }
});

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);

    await initializeRedis();
    
    console.log('🚀 Starting job worker...');
    processEvaluationJobs().catch(error => {
        console.error('Job worker crashed:', error);
        setTimeout(() => {
            console.log('🔄 Restarting job worker...');
            processEvaluationJobs();
        }, 5000);
    });
});

async function bypassLogin(
    page: Page, 
    usernameFieldSelector: string, 
    passwordFieldSelector: string, 
    loginButtonSelector: string, 
    username: string, 
    password: string
) {
    // Fill and submit login form
    await page.evaluate((usernameFieldSelector, passwordFieldSelector, loginButtonSelector, username, password) => {
        const usernameField = document.querySelector(usernameFieldSelector) as HTMLInputElement;
        const passwordField = document.querySelector(passwordFieldSelector) as HTMLInputElement;
        const loginButton = document.querySelector(loginButtonSelector) as HTMLButtonElement;

        if (usernameField && passwordField && loginButton) {
            usernameField.value = username;
            passwordField.value = password;
            loginButton.click();
        } else {
            throw new Error('Could not find required login elements');
        }
    }, usernameFieldSelector, passwordFieldSelector, loginButtonSelector, username, password);

    // Wait for navigation to complete (login successful)
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    return { success: true, message: "Login completed and navigated to protected page" };
}

const createMonitoringCycle = async (
    monitoring_registry_id : string
) => {
    const response = await fetch(`http://localhost:8081/api/monitoring/${monitoring_registry_id}/monitoring-cycle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error('It was not possible to create a monitoring cycle.');
    }

    const data = await response.json();

    return data.monitoring_cycle_id;
}

const addLatestEvalsMonitoringCycle = async (
    monitoring_cycle_id : string
) => {
    const response = await fetch(`http://localhost:8081/api/monitoring/monitoring-cycle/${monitoring_cycle_id}/evaluations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error('It was not possible to set the evaluations.');
    }
}

const calculateScores = async (
    monitoring_id : string
) => {
    const response = await fetch(`http://localhost:8081/api/monitoring/${monitoring_id}/calculate-score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error('It was not possible to calculate the scores.');
    }
}

