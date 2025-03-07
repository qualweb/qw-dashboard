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
var core_1 = require("@qualweb/core");
var evaluations_pb_1 = require("./protobuf_library/evaluations_pb");
var dotenv = require("dotenv");
var crawlee_1 = require("crawlee");
dotenv.config();
// Access environment variables
var evaluations_database_ip = process.env.EVALUATIONS_DATABASE_HOST;
var EvaluationsClient = require('./protobuf_library/evaluations_grpc_pb.js').EvaluationsClient;
var grpc = require('@grpc/grpc-js');
var express = require('express');
var evaluate = require('./evaluate');
var app = express();
var port = 8081;
app.use(express.json());
var client = new EvaluationsClient(evaluations_database_ip + ':6000', grpc.credentials.createInsecure(), {
    "grpc.max_receive_message_length": 100 * 1024 * 1024,
    "grpc.max_send_message_length": 100 * 1024 * 1024
});
// This endpoint executes the crawling of the URLs in the domain of the input URL
app.post('/api/crawl', function (req, res) {
    var main_url = req.body.url;
    var domain_name = new URL(main_url).hostname;
    var is_mobile = req.body.is_mobile;
    var is_landscape = req.body.is_landscape;
    var display_width = req.body.display_width;
    var display_height = req.body.display_height;
    var puppeteerOptions = {
        headless: true,
        args: ['--no-sandbox']
    };
    function run(urlToCrawl) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, crawler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urls = [];
                        crawler = new crawlee_1.PuppeteerCrawler({
                            requestHandler: function (_a) {
                                return __awaiter(this, arguments, void 0, function (_b) {
                                    var request = _b.request, page = _b.page, enqueueLinks = _b.enqueueLinks, log = _b.log;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                urls.push(request.url);
                                                return [4 /*yield*/, enqueueLinks({
                                                        globs: ["http?(s)://".concat(new URL(urlToCrawl).hostname, "/**")],
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
                                launchOptions: puppeteerOptions,
                            },
                        });
                        return [4 /*yield*/, crawler.addRequests([urlToCrawl])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, crawler.run()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, urls];
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
                    res.send(200);
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
app.post('/api/set-accessibility-metric', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
app.post('/api/evaluate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                                evaluations_request_1.setModulesList(getModules(report));
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
app.post('/api/calculate-score', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
app.post('/api/add-webpage', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
app.post('/api/set-accessibility-metric-all-websites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
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
