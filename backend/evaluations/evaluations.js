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
app.post('/api/monitoring/:monitoring_id/evaluate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, webpage_ids, username, password, _loop_1, _i, webpage_ids_1, webpage_id, state_1, monitoring_cycle_id, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.monitoring_id;
                webpage_ids = req.body.webpage_ids;
                username = req.body.username;
                password = req.body.password;
                if (webpage_ids.length === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'No webpages to evaluate' })];
                }
                console.log(webpage_ids);
                _loop_1 = function (webpage_id) {
                    var getEvaluationInfoRequest_1, response, screen_width_1, screen_height_1, webpage_url_1, is_mobile, is_landscape, needs_authentication_1, username_field_selector_1, password_field_selector_1, login_button_selector_1, browser_1, page, report_1, result, setLatestEvalRequest_1, setLatestEvalResponse, error_4;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                console.log("Evaluating webpage with ID: ".concat(webpage_id));
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 10, , 11]);
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
                                response = _b.sent();
                                screen_width_1 = response.getDisplayWidth();
                                screen_height_1 = response.getDisplayHeight();
                                webpage_url_1 = response.getWebpageUrl();
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
                                browser_1 = _b.sent();
                                return [4 /*yield*/, browser_1.newPage()];
                            case 4:
                                page = _b.sent();
                                return [4 /*yield*/, page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')];
                            case 5:
                                _b.sent();
                                return [4 /*yield*/, page.setViewport({
                                        width: screen_width_1,
                                        height: screen_height_1,
                                        deviceScaleFactor: 1,
                                    })];
                            case 6:
                                _b.sent();
                                console.log("Evaluating URL ".concat(webpage_url_1));
                                return [4 /*yield*/, evaluate(webpage_url_1, screen_width_1, screen_height_1, is_mobile, is_landscape, needs_authentication_1, username_field_selector_1, password_field_selector_1, login_button_selector_1, username, password)];
                            case 7:
                                report_1 = _b.sent();
                                if (!needs_authentication_1 && report_1[webpage_url_1] !== undefined) {
                                    report_1 = report_1[webpage_url_1];
                                    console.log("Successfully evaluated URL ".concat(webpage_url_1));
                                }
                                else if (needs_authentication_1 && report_1.customHtml !== undefined) {
                                    report_1 = report_1.customHtml;
                                    console.log("Successfully evaluated URL ".concat(webpage_url_1, " behind authentication"));
                                }
                                else {
                                    console.error("Error evaluating URL ".concat(webpage_url_1));
                                    return [2 /*return*/, { value: res.status(200).json({
                                                message: 'Evaluation failed',
                                                url: webpage_url_1
                                            }) }];
                                }
                                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var browser_2, page_1, screenshot, evaluations_request_1, _a, _b, response_1, error_5;
                                        var _c, _d, _e, _f, _g, _h;
                                        return __generator(this, function (_j) {
                                            switch (_j.label) {
                                                case 0:
                                                    _j.trys.push([0, 13, , 14]);
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
                                                    browser_2 = _j.sent();
                                                    return [4 /*yield*/, browser_2.newPage()];
                                                case 2:
                                                    page_1 = _j.sent();
                                                    return [4 /*yield*/, page_1.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')];
                                                case 3:
                                                    _j.sent();
                                                    return [4 /*yield*/, page_1.setViewport({
                                                            width: screen_width_1,
                                                            height: screen_height_1,
                                                            deviceScaleFactor: 1,
                                                        })];
                                                case 4:
                                                    _j.sent();
                                                    if (!needs_authentication_1) return [3 /*break*/, 7];
                                                    return [4 /*yield*/, page_1.goto(webpage_url_1, { waitUntil: 'networkidle0' })];
                                                case 5:
                                                    _j.sent();
                                                    return [4 /*yield*/, bypassLogin(page_1, username_field_selector_1, password_field_selector_1, login_button_selector_1, username, password)];
                                                case 6:
                                                    _j.sent();
                                                    return [3 /*break*/, 9];
                                                case 7: return [4 /*yield*/, page_1.goto(webpage_url_1, { waitUntil: 'networkidle0' })];
                                                case 8:
                                                    _j.sent();
                                                    _j.label = 9;
                                                case 9: return [4 /*yield*/, (0, process_evals_1.takeWebpageScreenshot)(page_1, screen_width_1, screen_height_1)];
                                                case 10:
                                                    screenshot = _j.sent();
                                                    evaluations_request_1 = new evaluations_pb_1.AddEvaluationRequest();
                                                    evaluations_request_1.setQualwebVersion(report_1.system.version);
                                                    evaluations_request_1.setInputUrl(!needs_authentication_1 ? ((_d = (_c = report_1.system.url) === null || _c === void 0 ? void 0 : _c.inputUrl) !== null && _d !== void 0 ? _d : "") : webpage_url_1);
                                                    evaluations_request_1.setCompleteUrl((_f = (_e = report_1.system.url) === null || _e === void 0 ? void 0 : _e.completeUrl) !== null && _f !== void 0 ? _f : "");
                                                    evaluations_request_1.setDom(report_1.system.page.dom.html);
                                                    evaluations_request_1.setTitle((_g = report_1.system.page.dom.title) !== null && _g !== void 0 ? _g : "");
                                                    evaluations_request_1.setElementCount((_h = report_1.system.page.dom.elementCount) !== null && _h !== void 0 ? _h : 0);
                                                    evaluations_request_1.setPassed(report_1.metadata.passed);
                                                    evaluations_request_1.setWarning(report_1.metadata.warning);
                                                    evaluations_request_1.setFailed(report_1.metadata.failed);
                                                    evaluations_request_1.setInapplicable(report_1.metadata.inapplicable);
                                                    _b = (_a = evaluations_request_1).setModulesList;
                                                    return [4 /*yield*/, (0, process_evals_1.default)(report_1, page_1)];
                                                case 11:
                                                    _b.apply(_a, [_j.sent()]);
                                                    evaluations_request_1.setModulesQuantity(2);
                                                    evaluations_request_1.setMonitoredWebsiteId(Number(monitoring_id));
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
                                                case 12:
                                                    response_1 = _j.sent();
                                                    console.log("Successfully added evaluation for URL ".concat(webpage_url_1));
                                                    return [2 /*return*/, { webpage_url: webpage_url_1, success: true, statusCode: response_1.getStatusCode() }];
                                                case 13:
                                                    error_5 = _j.sent();
                                                    console.error("Error adding evaluation for URL ".concat(webpage_url_1, ":"), error_5);
                                                    return [2 /*return*/, { webpage_url: webpage_url_1, success: false, error: error_5 }];
                                                case 14: return [2 /*return*/];
                                            }
                                        });
                                    }); })()];
                            case 8:
                                result = _b.sent();
                                if (!result.success) {
                                    return [2 /*return*/, { value: res.status(500).json({
                                                message: 'Evaluation failed',
                                                result: result
                                            }) }];
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
                                setLatestEvalResponse = _b.sent();
                                if (setLatestEvalResponse.getStatusCode() !== 200) {
                                    return [2 /*return*/, { value: res.status(setLatestEvalResponse.getStatusCode()).json({
                                                message: 'Failed to set latest evaluation',
                                                statusCode: setLatestEvalResponse.getStatusCode()
                                            }) }];
                                }
                                return [3 /*break*/, 11];
                            case 10:
                                error_4 = _b.sent();
                                console.error('Error during evaluation:', error_4);
                                res.status(500).json({ message: 'Error processing evaluations', error: error_4 });
                                return [3 /*break*/, 11];
                            case 11: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, webpage_ids_1 = webpage_ids;
                _a.label = 1;
            case 1:
                if (!(_i < webpage_ids_1.length)) return [3 /*break*/, 4];
                webpage_id = webpage_ids_1[_i];
                return [5 /*yield**/, _loop_1(webpage_id)];
            case 2:
                state_1 = _a.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                _a.trys.push([4, 8, , 9]);
                return [4 /*yield*/, createMonitoringCycle(String(monitoring_id))];
            case 5:
                monitoring_cycle_id = _a.sent();
                return [4 /*yield*/, addLatestEvalsMonitoringCycle(monitoring_cycle_id)];
            case 6:
                _a.sent();
                return [4 /*yield*/, calculateScores(String(monitoring_id))];
            case 7:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'Evaluations processing complete',
                        success: true
                    })];
            case 8:
                error_3 = _a.sent();
                console.error('Error during evaluations processing:', error_3);
                return [2 /*return*/, res.status(500).json({ message: 'Error processing evaluations', error: error_3 })];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/calculate-score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getScoreRequest_1, response, error_6;
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
                error_6 = _a.sent();
                console.error('Error fetching score:', error_6);
                return [2 /*return*/, res.send(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/:monitoring_id/add-webpages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, urls, needs_authentication, username_field_selector, password_field_selector, login_button_selector, add_webpages_request_1, response, error_7;
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
                error_7 = _a.sent();
                console.error('Error adding webpages:', error_7);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/set-accessibility-metric-all-websites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessibility_metric, setMetricRequest_1, response, error_8;
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
                error_8 = _a.sent();
                console.error('Error setting accessibility metric:', error_8);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
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
app.get('/api/monitoring/evaluations/:evaluation_id/latest-assertions', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var evaluation_id, moduleType, wcagGuidelinesFilters, wcagLevelFilters, outcome, wcagLevels, wcagGuidelines, getLatestAssertionsRequest_1, reponse, error_14;
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
app.get('/api/monitoring/:monitoring_id/monitored-webpages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getWebpagesRequest_1, response, error_21;
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
                error_21 = _a.sent();
                console.error('Error fetching history:', error_21);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/api/monitoring/webpage/:webpage_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webpage_id, deleteWebpageRequest_1, response, error_22;
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
                error_22 = _a.sent();
                console.error('Error deleting webpage:', error_22);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/monitoring/monitoring-cycle/:monitoring_cycle_id/evaluations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_cycle_id, addLatestEvaluationsToMonitoringCycle_1, response, error_23;
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
                error_23 = _a.sent();
                console.error('Error setting latest evaluations:', error_23);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/monitoring-registry/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getMonitoringRegistryRequest_1, response, error_24;
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
                error_24 = _a.sent();
                console.error('Error fetching history:', error_24);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/monitoring-cycle/:cycle', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cycle, getMonitoringCycleRequest_1, response, error_25;
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
                error_25 = _a.sent();
                console.error('Error fetching history:', error_25);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/webpage/:webpage_id/comparison/:first_cycle/:second_cycle', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webpage_id, first_cycle_id, second_cycle_id, getWebpageComparisonDataFirstCycleRequest_1, response1, getWebpageComparisonDataSecondCycleRequest_1, response2, error_26;
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
                error_26 = _a.sent();
                console.error('Error fetching comparison data:', error_26);
                res.send(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get('/api/monitoring/:monitoring_id/comparison/:first_cycle/:second_cycle/failed-tests-stats', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, first_cycle_id, second_cycle_id, getFailedTestsStatsRequest1_1, response1, getFailedTestsStatsRequest2_1, response2, error_27;
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
                error_27 = _a.sent();
                console.error('Error fetching failed tests stats:', error_27);
                res.send(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
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
