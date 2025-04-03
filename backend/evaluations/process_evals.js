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
exports.default = getModules;
exports.takeWebpageScreenshot = takeWebpageScreenshot;
var core_1 = require("@qualweb/core");
var evaluations_pb_1 = require("./protobuf_library/evaluations_pb");
var puppeteer_1 = require("puppeteer");
function getModules(report, page) {
    return __awaiter(this, void 0, void 0, function () {
        var modules, modules_names, assertions_quantity, i, _i, modules_names_1, module_1, new_module, currentModule, assertions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modules = [];
                    modules_names = [core_1.ModuleType.WCAG_TECHNIQUES, core_1.ModuleType.ACT_RULES, core_1.ModuleType.BEST_PRACTICES];
                    assertions_quantity = [35, 77, 29];
                    i = 0;
                    _i = 0, modules_names_1 = modules_names;
                    _a.label = 1;
                case 1:
                    if (!(_i < modules_names_1.length)) return [3 /*break*/, 5];
                    module_1 = modules_names_1[_i];
                    new_module = new evaluations_pb_1.Module();
                    if (!(report.modules[module_1] !== undefined)) return [3 /*break*/, 3];
                    currentModule = report.modules[module_1];
                    new_module.setType(currentModule.type);
                    new_module.setPassed(currentModule.metadata.passed);
                    new_module.setWarning(currentModule.metadata.warning);
                    new_module.setFailed(currentModule.metadata.failed);
                    new_module.setInapplicable(currentModule.metadata.inapplicable);
                    return [4 /*yield*/, getAssertions(currentModule, assertions_quantity[i], page)];
                case 2:
                    assertions = _a.sent();
                    new_module.setAssertionsList(assertions[0]);
                    new_module.setAssertionsQuantity(assertions[1]);
                    modules.push(new_module);
                    i++;
                    return [3 /*break*/, 4];
                case 3:
                    console.error("Module not found!");
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, modules];
            }
        });
    });
}
function getAssertions(module, assertions_quantity, page) {
    return __awaiter(this, void 0, void 0, function () {
        var assertions, rule_prefix, counter, i, new_assertion, assertion, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    assertions = [];
                    rule_prefix = '';
                    counter = 0;
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
                    i = 1;
                    _c.label = 1;
                case 1:
                    if (!(i <= assertions_quantity)) return [3 /*break*/, 4];
                    new_assertion = new evaluations_pb_1.Assertion();
                    assertion = module.assertions[rule_prefix.concat(i.toString())];
                    if (!(module.assertions[rule_prefix.concat(i.toString())] !== undefined)) return [3 /*break*/, 3];
                    new_assertion.setPassed(assertion.metadata.passed);
                    new_assertion.setWarning(assertion.metadata.warning);
                    new_assertion.setFailed(assertion.metadata.failed);
                    new_assertion.setInapplicable(assertion.metadata.inapplicable);
                    new_assertion.setOutcome(assertion.metadata.outcome);
                    new_assertion.setDescription(assertion.metadata.description);
                    _b = (_a = new_assertion).setMetadata;
                    return [4 /*yield*/, getMetadata(assertion, page)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    assertions.push(new_assertion);
                    counter++;
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, [assertions, counter]];
            }
        });
    });
}
function getMetadata(assertion, page) {
    return __awaiter(this, void 0, void 0, function () {
        var assertion_metadata, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assertion_metadata = new evaluations_pb_1.AssertionMetadata();
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
                    return [4 /*yield*/, getResults(assertion, page)];
                case 1:
                    results = _a.sent();
                    assertion_metadata.setResultsList(results[0]);
                    assertion_metadata.setResultsQuantity(results[1]);
                    return [2 /*return*/, assertion_metadata];
            }
        });
    });
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
function getResults(assertion, page) {
    return __awaiter(this, void 0, void 0, function () {
        var results, results_counter, _i, _a, result, new_result, elements, elements_counter, _b, _c, element, new_element, getElementPosDim;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = [];
                    results_counter = 0;
                    _i = 0, _a = assertion.results;
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    result = _a[_i];
                    new_result = new evaluations_pb_1.Result();
                    elements = [];
                    elements_counter = 0;
                    new_result.setVerdict(result.verdict);
                    new_result.setDescription(result.description);
                    _b = 0, _c = result.elements;
                    _d.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 6];
                    element = _c[_b];
                    new_element = new evaluations_pb_1.Element();
                    if (element.htmlCode !== undefined)
                        new_element.setHtmlCode(element.htmlCode);
                    if (!(element.pointer !== undefined)) return [3 /*break*/, 4];
                    new_element.setPointer(element.pointer);
                    getElementPosDim = function (pointer) { return __awaiter(_this, void 0, void 0, function () {
                        var element, bounding_box;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.waitForSelector(pointer)];
                                case 1:
                                    element = _a.sent();
                                    if (!element) {
                                        console.error("Element not found for pointer: ".concat(pointer));
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, element.boundingBox()];
                                case 2:
                                    bounding_box = _a.sent();
                                    if (!bounding_box) {
                                        console.error("Bounding box not found for pointer: ".concat(pointer));
                                        return [2 /*return*/];
                                    }
                                    console.log(bounding_box);
                                    new_element.setX(bounding_box.x);
                                    new_element.setY(bounding_box.y);
                                    new_element.setWidth(bounding_box.width);
                                    new_element.setHeight(bounding_box.height);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, getElementPosDim(element.pointer)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    elements.push(new_element);
                    elements_counter++;
                    _d.label = 5;
                case 5:
                    _b++;
                    return [3 /*break*/, 2];
                case 6:
                    new_result.setResultCode(result.resultCode);
                    new_result.setElementsList(elements);
                    new_result.setElementsQuantity(elements_counter);
                    results.push(new_result);
                    results_counter++;
                    _d.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/, [results, results_counter]];
            }
        });
    });
}
function takeWebpageScreenshot(webpage_url, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, screenshot, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1.default.launch({
                        headless: true,
                        args: ['--no-sandbox']
                    })];
                case 1:
                    browser = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, 8, 10]);
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(webpage_url, { waitUntil: 'domcontentloaded' })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.setViewport({
                            width: width,
                            height: height,
                            deviceScaleFactor: 1,
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({
                            fullPage: true
                        })];
                case 6:
                    screenshot = _a.sent();
                    return [2 /*return*/, screenshot];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error taking screenshot:', error_1);
                    return [2 /*return*/, null];
                case 8: return [4 /*yield*/, browser.close()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
