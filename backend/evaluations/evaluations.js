"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var evaluations_pb_1 = require("./protobuf_library/evaluations_pb");
var dotenv = require("dotenv");
var crawlee_1 = require("crawlee");
var convert_1 = require("./convert");
var process_evals_1 = require("./process_evals");
var puppeteer_1 = require("puppeteer");
var RedisConnection_1 = require("./RedisConnection");
var uuid_1 = require("uuid");
dotenv.config();
// Access environment variables
var evaluations_database_ip = process.env.EVALUATIONS_DATABASE_HOST;
var EvaluationsClient = require('./protobuf_library/evaluations_grpc_pb.js').EvaluationsClient;
var grpc = require('@grpc/grpc-js');
var express = require('express');
var cors = require('cors');
var evaluate = require('./evaluate');
var app = express();
var port = 8081;
app.use(express.json());
app.use(cors({
    origin: "*",
}));
var client = new EvaluationsClient(evaluations_database_ip + ':6000', grpc.credentials.createInsecure(), {
    "grpc.max_receive_message_length": 100 * 1024 * 1024,
    "grpc.max_send_message_length": 100 * 1024 * 1024
});
var redis_ip = process.env.REDIS_HOST;
var redisConnection = new RedisConnection_1.default(String(redis_ip), 6379);
var redis = redisConnection.getClient();
var initializeRedis = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, redisConnection.testConnection()];
            case 1:
                _a.sent();
                console.log('🚀 Redis initialized successfully');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('💥 Failed to initialize Redis:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var startEvaluationJob = function (monitoring_id, webpage_ids, username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobId = (0, uuid_1.v4)();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, redis.hset("job:".concat(jobId), {
                        total: webpage_ids.length,
                        completed: 0,
                        status: 'queued',
                        created: Date.now().toString(),
                        monitoring_id: monitoring_id,
                        current_webpage: '',
                        error_count: 0
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, redis.lpush('evaluation_queue', JSON.stringify({
                        jobId: jobId,
                        monitoring_id: monitoring_id,
                        webpage_ids: webpage_ids,
                        username: username,
                        password: password
                    }))];
            case 3:
                _a.sent();
                console.log("\uD83D\uDCCB Job ".concat(jobId, " queued for processing"));
                return [2 /*return*/, jobId];
            case 4:
                error_2 = _a.sent();
                console.error('Error creating evaluation job:', error_2);
                throw error_2;
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateJobProgress = function (jobId_1, completed_1, currentWebpage_1) {
    var args_1 = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args_1[_i - 3] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([jobId_1, completed_1, currentWebpage_1], args_1, true), void 0, function (jobId, completed, currentWebpage, status) {
        var error_3;
        if (status === void 0) { status = 'running'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, redis.hset("job:".concat(jobId), {
                            completed: completed.toString(),
                            status: status,
                            current_webpage: currentWebpage,
                            last_updated: Date.now().toString()
                        })];
                case 1:
                    _a.sent();
                    console.log("\uD83D\uDCCA Job ".concat(jobId, ": ").concat(completed, " webpages completed"));
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error updating job progress:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var markJobCompleted = function (jobId_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([jobId_1], args_1, true), void 0, function (jobId, success) {
        var error_4;
        if (success === void 0) { success = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, redis.hset("job:".concat(jobId), {
                            status: success ? 'completed' : 'failed',
                            completed_at: Date.now().toString()
                        })];
                case 1:
                    _a.sent();
                    console.log("\u2705 Job ".concat(jobId, " marked as ").concat(success ? 'completed' : 'failed'));
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error('Error marking job completed:', error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var incrementJobErrors = function (jobId) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, redis.hincrby("job:".concat(jobId), 'error_count', 1)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error incrementing job errors:', error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// This endpoint executes the crawling of the URLs in the domain of the input URL
app.post('/api/monitoring/crawl', function (req, res) {
    var main_url = req.body.url;
    var domain_name = new URL(main_url).hostname;
    var is_mobile = req.body.is_mobile;
    var is_landscape = req.body.is_landscape;
    var display_width = req.body.display_width;
    var display_height = req.body.display_height;
    var website_name = req.body.website_name;
    var user_id = req.body.user_id;
    function isSameDomain(url, targetDomain) {
        try {
            var urlDomain = new URL(url).hostname;
            return urlDomain === targetDomain || urlDomain === "www.".concat(targetDomain) || targetDomain === "www.".concat(urlDomain);
        }
        catch (_a) {
            return false;
        }
    }
    function run(urlToCrawl) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, requestQueue, seenUrls, crawler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urls = [];
                        return [4 /*yield*/, crawlee_1.RequestQueue.open()];
                    case 1:
                        requestQueue = _a.sent();
                        seenUrls = new Set();
                        crawler = new crawlee_1.PuppeteerCrawler({
                            requestQueue: requestQueue,
                            requestHandler: function (_a) {
                                return __awaiter(this, arguments, void 0, function (_b) {
                                    var originalUrl, finalUrl, originalInSameDomain, finalInSameDomain;
                                    var request = _b.request, page = _b.page, enqueueLinks = _b.enqueueLinks, log = _b.log;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                originalUrl = request.url;
                                                finalUrl = page.url();
                                                originalInSameDomain = isSameDomain(originalUrl, domain_name);
                                                finalInSameDomain = isSameDomain(finalUrl, domain_name);
                                                if (!seenUrls.has(finalUrl) && originalInSameDomain && finalInSameDomain) {
                                                    urls.push(finalUrl);
                                                    seenUrls.add(finalUrl);
                                                    log.info("Added URL from same domain: ".concat(originalUrl, " -> ").concat(finalUrl));
                                                }
                                                else if (originalInSameDomain && !finalInSameDomain) {
                                                    log.info("Skipped URL that redirected to different domain: ".concat(originalUrl, " -> ").concat(finalUrl));
                                                }
                                                else if (!originalInSameDomain) {
                                                    log.info("Skipped URL from different domain: ".concat(originalUrl));
                                                }
                                                return [4 /*yield*/, enqueueLinks({
                                                        globs: ["http?(s)://".concat(new URL(urlToCrawl).hostname, "/**")],
                                                        requestQueue: requestQueue,
                                                    })];
                                            case 1:
                                                _c.sent();
                                                return [2 /*return*/];
                                        }
                                    });
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
                        return [4 /*yield*/, crawler.addRequests([urlToCrawl])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, , 5, 8]);
                        return [4 /*yield*/, crawler.run()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, crawler.teardown()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, requestQueue.drop()];
                    case 7:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, urls];
                }
            });
        });
    }
    run(main_url)
        .then(function (urls) { return __awaiter(void 0, void 0, void 0, function () {
        var monitoring_registry_request_1, response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    monitoring_registry_request_1 = new evaluations_pb_1.AddMonitoringRegistryRequest();
                    monitoring_registry_request_1.setWebsiteName(website_name);
                    monitoring_registry_request_1.setMainUrl(main_url);
                    monitoring_registry_request_1.setDomainName(domain_name);
                    monitoring_registry_request_1.setIsMobile(is_mobile);
                    monitoring_registry_request_1.setIsLandscape(is_landscape);
                    monitoring_registry_request_1.setDisplayWidth(display_width);
                    monitoring_registry_request_1.setDisplayHeight(display_height);
                    monitoring_registry_request_1.setWebpagesList(urls);
                    monitoring_registry_request_1.setUserId(user_id);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            client.addMonitoringRegistry(monitoring_registry_request_1, function (err, response) {
                                if (err)
                                    reject(err);
                                else
                                    resolve(response);
                            });
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Successfully added monitoring registry');
                    res.send({
                        status: response.getStatusCode(),
                        monitoring_registry_id: response.getMonitoringRegistryId()
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error('Error adding monitoring registry:', error_6);
                    res.send(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }).catch(function (error) {
        console.error('Error during crawling:', error);
        res.send(500);
    });
});
app.post('/api/monitoring/set-accessibility-metric', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_registry_id, accessibility_metric, accessibility_metric_request_1, response, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_registry_id = req.body.monitoring_registry_id;
                accessibility_metric = req.body.accessibility_metric;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                accessibility_metric_request_1 = new evaluations_pb_1.SetAccessibilityMetricRequest();
                accessibility_metric_request_1.setMonitoringRegistryId(monitoring_registry_id);
                accessibility_metric_request_1.setAccessibilityMetric(accessibility_metric);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.setAccessibilityMetric(accessibility_metric_request_1, function (err, response) {
                            if (err)
                                reject(err);
                            else
                                resolve(response);
                        });
                    })];
            case 2:
                response = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error('Error setting accessibility metric:', error_7);
                res.send(500);
                return [3 /*break*/, 4];
            case 4:
                res.send(200);
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/evaluate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, webpage_ids, username, password, jobId, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                webpage_ids = req.body.webpage_ids;
                username = req.body.username;
                password = req.body.password;
                if (!webpage_ids || webpage_ids.length === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'No webpages to evaluate' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, startEvaluationJob(monitoring_id, webpage_ids, username, password)];
            case 2:
                jobId = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'Evaluation job started',
                        jobId: jobId,
                        total_webpages: webpage_ids.length,
                        status: 'queued'
                    })];
            case 3:
                error_8 = _a.sent();
                console.error('Error starting evaluation job:', error_8);
                return [2 /*return*/, res.status(500).json({
                        message: 'Failed to start evaluation job',
                        error: error_8 instanceof Error ? error_8.message : 'Unknown error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Job worker process (runs separately or in background)
var processEvaluationJobs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, jobData, job, jobId, monitoring_id, webpage_ids, username, password, completedCount, _i, webpage_ids_1, webpage_id, result_1, error_9, monitoring_cycle_id, error_10, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('🚀 Starting evaluation job worker...');
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 27];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 24, , 26]);
                return [4 /*yield*/, redis.brpop('evaluation_queue', 10)];
            case 3:
                result = _a.sent();
                if (!result) {
                    // No job available, continue polling
                    return [3 /*break*/, 1];
                }
                jobData = result[1];
                job = JSON.parse(jobData);
                jobId = job.jobId, monitoring_id = job.monitoring_id, webpage_ids = job.webpage_ids, username = job.username, password = job.password;
                console.log("\uD83D\uDD04 Processing job ".concat(jobId, " with ").concat(webpage_ids.length, " webpages"));
                // Update job status to running
                return [4 /*yield*/, redis.hset("job:".concat(jobId), 'status', 'running')];
            case 4:
                // Update job status to running
                _a.sent();
                completedCount = 0;
                _i = 0, webpage_ids_1 = webpage_ids;
                _a.label = 5;
            case 5:
                if (!(_i < webpage_ids_1.length)) return [3 /*break*/, 16];
                webpage_id = webpage_ids_1[_i];
                _a.label = 6;
            case 6:
                _a.trys.push([6, 13, , 15]);
                return [4 /*yield*/, updateJobProgress(jobId, completedCount, "Processing webpage ".concat(webpage_id), 'running')];
            case 7:
                _a.sent();
                return [4 /*yield*/, evaluateWebpage(monitoring_id, webpage_id, username, password)];
            case 8:
                result_1 = _a.sent();
                if (!result_1) return [3 /*break*/, 12];
                if (!result_1.success) return [3 /*break*/, 10];
                completedCount++;
                return [4 /*yield*/, updateJobProgress(jobId, completedCount, "Completed webpage ".concat(webpage_id), 'running')];
            case 9:
                _a.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, incrementJobErrors(jobId)];
            case 11:
                _a.sent();
                console.error("Failed to evaluate webpage ".concat(webpage_id, ":"));
                _a.label = 12;
            case 12: return [3 /*break*/, 15];
            case 13:
                error_9 = _a.sent();
                return [4 /*yield*/, incrementJobErrors(jobId)];
            case 14:
                _a.sent();
                console.error("Error evaluating webpage ".concat(webpage_id, ":"), error_9);
                return [3 /*break*/, 15];
            case 15:
                _i++;
                return [3 /*break*/, 5];
            case 16:
                _a.trys.push([16, 21, , 23]);
                return [4 /*yield*/, createMonitoringCycle(monitoring_id)];
            case 17:
                monitoring_cycle_id = _a.sent();
                return [4 /*yield*/, addLatestEvalsMonitoringCycle(monitoring_cycle_id)];
            case 18:
                _a.sent();
                return [4 /*yield*/, calculateScores(monitoring_id)];
            case 19:
                _a.sent();
                return [4 /*yield*/, markJobCompleted(jobId, true)];
            case 20:
                _a.sent();
                console.log("\u2705 Job ".concat(jobId, " completed successfully"));
                return [3 /*break*/, 23];
            case 21:
                error_10 = _a.sent();
                return [4 /*yield*/, markJobCompleted(jobId, false)];
            case 22:
                _a.sent();
                console.error("\u274C Job ".concat(jobId, " failed during post-processing:"), error_10);
                return [3 /*break*/, 23];
            case 23: return [3 /*break*/, 26];
            case 24:
                error_11 = _a.sent();
                console.error('Error in job worker:', error_11);
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
            case 25:
                _a.sent();
                return [3 /*break*/, 26];
            case 26: return [3 /*break*/, 1];
            case 27: return [2 /*return*/];
        }
    });
}); };
var evaluateWebpage = function (monitoring_id, webpage_id, username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var webpage_url, getEvaluationInfoRequest_1, response, screen_width_1, screen_height_1, is_mobile, is_landscape, needs_authentication_1, username_field_selector_1, password_field_selector_1, login_button_selector_1, browser_1, page, report_1, decodedUrl, neededEnconding_1, result, setLatestEvalRequest_1, setLatestEvalResponse, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Evaluating webpage with ID: ".concat(webpage_id));
                webpage_url = "";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                getEvaluationInfoRequest_1 = new evaluations_pb_1.GetEvaluationInfoRequest();
                getEvaluationInfoRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                getEvaluationInfoRequest_1.setWebpageId(Number(webpage_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getEvaluationInfo(getEvaluationInfoRequest_1, function (err, response) {
                            if (err)
                                reject(err);
                            else
                                resolve(response);
                        });
                    })];
            case 2:
                response = _a.sent();
                screen_width_1 = response.getDisplayWidth();
                screen_height_1 = response.getDisplayHeight();
                webpage_url = response.getWebpageUrl();
                is_mobile = response.getIsMobile();
                is_landscape = response.getIsLandscape();
                needs_authentication_1 = response.getNeedsAuthentication();
                username_field_selector_1 = response.getUsernameFieldSelector();
                password_field_selector_1 = response.getPasswordFieldSelector();
                login_button_selector_1 = response.getLoginButtonSelector();
                return [4 /*yield*/, puppeteer_1.default.launch({
                        headless: true,
                        args: [
                            '--disable-gpu',
                            '--no-sandbox',
                            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', // Modern UA
                        ],
                        timeout: 5000,
                    })];
            case 3:
                browser_1 = _a.sent();
                return [4 /*yield*/, browser_1.newPage()];
            case 4:
                page = _a.sent();
                return [4 /*yield*/, page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.setViewport({
                        width: screen_width_1,
                        height: screen_height_1,
                        deviceScaleFactor: 1,
                    })];
            case 6:
                _a.sent();
                console.log("Evaluating URL ".concat(webpage_url));
                return [4 /*yield*/, evaluate(webpage_url, screen_width_1, screen_height_1, is_mobile, is_landscape, needs_authentication_1, username_field_selector_1, password_field_selector_1, login_button_selector_1, username, password)];
            case 7:
                report_1 = _a.sent();
                decodedUrl = decodeURIComponent(webpage_url);
                neededEnconding_1 = webpage_url !== decodedUrl;
                if (!needs_authentication_1 && report_1[decodedUrl] !== undefined) {
                    report_1 = report_1[decodedUrl];
                    console.log("Successfully evaluated URL ".concat(decodedUrl));
                }
                else if (needs_authentication_1 && report_1.customHtml !== undefined) {
                    report_1 = report_1.customHtml;
                    console.log("Successfully evaluated URL ".concat(webpage_url, " behind authentication"));
                }
                else {
                    console.error("Error evaluating URL ".concat(webpage_url));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var browser_2, page_1, goto, webpageSizeInKB, buffer, screenshot, evaluations_request_1, _a, _b, response_1, error_13;
                        var _c, _d, _e, _f, _g, _h, _j, _k;
                        return __generator(this, function (_l) {
                            switch (_l.label) {
                                case 0:
                                    _l.trys.push([0, 15, , 16]);
                                    return [4 /*yield*/, puppeteer_1.default.launch({
                                            headless: true,
                                            args: [
                                                '--disable-gpu',
                                                '--no-sandbox',
                                                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', // Modern UA
                                            ],
                                            timeout: 5000,
                                        })];
                                case 1:
                                    browser_2 = _l.sent();
                                    return [4 /*yield*/, browser_2.newPage()];
                                case 2:
                                    page_1 = _l.sent();
                                    return [4 /*yield*/, page_1.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')];
                                case 3:
                                    _l.sent();
                                    return [4 /*yield*/, page_1.setViewport({
                                            width: screen_width_1,
                                            height: screen_height_1,
                                            deviceScaleFactor: 1,
                                        })];
                                case 4:
                                    _l.sent();
                                    goto = void 0;
                                    if (!(needs_authentication_1 && username && password)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, page_1.goto(webpage_url, { waitUntil: 'networkidle0' })];
                                case 5:
                                    goto = _l.sent();
                                    return [4 /*yield*/, bypassLogin(page_1, username_field_selector_1, password_field_selector_1, login_button_selector_1, username, password)];
                                case 6:
                                    _l.sent();
                                    return [3 /*break*/, 9];
                                case 7: return [4 /*yield*/, page_1.goto(webpage_url, { waitUntil: 'networkidle0' })];
                                case 8:
                                    goto = _l.sent();
                                    _l.label = 9;
                                case 9:
                                    webpageSizeInKB = void 0;
                                    if (!(goto && goto.ok())) return [3 /*break*/, 11];
                                    return [4 /*yield*/, goto.buffer()];
                                case 10:
                                    buffer = _l.sent();
                                    webpageSizeInKB = buffer.length / 1024;
                                    console.log("Webpage size for ".concat(webpage_url, ": ").concat(webpageSizeInKB, " KB"));
                                    _l.label = 11;
                                case 11: return [4 /*yield*/, (0, process_evals_1.takeWebpageScreenshot)(page_1, screen_width_1, screen_height_1)];
                                case 12:
                                    screenshot = _l.sent();
                                    evaluations_request_1 = new evaluations_pb_1.AddEvaluationRequest();
                                    evaluations_request_1.setQualwebVersion(report_1.system.version);
                                    evaluations_request_1.setInputUrl(neededEnconding_1 ? encodeURIComponent(!needs_authentication_1 ? ((_d = (_c = report_1.system.url) === null || _c === void 0 ? void 0 : _c.inputUrl) !== null && _d !== void 0 ? _d : "") : webpage_url) : !needs_authentication_1 ? ((_f = (_e = report_1.system.url) === null || _e === void 0 ? void 0 : _e.inputUrl) !== null && _f !== void 0 ? _f : "") : webpage_url);
                                    evaluations_request_1.setCompleteUrl((_h = (_g = report_1.system.url) === null || _g === void 0 ? void 0 : _g.completeUrl) !== null && _h !== void 0 ? _h : "");
                                    evaluations_request_1.setDom(report_1.system.page.dom.html);
                                    evaluations_request_1.setTitle((_j = report_1.system.page.dom.title) !== null && _j !== void 0 ? _j : "");
                                    evaluations_request_1.setElementCount((_k = report_1.system.page.dom.elementCount) !== null && _k !== void 0 ? _k : 0);
                                    evaluations_request_1.setPassed(report_1.metadata.passed);
                                    evaluations_request_1.setWarning(report_1.metadata.warning);
                                    evaluations_request_1.setFailed(report_1.metadata.failed);
                                    evaluations_request_1.setInapplicable(report_1.metadata.inapplicable);
                                    _b = (_a = evaluations_request_1).setModulesList;
                                    return [4 /*yield*/, (0, process_evals_1.default)(report_1, page_1)];
                                case 13:
                                    _b.apply(_a, [_l.sent()]);
                                    evaluations_request_1.setModulesQuantity(2);
                                    evaluations_request_1.setMonitoredWebsiteId(Number(monitoring_id));
                                    evaluations_request_1.setWebpageSizeKb(webpageSizeInKB !== null && webpageSizeInKB !== void 0 ? webpageSizeInKB : 0);
                                    if (screenshot) {
                                        evaluations_request_1.setScreenshot(screenshot);
                                    }
                                    browser_2.close();
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            client.addEvaluation(evaluations_request_1, function (err, response) {
                                                if (err)
                                                    reject(err);
                                                else
                                                    resolve(response);
                                            });
                                        })];
                                case 14:
                                    response_1 = _l.sent();
                                    console.log("Successfully added evaluation for URL ".concat(webpage_url));
                                    return [2 /*return*/, { webpage_url: webpage_url, success: true, statusCode: response_1.getStatusCode() }];
                                case 15:
                                    error_13 = _l.sent();
                                    console.error("Error adding evaluation for URL ".concat(webpage_url, ":"), error_13);
                                    return [2 /*return*/, { webpage_url: webpage_url, success: false, error: error_13 }];
                                case 16: return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 8:
                result = _a.sent();
                if (!result.success) {
                    console.log("Error evaluating URL ".concat(webpage_url));
                    return [2 /*return*/, { success: false }];
                }
                setLatestEvalRequest_1 = new evaluations_pb_1.SetLatestEvaluationRequest();
                setLatestEvalRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.setLatestEvaluation(setLatestEvalRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 9:
                setLatestEvalResponse = _a.sent();
                if (setLatestEvalResponse.getStatusCode() !== 200) {
                    console.log("Error evaluating URL ".concat(webpage_url));
                    return [2 /*return*/, { success: false }];
                }
                console.log("Successfully evaluated URL ".concat(webpage_url));
                return [2 /*return*/, { success: true }];
            case 10:
                error_12 = _a.sent();
                console.log("Successfully evaluated URL ".concat(webpage_url));
                return [2 /*return*/, { success: false }];
            case 11: return [2 /*return*/];
        }
    });
}); };
app.get('/api/monitoring/job-progress/:jobId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, sendUpdate, shouldContinue, interval_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobId = req.params.jobId;
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Cache-Control'
                });
                sendUpdate = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var job, jobData, error_14;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, redis.hgetall("job:".concat(jobId))];
                            case 1:
                                job = _a.sent();
                                if (job && Object.keys(job).length > 0) {
                                    jobData = {
                                        total: parseInt(job.total) || 0,
                                        completed: parseInt(job.completed) || 0,
                                        status: job.status || 'unknown',
                                        current_webpage: job.current_webpage || '',
                                        error_count: parseInt(job.error_count) || 0,
                                        created: job.created ? new Date(parseInt(job.created)).toISOString() : null,
                                        last_updated: job.last_updated ? new Date(parseInt(job.last_updated)).toISOString() : null
                                    };
                                    res.write("data: ".concat(JSON.stringify(jobData), "\n\n"));
                                    return [2 /*return*/, job.status !== 'completed' && job.status !== 'failed'];
                                }
                                else {
                                    res.write("data: ".concat(JSON.stringify({ error: 'Job not found' }), "\n\n"));
                                    return [2 /*return*/, false];
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_14 = _a.sent();
                                console.error('Error fetching job progress:', error_14);
                                res.write("data: ".concat(JSON.stringify({ error: 'Failed to fetch job progress' }), "\n\n"));
                                return [2 /*return*/, false];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, sendUpdate()];
            case 1:
                shouldContinue = _a.sent();
                if (shouldContinue) {
                    interval_1 = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var continues;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sendUpdate()];
                                case 1:
                                    continues = _a.sent();
                                    if (!continues) {
                                        clearInterval(interval_1);
                                        res.end();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    req.on('close', function () {
                        clearInterval(interval_1);
                        console.log("Client disconnected from job ".concat(jobId, " progress stream"));
                    });
                }
                else {
                    res.end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/calculate-score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getScoreRequest_1, response, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getScoreRequest_1 = new evaluations_pb_1.CalculateAccessibilityScoreRequest();
                getScoreRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.calculateAccessibilityScore(getScoreRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, res.send(response.getStatusCode())];
            case 3:
                error_15 = _a.sent();
                console.error('Error fetching score:', error_15);
                return [2 /*return*/, res.send(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/add-webpages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, urls, needs_authentication, username_field_selector, password_field_selector, login_button_selector, add_webpages_request_1, response, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                urls = req.body.urls;
                needs_authentication = req.body.needs_authentication;
                username_field_selector = req.body.username_field_selector;
                password_field_selector = req.body.password_field_selector;
                login_button_selector = req.body.login_button_selector;
                console.log('Monitoring ID:', monitoring_id);
                console.log('Adding webpages:', urls);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                add_webpages_request_1 = new evaluations_pb_1.AddWebpagesRequest();
                add_webpages_request_1.setMonitoringRegistryId(Number(monitoring_id));
                add_webpages_request_1.setWebpagesList(urls);
                add_webpages_request_1.setNeedsAuthentication(needs_authentication);
                add_webpages_request_1.setUsernameFieldSelector(username_field_selector);
                add_webpages_request_1.setPasswordFieldSelector(password_field_selector);
                add_webpages_request_1.setLoginButtonSelector(login_button_selector);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.addWebpages(add_webpages_request_1, function (err, response) {
                            if (err)
                                reject(err);
                            else
                                resolve(response);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                console.log('Successfully added webpages');
                res.send(200);
                return [3 /*break*/, 4];
            case 3:
                error_16 = _a.sent();
                console.error('Error adding webpages:', error_16);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/set-accessibility-metric-all-websites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessibility_metric, setMetricRequest_1, response, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessibility_metric = req.body.accessibility_metric;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                setMetricRequest_1 = new evaluations_pb_1.SetAccessibilityMetricAllWebsitesRequest();
                setMetricRequest_1.setAccessibilityMetric(accessibility_metric);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.setAccessibilityMetricAllWebsites(setMetricRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                console.log('Successfully set accessibility metric for all websites');
                res.send(200);
                return [3 /*break*/, 4];
            case 3:
                error_17 = _a.sent();
                console.error('Error setting accessibility metric:', error_17);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:id/current-warnings', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getCurrentWarningsRequest_1, response, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getCurrentWarningsRequest_1 = new evaluations_pb_1.GetCurrentWarningsRequest();
                getCurrentWarningsRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getCurrentWarnings(getCurrentWarningsRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.send(response.getWarningsList());
                return [3 /*break*/, 4];
            case 3:
                error_18 = _a.sent();
                console.error('Error fetching current warnings:', error_18);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getScoreRequest_2, response, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getScoreRequest_2 = new evaluations_pb_1.GetWebsiteScoreRequest();
                getScoreRequest_2.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getWebsiteScore(getScoreRequest_2, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    score: response.getScore()
                });
                return [3 /*break*/, 4];
            case 3:
                error_19 = _a.sent();
                console.error('Error fetching score:', error_19);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/issues-stats', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getIssuesStatsRequest_1, response, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getIssuesStatsRequest_1 = new evaluations_pb_1.GetIssuesStatsRequest();
                getIssuesStatsRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getIssuesStats(getIssuesStatsRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    passed: response.getPassed(),
                    warnings: response.getWarnings(),
                    failed: response.getFailed(),
                    inapplicable: response.getInapplicable()
                });
                return [3 /*break*/, 4];
            case 3:
                error_20 = _a.sent();
                console.error('Error fetching score:', error_20);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/evaluations/:evaluation_id/webpage-screenshot', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var evaluation_id, getWebpageScreenshotRequest_1, response, screenshot, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                evaluation_id = req.params.evaluation_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getWebpageScreenshotRequest_1 = new evaluations_pb_1.GetWebpageScreenshotRequest();
                getWebpageScreenshotRequest_1.setEvaluationId(Number(evaluation_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getWebpageScreenshot(getWebpageScreenshotRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                screenshot = response.getScreenshot_asU8();
                if (!screenshot) {
                    res.send(404);
                    return [2 /*return*/];
                }
                res.setHeader('Content-Type', 'image/png');
                res.setHeader('Content-Length', screenshot.length);
                return [2 /*return*/, res.status(200).send(Buffer.from(screenshot))];
            case 3:
                error_21 = _a.sent();
                console.error('Error fetching screenshot:', error_21);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/latest-evaluations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getLatestEvaluationsRequest_1, response, error_22;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getLatestEvaluationsRequest_1 = new evaluations_pb_1.GetLatestEvaluationsRequest();
                getLatestEvaluationsRequest_1.setMonitoringId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getLatestEvaluations(getLatestEvaluationsRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    evaluations: (0, convert_1.convertLatestEvals)(response.getEvaluationsList())
                });
                return [3 /*break*/, 4];
            case 3:
                error_22 = _a.sent();
                console.error('Error fetching latest evaluations:', error_22);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/evaluations/:evaluation_id/latest-assertions', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var evaluation_id, moduleType, wcagGuidelinesFilters, wcagLevelFilters, outcome, wcagLevels, wcagGuidelines, getLatestAssertionsRequest_1, reponse, error_23;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                evaluation_id = req.params.evaluation_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                moduleType = String(req.query.moduleType);
                wcagGuidelinesFilters = req.query.wcagGuidelinesFilters;
                wcagLevelFilters = req.query.wcagLevelFilters;
                outcome = String(req.query.outcome);
                wcagLevels = [];
                wcagGuidelines = [];
                if (typeof wcagGuidelinesFilters === 'string' && wcagGuidelinesFilters.trim() !== '') {
                    wcagGuidelines = wcagGuidelinesFilters.split(',');
                }
                if (typeof wcagLevelFilters === 'string' && wcagLevelFilters.trim() !== '') {
                    wcagLevels = wcagLevelFilters.split(',');
                }
                console.log(wcagGuidelines);
                getLatestAssertionsRequest_1 = new evaluations_pb_1.GetLatestAssertionsRequest();
                getLatestAssertionsRequest_1.setEvaluationId(Number(evaluation_id));
                getLatestAssertionsRequest_1.setModuleType(moduleType);
                getLatestAssertionsRequest_1.setWcagguidelinesfiltersList(wcagGuidelines);
                getLatestAssertionsRequest_1.setWcaglevelfiltersList(wcagLevels);
                getLatestAssertionsRequest_1.setOutcome(outcome);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getLatestAssertions(getLatestAssertionsRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                reponse = _a.sent();
                if (reponse.getStatusCode() !== 200) {
                    res.send(reponse.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    assertions: (0, convert_1.convertLatestACTAssertions)(reponse.getAssertionsList())
                });
                return [3 /*break*/, 4];
            case 3:
                error_23 = _a.sent();
                console.error('Error fetching latest assertions:', error_23);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/assertions/:assertion_id/results', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assertion_id, getAssertionResultsRequest_1, response, error_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assertion_id = req.params.assertion_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getAssertionResultsRequest_1 = new evaluations_pb_1.GetAssertionResultsRequest();
                getAssertionResultsRequest_1.setAssertionId(Number(assertion_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getAssertionResults(getAssertionResultsRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    results: (0, convert_1.convertAssertionResults)(response.getResultsList())
                });
                return [3 /*break*/, 4];
            case 3:
                error_24 = _a.sent();
                console.error('Error fetching results:', error_24);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/issues/:issue_id/elements', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issue_id, getResultElementsRequest_1, response, error_25;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                issue_id = req.params.issue_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getResultElementsRequest_1 = new evaluations_pb_1.GetResultElementsRequest();
                getResultElementsRequest_1.setIssueId(Number(issue_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getResultElement(getResultElementsRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    element: (0, convert_1.convertResultElement)(response.getElement())
                });
                return [3 /*break*/, 4];
            case 3:
                error_25 = _a.sent();
                console.error('Error fetching elements:', error_25);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/history', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getEvaluationHistoryRequest_1, response, error_26;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getEvaluationHistoryRequest_1 = new evaluations_pb_1.GetEvaluationHistoryRequest();
                getEvaluationHistoryRequest_1.setMonitoringId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getEvaluationHistory(getEvaluationHistoryRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    history: (0, convert_1.convertEvaluationHistory)(response.getHistoryList())
                });
                return [3 /*break*/, 4];
            case 3:
                error_26 = _a.sent();
                console.error('Error fetching history:', error_26);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:user_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, getUserMonitoringRegistries_1, response, error_27;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getUserMonitoringRegistries_1 = new evaluations_pb_1.GetUserMonitoringRegistriesRequest();
                getUserMonitoringRegistries_1.setUserId(Number(user_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getUserMonitoringRegistries(getUserMonitoringRegistries_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    monitoring_registries: (0, convert_1.convertMonitoringRegistries)(response.getMonitoringRegistriesList())
                });
                return [3 /*break*/, 4];
            case 3:
                error_27 = _a.sent();
                console.error('Error fetching history:', error_27);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/monitoring-cycle', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, setNewMonitoringCycle_1, response, error_28;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                setNewMonitoringCycle_1 = new evaluations_pb_1.SetNewMonitoringCycleRequest();
                setNewMonitoringCycle_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.setNewMonitoringCycle(setNewMonitoringCycle_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    monitoring_cycle_id: response.getMonitoringCycleId()
                });
                return [3 /*break*/, 4];
            case 3:
                error_28 = _a.sent();
                console.error('Error setting evaluation cycle:', error_28);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/monitoring-cycles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getWebsiteMonitoringCycles_1, response, error_29;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getWebsiteMonitoringCycles_1 = new evaluations_pb_1.GetWebsiteMonitoringCyclesRequest();
                getWebsiteMonitoringCycles_1.setMonitoringId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getWebsiteMonitoringCycles(getWebsiteMonitoringCycles_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    monitoring_cycles: (0, convert_1.convertMonitoringCycles)(response.getMonitoringCyclesList())
                });
                return [3 /*break*/, 4];
            case 3:
                error_29 = _a.sent();
                console.error('Error fetching history:', error_29);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/monitored-webpages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getWebpagesRequest_1, response, error_30;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getWebpagesRequest_1 = new evaluations_pb_1.GetMonitoredWebpagesRequest();
                getWebpagesRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getMonitoredWebpages(getWebpagesRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    monitored_webpages: (0, convert_1.convertMonitoredWebpages)(response.getMonitoredWebpagesList())
                });
                return [3 /*break*/, 4];
            case 3:
                error_30 = _a.sent();
                console.error('Error fetching history:', error_30);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/api/monitoring/webpage/:webpage_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webpage_id, deleteWebpageRequest_1, response, error_31;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                webpage_id = req.params.webpage_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                deleteWebpageRequest_1 = new evaluations_pb_1.DeleteWebpageRequest();
                deleteWebpageRequest_1.setWebpageId(webpage_id);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.deleteWebpage(deleteWebpageRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    message: 'Successfully deleted webpage'
                });
                return [3 /*break*/, 4];
            case 3:
                error_31 = _a.sent();
                console.error('Error deleting webpage:', error_31);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/monitoring-cycle/:monitoring_cycle_id/evaluations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_cycle_id, addLatestEvaluationsToMonitoringCycle_1, response, error_32;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_cycle_id = req.params.monitoring_cycle_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                addLatestEvaluationsToMonitoringCycle_1 = new evaluations_pb_1.AddLatestEvaluationsToMonitoringCycleRequest();
                addLatestEvaluationsToMonitoringCycle_1.setMonitoringCycleId(Number(monitoring_cycle_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.addLatestEvaluationsToMonitoringCycle(addLatestEvaluationsToMonitoringCycle_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    message: 'Successfully set latest evaluations'
                });
                return [3 /*break*/, 4];
            case 3:
                error_32 = _a.sent();
                console.error('Error setting latest evaluations:', error_32);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/monitoring-registry/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getMonitoringRegistryRequest_1, response, error_33;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getMonitoringRegistryRequest_1 = new evaluations_pb_1.GetMonitoringRegistryRequest();
                getMonitoringRegistryRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getMonitoringRegistry(getMonitoringRegistryRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    monitoring_registry: (0, convert_1.convertMonitoringRegistry)(response)
                });
                return [3 /*break*/, 4];
            case 3:
                error_33 = _a.sent();
                console.error('Error fetching history:', error_33);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/monitoring-cycle/:cycle', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cycle, getMonitoringCycleRequest_1, response, error_34;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cycle = req.params.cycle;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getMonitoringCycleRequest_1 = new evaluations_pb_1.GetMonitoringCycleRequest();
                getMonitoringCycleRequest_1.setMonitoringCycleId(Number(cycle));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getMonitoringCycle(getMonitoringCycleRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    monitoring_cycle: (0, convert_1.convertMonitoringCycle)(response)
                });
                return [3 /*break*/, 4];
            case 3:
                error_34 = _a.sent();
                console.error('Error fetching history:', error_34);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/webpage/:webpage_id/comparison/:first_cycle/:second_cycle', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webpage_id, first_cycle_id, second_cycle_id, getWebpageComparisonDataFirstCycleRequest_1, response1, getWebpageComparisonDataSecondCycleRequest_1, response2, error_35;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                webpage_id = req.params.webpage_id;
                first_cycle_id = req.params.first_cycle;
                second_cycle_id = req.params.second_cycle;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                getWebpageComparisonDataFirstCycleRequest_1 = new evaluations_pb_1.GetWebpageComparisonDataRequest();
                getWebpageComparisonDataFirstCycleRequest_1.setWebpageId(Number(webpage_id));
                getWebpageComparisonDataFirstCycleRequest_1.setCycleId(Number(first_cycle_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getWebpageComparisonData(getWebpageComparisonDataFirstCycleRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response1 = _a.sent();
                if (response1.getStatusCode() !== 200) {
                    res.send(response1.getStatusCode());
                    return [2 /*return*/];
                }
                getWebpageComparisonDataSecondCycleRequest_1 = new evaluations_pb_1.GetWebpageComparisonDataRequest();
                getWebpageComparisonDataSecondCycleRequest_1.setWebpageId(Number(webpage_id));
                getWebpageComparisonDataSecondCycleRequest_1.setCycleId(Number(second_cycle_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getWebpageComparisonData(getWebpageComparisonDataSecondCycleRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 3:
                response2 = _a.sent();
                if (response2.getStatusCode() !== 200) {
                    res.send(response2.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    first_cycle: (0, convert_1.convertWebpageComparisonData)(response1),
                    second_cycle: (0, convert_1.convertWebpageComparisonData)(response2)
                });
                return [3 /*break*/, 5];
            case 4:
                error_35 = _a.sent();
                console.error('Error fetching comparison data:', error_35);
                res.send(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/webpage/:webpage_id/comparison/:first_cycle/:second_cycle/chart-data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webpage_id, first_cycle_id, second_cycle_id, getIntermediateCyclesRequest, intermediateCyclesResponse, intermediate_cycles, cycles, error_36;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                webpage_id = req.params.webpage_id;
                first_cycle_id = req.params.first_cycle;
                second_cycle_id = req.params.second_cycle;
                getIntermediateCyclesRequest = new evaluations_pb_1.GetIntermediateCyclesRequest();
                getIntermediateCyclesRequest.setFirstCycleId(Number(first_cycle_id));
                getIntermediateCyclesRequest.setSecondCycleId(Number(second_cycle_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getIntermediateCycles(getIntermediateCyclesRequest, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 1:
                intermediateCyclesResponse = _a.sent();
                if (intermediateCyclesResponse.getStatusCode() !== 200) {
                    res.send(intermediateCyclesResponse.getStatusCode());
                    return [2 /*return*/];
                }
                intermediate_cycles = intermediateCyclesResponse.getIntermediateCyclesList();
                console.log('Intermediate cycles:', intermediate_cycles);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Promise.all(intermediate_cycles.map(function (cycle) { return __awaiter(void 0, void 0, void 0, function () {
                        var getWebpageComparisonDataFirstCycleRequest, response1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('Webpage ID:', webpage_id);
                                    console.log('Processing cycle:', cycle.getId());
                                    getWebpageComparisonDataFirstCycleRequest = new evaluations_pb_1.GetWebpageComparisonDataRequest();
                                    getWebpageComparisonDataFirstCycleRequest.setWebpageId(Number(webpage_id));
                                    getWebpageComparisonDataFirstCycleRequest.setCycleId(Number(cycle.getId()));
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            client.getWebpageComparisonData(getWebpageComparisonDataFirstCycleRequest, function (err, callResponse) {
                                                if (err)
                                                    reject(err);
                                                else
                                                    resolve(callResponse);
                                            });
                                        })];
                                case 1:
                                    response1 = _a.sent();
                                    if (response1.getStatusCode() !== 200) {
                                        throw new Error("Request failed with status: ".concat(response1.getStatusCode()));
                                    }
                                    return [2 /*return*/, {
                                            cycle_id: cycle.getId(),
                                            cycle_date: (0, convert_1.convertDate)(cycle.getCycleDate()),
                                            data: (0, convert_1.convertWebpageComparisonData)(response1)
                                        }];
                            }
                        });
                    }); }))];
            case 3:
                cycles = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        graph_data: cycles
                    })];
            case 4:
                error_36 = _a.sent();
                console.error('Error:', error_36);
                res.send(500);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/comparison/:first_cycle/:second_cycle/failed-tests-stats', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, first_cycle_id, second_cycle_id, getFailedTestsStatsRequest1_1, response1, getFailedTestsStatsRequest2_1, response2, error_37;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                first_cycle_id = req.params.first_cycle;
                second_cycle_id = req.params.second_cycle;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                getFailedTestsStatsRequest1_1 = new evaluations_pb_1.GetFailedTestsStatsRequest();
                getFailedTestsStatsRequest1_1.setCycleId(Number(first_cycle_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getFailedTestsStats(getFailedTestsStatsRequest1_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response1 = _a.sent();
                if (response1.getStatusCode() !== 200) {
                    res.send(response1.getStatusCode());
                    return [2 /*return*/];
                }
                getFailedTestsStatsRequest2_1 = new evaluations_pb_1.GetFailedTestsStatsRequest();
                getFailedTestsStatsRequest2_1.setCycleId(Number(second_cycle_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getFailedTestsStats(getFailedTestsStatsRequest2_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 3:
                response2 = _a.sent();
                if (response2.getStatusCode() !== 200) {
                    res.send(response2.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    first_cycle_failed_tests: (0, convert_1.convertFailedTestsStats)(response1),
                    second_cycle_failed_tests: (0, convert_1.convertFailedTestsStats)(response2)
                });
                return [3 /*break*/, 5];
            case 4:
                error_37 = _a.sent();
                console.error('Error fetching failed tests stats:', error_37);
                res.send(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Server is running on http://localhost:".concat(port));
                return [4 /*yield*/, initializeRedis()];
            case 1:
                _a.sent();
                console.log('🚀 Starting job worker...');
                processEvaluationJobs().catch(function (error) {
                    console.error('Job worker crashed:', error);
                    setTimeout(function () {
                        console.log('🔄 Restarting job worker...');
                        processEvaluationJobs();
                    }, 5000);
                });
                return [2 /*return*/];
        }
    });
}); });
function bypassLogin(page, usernameFieldSelector, passwordFieldSelector, loginButtonSelector, username, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Fill and submit login form
                return [4 /*yield*/, page.evaluate(function (usernameFieldSelector, passwordFieldSelector, loginButtonSelector, username, password) {
                        var usernameField = document.querySelector(usernameFieldSelector);
                        var passwordField = document.querySelector(passwordFieldSelector);
                        var loginButton = document.querySelector(loginButtonSelector);
                        if (usernameField && passwordField && loginButton) {
                            usernameField.value = username;
                            passwordField.value = password;
                            loginButton.click();
                        }
                        else {
                            throw new Error('Could not find required login elements');
                        }
                    }, usernameFieldSelector, passwordFieldSelector, loginButtonSelector, username, password)];
                case 1:
                    // Fill and submit login form
                    _a.sent();
                    // Wait for navigation to complete (login successful)
                    return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'networkidle0' })];
                case 2:
                    // Wait for navigation to complete (login successful)
                    _a.sent();
                    return [2 /*return*/, { success: true, message: "Login completed and navigated to protected page" }];
            }
        });
    });
}
var createMonitoringCycle = function (monitoring_registry_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:8081/api/monitoring/".concat(monitoring_registry_id, "/monitoring-cycle"), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })];
            case 1:
                response = _a.sent();
                if (response.status !== 200) {
                    throw new Error('It was not possible to create a monitoring cycle.');
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data.monitoring_cycle_id];
        }
    });
}); };
var addLatestEvalsMonitoringCycle = function (monitoring_cycle_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:8081/api/monitoring/monitoring-cycle/".concat(monitoring_cycle_id, "/evaluations"), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })];
            case 1:
                response = _a.sent();
                if (response.status !== 200) {
                    throw new Error('It was not possible to set the evaluations.');
                }
                return [2 /*return*/];
        }
    });
}); };
var calculateScores = function (monitoring_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:8081/api/monitoring/".concat(monitoring_id, "/calculate-score"), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })];
            case 1:
                response = _a.sent();
                if (response.status !== 200) {
                    throw new Error('It was not possible to calculate the scores.');
                }
                return [2 /*return*/];
        }
    });
}); };
