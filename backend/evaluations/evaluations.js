"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
app.post('/api/evaluations/crawl', function (req, res) {
    var main_url = req.body.url;
    var domain_name = new URL(main_url).hostname;
    var is_mobile = req.body.is_mobile;
    var is_landscape = req.body.is_landscape;
    var display_width = req.body.display_width;
    var display_height = req.body.display_height;
    console.log(main_url);
    var puppeteerOptions = {
        headless: true,
        args: ['--no-sandbox']
    };
    function run(urlToCrawl) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, requestQueue, crawler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urls = [];
                        return [4 /*yield*/, crawlee_1.RequestQueue.open()];
                    case 1:
                        requestQueue = _a.sent();
                        crawler = new crawlee_1.PuppeteerCrawler({
                            requestQueue: requestQueue,
                            requestHandler: function (_a) {
                                return __awaiter(this, arguments, void 0, function (_b) {
                                    var request = _b.request, page = _b.page, enqueueLinks = _b.enqueueLinks, log = _b.log;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                urls.push(request.url);
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
                                launchOptions: __assign(__assign({}, puppeteerOptions), { args: __spreadArray(__spreadArray([], (puppeteerOptions.args || []), true), ['--incognito'], false) }),
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
                    monitoring_registry_request_1.setMainUrl(main_url);
                    monitoring_registry_request_1.setDomainName(domain_name);
                    monitoring_registry_request_1.setIsMobile(is_mobile);
                    monitoring_registry_request_1.setIsLandscape(is_landscape);
                    monitoring_registry_request_1.setDisplayWidth(display_width);
                    monitoring_registry_request_1.setDisplayHeight(display_height);
                    monitoring_registry_request_1.setWebpagesList(urls);
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
app.post('/api/evaluations/set-accessibility-metric', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
app.post('/api/evaluations/evaluate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_registry_id, getWebpagesRequest_1, response, urls, reports_1, _i, urls_1, url, report, validReports, processPromises, results, successful, failed, setLatestEvalRequest_1, setLatestEvalResponse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_registry_id = req.body.monitoring_registry_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                getWebpagesRequest_1 = new evaluations_pb_1.GetMonitoringRegistryRequest();
                getWebpagesRequest_1.setMonitoringRegistryId(monitoring_registry_id);
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
                    res.send(response.getStatusCode());
                    return [2 /*return*/];
                }
                urls = response.getWebpagesList();
                reports_1 = {};
                _i = 0, urls_1 = urls;
                _a.label = 3;
            case 3:
                if (!(_i < urls_1.length)) return [3 /*break*/, 7];
                url = urls_1[_i];
                return [4 /*yield*/, evaluate(url, response.getDisplayWidth(), response.getDisplayHeight(), response.getIsMobile(), response.getIsLandscape())];
            case 4:
                report = _a.sent();
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
                validReports = urls
                    .filter(function (url) { return reports_1[url]; })
                    .map(function (url) { return ({
                    url: url,
                    report: reports_1[url]
                }); });
                if (validReports.length === 0) {
                    res.send(404);
                    return [2 /*return*/];
                }
                if (validReports.length < urls.length) {
                    res.status(207).json({
                        message: 'Some URLs could not be evaluated',
                        urls: urls.filter(function (url) { return !reports_1[url]; })
                    });
                }
                processPromises = validReports.map(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                    var evaluations_request_1, response_1, error_4;
                    var _c, _d, _e, _f, _g, _h;
                    var url = _b.url, report = _b.report;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                _j.trys.push([0, 2, , 3]);
                                evaluations_request_1 = new evaluations_pb_1.AddEvaluationRequest();
                                evaluations_request_1.setQualwebVersion(report.system.version);
                                evaluations_request_1.setInputUrl((_d = (_c = report.system.url) === null || _c === void 0 ? void 0 : _c.inputUrl) !== null && _d !== void 0 ? _d : "");
                                evaluations_request_1.setCompleteUrl((_f = (_e = report.system.url) === null || _e === void 0 ? void 0 : _e.completeUrl) !== null && _f !== void 0 ? _f : "");
                                evaluations_request_1.setDom(report.system.page.dom.html);
                                evaluations_request_1.setTitle((_g = report.system.page.dom.title) !== null && _g !== void 0 ? _g : "");
                                evaluations_request_1.setElementCount((_h = report.system.page.dom.elementCount) !== null && _h !== void 0 ? _h : 0);
                                evaluations_request_1.setPassed(report.metadata.passed);
                                evaluations_request_1.setWarning(report.metadata.warning);
                                evaluations_request_1.setFailed(report.metadata.failed);
                                evaluations_request_1.setInapplicable(report.metadata.inapplicable);
                                evaluations_request_1.setModulesList((0, process_evals_1.default)(report));
                                evaluations_request_1.setModulesQuantity(2);
                                evaluations_request_1.setMonitoredWebsiteId(monitoring_registry_id);
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        client.addEvaluation(evaluations_request_1, function (err, response) {
                                            if (err)
                                                reject(err);
                                            else
                                                resolve(response);
                                        });
                                    })];
                            case 1:
                                response_1 = _j.sent();
                                console.log("Successfully added evaluation for URL ".concat(url));
                                return [2 /*return*/, { url: url, success: true, statusCode: response_1.getStatusCode() }];
                            case 2:
                                error_4 = _j.sent();
                                console.error("Error adding evaluation for URL ".concat(url, ":"), error_4);
                                return [2 /*return*/, { url: url, success: false, error: error_4 }];
                            case 3: return [2 /*return*/];
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
                    res.status(500).json({
                        message: 'All evaluations failed',
                        results: results
                    });
                    return [2 /*return*/];
                }
                setLatestEvalRequest_1 = new evaluations_pb_1.SetLatestEvaluationRequest();
                setLatestEvalRequest_1.setMonitoringRegistryId(monitoring_registry_id);
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
                    res.send(setLatestEvalResponse.getStatusCode());
                    return [2 /*return*/];
                }
                res.status(200).json({
                    message: 'Evaluation processing complete',
                    total: results.length,
                    successful: successful,
                    failed: failed
                });
                return [3 /*break*/, 11];
            case 10:
                error_3 = _a.sent();
                console.error('Error during evaluation:', error_3);
                res.status(500).json({ message: 'Error processing evaluations', error: error_3 });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
app.post('/api/evaluations/calculate-score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_registry_id, calculateScoreRequest_1, response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_registry_id = req.body.monitoring_registry_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                calculateScoreRequest_1 = new evaluations_pb_1.CalculateAccessibilityScoreRequest();
                calculateScoreRequest_1.setMonitoringRegistryId(monitoring_registry_id);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.calculateAccessibilityScore(calculateScoreRequest_1, function (err, callResponse) {
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
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error('Error calculating the accessibility score:', error_5);
                res.send(500);
                return [3 /*break*/, 4];
            case 4:
                res.send(200);
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/evaluations/add-webpages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_registry_id, urls, add_webpages_request_1, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_registry_id = req.body.monitoring_registry_id;
                urls = req.body.urls;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                add_webpages_request_1 = new evaluations_pb_1.AddWebpagesRequest();
                add_webpages_request_1.setMonitoringRegistryId(monitoring_registry_id);
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
app.post('/api/evaluations/set-accessibility-metric-all-websites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
app.get('/api/evaluations/monitored-websites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
app.get('/api/evaluations/monitoring/:id/latest-assertions/by-webpage', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getLatestAssertionsByWebpageRequest_1, response, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getLatestAssertionsByWebpageRequest_1 = new evaluations_pb_1.GetLatestAssertionsByWebpageRequest();
                getLatestAssertionsByWebpageRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getLatestAssertionsByWebpage(getLatestAssertionsByWebpageRequest_1, function (err, callResponse) {
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
                res.send((0, convert_1.convertGetLatestAssertionsResponseToJSON)(response).webpages);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                console.error('Error fetching latest assertions:', error_9);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/evaluations/monitoring/:id/latest-assertions/by-test', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getLatestAssertionsByTestRequest_1, response, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getLatestAssertionsByTestRequest_1 = new evaluations_pb_1.GetLatestAssertionsByTestRequest();
                getLatestAssertionsByTestRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getLatestAssertionsByTest(getLatestAssertionsByTestRequest_1, function (err, callResponse) {
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
                res.send((0, convert_1.convertAssertionsList)(response.getAssertionsList()));
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                console.error('Error fetching latest assertions:', error_10);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/evaluations/monitoring/:id/current-warnings', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getCurrentWarningsRequest_1, response, error_11;
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
                res.send((0, convert_1.convertAssertionsList)(response.getWarningsList()));
                return [3 /*break*/, 4];
            case 3:
                error_11 = _a.sent();
                console.error('Error fetching current warnings:', error_11);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/evaluations/monitoring/:id/score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getScoreRequest_1, response, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                getScoreRequest_1 = new evaluations_pb_1.GetWebsiteScoreRequest();
                getScoreRequest_1.setMonitoringRegistryId(Number(monitoring_id));
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.getWebsiteScore(getScoreRequest_1, function (err, callResponse) {
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
                console.log("score" + response.getScore());
                res.status(200).json({
                    score: response.getScore()
                });
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                console.error('Error fetching score:', error_12);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/evaluations/monitoring/:id/issues-stats', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monitoring_id, getIssuesStatsRequest_1, response, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monitoring_id = req.params.id;
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
                error_13 = _a.sent();
                console.error('Error fetching score:', error_13);
                res.send(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
