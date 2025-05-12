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
Object.defineProperty(exports, "__esModule", { value: true });
var evaluations_pb_1 = require("./protobuf_library/evaluations_pb");
var dotenv = require("dotenv");
var crawlee_1 = require("crawlee");
var convert_1 = require("./convert");
var process_evals_1 = require("./process_evals");
var puppeteer_1 = require("puppeteer");
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
    var puppeteerOptions = {
        headless: true,
        args: ['--no-sandbox']
    };
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
                                    var finalUrl;
                                    var request = _b.request, page = _b.page, enqueueLinks = _b.enqueueLinks, log = _b.log;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                finalUrl = page.url();
                                                // Only add URLs we haven't seen before
                                                if (!seenUrls.has(finalUrl)) {
                                                    urls.push(finalUrl);
                                                    seenUrls.add(finalUrl);
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
        var monitoring_registry_request_1, response, error_1;
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
                    error_1 = _a.sent();
                    console.error('Error adding monitoring registry:', error_1);
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
    var monitoring_registry_id, accessibility_metric, accessibility_metric_request_1, response, error_2;
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
                error_2 = _a.sent();
                console.error('Error setting accessibility metric:', error_2);
                res.send(500);
                return [3 /*break*/, 4];
            case 4:
                res.send(200);
                return [2 /*return*/];
        }
    });
}); });
// This endpoint executes the evaluations
app.post('/api/monitoring/:monitoring_id/evaluate/:monitoring_cycle_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, monitoring_cycle_id, getWebpagesRequest_1, response, urls, screen_width_1, screen_height_1, reports_1, _i, urls_1, url, report, validReports, processPromises, results, successful, failed, setLatestEvalRequest_1, setLatestEvalResponse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                monitoring_cycle_id = req.params.monitoring_cycle_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                getWebpagesRequest_1 = new evaluations_pb_1.GetMonitoringRegistryRequest();
                getWebpagesRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getMonitoringRegistry(getWebpagesRequest_1, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 2:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    return [2 /*return*/, res.send(response.getStatusCode())];
                }
                urls = response.getWebpagesList();
                screen_width_1 = response.getDisplayWidth();
                screen_height_1 = response.getDisplayHeight();
                reports_1 = {};
                _i = 0, urls_1 = urls;
                _a.label = 3;
            case 3:
                if (!(_i < urls_1.length)) return [3 /*break*/, 7];
                url = urls_1[_i];
                return [4 /*yield*/, evaluate(url, screen_width_1, screen_height_1, response.getIsMobile(), response.getIsLandscape())];
            case 4:
                report = _a.sent();
                console.log("Successfully evaluated URL ".concat(url));
                if (report[url] !== undefined)
                    reports_1[url] = report[url];
                if (!(url !== urls[urls.length - 1])) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, crawlee_1.sleep)(500)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7:
                console.log(reports_1);
                validReports = urls
                    .filter(function (url) { return reports_1[url]; })
                    .map(function (url) { return ({
                    url: url,
                    report: reports_1[url]
                }); });
                console.log(validReports);
                if (validReports.length === 0) {
                    return [2 /*return*/, res.send(404)];
                }
                if (validReports.length < urls.length) {
                    console.error('Some URLs could not be evaluated');
                }
                processPromises = validReports.map(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                    var browser_1, page, screenshot, evaluations_request_1, _c, _d, response_1, error_4;
                    var _e, _f, _g, _h, _j, _k;
                    var url = _b.url, report = _b.report;
                    return __generator(this, function (_l) {
                        switch (_l.label) {
                            case 0:
                                _l.trys.push([0, 9, , 10]);
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
                                browser_1 = _l.sent();
                                return [4 /*yield*/, browser_1.newPage()];
                            case 2:
                                page = _l.sent();
                                return [4 /*yield*/, page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')];
                            case 3:
                                _l.sent();
                                return [4 /*yield*/, page.setViewport({
                                        width: screen_width_1,
                                        height: screen_height_1,
                                        deviceScaleFactor: 1,
                                    })];
                            case 4:
                                _l.sent();
                                return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle0' })];
                            case 5:
                                _l.sent();
                                return [4 /*yield*/, (0, process_evals_1.takeWebpageScreenshot)(url, screen_width_1, screen_height_1)];
                            case 6:
                                screenshot = _l.sent();
                                evaluations_request_1 = new evaluations_pb_1.AddEvaluationRequest();
                                evaluations_request_1.setQualwebVersion(report.system.version);
                                evaluations_request_1.setInputUrl((_f = (_e = report.system.url) === null || _e === void 0 ? void 0 : _e.inputUrl) !== null && _f !== void 0 ? _f : "");
                                evaluations_request_1.setCompleteUrl((_h = (_g = report.system.url) === null || _g === void 0 ? void 0 : _g.completeUrl) !== null && _h !== void 0 ? _h : "");
                                evaluations_request_1.setDom(report.system.page.dom.html);
                                evaluations_request_1.setTitle((_j = report.system.page.dom.title) !== null && _j !== void 0 ? _j : "");
                                evaluations_request_1.setElementCount((_k = report.system.page.dom.elementCount) !== null && _k !== void 0 ? _k : 0);
                                evaluations_request_1.setPassed(report.metadata.passed);
                                evaluations_request_1.setWarning(report.metadata.warning);
                                evaluations_request_1.setFailed(report.metadata.failed);
                                evaluations_request_1.setInapplicable(report.metadata.inapplicable);
                                _d = (_c = evaluations_request_1).setModulesList;
                                return [4 /*yield*/, (0, process_evals_1.default)(report, page)];
                            case 7:
                                _d.apply(_c, [_l.sent()]);
                                evaluations_request_1.setModulesQuantity(2);
                                evaluations_request_1.setMonitoredWebsiteId(Number(monitoring_id));
                                evaluations_request_1.setMonitoringCycleId(Number(monitoring_cycle_id));
                                if (screenshot) {
                                    evaluations_request_1.setScreenshot(screenshot);
                                }
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        client.addEvaluation(evaluations_request_1, function (err, response) {
                                            if (err)
                                                reject(err);
                                            else
                                                resolve(response);
                                        });
                                    })];
                            case 8:
                                response_1 = _l.sent();
                                console.log("Successfully added evaluation for URL ".concat(url));
                                return [2 /*return*/, { url: url, success: true, statusCode: response_1.getStatusCode() }];
                            case 9:
                                error_4 = _l.sent();
                                console.error("Error adding evaluation for URL ".concat(url, ":"), error_4);
                                return [2 /*return*/, { url: url, success: false, error: error_4 }];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(processPromises)];
            case 8:
                results = _a.sent();
                successful = results.filter(function (result) { return result.success; }).length;
                failed = results.length - successful;
                console.log("Processing complete. Successful: ".concat(successful, ", Failed: ").concat(failed));
                if (successful === 0 && failed > 0) {
                    return [2 /*return*/, res.status(500).json({
                            message: 'All evaluations failed',
                            results: results
                        })];
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
                    return [2 /*return*/, res.send(setLatestEvalResponse.getStatusCode())];
                }
                return [2 /*return*/, res.status(200).json({
                        message: 'Evaluation processing complete',
                        total: results.length,
                        successful: successful,
                        failed: failed
                    })];
            case 10:
                error_3 = _a.sent();
                console.error('Error during evaluation:', error_3);
                res.status(500).json({ message: 'Error processing evaluations', error: error_3 });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/calculate-score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getScoreRequest_1, response, error_5;
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
                error_5 = _a.sent();
                console.error('Error fetching score:', error_5);
                return [2 /*return*/, res.send(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/add-webpages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, urls, add_webpages_request_1, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                urls = req.body.urls;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                add_webpages_request_1 = new evaluations_pb_1.AddWebpagesRequest();
                add_webpages_request_1.setMonitoringRegistryId(Number(monitoring_id));
                add_webpages_request_1.setWebpagesList(urls);
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
                error_6 = _a.sent();
                console.error('Error adding webpages:', error_6);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/set-accessibility-metric-all-websites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessibility_metric, setMetricRequest_1, response, error_7;
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
                error_7 = _a.sent();
                console.error('Error setting accessibility metric:', error_7);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/monitored-websites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getWebpagesRequest_2, response, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                getWebpagesRequest_2 = new evaluations_pb_1.GetMonitoredWebsitesRequest();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getMonitoredWebsites(getWebpagesRequest_2, function (err, callResponse) {
                            if (err)
                                reject(err);
                            else
                                resolve(callResponse);
                        });
                    })];
            case 1:
                response = _a.sent();
                if (response.getStatusCode() !== 200) {
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    websites: response.getWebsitesList()
                });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error('Error fetching monitoring registry:', error_8);
                res.send(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:id/current-warnings', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getCurrentWarningsRequest_1, response, error_9;
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
                error_9 = _a.sent();
                console.error('Error fetching current warnings:', error_9);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getScoreRequest_2, response, error_10;
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
                error_10 = _a.sent();
                console.error('Error fetching score:', error_10);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/issues-stats', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getIssuesStatsRequest_1, response, error_11;
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
                error_11 = _a.sent();
                console.error('Error fetching score:', error_11);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/evaluations/:evaluation_id/webpage-screenshot', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var evaluation_id, getWebpageScreenshotRequest_1, response, screenshot, error_12;
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
                error_12 = _a.sent();
                console.error('Error fetching screenshot:', error_12);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/latest-evaluations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getLatestEvaluationsRequest_1, response, error_13;
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
                error_13 = _a.sent();
                console.error('Error fetching latest evaluations:', error_13);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/evaluations/:evaluation_id/latest-act-assertions', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var evaluation_id, wcagLevelFilters, outcome, wcagLevels, getLatestACTAssertionsRequest_1, reponse, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                evaluation_id = req.params.evaluation_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                wcagLevelFilters = req.query.wcagLevelFilters;
                outcome = req.query.outcome;
                wcagLevels = [];
                if (typeof wcagLevelFilters === 'string' && wcagLevelFilters.trim() !== '') {
                    wcagLevels = wcagLevelFilters.split(',');
                }
                getLatestACTAssertionsRequest_1 = new evaluations_pb_1.GetLatestACTAssertionsRequest();
                getLatestACTAssertionsRequest_1.setEvaluationId(Number(evaluation_id));
                getLatestACTAssertionsRequest_1.setWcaglevelfiltersList(wcagLevels);
                getLatestACTAssertionsRequest_1.setOutcome(outcome);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getLatestACTAssertions(getLatestACTAssertionsRequest_1, function (err, callResponse) {
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
                error_14 = _a.sent();
                console.error('Error fetching latest assertions:', error_14);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/assertions/:assertion_id/results', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assertion_id, getAssertionResultsRequest_1, response, error_15;
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
                error_15 = _a.sent();
                console.error('Error fetching results:', error_15);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/issues/:issue_id/elements', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issue_id, getResultElementsRequest_1, response, error_16;
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
                error_16 = _a.sent();
                console.error('Error fetching elements:', error_16);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/history', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getEvaluationHistoryRequest_1, response, error_17;
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
                error_17 = _a.sent();
                console.error('Error fetching history:', error_17);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:user_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, getUserMonitoringRegistries_1, response, error_18;
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
                error_18 = _a.sent();
                console.error('Error fetching history:', error_18);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/monitoring-cycle', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, setNewMonitoringCycle_1, response, error_19;
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
                error_19 = _a.sent();
                console.error('Error setting evaluation cycle:', error_19);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/monitoring-cycles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getWebsiteMonitoringCycles_1, response, error_20;
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
                error_20 = _a.sent();
                console.error('Error fetching history:', error_20);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
