// source: evaluations.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.runtimePackage.AddEvaluationRequest', null, global);
goog.exportSymbol('proto.runtimePackage.AddEvaluationResponse', null, global);
goog.exportSymbol('proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest', null, global);
goog.exportSymbol('proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse', null, global);
goog.exportSymbol('proto.runtimePackage.AddMonitoringRegistryRequest', null, global);
goog.exportSymbol('proto.runtimePackage.AddMonitoringRegistryResponse', null, global);
goog.exportSymbol('proto.runtimePackage.AddWebpagesRequest', null, global);
goog.exportSymbol('proto.runtimePackage.AddWebpagesResponse', null, global);
goog.exportSymbol('proto.runtimePackage.Assertion', null, global);
goog.exportSymbol('proto.runtimePackage.AssertionMetadata', null, global);
goog.exportSymbol('proto.runtimePackage.AssertionMetadataResponse', null, global);
goog.exportSymbol('proto.runtimePackage.AssertionResponse', null, global);
goog.exportSymbol('proto.runtimePackage.CalculateAccessibilityScoreRequest', null, global);
goog.exportSymbol('proto.runtimePackage.CalculateAccessibilityScoreResponse', null, global);
goog.exportSymbol('proto.runtimePackage.DeleteWebpageRequest', null, global);
goog.exportSymbol('proto.runtimePackage.DeleteWebpageResponse', null, global);
goog.exportSymbol('proto.runtimePackage.Element', null, global);
goog.exportSymbol('proto.runtimePackage.ElementResponse', null, global);
goog.exportSymbol('proto.runtimePackage.EvalDate', null, global);
goog.exportSymbol('proto.runtimePackage.EvaluationHistory', null, global);
goog.exportSymbol('proto.runtimePackage.EvaluationIdUrl', null, global);
goog.exportSymbol('proto.runtimePackage.GetAssertionResultsRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetAssertionResultsResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetCurrentWarningsRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetCurrentWarningsResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetEvaluationHistoryRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetEvaluationHistoryResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetEvaluationInfoRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetEvaluationInfoResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetIssuesStatsRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetIssuesStatsResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetLatestAssertionsRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetLatestAssertionsResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetLatestEvaluationsRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetLatestEvaluationsResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetMonitoredWebpagesRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetMonitoredWebpagesResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetMonitoringCycleRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetMonitoringCycleResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetMonitoringRegistryRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetMonitoringRegistryResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetResultElementsRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetResultElementsResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetUserMonitoringRegistriesRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetUserMonitoringRegistriesResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebpageComparisonDataRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebpageComparisonDataResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebpageScreenshotRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebpageScreenshotResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebsiteMonitoringCyclesRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebsiteMonitoringCyclesResponse', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebsiteScoreRequest', null, global);
goog.exportSymbol('proto.runtimePackage.GetWebsiteScoreResponse', null, global);
goog.exportSymbol('proto.runtimePackage.IssueElementResponse', null, global);
goog.exportSymbol('proto.runtimePackage.IssueResponse', null, global);
goog.exportSymbol('proto.runtimePackage.Module', null, global);
goog.exportSymbol('proto.runtimePackage.MonitoringCycle', null, global);
goog.exportSymbol('proto.runtimePackage.MonitoringRegistry', null, global);
goog.exportSymbol('proto.runtimePackage.Result', null, global);
goog.exportSymbol('proto.runtimePackage.ResultResponse', null, global);
goog.exportSymbol('proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest', null, global);
goog.exportSymbol('proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse', null, global);
goog.exportSymbol('proto.runtimePackage.SetAccessibilityMetricRequest', null, global);
goog.exportSymbol('proto.runtimePackage.SetAccessibilityMetricResponse', null, global);
goog.exportSymbol('proto.runtimePackage.SetLatestEvaluationRequest', null, global);
goog.exportSymbol('proto.runtimePackage.SetLatestEvaluationResponse', null, global);
goog.exportSymbol('proto.runtimePackage.SetNewMonitoringCycleRequest', null, global);
goog.exportSymbol('proto.runtimePackage.SetNewMonitoringCycleResponse', null, global);
goog.exportSymbol('proto.runtimePackage.SuccessCriteria', null, global);
goog.exportSymbol('proto.runtimePackage.Webpage', null, global);
goog.exportSymbol('proto.runtimePackage.WebpageResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.Element = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.Element, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.Element.displayName = 'proto.runtimePackage.Element';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.Result = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.Result.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.Result, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.Result.displayName = 'proto.runtimePackage.Result';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SuccessCriteria = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SuccessCriteria, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SuccessCriteria.displayName = 'proto.runtimePackage.SuccessCriteria';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AssertionMetadata = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.AssertionMetadata.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.AssertionMetadata, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AssertionMetadata.displayName = 'proto.runtimePackage.AssertionMetadata';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.Assertion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.Assertion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.Assertion.displayName = 'proto.runtimePackage.Assertion';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.Module = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.Module.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.Module, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.Module.displayName = 'proto.runtimePackage.Module';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddEvaluationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.AddEvaluationRequest.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.AddEvaluationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddEvaluationRequest.displayName = 'proto.runtimePackage.AddEvaluationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddEvaluationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.AddEvaluationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddEvaluationResponse.displayName = 'proto.runtimePackage.AddEvaluationResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddMonitoringRegistryRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.AddMonitoringRegistryRequest.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.AddMonitoringRegistryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddMonitoringRegistryRequest.displayName = 'proto.runtimePackage.AddMonitoringRegistryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddMonitoringRegistryResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.AddMonitoringRegistryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddMonitoringRegistryResponse.displayName = 'proto.runtimePackage.AddMonitoringRegistryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetAccessibilityMetricRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetAccessibilityMetricRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetAccessibilityMetricRequest.displayName = 'proto.runtimePackage.SetAccessibilityMetricRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetAccessibilityMetricResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetAccessibilityMetricResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetAccessibilityMetricResponse.displayName = 'proto.runtimePackage.SetAccessibilityMetricResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.CalculateAccessibilityScoreRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.CalculateAccessibilityScoreRequest.displayName = 'proto.runtimePackage.CalculateAccessibilityScoreRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.CalculateAccessibilityScoreResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.CalculateAccessibilityScoreResponse.displayName = 'proto.runtimePackage.CalculateAccessibilityScoreResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetLatestEvaluationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetLatestEvaluationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetLatestEvaluationRequest.displayName = 'proto.runtimePackage.SetLatestEvaluationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetLatestEvaluationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetLatestEvaluationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetLatestEvaluationResponse.displayName = 'proto.runtimePackage.SetLatestEvaluationResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddWebpagesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.AddWebpagesRequest.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.AddWebpagesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddWebpagesRequest.displayName = 'proto.runtimePackage.AddWebpagesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddWebpagesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.AddWebpagesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddWebpagesResponse.displayName = 'proto.runtimePackage.AddWebpagesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.displayName = 'proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.displayName = 'proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.WebpageResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.WebpageResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.WebpageResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.WebpageResponse.displayName = 'proto.runtimePackage.WebpageResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AssertionMetadataResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.AssertionMetadataResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.AssertionMetadataResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AssertionMetadataResponse.displayName = 'proto.runtimePackage.AssertionMetadataResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.IssueResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.IssueResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.IssueResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.IssueResponse.displayName = 'proto.runtimePackage.IssueResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.IssueElementResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.IssueElementResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.IssueElementResponse.displayName = 'proto.runtimePackage.IssueElementResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetCurrentWarningsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetCurrentWarningsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetCurrentWarningsRequest.displayName = 'proto.runtimePackage.GetCurrentWarningsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetCurrentWarningsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetCurrentWarningsResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetCurrentWarningsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetCurrentWarningsResponse.displayName = 'proto.runtimePackage.GetCurrentWarningsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebsiteScoreRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetWebsiteScoreRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebsiteScoreRequest.displayName = 'proto.runtimePackage.GetWebsiteScoreRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebsiteScoreResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetWebsiteScoreResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebsiteScoreResponse.displayName = 'proto.runtimePackage.GetWebsiteScoreResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetIssuesStatsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetIssuesStatsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetIssuesStatsRequest.displayName = 'proto.runtimePackage.GetIssuesStatsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetIssuesStatsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetIssuesStatsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetIssuesStatsResponse.displayName = 'proto.runtimePackage.GetIssuesStatsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebpageScreenshotRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetWebpageScreenshotRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebpageScreenshotRequest.displayName = 'proto.runtimePackage.GetWebpageScreenshotRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebpageScreenshotResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetWebpageScreenshotResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebpageScreenshotResponse.displayName = 'proto.runtimePackage.GetWebpageScreenshotResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetLatestEvaluationsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetLatestEvaluationsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetLatestEvaluationsRequest.displayName = 'proto.runtimePackage.GetLatestEvaluationsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetLatestEvaluationsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetLatestEvaluationsResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetLatestEvaluationsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetLatestEvaluationsResponse.displayName = 'proto.runtimePackage.GetLatestEvaluationsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.EvaluationIdUrl = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.EvaluationIdUrl, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.EvaluationIdUrl.displayName = 'proto.runtimePackage.EvaluationIdUrl';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetLatestAssertionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetLatestAssertionsRequest.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetLatestAssertionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetLatestAssertionsRequest.displayName = 'proto.runtimePackage.GetLatestAssertionsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetLatestAssertionsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetLatestAssertionsResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetLatestAssertionsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetLatestAssertionsResponse.displayName = 'proto.runtimePackage.GetLatestAssertionsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AssertionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.AssertionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AssertionResponse.displayName = 'proto.runtimePackage.AssertionResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetAssertionResultsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetAssertionResultsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetAssertionResultsRequest.displayName = 'proto.runtimePackage.GetAssertionResultsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetAssertionResultsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetAssertionResultsResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetAssertionResultsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetAssertionResultsResponse.displayName = 'proto.runtimePackage.GetAssertionResultsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.ResultResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.ResultResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.ResultResponse.displayName = 'proto.runtimePackage.ResultResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetResultElementsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetResultElementsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetResultElementsRequest.displayName = 'proto.runtimePackage.GetResultElementsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetResultElementsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetResultElementsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetResultElementsResponse.displayName = 'proto.runtimePackage.GetResultElementsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.ElementResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.ElementResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.ElementResponse.displayName = 'proto.runtimePackage.ElementResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetEvaluationHistoryRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetEvaluationHistoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetEvaluationHistoryRequest.displayName = 'proto.runtimePackage.GetEvaluationHistoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetEvaluationHistoryResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetEvaluationHistoryResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetEvaluationHistoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetEvaluationHistoryResponse.displayName = 'proto.runtimePackage.GetEvaluationHistoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.EvaluationHistory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.EvaluationHistory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.EvaluationHistory.displayName = 'proto.runtimePackage.EvaluationHistory';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.EvalDate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.EvalDate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.EvalDate.displayName = 'proto.runtimePackage.EvalDate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetUserMonitoringRegistriesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetUserMonitoringRegistriesRequest.displayName = 'proto.runtimePackage.GetUserMonitoringRegistriesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetUserMonitoringRegistriesResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetUserMonitoringRegistriesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetUserMonitoringRegistriesResponse.displayName = 'proto.runtimePackage.GetUserMonitoringRegistriesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.MonitoringRegistry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.MonitoringRegistry.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.MonitoringRegistry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.MonitoringRegistry.displayName = 'proto.runtimePackage.MonitoringRegistry';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetWebsiteMonitoringCyclesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.displayName = 'proto.runtimePackage.GetWebsiteMonitoringCyclesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetWebsiteMonitoringCyclesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.displayName = 'proto.runtimePackage.GetWebsiteMonitoringCyclesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.MonitoringCycle = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.MonitoringCycle, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.MonitoringCycle.displayName = 'proto.runtimePackage.MonitoringCycle';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetNewMonitoringCycleRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetNewMonitoringCycleRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetNewMonitoringCycleRequest.displayName = 'proto.runtimePackage.SetNewMonitoringCycleRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.SetNewMonitoringCycleResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.SetNewMonitoringCycleResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.SetNewMonitoringCycleResponse.displayName = 'proto.runtimePackage.SetNewMonitoringCycleResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetMonitoredWebpagesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetMonitoredWebpagesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetMonitoredWebpagesRequest.displayName = 'proto.runtimePackage.GetMonitoredWebpagesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetMonitoredWebpagesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.runtimePackage.GetMonitoredWebpagesResponse.repeatedFields_, null);
};
goog.inherits(proto.runtimePackage.GetMonitoredWebpagesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetMonitoredWebpagesResponse.displayName = 'proto.runtimePackage.GetMonitoredWebpagesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.Webpage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.Webpage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.Webpage.displayName = 'proto.runtimePackage.Webpage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetEvaluationInfoRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetEvaluationInfoRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetEvaluationInfoRequest.displayName = 'proto.runtimePackage.GetEvaluationInfoRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetEvaluationInfoResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetEvaluationInfoResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetEvaluationInfoResponse.displayName = 'proto.runtimePackage.GetEvaluationInfoResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.DeleteWebpageRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.DeleteWebpageRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.DeleteWebpageRequest.displayName = 'proto.runtimePackage.DeleteWebpageRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.DeleteWebpageResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.DeleteWebpageResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.DeleteWebpageResponse.displayName = 'proto.runtimePackage.DeleteWebpageResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.displayName = 'proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.displayName = 'proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetMonitoringRegistryRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetMonitoringRegistryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetMonitoringRegistryRequest.displayName = 'proto.runtimePackage.GetMonitoringRegistryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetMonitoringRegistryResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetMonitoringRegistryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetMonitoringRegistryResponse.displayName = 'proto.runtimePackage.GetMonitoringRegistryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetMonitoringCycleRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetMonitoringCycleRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetMonitoringCycleRequest.displayName = 'proto.runtimePackage.GetMonitoringCycleRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetMonitoringCycleResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetMonitoringCycleResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetMonitoringCycleResponse.displayName = 'proto.runtimePackage.GetMonitoringCycleResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebpageComparisonDataRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetWebpageComparisonDataRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebpageComparisonDataRequest.displayName = 'proto.runtimePackage.GetWebpageComparisonDataRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.runtimePackage.GetWebpageComparisonDataResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.runtimePackage.GetWebpageComparisonDataResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.runtimePackage.GetWebpageComparisonDataResponse.displayName = 'proto.runtimePackage.GetWebpageComparisonDataResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.Element.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.Element.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.Element} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Element.toObject = function(includeInstance, msg) {
  var f, obj = {
htmlCode: jspb.Message.getFieldWithDefault(msg, 1, ""),
pointer: jspb.Message.getFieldWithDefault(msg, 2, ""),
x: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
y: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
width: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
height: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.Element}
 */
proto.runtimePackage.Element.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.Element;
  return proto.runtimePackage.Element.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.Element} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.Element}
 */
proto.runtimePackage.Element.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setHtmlCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPointer(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setX(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setY(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setWidth(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.Element.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.Element.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.Element} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Element.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHtmlCode();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPointer();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getX();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getWidth();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getHeight();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
};


/**
 * optional string html_code = 1;
 * @return {string}
 */
proto.runtimePackage.Element.prototype.getHtmlCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Element} returns this
 */
proto.runtimePackage.Element.prototype.setHtmlCode = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string pointer = 2;
 * @return {string}
 */
proto.runtimePackage.Element.prototype.getPointer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Element} returns this
 */
proto.runtimePackage.Element.prototype.setPointer = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional float x = 3;
 * @return {number}
 */
proto.runtimePackage.Element.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Element} returns this
 */
proto.runtimePackage.Element.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float y = 4;
 * @return {number}
 */
proto.runtimePackage.Element.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Element} returns this
 */
proto.runtimePackage.Element.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional float width = 5;
 * @return {number}
 */
proto.runtimePackage.Element.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Element} returns this
 */
proto.runtimePackage.Element.prototype.setWidth = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float height = 6;
 * @return {number}
 */
proto.runtimePackage.Element.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Element} returns this
 */
proto.runtimePackage.Element.prototype.setHeight = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.Result.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.Result.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.Result.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.Result} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Result.toObject = function(includeInstance, msg) {
  var f, obj = {
verdict: jspb.Message.getFieldWithDefault(msg, 1, ""),
description: jspb.Message.getFieldWithDefault(msg, 2, ""),
elementsList: jspb.Message.toObjectList(msg.getElementsList(),
    proto.runtimePackage.Element.toObject, includeInstance),
elementsQuantity: jspb.Message.getFieldWithDefault(msg, 4, 0),
resultCode: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.Result}
 */
proto.runtimePackage.Result.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.Result;
  return proto.runtimePackage.Result.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.Result} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.Result}
 */
proto.runtimePackage.Result.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVerdict(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 3:
      var value = new proto.runtimePackage.Element;
      reader.readMessage(value,proto.runtimePackage.Element.deserializeBinaryFromReader);
      msg.addElements(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setElementsQuantity(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setResultCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.Result.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.Result.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.Result} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Result.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVerdict();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getElementsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.runtimePackage.Element.serializeBinaryToWriter
    );
  }
  f = message.getElementsQuantity();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getResultCode();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string verdict = 1;
 * @return {string}
 */
proto.runtimePackage.Result.prototype.getVerdict = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Result} returns this
 */
proto.runtimePackage.Result.prototype.setVerdict = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string description = 2;
 * @return {string}
 */
proto.runtimePackage.Result.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Result} returns this
 */
proto.runtimePackage.Result.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated Element elements = 3;
 * @return {!Array<!proto.runtimePackage.Element>}
 */
proto.runtimePackage.Result.prototype.getElementsList = function() {
  return /** @type{!Array<!proto.runtimePackage.Element>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.Element, 3));
};


/**
 * @param {!Array<!proto.runtimePackage.Element>} value
 * @return {!proto.runtimePackage.Result} returns this
*/
proto.runtimePackage.Result.prototype.setElementsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.runtimePackage.Element=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.Element}
 */
proto.runtimePackage.Result.prototype.addElements = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.runtimePackage.Element, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.Result} returns this
 */
proto.runtimePackage.Result.prototype.clearElementsList = function() {
  return this.setElementsList([]);
};


/**
 * optional int32 elements_quantity = 4;
 * @return {number}
 */
proto.runtimePackage.Result.prototype.getElementsQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Result} returns this
 */
proto.runtimePackage.Result.prototype.setElementsQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string result_code = 5;
 * @return {string}
 */
proto.runtimePackage.Result.prototype.getResultCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Result} returns this
 */
proto.runtimePackage.Result.prototype.setResultCode = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SuccessCriteria.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SuccessCriteria.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SuccessCriteria} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SuccessCriteria.toObject = function(includeInstance, msg) {
  var f, obj = {
name: jspb.Message.getFieldWithDefault(msg, 1, ""),
level: jspb.Message.getFieldWithDefault(msg, 2, ""),
principle: jspb.Message.getFieldWithDefault(msg, 3, ""),
url: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SuccessCriteria}
 */
proto.runtimePackage.SuccessCriteria.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SuccessCriteria;
  return proto.runtimePackage.SuccessCriteria.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SuccessCriteria} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SuccessCriteria}
 */
proto.runtimePackage.SuccessCriteria.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setLevel(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPrinciple(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SuccessCriteria.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SuccessCriteria.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SuccessCriteria} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SuccessCriteria.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getLevel();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPrinciple();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.runtimePackage.SuccessCriteria.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.SuccessCriteria} returns this
 */
proto.runtimePackage.SuccessCriteria.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string level = 2;
 * @return {string}
 */
proto.runtimePackage.SuccessCriteria.prototype.getLevel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.SuccessCriteria} returns this
 */
proto.runtimePackage.SuccessCriteria.prototype.setLevel = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string principle = 3;
 * @return {string}
 */
proto.runtimePackage.SuccessCriteria.prototype.getPrinciple = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.SuccessCriteria} returns this
 */
proto.runtimePackage.SuccessCriteria.prototype.setPrinciple = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string url = 4;
 * @return {string}
 */
proto.runtimePackage.SuccessCriteria.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.SuccessCriteria} returns this
 */
proto.runtimePackage.SuccessCriteria.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.AssertionMetadata.repeatedFields_ = [6,7,8,10];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AssertionMetadata.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AssertionMetadata.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AssertionMetadata} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AssertionMetadata.toObject = function(includeInstance, msg) {
  var f, obj = {
code: jspb.Message.getFieldWithDefault(msg, 1, ""),
name: jspb.Message.getFieldWithDefault(msg, 2, ""),
description: jspb.Message.getFieldWithDefault(msg, 3, ""),
url: jspb.Message.getFieldWithDefault(msg, 4, ""),
mapping: jspb.Message.getFieldWithDefault(msg, 5, ""),
targetElementsList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f,
targetAttributesList: (f = jspb.Message.getRepeatedField(msg, 7)) == null ? undefined : f,
successCriteriaList: jspb.Message.toObjectList(msg.getSuccessCriteriaList(),
    proto.runtimePackage.SuccessCriteria.toObject, includeInstance),
successCriteriaQuantity: jspb.Message.getFieldWithDefault(msg, 9, 0),
resultsList: jspb.Message.toObjectList(msg.getResultsList(),
    proto.runtimePackage.Result.toObject, includeInstance),
resultsQuantity: jspb.Message.getFieldWithDefault(msg, 11, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AssertionMetadata}
 */
proto.runtimePackage.AssertionMetadata.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AssertionMetadata;
  return proto.runtimePackage.AssertionMetadata.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AssertionMetadata} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AssertionMetadata}
 */
proto.runtimePackage.AssertionMetadata.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setMapping(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addTargetElements(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.addTargetAttributes(value);
      break;
    case 8:
      var value = new proto.runtimePackage.SuccessCriteria;
      reader.readMessage(value,proto.runtimePackage.SuccessCriteria.deserializeBinaryFromReader);
      msg.addSuccessCriteria(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSuccessCriteriaQuantity(value);
      break;
    case 10:
      var value = new proto.runtimePackage.Result;
      reader.readMessage(value,proto.runtimePackage.Result.deserializeBinaryFromReader);
      msg.addResults(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setResultsQuantity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AssertionMetadata.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AssertionMetadata.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AssertionMetadata} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AssertionMetadata.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getMapping();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getTargetElementsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
  f = message.getTargetAttributesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      7,
      f
    );
  }
  f = message.getSuccessCriteriaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.runtimePackage.SuccessCriteria.serializeBinaryToWriter
    );
  }
  f = message.getSuccessCriteriaQuantity();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getResultsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.runtimePackage.Result.serializeBinaryToWriter
    );
  }
  f = message.getResultsQuantity();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
};


/**
 * optional string code = 1;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadata.prototype.getCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setCode = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadata.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadata.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string url = 4;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadata.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string mapping = 5;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadata.prototype.getMapping = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setMapping = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * repeated string target_elements = 6;
 * @return {!Array<string>}
 */
proto.runtimePackage.AssertionMetadata.prototype.getTargetElementsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setTargetElementsList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.addTargetElements = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.clearTargetElementsList = function() {
  return this.setTargetElementsList([]);
};


/**
 * repeated string target_attributes = 7;
 * @return {!Array<string>}
 */
proto.runtimePackage.AssertionMetadata.prototype.getTargetAttributesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 7));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setTargetAttributesList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.addTargetAttributes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.clearTargetAttributesList = function() {
  return this.setTargetAttributesList([]);
};


/**
 * repeated SuccessCriteria success_criteria = 8;
 * @return {!Array<!proto.runtimePackage.SuccessCriteria>}
 */
proto.runtimePackage.AssertionMetadata.prototype.getSuccessCriteriaList = function() {
  return /** @type{!Array<!proto.runtimePackage.SuccessCriteria>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.SuccessCriteria, 8));
};


/**
 * @param {!Array<!proto.runtimePackage.SuccessCriteria>} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
*/
proto.runtimePackage.AssertionMetadata.prototype.setSuccessCriteriaList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.runtimePackage.SuccessCriteria=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.SuccessCriteria}
 */
proto.runtimePackage.AssertionMetadata.prototype.addSuccessCriteria = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.runtimePackage.SuccessCriteria, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.clearSuccessCriteriaList = function() {
  return this.setSuccessCriteriaList([]);
};


/**
 * optional int32 success_criteria_quantity = 9;
 * @return {number}
 */
proto.runtimePackage.AssertionMetadata.prototype.getSuccessCriteriaQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setSuccessCriteriaQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * repeated Result results = 10;
 * @return {!Array<!proto.runtimePackage.Result>}
 */
proto.runtimePackage.AssertionMetadata.prototype.getResultsList = function() {
  return /** @type{!Array<!proto.runtimePackage.Result>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.Result, 10));
};


/**
 * @param {!Array<!proto.runtimePackage.Result>} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
*/
proto.runtimePackage.AssertionMetadata.prototype.setResultsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.runtimePackage.Result=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.Result}
 */
proto.runtimePackage.AssertionMetadata.prototype.addResults = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.runtimePackage.Result, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.clearResultsList = function() {
  return this.setResultsList([]);
};


/**
 * optional int32 results_quantity = 11;
 * @return {number}
 */
proto.runtimePackage.AssertionMetadata.prototype.getResultsQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AssertionMetadata} returns this
 */
proto.runtimePackage.AssertionMetadata.prototype.setResultsQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.Assertion.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.Assertion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.Assertion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Assertion.toObject = function(includeInstance, msg) {
  var f, obj = {
passed: jspb.Message.getFieldWithDefault(msg, 1, 0),
warning: jspb.Message.getFieldWithDefault(msg, 2, 0),
failed: jspb.Message.getFieldWithDefault(msg, 3, 0),
inapplicable: jspb.Message.getFieldWithDefault(msg, 4, 0),
outcome: jspb.Message.getFieldWithDefault(msg, 5, ""),
description: jspb.Message.getFieldWithDefault(msg, 6, ""),
metadata: (f = msg.getMetadata()) && proto.runtimePackage.AssertionMetadata.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.Assertion}
 */
proto.runtimePackage.Assertion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.Assertion;
  return proto.runtimePackage.Assertion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.Assertion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.Assertion}
 */
proto.runtimePackage.Assertion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPassed(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWarning(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFailed(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInapplicable(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setOutcome(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 7:
      var value = new proto.runtimePackage.AssertionMetadata;
      reader.readMessage(value,proto.runtimePackage.AssertionMetadata.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.Assertion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.Assertion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.Assertion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Assertion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPassed();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getWarning();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getFailed();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getInapplicable();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getOutcome();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.runtimePackage.AssertionMetadata.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 passed = 1;
 * @return {number}
 */
proto.runtimePackage.Assertion.prototype.getPassed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Assertion} returns this
 */
proto.runtimePackage.Assertion.prototype.setPassed = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 warning = 2;
 * @return {number}
 */
proto.runtimePackage.Assertion.prototype.getWarning = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Assertion} returns this
 */
proto.runtimePackage.Assertion.prototype.setWarning = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 failed = 3;
 * @return {number}
 */
proto.runtimePackage.Assertion.prototype.getFailed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Assertion} returns this
 */
proto.runtimePackage.Assertion.prototype.setFailed = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 inapplicable = 4;
 * @return {number}
 */
proto.runtimePackage.Assertion.prototype.getInapplicable = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Assertion} returns this
 */
proto.runtimePackage.Assertion.prototype.setInapplicable = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string outcome = 5;
 * @return {string}
 */
proto.runtimePackage.Assertion.prototype.getOutcome = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Assertion} returns this
 */
proto.runtimePackage.Assertion.prototype.setOutcome = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string description = 6;
 * @return {string}
 */
proto.runtimePackage.Assertion.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Assertion} returns this
 */
proto.runtimePackage.Assertion.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional AssertionMetadata metadata = 7;
 * @return {?proto.runtimePackage.AssertionMetadata}
 */
proto.runtimePackage.Assertion.prototype.getMetadata = function() {
  return /** @type{?proto.runtimePackage.AssertionMetadata} */ (
    jspb.Message.getWrapperField(this, proto.runtimePackage.AssertionMetadata, 7));
};


/**
 * @param {?proto.runtimePackage.AssertionMetadata|undefined} value
 * @return {!proto.runtimePackage.Assertion} returns this
*/
proto.runtimePackage.Assertion.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.runtimePackage.Assertion} returns this
 */
proto.runtimePackage.Assertion.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.runtimePackage.Assertion.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 7) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.Module.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.Module.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.Module.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.Module} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Module.toObject = function(includeInstance, msg) {
  var f, obj = {
type: jspb.Message.getFieldWithDefault(msg, 1, ""),
passed: jspb.Message.getFieldWithDefault(msg, 2, 0),
warning: jspb.Message.getFieldWithDefault(msg, 3, 0),
failed: jspb.Message.getFieldWithDefault(msg, 4, 0),
inapplicable: jspb.Message.getFieldWithDefault(msg, 5, 0),
assertionsList: jspb.Message.toObjectList(msg.getAssertionsList(),
    proto.runtimePackage.Assertion.toObject, includeInstance),
assertionsQuantity: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.Module}
 */
proto.runtimePackage.Module.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.Module;
  return proto.runtimePackage.Module.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.Module} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.Module}
 */
proto.runtimePackage.Module.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPassed(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWarning(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFailed(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInapplicable(value);
      break;
    case 6:
      var value = new proto.runtimePackage.Assertion;
      reader.readMessage(value,proto.runtimePackage.Assertion.deserializeBinaryFromReader);
      msg.addAssertions(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAssertionsQuantity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.Module.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.Module.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.Module} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Module.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPassed();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getWarning();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getFailed();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getInapplicable();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getAssertionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.runtimePackage.Assertion.serializeBinaryToWriter
    );
  }
  f = message.getAssertionsQuantity();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
};


/**
 * optional string type = 1;
 * @return {string}
 */
proto.runtimePackage.Module.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Module} returns this
 */
proto.runtimePackage.Module.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 passed = 2;
 * @return {number}
 */
proto.runtimePackage.Module.prototype.getPassed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Module} returns this
 */
proto.runtimePackage.Module.prototype.setPassed = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 warning = 3;
 * @return {number}
 */
proto.runtimePackage.Module.prototype.getWarning = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Module} returns this
 */
proto.runtimePackage.Module.prototype.setWarning = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 failed = 4;
 * @return {number}
 */
proto.runtimePackage.Module.prototype.getFailed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Module} returns this
 */
proto.runtimePackage.Module.prototype.setFailed = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 inapplicable = 5;
 * @return {number}
 */
proto.runtimePackage.Module.prototype.getInapplicable = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Module} returns this
 */
proto.runtimePackage.Module.prototype.setInapplicable = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * repeated Assertion assertions = 6;
 * @return {!Array<!proto.runtimePackage.Assertion>}
 */
proto.runtimePackage.Module.prototype.getAssertionsList = function() {
  return /** @type{!Array<!proto.runtimePackage.Assertion>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.Assertion, 6));
};


/**
 * @param {!Array<!proto.runtimePackage.Assertion>} value
 * @return {!proto.runtimePackage.Module} returns this
*/
proto.runtimePackage.Module.prototype.setAssertionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.runtimePackage.Assertion=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.Assertion}
 */
proto.runtimePackage.Module.prototype.addAssertions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.runtimePackage.Assertion, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.Module} returns this
 */
proto.runtimePackage.Module.prototype.clearAssertionsList = function() {
  return this.setAssertionsList([]);
};


/**
 * optional int32 assertions_quantity = 7;
 * @return {number}
 */
proto.runtimePackage.Module.prototype.getAssertionsQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Module} returns this
 */
proto.runtimePackage.Module.prototype.setAssertionsQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.AddEvaluationRequest.repeatedFields_ = [11];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddEvaluationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddEvaluationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddEvaluationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
qualwebVersion: jspb.Message.getFieldWithDefault(msg, 1, ""),
inputUrl: jspb.Message.getFieldWithDefault(msg, 2, ""),
completeUrl: jspb.Message.getFieldWithDefault(msg, 3, ""),
dom: jspb.Message.getFieldWithDefault(msg, 4, ""),
title: jspb.Message.getFieldWithDefault(msg, 5, ""),
elementCount: jspb.Message.getFieldWithDefault(msg, 6, 0),
passed: jspb.Message.getFieldWithDefault(msg, 7, 0),
warning: jspb.Message.getFieldWithDefault(msg, 8, 0),
failed: jspb.Message.getFieldWithDefault(msg, 9, 0),
inapplicable: jspb.Message.getFieldWithDefault(msg, 10, 0),
modulesList: jspb.Message.toObjectList(msg.getModulesList(),
    proto.runtimePackage.Module.toObject, includeInstance),
modulesQuantity: jspb.Message.getFieldWithDefault(msg, 12, 0),
monitoredWebsiteId: jspb.Message.getFieldWithDefault(msg, 13, 0),
screenshot: msg.getScreenshot_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddEvaluationRequest}
 */
proto.runtimePackage.AddEvaluationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddEvaluationRequest;
  return proto.runtimePackage.AddEvaluationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddEvaluationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddEvaluationRequest}
 */
proto.runtimePackage.AddEvaluationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setQualwebVersion(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setInputUrl(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setCompleteUrl(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDom(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setElementCount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPassed(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWarning(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFailed(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInapplicable(value);
      break;
    case 11:
      var value = new proto.runtimePackage.Module;
      reader.readMessage(value,proto.runtimePackage.Module.deserializeBinaryFromReader);
      msg.addModules(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setModulesQuantity(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoredWebsiteId(value);
      break;
    case 14:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setScreenshot(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddEvaluationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddEvaluationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddEvaluationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQualwebVersion();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInputUrl();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCompleteUrl();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDom();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getElementCount();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getPassed();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getWarning();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getFailed();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getInapplicable();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getModulesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      11,
      f,
      proto.runtimePackage.Module.serializeBinaryToWriter
    );
  }
  f = message.getModulesQuantity();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getMonitoredWebsiteId();
  if (f !== 0) {
    writer.writeInt32(
      13,
      f
    );
  }
  f = message.getScreenshot_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      14,
      f
    );
  }
};


/**
 * optional string qualweb_version = 1;
 * @return {string}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getQualwebVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setQualwebVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string input_url = 2;
 * @return {string}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getInputUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setInputUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string complete_url = 3;
 * @return {string}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getCompleteUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setCompleteUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string dom = 4;
 * @return {string}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getDom = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setDom = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string title = 5;
 * @return {string}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional int32 element_count = 6;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getElementCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setElementCount = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 passed = 7;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getPassed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setPassed = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 warning = 8;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getWarning = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setWarning = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 failed = 9;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getFailed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setFailed = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 inapplicable = 10;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getInapplicable = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setInapplicable = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * repeated Module modules = 11;
 * @return {!Array<!proto.runtimePackage.Module>}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getModulesList = function() {
  return /** @type{!Array<!proto.runtimePackage.Module>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.Module, 11));
};


/**
 * @param {!Array<!proto.runtimePackage.Module>} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
*/
proto.runtimePackage.AddEvaluationRequest.prototype.setModulesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 11, value);
};


/**
 * @param {!proto.runtimePackage.Module=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.Module}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.addModules = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.runtimePackage.Module, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.clearModulesList = function() {
  return this.setModulesList([]);
};


/**
 * optional int32 modules_quantity = 12;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getModulesQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setModulesQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional int32 monitored_website_id = 13;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getMonitoredWebsiteId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setMonitoredWebsiteId = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};


/**
 * optional bytes screenshot = 14;
 * @return {!(string|Uint8Array)}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getScreenshot = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 14, ""));
};


/**
 * optional bytes screenshot = 14;
 * This is a type-conversion wrapper around `getScreenshot()`
 * @return {string}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getScreenshot_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getScreenshot()));
};


/**
 * optional bytes screenshot = 14;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getScreenshot()`
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddEvaluationRequest.prototype.getScreenshot_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getScreenshot()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.runtimePackage.AddEvaluationRequest} returns this
 */
proto.runtimePackage.AddEvaluationRequest.prototype.setScreenshot = function(value) {
  return jspb.Message.setProto3BytesField(this, 14, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddEvaluationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddEvaluationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddEvaluationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddEvaluationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddEvaluationResponse}
 */
proto.runtimePackage.AddEvaluationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddEvaluationResponse;
  return proto.runtimePackage.AddEvaluationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddEvaluationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddEvaluationResponse}
 */
proto.runtimePackage.AddEvaluationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddEvaluationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddEvaluationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddEvaluationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddEvaluationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.AddEvaluationResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddEvaluationResponse} returns this
 */
proto.runtimePackage.AddEvaluationResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.AddMonitoringRegistryRequest.repeatedFields_ = [7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddMonitoringRegistryRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddMonitoringRegistryRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddMonitoringRegistryRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
mainUrl: jspb.Message.getFieldWithDefault(msg, 1, ""),
domainName: jspb.Message.getFieldWithDefault(msg, 2, ""),
isMobile: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
isLandscape: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
displayWidth: jspb.Message.getFieldWithDefault(msg, 5, 0),
displayHeight: jspb.Message.getFieldWithDefault(msg, 6, 0),
webpagesList: (f = jspb.Message.getRepeatedField(msg, 7)) == null ? undefined : f,
websiteName: jspb.Message.getFieldWithDefault(msg, 8, ""),
userId: jspb.Message.getFieldWithDefault(msg, 9, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddMonitoringRegistryRequest;
  return proto.runtimePackage.AddMonitoringRegistryRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddMonitoringRegistryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMainUrl(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDomainName(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsMobile(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsLandscape(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayWidth(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayHeight(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.addWebpages(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setWebsiteName(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddMonitoringRegistryRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddMonitoringRegistryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddMonitoringRegistryRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMainUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDomainName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getIsMobile();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIsLandscape();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getDisplayWidth();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getDisplayHeight();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getWebpagesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      7,
      f
    );
  }
  f = message.getWebsiteName();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getUserId();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
};


/**
 * optional string main_url = 1;
 * @return {string}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getMainUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setMainUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string domain_name = 2;
 * @return {string}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getDomainName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setDomainName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool is_mobile = 3;
 * @return {boolean}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getIsMobile = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setIsMobile = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool is_landscape = 4;
 * @return {boolean}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getIsLandscape = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setIsLandscape = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int32 display_width = 5;
 * @return {number}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getDisplayWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setDisplayWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 display_height = 6;
 * @return {number}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getDisplayHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setDisplayHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * repeated string webpages = 7;
 * @return {!Array<string>}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getWebpagesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 7));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setWebpagesList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.addWebpages = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.clearWebpagesList = function() {
  return this.setWebpagesList([]);
};


/**
 * optional string website_name = 8;
 * @return {string}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getWebsiteName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setWebsiteName = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional int32 user_id = 9;
 * @return {number}
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.getUserId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.AddMonitoringRegistryRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddMonitoringRegistryResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddMonitoringRegistryResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddMonitoringRegistryResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddMonitoringRegistryResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddMonitoringRegistryResponse}
 */
proto.runtimePackage.AddMonitoringRegistryResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddMonitoringRegistryResponse;
  return proto.runtimePackage.AddMonitoringRegistryResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddMonitoringRegistryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddMonitoringRegistryResponse}
 */
proto.runtimePackage.AddMonitoringRegistryResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddMonitoringRegistryResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddMonitoringRegistryResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddMonitoringRegistryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddMonitoringRegistryResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.AddMonitoringRegistryResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.AddMonitoringRegistryResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 monitoring_registry_id = 2;
 * @return {number}
 */
proto.runtimePackage.AddMonitoringRegistryResponse.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.AddMonitoringRegistryResponse.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetAccessibilityMetricRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetAccessibilityMetricRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetAccessibilityMetricRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0),
accessibilityMetric: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetAccessibilityMetricRequest}
 */
proto.runtimePackage.SetAccessibilityMetricRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetAccessibilityMetricRequest;
  return proto.runtimePackage.SetAccessibilityMetricRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetAccessibilityMetricRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetAccessibilityMetricRequest}
 */
proto.runtimePackage.SetAccessibilityMetricRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccessibilityMetric(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetAccessibilityMetricRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetAccessibilityMetricRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetAccessibilityMetricRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAccessibilityMetric();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.SetAccessibilityMetricRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetAccessibilityMetricRequest} returns this
 */
proto.runtimePackage.SetAccessibilityMetricRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string accessibility_metric = 2;
 * @return {string}
 */
proto.runtimePackage.SetAccessibilityMetricRequest.prototype.getAccessibilityMetric = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.SetAccessibilityMetricRequest} returns this
 */
proto.runtimePackage.SetAccessibilityMetricRequest.prototype.setAccessibilityMetric = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetAccessibilityMetricResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetAccessibilityMetricResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetAccessibilityMetricResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetAccessibilityMetricResponse}
 */
proto.runtimePackage.SetAccessibilityMetricResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetAccessibilityMetricResponse;
  return proto.runtimePackage.SetAccessibilityMetricResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetAccessibilityMetricResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetAccessibilityMetricResponse}
 */
proto.runtimePackage.SetAccessibilityMetricResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetAccessibilityMetricResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetAccessibilityMetricResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetAccessibilityMetricResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.SetAccessibilityMetricResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetAccessibilityMetricResponse} returns this
 */
proto.runtimePackage.SetAccessibilityMetricResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.CalculateAccessibilityScoreRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.CalculateAccessibilityScoreRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.CalculateAccessibilityScoreRequest}
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.CalculateAccessibilityScoreRequest;
  return proto.runtimePackage.CalculateAccessibilityScoreRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.CalculateAccessibilityScoreRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.CalculateAccessibilityScoreRequest}
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.CalculateAccessibilityScoreRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.CalculateAccessibilityScoreRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.CalculateAccessibilityScoreRequest} returns this
 */
proto.runtimePackage.CalculateAccessibilityScoreRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.CalculateAccessibilityScoreResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.CalculateAccessibilityScoreResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
accessibilityScore: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.CalculateAccessibilityScoreResponse}
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.CalculateAccessibilityScoreResponse;
  return proto.runtimePackage.CalculateAccessibilityScoreResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.CalculateAccessibilityScoreResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.CalculateAccessibilityScoreResponse}
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setAccessibilityScore(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.CalculateAccessibilityScoreResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.CalculateAccessibilityScoreResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAccessibilityScore();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.CalculateAccessibilityScoreResponse} returns this
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional float accessibility_score = 2;
 * @return {number}
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.prototype.getAccessibilityScore = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.CalculateAccessibilityScoreResponse} returns this
 */
proto.runtimePackage.CalculateAccessibilityScoreResponse.prototype.setAccessibilityScore = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetLatestEvaluationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetLatestEvaluationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetLatestEvaluationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetLatestEvaluationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetLatestEvaluationRequest}
 */
proto.runtimePackage.SetLatestEvaluationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetLatestEvaluationRequest;
  return proto.runtimePackage.SetLatestEvaluationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetLatestEvaluationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetLatestEvaluationRequest}
 */
proto.runtimePackage.SetLatestEvaluationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetLatestEvaluationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetLatestEvaluationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetLatestEvaluationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetLatestEvaluationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.SetLatestEvaluationRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetLatestEvaluationRequest} returns this
 */
proto.runtimePackage.SetLatestEvaluationRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetLatestEvaluationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetLatestEvaluationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetLatestEvaluationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetLatestEvaluationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetLatestEvaluationResponse}
 */
proto.runtimePackage.SetLatestEvaluationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetLatestEvaluationResponse;
  return proto.runtimePackage.SetLatestEvaluationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetLatestEvaluationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetLatestEvaluationResponse}
 */
proto.runtimePackage.SetLatestEvaluationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetLatestEvaluationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetLatestEvaluationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetLatestEvaluationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetLatestEvaluationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.SetLatestEvaluationResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetLatestEvaluationResponse} returns this
 */
proto.runtimePackage.SetLatestEvaluationResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.AddWebpagesRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddWebpagesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddWebpagesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddWebpagesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0),
webpagesList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f,
needsAuthentication: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
usernameFieldSelector: jspb.Message.getFieldWithDefault(msg, 5, ""),
passwordFieldSelector: jspb.Message.getFieldWithDefault(msg, 6, ""),
loginButtonSelector: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddWebpagesRequest}
 */
proto.runtimePackage.AddWebpagesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddWebpagesRequest;
  return proto.runtimePackage.AddWebpagesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddWebpagesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddWebpagesRequest}
 */
proto.runtimePackage.AddWebpagesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addWebpages(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNeedsAuthentication(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsernameFieldSelector(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setPasswordFieldSelector(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setLoginButtonSelector(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddWebpagesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddWebpagesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddWebpagesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getWebpagesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
  f = message.getNeedsAuthentication();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getUsernameFieldSelector();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getPasswordFieldSelector();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getLoginButtonSelector();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string webpages = 2;
 * @return {!Array<string>}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.getWebpagesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.setWebpagesList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.addWebpages = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.clearWebpagesList = function() {
  return this.setWebpagesList([]);
};


/**
 * optional bool needs_authentication = 3;
 * @return {boolean}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.getNeedsAuthentication = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.setNeedsAuthentication = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string username_field_selector = 5;
 * @return {string}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.getUsernameFieldSelector = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.setUsernameFieldSelector = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string password_field_selector = 6;
 * @return {string}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.getPasswordFieldSelector = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.setPasswordFieldSelector = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string login_button_selector = 7;
 * @return {string}
 */
proto.runtimePackage.AddWebpagesRequest.prototype.getLoginButtonSelector = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AddWebpagesRequest} returns this
 */
proto.runtimePackage.AddWebpagesRequest.prototype.setLoginButtonSelector = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddWebpagesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddWebpagesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddWebpagesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddWebpagesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddWebpagesResponse}
 */
proto.runtimePackage.AddWebpagesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddWebpagesResponse;
  return proto.runtimePackage.AddWebpagesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddWebpagesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddWebpagesResponse}
 */
proto.runtimePackage.AddWebpagesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddWebpagesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddWebpagesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddWebpagesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddWebpagesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.AddWebpagesResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddWebpagesResponse} returns this
 */
proto.runtimePackage.AddWebpagesResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
accessibilityMetric: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest;
  return proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccessibilityMetric(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccessibilityMetric();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string accessibility_metric = 1;
 * @return {string}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.prototype.getAccessibilityMetric = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest} returns this
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesRequest.prototype.setAccessibilityMetric = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse;
  return proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse} returns this
 */
proto.runtimePackage.SetAccessibilityMetricAllWebsitesResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.WebpageResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.WebpageResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.WebpageResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.WebpageResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.WebpageResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
url: jspb.Message.getFieldWithDefault(msg, 1, ""),
assertionsList: jspb.Message.toObjectList(msg.getAssertionsList(),
    proto.runtimePackage.AssertionResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.WebpageResponse}
 */
proto.runtimePackage.WebpageResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.WebpageResponse;
  return proto.runtimePackage.WebpageResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.WebpageResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.WebpageResponse}
 */
proto.runtimePackage.WebpageResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 2:
      var value = new proto.runtimePackage.AssertionResponse;
      reader.readMessage(value,proto.runtimePackage.AssertionResponse.deserializeBinaryFromReader);
      msg.addAssertions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.WebpageResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.WebpageResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.WebpageResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.WebpageResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAssertionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.AssertionResponse.serializeBinaryToWriter
    );
  }
};


/**
 * optional string url = 1;
 * @return {string}
 */
proto.runtimePackage.WebpageResponse.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.WebpageResponse} returns this
 */
proto.runtimePackage.WebpageResponse.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated AssertionResponse assertions = 2;
 * @return {!Array<!proto.runtimePackage.AssertionResponse>}
 */
proto.runtimePackage.WebpageResponse.prototype.getAssertionsList = function() {
  return /** @type{!Array<!proto.runtimePackage.AssertionResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.AssertionResponse, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.AssertionResponse>} value
 * @return {!proto.runtimePackage.WebpageResponse} returns this
*/
proto.runtimePackage.WebpageResponse.prototype.setAssertionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.AssertionResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AssertionResponse}
 */
proto.runtimePackage.WebpageResponse.prototype.addAssertions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.AssertionResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.WebpageResponse} returns this
 */
proto.runtimePackage.WebpageResponse.prototype.clearAssertionsList = function() {
  return this.setAssertionsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.AssertionMetadataResponse.repeatedFields_ = [7,8,9];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AssertionMetadataResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AssertionMetadataResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AssertionMetadataResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
code: jspb.Message.getFieldWithDefault(msg, 2, ""),
name: jspb.Message.getFieldWithDefault(msg, 3, ""),
description: jspb.Message.getFieldWithDefault(msg, 4, ""),
url: jspb.Message.getFieldWithDefault(msg, 5, ""),
mapping: jspb.Message.getFieldWithDefault(msg, 6, ""),
targetElementsList: (f = jspb.Message.getRepeatedField(msg, 7)) == null ? undefined : f,
targetAttributesList: (f = jspb.Message.getRepeatedField(msg, 8)) == null ? undefined : f,
successCriteriaList: jspb.Message.toObjectList(msg.getSuccessCriteriaList(),
    proto.runtimePackage.SuccessCriteria.toObject, includeInstance),
successCriteriaQuantity: jspb.Message.getFieldWithDefault(msg, 10, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AssertionMetadataResponse}
 */
proto.runtimePackage.AssertionMetadataResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AssertionMetadataResponse;
  return proto.runtimePackage.AssertionMetadataResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AssertionMetadataResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AssertionMetadataResponse}
 */
proto.runtimePackage.AssertionMetadataResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setMapping(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.addTargetElements(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.addTargetAttributes(value);
      break;
    case 9:
      var value = new proto.runtimePackage.SuccessCriteria;
      reader.readMessage(value,proto.runtimePackage.SuccessCriteria.deserializeBinaryFromReader);
      msg.addSuccessCriteria(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSuccessCriteriaQuantity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AssertionMetadataResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AssertionMetadataResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AssertionMetadataResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getCode();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getMapping();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getTargetElementsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      7,
      f
    );
  }
  f = message.getTargetAttributesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      8,
      f
    );
  }
  f = message.getSuccessCriteriaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.runtimePackage.SuccessCriteria.serializeBinaryToWriter
    );
  }
  f = message.getSuccessCriteriaQuantity();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string code = 2;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string description = 4;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string url = 5;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string mapping = 6;
 * @return {string}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getMapping = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setMapping = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * repeated string target_elements = 7;
 * @return {!Array<string>}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getTargetElementsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 7));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setTargetElementsList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.addTargetElements = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.clearTargetElementsList = function() {
  return this.setTargetElementsList([]);
};


/**
 * repeated string target_attributes = 8;
 * @return {!Array<string>}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getTargetAttributesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 8));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setTargetAttributesList = function(value) {
  return jspb.Message.setField(this, 8, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.addTargetAttributes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 8, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.clearTargetAttributesList = function() {
  return this.setTargetAttributesList([]);
};


/**
 * repeated SuccessCriteria success_criteria = 9;
 * @return {!Array<!proto.runtimePackage.SuccessCriteria>}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getSuccessCriteriaList = function() {
  return /** @type{!Array<!proto.runtimePackage.SuccessCriteria>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.SuccessCriteria, 9));
};


/**
 * @param {!Array<!proto.runtimePackage.SuccessCriteria>} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
*/
proto.runtimePackage.AssertionMetadataResponse.prototype.setSuccessCriteriaList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.runtimePackage.SuccessCriteria=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.SuccessCriteria}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.addSuccessCriteria = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.runtimePackage.SuccessCriteria, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.clearSuccessCriteriaList = function() {
  return this.setSuccessCriteriaList([]);
};


/**
 * optional int32 success_criteria_quantity = 10;
 * @return {number}
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.getSuccessCriteriaQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AssertionMetadataResponse} returns this
 */
proto.runtimePackage.AssertionMetadataResponse.prototype.setSuccessCriteriaQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.IssueResponse.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.IssueResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.IssueResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.IssueResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.IssueResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
assertionId: jspb.Message.getFieldWithDefault(msg, 2, 0),
verdict: jspb.Message.getFieldWithDefault(msg, 3, ""),
description: jspb.Message.getFieldWithDefault(msg, 4, ""),
resultCode: jspb.Message.getFieldWithDefault(msg, 5, ""),
elementsList: jspb.Message.toObjectList(msg.getElementsList(),
    proto.runtimePackage.IssueElementResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.IssueResponse}
 */
proto.runtimePackage.IssueResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.IssueResponse;
  return proto.runtimePackage.IssueResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.IssueResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.IssueResponse}
 */
proto.runtimePackage.IssueResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAssertionId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setVerdict(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setResultCode(value);
      break;
    case 6:
      var value = new proto.runtimePackage.IssueElementResponse;
      reader.readMessage(value,proto.runtimePackage.IssueElementResponse.deserializeBinaryFromReader);
      msg.addElements(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.IssueResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.IssueResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.IssueResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.IssueResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAssertionId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getVerdict();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getResultCode();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getElementsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.runtimePackage.IssueElementResponse.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.IssueResponse.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueResponse} returns this
 */
proto.runtimePackage.IssueResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 assertion_id = 2;
 * @return {number}
 */
proto.runtimePackage.IssueResponse.prototype.getAssertionId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueResponse} returns this
 */
proto.runtimePackage.IssueResponse.prototype.setAssertionId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string verdict = 3;
 * @return {string}
 */
proto.runtimePackage.IssueResponse.prototype.getVerdict = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.IssueResponse} returns this
 */
proto.runtimePackage.IssueResponse.prototype.setVerdict = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string description = 4;
 * @return {string}
 */
proto.runtimePackage.IssueResponse.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.IssueResponse} returns this
 */
proto.runtimePackage.IssueResponse.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string result_code = 5;
 * @return {string}
 */
proto.runtimePackage.IssueResponse.prototype.getResultCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.IssueResponse} returns this
 */
proto.runtimePackage.IssueResponse.prototype.setResultCode = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * repeated IssueElementResponse elements = 6;
 * @return {!Array<!proto.runtimePackage.IssueElementResponse>}
 */
proto.runtimePackage.IssueResponse.prototype.getElementsList = function() {
  return /** @type{!Array<!proto.runtimePackage.IssueElementResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.IssueElementResponse, 6));
};


/**
 * @param {!Array<!proto.runtimePackage.IssueElementResponse>} value
 * @return {!proto.runtimePackage.IssueResponse} returns this
*/
proto.runtimePackage.IssueResponse.prototype.setElementsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.runtimePackage.IssueElementResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.IssueElementResponse}
 */
proto.runtimePackage.IssueResponse.prototype.addElements = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.runtimePackage.IssueElementResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.IssueResponse} returns this
 */
proto.runtimePackage.IssueResponse.prototype.clearElementsList = function() {
  return this.setElementsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.IssueElementResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.IssueElementResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.IssueElementResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.IssueElementResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
htmlCode: jspb.Message.getFieldWithDefault(msg, 2, ""),
pointer: jspb.Message.getFieldWithDefault(msg, 3, ""),
x: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
y: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
width: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
height: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
evaluationId: jspb.Message.getFieldWithDefault(msg, 8, 0),
webpageUrl: jspb.Message.getFieldWithDefault(msg, 9, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.IssueElementResponse}
 */
proto.runtimePackage.IssueElementResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.IssueElementResponse;
  return proto.runtimePackage.IssueElementResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.IssueElementResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.IssueElementResponse}
 */
proto.runtimePackage.IssueElementResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setHtmlCode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPointer(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setX(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setY(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setWidth(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHeight(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEvaluationId(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setWebpageUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.IssueElementResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.IssueElementResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.IssueElementResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.IssueElementResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getHtmlCode();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPointer();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getX();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getWidth();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getHeight();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = message.getEvaluationId();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getWebpageUrl();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.IssueElementResponse.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string html_code = 2;
 * @return {string}
 */
proto.runtimePackage.IssueElementResponse.prototype.getHtmlCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setHtmlCode = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string pointer = 3;
 * @return {string}
 */
proto.runtimePackage.IssueElementResponse.prototype.getPointer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setPointer = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float x = 4;
 * @return {number}
 */
proto.runtimePackage.IssueElementResponse.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional float y = 5;
 * @return {number}
 */
proto.runtimePackage.IssueElementResponse.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float width = 6;
 * @return {number}
 */
proto.runtimePackage.IssueElementResponse.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setWidth = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional float height = 7;
 * @return {number}
 */
proto.runtimePackage.IssueElementResponse.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setHeight = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional int32 evaluation_id = 8;
 * @return {number}
 */
proto.runtimePackage.IssueElementResponse.prototype.getEvaluationId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setEvaluationId = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional string webpage_url = 9;
 * @return {string}
 */
proto.runtimePackage.IssueElementResponse.prototype.getWebpageUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.IssueElementResponse} returns this
 */
proto.runtimePackage.IssueElementResponse.prototype.setWebpageUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetCurrentWarningsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetCurrentWarningsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetCurrentWarningsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetCurrentWarningsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetCurrentWarningsRequest}
 */
proto.runtimePackage.GetCurrentWarningsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetCurrentWarningsRequest;
  return proto.runtimePackage.GetCurrentWarningsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetCurrentWarningsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetCurrentWarningsRequest}
 */
proto.runtimePackage.GetCurrentWarningsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetCurrentWarningsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetCurrentWarningsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetCurrentWarningsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetCurrentWarningsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetCurrentWarningsRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetCurrentWarningsRequest} returns this
 */
proto.runtimePackage.GetCurrentWarningsRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetCurrentWarningsResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetCurrentWarningsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetCurrentWarningsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetCurrentWarningsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetCurrentWarningsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
warningsList: jspb.Message.toObjectList(msg.getWarningsList(),
    proto.runtimePackage.AssertionResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetCurrentWarningsResponse}
 */
proto.runtimePackage.GetCurrentWarningsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetCurrentWarningsResponse;
  return proto.runtimePackage.GetCurrentWarningsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetCurrentWarningsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetCurrentWarningsResponse}
 */
proto.runtimePackage.GetCurrentWarningsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.AssertionResponse;
      reader.readMessage(value,proto.runtimePackage.AssertionResponse.deserializeBinaryFromReader);
      msg.addWarnings(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetCurrentWarningsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetCurrentWarningsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetCurrentWarningsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetCurrentWarningsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getWarningsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.AssertionResponse.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetCurrentWarningsResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetCurrentWarningsResponse} returns this
 */
proto.runtimePackage.GetCurrentWarningsResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated AssertionResponse warnings = 2;
 * @return {!Array<!proto.runtimePackage.AssertionResponse>}
 */
proto.runtimePackage.GetCurrentWarningsResponse.prototype.getWarningsList = function() {
  return /** @type{!Array<!proto.runtimePackage.AssertionResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.AssertionResponse, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.AssertionResponse>} value
 * @return {!proto.runtimePackage.GetCurrentWarningsResponse} returns this
*/
proto.runtimePackage.GetCurrentWarningsResponse.prototype.setWarningsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.AssertionResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AssertionResponse}
 */
proto.runtimePackage.GetCurrentWarningsResponse.prototype.addWarnings = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.AssertionResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetCurrentWarningsResponse} returns this
 */
proto.runtimePackage.GetCurrentWarningsResponse.prototype.clearWarningsList = function() {
  return this.setWarningsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebsiteScoreRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebsiteScoreRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebsiteScoreRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteScoreRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebsiteScoreRequest}
 */
proto.runtimePackage.GetWebsiteScoreRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebsiteScoreRequest;
  return proto.runtimePackage.GetWebsiteScoreRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebsiteScoreRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebsiteScoreRequest}
 */
proto.runtimePackage.GetWebsiteScoreRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebsiteScoreRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebsiteScoreRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebsiteScoreRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteScoreRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebsiteScoreRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebsiteScoreRequest} returns this
 */
proto.runtimePackage.GetWebsiteScoreRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebsiteScoreResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebsiteScoreResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebsiteScoreResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteScoreResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
score: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebsiteScoreResponse}
 */
proto.runtimePackage.GetWebsiteScoreResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebsiteScoreResponse;
  return proto.runtimePackage.GetWebsiteScoreResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebsiteScoreResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebsiteScoreResponse}
 */
proto.runtimePackage.GetWebsiteScoreResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setScore(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebsiteScoreResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebsiteScoreResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebsiteScoreResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteScoreResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getScore();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebsiteScoreResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebsiteScoreResponse} returns this
 */
proto.runtimePackage.GetWebsiteScoreResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional float score = 2;
 * @return {number}
 */
proto.runtimePackage.GetWebsiteScoreResponse.prototype.getScore = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebsiteScoreResponse} returns this
 */
proto.runtimePackage.GetWebsiteScoreResponse.prototype.setScore = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetIssuesStatsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetIssuesStatsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetIssuesStatsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetIssuesStatsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetIssuesStatsRequest}
 */
proto.runtimePackage.GetIssuesStatsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetIssuesStatsRequest;
  return proto.runtimePackage.GetIssuesStatsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetIssuesStatsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetIssuesStatsRequest}
 */
proto.runtimePackage.GetIssuesStatsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetIssuesStatsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetIssuesStatsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetIssuesStatsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetIssuesStatsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetIssuesStatsRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetIssuesStatsRequest} returns this
 */
proto.runtimePackage.GetIssuesStatsRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetIssuesStatsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetIssuesStatsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetIssuesStatsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
passed: jspb.Message.getFieldWithDefault(msg, 2, 0),
warnings: jspb.Message.getFieldWithDefault(msg, 3, 0),
failed: jspb.Message.getFieldWithDefault(msg, 4, 0),
inapplicable: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetIssuesStatsResponse}
 */
proto.runtimePackage.GetIssuesStatsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetIssuesStatsResponse;
  return proto.runtimePackage.GetIssuesStatsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetIssuesStatsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetIssuesStatsResponse}
 */
proto.runtimePackage.GetIssuesStatsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPassed(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWarnings(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFailed(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInapplicable(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetIssuesStatsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetIssuesStatsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetIssuesStatsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getPassed();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getWarnings();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getFailed();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getInapplicable();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetIssuesStatsResponse} returns this
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 passed = 2;
 * @return {number}
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.getPassed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetIssuesStatsResponse} returns this
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.setPassed = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 warnings = 3;
 * @return {number}
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.getWarnings = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetIssuesStatsResponse} returns this
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.setWarnings = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 failed = 4;
 * @return {number}
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.getFailed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetIssuesStatsResponse} returns this
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.setFailed = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 inapplicable = 5;
 * @return {number}
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.getInapplicable = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetIssuesStatsResponse} returns this
 */
proto.runtimePackage.GetIssuesStatsResponse.prototype.setInapplicable = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebpageScreenshotRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebpageScreenshotRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebpageScreenshotRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageScreenshotRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
evaluationId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebpageScreenshotRequest}
 */
proto.runtimePackage.GetWebpageScreenshotRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebpageScreenshotRequest;
  return proto.runtimePackage.GetWebpageScreenshotRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebpageScreenshotRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebpageScreenshotRequest}
 */
proto.runtimePackage.GetWebpageScreenshotRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEvaluationId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebpageScreenshotRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebpageScreenshotRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebpageScreenshotRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageScreenshotRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvaluationId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 evaluation_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebpageScreenshotRequest.prototype.getEvaluationId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebpageScreenshotRequest} returns this
 */
proto.runtimePackage.GetWebpageScreenshotRequest.prototype.setEvaluationId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebpageScreenshotResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebpageScreenshotResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageScreenshotResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
screenshot: msg.getScreenshot_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebpageScreenshotResponse}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebpageScreenshotResponse;
  return proto.runtimePackage.GetWebpageScreenshotResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebpageScreenshotResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebpageScreenshotResponse}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setScreenshot(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebpageScreenshotResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebpageScreenshotResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageScreenshotResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getScreenshot_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebpageScreenshotResponse} returns this
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes screenshot = 2;
 * @return {!(string|Uint8Array)}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.getScreenshot = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes screenshot = 2;
 * This is a type-conversion wrapper around `getScreenshot()`
 * @return {string}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.getScreenshot_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getScreenshot()));
};


/**
 * optional bytes screenshot = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getScreenshot()`
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.getScreenshot_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getScreenshot()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.runtimePackage.GetWebpageScreenshotResponse} returns this
 */
proto.runtimePackage.GetWebpageScreenshotResponse.prototype.setScreenshot = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetLatestEvaluationsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetLatestEvaluationsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetLatestEvaluationsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestEvaluationsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetLatestEvaluationsRequest}
 */
proto.runtimePackage.GetLatestEvaluationsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetLatestEvaluationsRequest;
  return proto.runtimePackage.GetLatestEvaluationsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetLatestEvaluationsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetLatestEvaluationsRequest}
 */
proto.runtimePackage.GetLatestEvaluationsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetLatestEvaluationsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetLatestEvaluationsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetLatestEvaluationsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestEvaluationsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetLatestEvaluationsRequest.prototype.getMonitoringId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetLatestEvaluationsRequest} returns this
 */
proto.runtimePackage.GetLatestEvaluationsRequest.prototype.setMonitoringId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetLatestEvaluationsResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetLatestEvaluationsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetLatestEvaluationsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestEvaluationsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
evaluationsList: jspb.Message.toObjectList(msg.getEvaluationsList(),
    proto.runtimePackage.EvaluationIdUrl.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetLatestEvaluationsResponse}
 */
proto.runtimePackage.GetLatestEvaluationsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetLatestEvaluationsResponse;
  return proto.runtimePackage.GetLatestEvaluationsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetLatestEvaluationsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetLatestEvaluationsResponse}
 */
proto.runtimePackage.GetLatestEvaluationsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.EvaluationIdUrl;
      reader.readMessage(value,proto.runtimePackage.EvaluationIdUrl.deserializeBinaryFromReader);
      msg.addEvaluations(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetLatestEvaluationsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetLatestEvaluationsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestEvaluationsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getEvaluationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.EvaluationIdUrl.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetLatestEvaluationsResponse} returns this
 */
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated EvaluationIdUrl evaluations = 2;
 * @return {!Array<!proto.runtimePackage.EvaluationIdUrl>}
 */
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.getEvaluationsList = function() {
  return /** @type{!Array<!proto.runtimePackage.EvaluationIdUrl>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.EvaluationIdUrl, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.EvaluationIdUrl>} value
 * @return {!proto.runtimePackage.GetLatestEvaluationsResponse} returns this
*/
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.setEvaluationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.EvaluationIdUrl=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.EvaluationIdUrl}
 */
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.addEvaluations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.EvaluationIdUrl, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetLatestEvaluationsResponse} returns this
 */
proto.runtimePackage.GetLatestEvaluationsResponse.prototype.clearEvaluationsList = function() {
  return this.setEvaluationsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.EvaluationIdUrl.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.EvaluationIdUrl.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.EvaluationIdUrl} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.EvaluationIdUrl.toObject = function(includeInstance, msg) {
  var f, obj = {
evaluationId: jspb.Message.getFieldWithDefault(msg, 1, 0),
evaluationUrl: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.EvaluationIdUrl}
 */
proto.runtimePackage.EvaluationIdUrl.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.EvaluationIdUrl;
  return proto.runtimePackage.EvaluationIdUrl.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.EvaluationIdUrl} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.EvaluationIdUrl}
 */
proto.runtimePackage.EvaluationIdUrl.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEvaluationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setEvaluationUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.EvaluationIdUrl.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.EvaluationIdUrl.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.EvaluationIdUrl} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.EvaluationIdUrl.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvaluationId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getEvaluationUrl();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 evaluation_id = 1;
 * @return {number}
 */
proto.runtimePackage.EvaluationIdUrl.prototype.getEvaluationId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvaluationIdUrl} returns this
 */
proto.runtimePackage.EvaluationIdUrl.prototype.setEvaluationId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string evaluation_url = 2;
 * @return {string}
 */
proto.runtimePackage.EvaluationIdUrl.prototype.getEvaluationUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.EvaluationIdUrl} returns this
 */
proto.runtimePackage.EvaluationIdUrl.prototype.setEvaluationUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetLatestAssertionsRequest.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetLatestAssertionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetLatestAssertionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestAssertionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
evaluationId: jspb.Message.getFieldWithDefault(msg, 1, 0),
moduleType: jspb.Message.getFieldWithDefault(msg, 2, ""),
wcagguidelinesfiltersList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
wcaglevelfiltersList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
outcome: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest}
 */
proto.runtimePackage.GetLatestAssertionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetLatestAssertionsRequest;
  return proto.runtimePackage.GetLatestAssertionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetLatestAssertionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest}
 */
proto.runtimePackage.GetLatestAssertionsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEvaluationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setModuleType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addWcagguidelinesfilters(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addWcaglevelfilters(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setOutcome(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetLatestAssertionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetLatestAssertionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestAssertionsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvaluationId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getModuleType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getWcagguidelinesfiltersList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getWcaglevelfiltersList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = message.getOutcome();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional int32 evaluation_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.getEvaluationId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.setEvaluationId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string module_type = 2;
 * @return {string}
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.getModuleType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.setModuleType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated string wcagGuidelinesFilters = 3;
 * @return {!Array<string>}
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.getWcagguidelinesfiltersList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.setWcagguidelinesfiltersList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.addWcagguidelinesfilters = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.clearWcagguidelinesfiltersList = function() {
  return this.setWcagguidelinesfiltersList([]);
};


/**
 * repeated string wcagLevelFilters = 4;
 * @return {!Array<string>}
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.getWcaglevelfiltersList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.setWcaglevelfiltersList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.addWcaglevelfilters = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.clearWcaglevelfiltersList = function() {
  return this.setWcaglevelfiltersList([]);
};


/**
 * optional string outcome = 5;
 * @return {string}
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.getOutcome = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetLatestAssertionsRequest} returns this
 */
proto.runtimePackage.GetLatestAssertionsRequest.prototype.setOutcome = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetLatestAssertionsResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetLatestAssertionsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetLatestAssertionsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetLatestAssertionsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestAssertionsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
assertionsList: jspb.Message.toObjectList(msg.getAssertionsList(),
    proto.runtimePackage.AssertionResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetLatestAssertionsResponse}
 */
proto.runtimePackage.GetLatestAssertionsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetLatestAssertionsResponse;
  return proto.runtimePackage.GetLatestAssertionsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetLatestAssertionsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetLatestAssertionsResponse}
 */
proto.runtimePackage.GetLatestAssertionsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.AssertionResponse;
      reader.readMessage(value,proto.runtimePackage.AssertionResponse.deserializeBinaryFromReader);
      msg.addAssertions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetLatestAssertionsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetLatestAssertionsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetLatestAssertionsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetLatestAssertionsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAssertionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.AssertionResponse.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetLatestAssertionsResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetLatestAssertionsResponse} returns this
 */
proto.runtimePackage.GetLatestAssertionsResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated AssertionResponse assertions = 2;
 * @return {!Array<!proto.runtimePackage.AssertionResponse>}
 */
proto.runtimePackage.GetLatestAssertionsResponse.prototype.getAssertionsList = function() {
  return /** @type{!Array<!proto.runtimePackage.AssertionResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.AssertionResponse, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.AssertionResponse>} value
 * @return {!proto.runtimePackage.GetLatestAssertionsResponse} returns this
*/
proto.runtimePackage.GetLatestAssertionsResponse.prototype.setAssertionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.AssertionResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.AssertionResponse}
 */
proto.runtimePackage.GetLatestAssertionsResponse.prototype.addAssertions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.AssertionResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetLatestAssertionsResponse} returns this
 */
proto.runtimePackage.GetLatestAssertionsResponse.prototype.clearAssertionsList = function() {
  return this.setAssertionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AssertionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AssertionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AssertionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AssertionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
assertionId: jspb.Message.getFieldWithDefault(msg, 1, 0),
assertionName: jspb.Message.getFieldWithDefault(msg, 2, ""),
assertionRule: jspb.Message.getFieldWithDefault(msg, 3, ""),
evaluationId: jspb.Message.getFieldWithDefault(msg, 4, 0),
webpageUrl: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AssertionResponse}
 */
proto.runtimePackage.AssertionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AssertionResponse;
  return proto.runtimePackage.AssertionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AssertionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AssertionResponse}
 */
proto.runtimePackage.AssertionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAssertionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssertionName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssertionRule(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEvaluationId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setWebpageUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AssertionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AssertionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AssertionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AssertionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAssertionId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAssertionName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAssertionRule();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getEvaluationId();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getWebpageUrl();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional int32 assertion_id = 1;
 * @return {number}
 */
proto.runtimePackage.AssertionResponse.prototype.getAssertionId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AssertionResponse} returns this
 */
proto.runtimePackage.AssertionResponse.prototype.setAssertionId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string assertion_name = 2;
 * @return {string}
 */
proto.runtimePackage.AssertionResponse.prototype.getAssertionName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionResponse} returns this
 */
proto.runtimePackage.AssertionResponse.prototype.setAssertionName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string assertion_rule = 3;
 * @return {string}
 */
proto.runtimePackage.AssertionResponse.prototype.getAssertionRule = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionResponse} returns this
 */
proto.runtimePackage.AssertionResponse.prototype.setAssertionRule = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 evaluation_id = 4;
 * @return {number}
 */
proto.runtimePackage.AssertionResponse.prototype.getEvaluationId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AssertionResponse} returns this
 */
proto.runtimePackage.AssertionResponse.prototype.setEvaluationId = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string webpage_url = 5;
 * @return {string}
 */
proto.runtimePackage.AssertionResponse.prototype.getWebpageUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.AssertionResponse} returns this
 */
proto.runtimePackage.AssertionResponse.prototype.setWebpageUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetAssertionResultsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetAssertionResultsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetAssertionResultsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetAssertionResultsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
assertionId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetAssertionResultsRequest}
 */
proto.runtimePackage.GetAssertionResultsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetAssertionResultsRequest;
  return proto.runtimePackage.GetAssertionResultsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetAssertionResultsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetAssertionResultsRequest}
 */
proto.runtimePackage.GetAssertionResultsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAssertionId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetAssertionResultsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetAssertionResultsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetAssertionResultsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetAssertionResultsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAssertionId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 assertion_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetAssertionResultsRequest.prototype.getAssertionId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetAssertionResultsRequest} returns this
 */
proto.runtimePackage.GetAssertionResultsRequest.prototype.setAssertionId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetAssertionResultsResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetAssertionResultsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetAssertionResultsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetAssertionResultsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetAssertionResultsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
resultsList: jspb.Message.toObjectList(msg.getResultsList(),
    proto.runtimePackage.ResultResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetAssertionResultsResponse}
 */
proto.runtimePackage.GetAssertionResultsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetAssertionResultsResponse;
  return proto.runtimePackage.GetAssertionResultsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetAssertionResultsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetAssertionResultsResponse}
 */
proto.runtimePackage.GetAssertionResultsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.ResultResponse;
      reader.readMessage(value,proto.runtimePackage.ResultResponse.deserializeBinaryFromReader);
      msg.addResults(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetAssertionResultsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetAssertionResultsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetAssertionResultsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetAssertionResultsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getResultsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.ResultResponse.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetAssertionResultsResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetAssertionResultsResponse} returns this
 */
proto.runtimePackage.GetAssertionResultsResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated ResultResponse results = 2;
 * @return {!Array<!proto.runtimePackage.ResultResponse>}
 */
proto.runtimePackage.GetAssertionResultsResponse.prototype.getResultsList = function() {
  return /** @type{!Array<!proto.runtimePackage.ResultResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.ResultResponse, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.ResultResponse>} value
 * @return {!proto.runtimePackage.GetAssertionResultsResponse} returns this
*/
proto.runtimePackage.GetAssertionResultsResponse.prototype.setResultsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.ResultResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.ResultResponse}
 */
proto.runtimePackage.GetAssertionResultsResponse.prototype.addResults = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.ResultResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetAssertionResultsResponse} returns this
 */
proto.runtimePackage.GetAssertionResultsResponse.prototype.clearResultsList = function() {
  return this.setResultsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.ResultResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.ResultResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.ResultResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.ResultResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
description: jspb.Message.getFieldWithDefault(msg, 2, ""),
verdict: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.ResultResponse}
 */
proto.runtimePackage.ResultResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.ResultResponse;
  return proto.runtimePackage.ResultResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.ResultResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.ResultResponse}
 */
proto.runtimePackage.ResultResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setVerdict(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.ResultResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.ResultResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.ResultResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.ResultResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getVerdict();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.ResultResponse.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.ResultResponse} returns this
 */
proto.runtimePackage.ResultResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string description = 2;
 * @return {string}
 */
proto.runtimePackage.ResultResponse.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.ResultResponse} returns this
 */
proto.runtimePackage.ResultResponse.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string verdict = 3;
 * @return {string}
 */
proto.runtimePackage.ResultResponse.prototype.getVerdict = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.ResultResponse} returns this
 */
proto.runtimePackage.ResultResponse.prototype.setVerdict = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetResultElementsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetResultElementsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetResultElementsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetResultElementsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
issueId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetResultElementsRequest}
 */
proto.runtimePackage.GetResultElementsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetResultElementsRequest;
  return proto.runtimePackage.GetResultElementsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetResultElementsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetResultElementsRequest}
 */
proto.runtimePackage.GetResultElementsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setIssueId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetResultElementsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetResultElementsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetResultElementsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetResultElementsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIssueId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 issue_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetResultElementsRequest.prototype.getIssueId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetResultElementsRequest} returns this
 */
proto.runtimePackage.GetResultElementsRequest.prototype.setIssueId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetResultElementsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetResultElementsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetResultElementsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetResultElementsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
element: (f = msg.getElement()) && proto.runtimePackage.ElementResponse.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetResultElementsResponse}
 */
proto.runtimePackage.GetResultElementsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetResultElementsResponse;
  return proto.runtimePackage.GetResultElementsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetResultElementsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetResultElementsResponse}
 */
proto.runtimePackage.GetResultElementsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.ElementResponse;
      reader.readMessage(value,proto.runtimePackage.ElementResponse.deserializeBinaryFromReader);
      msg.setElement(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetResultElementsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetResultElementsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetResultElementsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetResultElementsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getElement();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.runtimePackage.ElementResponse.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetResultElementsResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetResultElementsResponse} returns this
 */
proto.runtimePackage.GetResultElementsResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional ElementResponse element = 2;
 * @return {?proto.runtimePackage.ElementResponse}
 */
proto.runtimePackage.GetResultElementsResponse.prototype.getElement = function() {
  return /** @type{?proto.runtimePackage.ElementResponse} */ (
    jspb.Message.getWrapperField(this, proto.runtimePackage.ElementResponse, 2));
};


/**
 * @param {?proto.runtimePackage.ElementResponse|undefined} value
 * @return {!proto.runtimePackage.GetResultElementsResponse} returns this
*/
proto.runtimePackage.GetResultElementsResponse.prototype.setElement = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.runtimePackage.GetResultElementsResponse} returns this
 */
proto.runtimePackage.GetResultElementsResponse.prototype.clearElement = function() {
  return this.setElement(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.runtimePackage.GetResultElementsResponse.prototype.hasElement = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.ElementResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.ElementResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.ElementResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.ElementResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
htmlCode: jspb.Message.getFieldWithDefault(msg, 2, ""),
pointer: jspb.Message.getFieldWithDefault(msg, 3, ""),
x: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
y: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
width: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
height: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.ElementResponse}
 */
proto.runtimePackage.ElementResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.ElementResponse;
  return proto.runtimePackage.ElementResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.ElementResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.ElementResponse}
 */
proto.runtimePackage.ElementResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setHtmlCode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPointer(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setX(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setY(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setWidth(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.ElementResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.ElementResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.ElementResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.ElementResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getHtmlCode();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPointer();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getX();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getWidth();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getHeight();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.ElementResponse.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.ElementResponse} returns this
 */
proto.runtimePackage.ElementResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string html_code = 2;
 * @return {string}
 */
proto.runtimePackage.ElementResponse.prototype.getHtmlCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.ElementResponse} returns this
 */
proto.runtimePackage.ElementResponse.prototype.setHtmlCode = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string pointer = 3;
 * @return {string}
 */
proto.runtimePackage.ElementResponse.prototype.getPointer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.ElementResponse} returns this
 */
proto.runtimePackage.ElementResponse.prototype.setPointer = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float x = 4;
 * @return {number}
 */
proto.runtimePackage.ElementResponse.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.ElementResponse} returns this
 */
proto.runtimePackage.ElementResponse.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional float y = 5;
 * @return {number}
 */
proto.runtimePackage.ElementResponse.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.ElementResponse} returns this
 */
proto.runtimePackage.ElementResponse.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float width = 6;
 * @return {number}
 */
proto.runtimePackage.ElementResponse.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.ElementResponse} returns this
 */
proto.runtimePackage.ElementResponse.prototype.setWidth = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional float height = 7;
 * @return {number}
 */
proto.runtimePackage.ElementResponse.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.ElementResponse} returns this
 */
proto.runtimePackage.ElementResponse.prototype.setHeight = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetEvaluationHistoryRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetEvaluationHistoryRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetEvaluationHistoryRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationHistoryRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetEvaluationHistoryRequest}
 */
proto.runtimePackage.GetEvaluationHistoryRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetEvaluationHistoryRequest;
  return proto.runtimePackage.GetEvaluationHistoryRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetEvaluationHistoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetEvaluationHistoryRequest}
 */
proto.runtimePackage.GetEvaluationHistoryRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetEvaluationHistoryRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetEvaluationHistoryRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetEvaluationHistoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationHistoryRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetEvaluationHistoryRequest.prototype.getMonitoringId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetEvaluationHistoryRequest} returns this
 */
proto.runtimePackage.GetEvaluationHistoryRequest.prototype.setMonitoringId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetEvaluationHistoryResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetEvaluationHistoryResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetEvaluationHistoryResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationHistoryResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
historyList: jspb.Message.toObjectList(msg.getHistoryList(),
    proto.runtimePackage.EvaluationHistory.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetEvaluationHistoryResponse}
 */
proto.runtimePackage.GetEvaluationHistoryResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetEvaluationHistoryResponse;
  return proto.runtimePackage.GetEvaluationHistoryResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetEvaluationHistoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetEvaluationHistoryResponse}
 */
proto.runtimePackage.GetEvaluationHistoryResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.EvaluationHistory;
      reader.readMessage(value,proto.runtimePackage.EvaluationHistory.deserializeBinaryFromReader);
      msg.addHistory(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetEvaluationHistoryResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetEvaluationHistoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationHistoryResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getHistoryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.EvaluationHistory.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetEvaluationHistoryResponse} returns this
 */
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated EvaluationHistory history = 2;
 * @return {!Array<!proto.runtimePackage.EvaluationHistory>}
 */
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.getHistoryList = function() {
  return /** @type{!Array<!proto.runtimePackage.EvaluationHistory>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.EvaluationHistory, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.EvaluationHistory>} value
 * @return {!proto.runtimePackage.GetEvaluationHistoryResponse} returns this
*/
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.setHistoryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.EvaluationHistory=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.EvaluationHistory}
 */
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.addHistory = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.EvaluationHistory, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetEvaluationHistoryResponse} returns this
 */
proto.runtimePackage.GetEvaluationHistoryResponse.prototype.clearHistoryList = function() {
  return this.setHistoryList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.EvaluationHistory.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.EvaluationHistory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.EvaluationHistory} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.EvaluationHistory.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
title: jspb.Message.getFieldWithDefault(msg, 2, ""),
inputUrl: jspb.Message.getFieldWithDefault(msg, 3, ""),
score: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
evalDate: (f = msg.getEvalDate()) && proto.runtimePackage.EvalDate.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.EvaluationHistory}
 */
proto.runtimePackage.EvaluationHistory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.EvaluationHistory;
  return proto.runtimePackage.EvaluationHistory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.EvaluationHistory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.EvaluationHistory}
 */
proto.runtimePackage.EvaluationHistory.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setInputUrl(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setScore(value);
      break;
    case 5:
      var value = new proto.runtimePackage.EvalDate;
      reader.readMessage(value,proto.runtimePackage.EvalDate.deserializeBinaryFromReader);
      msg.setEvalDate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.EvaluationHistory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.EvaluationHistory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.EvaluationHistory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.EvaluationHistory.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getInputUrl();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getScore();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getEvalDate();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.runtimePackage.EvalDate.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.EvaluationHistory.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvaluationHistory} returns this
 */
proto.runtimePackage.EvaluationHistory.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string title = 2;
 * @return {string}
 */
proto.runtimePackage.EvaluationHistory.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.EvaluationHistory} returns this
 */
proto.runtimePackage.EvaluationHistory.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string input_url = 3;
 * @return {string}
 */
proto.runtimePackage.EvaluationHistory.prototype.getInputUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.EvaluationHistory} returns this
 */
proto.runtimePackage.EvaluationHistory.prototype.setInputUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float score = 4;
 * @return {number}
 */
proto.runtimePackage.EvaluationHistory.prototype.getScore = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvaluationHistory} returns this
 */
proto.runtimePackage.EvaluationHistory.prototype.setScore = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional EvalDate eval_date = 5;
 * @return {?proto.runtimePackage.EvalDate}
 */
proto.runtimePackage.EvaluationHistory.prototype.getEvalDate = function() {
  return /** @type{?proto.runtimePackage.EvalDate} */ (
    jspb.Message.getWrapperField(this, proto.runtimePackage.EvalDate, 5));
};


/**
 * @param {?proto.runtimePackage.EvalDate|undefined} value
 * @return {!proto.runtimePackage.EvaluationHistory} returns this
*/
proto.runtimePackage.EvaluationHistory.prototype.setEvalDate = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.runtimePackage.EvaluationHistory} returns this
 */
proto.runtimePackage.EvaluationHistory.prototype.clearEvalDate = function() {
  return this.setEvalDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.runtimePackage.EvaluationHistory.prototype.hasEvalDate = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.EvalDate.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.EvalDate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.EvalDate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.EvalDate.toObject = function(includeInstance, msg) {
  var f, obj = {
day: jspb.Message.getFieldWithDefault(msg, 1, 0),
month: jspb.Message.getFieldWithDefault(msg, 2, 0),
year: jspb.Message.getFieldWithDefault(msg, 3, 0),
hour: jspb.Message.getFieldWithDefault(msg, 4, 0),
minute: jspb.Message.getFieldWithDefault(msg, 5, 0),
second: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.EvalDate}
 */
proto.runtimePackage.EvalDate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.EvalDate;
  return proto.runtimePackage.EvalDate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.EvalDate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.EvalDate}
 */
proto.runtimePackage.EvalDate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDay(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonth(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setYear(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHour(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMinute(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSecond(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.EvalDate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.EvalDate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.EvalDate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.EvalDate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDay();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMonth();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getYear();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getHour();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getMinute();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getSecond();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
};


/**
 * optional int32 day = 1;
 * @return {number}
 */
proto.runtimePackage.EvalDate.prototype.getDay = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvalDate} returns this
 */
proto.runtimePackage.EvalDate.prototype.setDay = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 month = 2;
 * @return {number}
 */
proto.runtimePackage.EvalDate.prototype.getMonth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvalDate} returns this
 */
proto.runtimePackage.EvalDate.prototype.setMonth = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 year = 3;
 * @return {number}
 */
proto.runtimePackage.EvalDate.prototype.getYear = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvalDate} returns this
 */
proto.runtimePackage.EvalDate.prototype.setYear = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 hour = 4;
 * @return {number}
 */
proto.runtimePackage.EvalDate.prototype.getHour = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvalDate} returns this
 */
proto.runtimePackage.EvalDate.prototype.setHour = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 minute = 5;
 * @return {number}
 */
proto.runtimePackage.EvalDate.prototype.getMinute = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvalDate} returns this
 */
proto.runtimePackage.EvalDate.prototype.setMinute = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 second = 6;
 * @return {number}
 */
proto.runtimePackage.EvalDate.prototype.getSecond = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.EvalDate} returns this
 */
proto.runtimePackage.EvalDate.prototype.setSecond = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetUserMonitoringRegistriesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetUserMonitoringRegistriesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
userId: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesRequest}
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetUserMonitoringRegistriesRequest;
  return proto.runtimePackage.GetUserMonitoringRegistriesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetUserMonitoringRegistriesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesRequest}
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetUserMonitoringRegistriesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetUserMonitoringRegistriesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 user_id = 2;
 * @return {number}
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.prototype.getUserId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesRequest} returns this
 */
proto.runtimePackage.GetUserMonitoringRegistriesRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetUserMonitoringRegistriesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetUserMonitoringRegistriesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
monitoringRegistriesList: jspb.Message.toObjectList(msg.getMonitoringRegistriesList(),
    proto.runtimePackage.MonitoringRegistry.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesResponse}
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetUserMonitoringRegistriesResponse;
  return proto.runtimePackage.GetUserMonitoringRegistriesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetUserMonitoringRegistriesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesResponse}
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.MonitoringRegistry;
      reader.readMessage(value,proto.runtimePackage.MonitoringRegistry.deserializeBinaryFromReader);
      msg.addMonitoringRegistries(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetUserMonitoringRegistriesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetUserMonitoringRegistriesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMonitoringRegistriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.MonitoringRegistry.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesResponse} returns this
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated MonitoringRegistry monitoring_registries = 2;
 * @return {!Array<!proto.runtimePackage.MonitoringRegistry>}
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.getMonitoringRegistriesList = function() {
  return /** @type{!Array<!proto.runtimePackage.MonitoringRegistry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.MonitoringRegistry, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.MonitoringRegistry>} value
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesResponse} returns this
*/
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.setMonitoringRegistriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.MonitoringRegistry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.MonitoringRegistry}
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.addMonitoringRegistries = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.MonitoringRegistry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetUserMonitoringRegistriesResponse} returns this
 */
proto.runtimePackage.GetUserMonitoringRegistriesResponse.prototype.clearMonitoringRegistriesList = function() {
  return this.setMonitoringRegistriesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.MonitoringRegistry.repeatedFields_ = [9];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.MonitoringRegistry.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.MonitoringRegistry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.MonitoringRegistry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.MonitoringRegistry.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
accessibilityMetric: jspb.Message.getFieldWithDefault(msg, 2, ""),
name: jspb.Message.getFieldWithDefault(msg, 3, ""),
mainUrl: jspb.Message.getFieldWithDefault(msg, 4, ""),
isMobile: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
isLandscape: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
displayWidth: jspb.Message.getFieldWithDefault(msg, 7, 0),
displayHeight: jspb.Message.getFieldWithDefault(msg, 8, 0),
webpagesList: (f = jspb.Message.getRepeatedField(msg, 9)) == null ? undefined : f,
latestEvaluation: (f = msg.getLatestEvaluation()) && proto.runtimePackage.EvalDate.toObject(includeInstance, f),
score: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0),
passed: jspb.Message.getFieldWithDefault(msg, 12, 0),
warnings: jspb.Message.getFieldWithDefault(msg, 13, 0),
failed: jspb.Message.getFieldWithDefault(msg, 14, 0),
inapplicable: jspb.Message.getFieldWithDefault(msg, 15, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.MonitoringRegistry}
 */
proto.runtimePackage.MonitoringRegistry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.MonitoringRegistry;
  return proto.runtimePackage.MonitoringRegistry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.MonitoringRegistry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.MonitoringRegistry}
 */
proto.runtimePackage.MonitoringRegistry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccessibilityMetric(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMainUrl(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsMobile(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsLandscape(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayWidth(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayHeight(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.addWebpages(value);
      break;
    case 10:
      var value = new proto.runtimePackage.EvalDate;
      reader.readMessage(value,proto.runtimePackage.EvalDate.deserializeBinaryFromReader);
      msg.setLatestEvaluation(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setScore(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPassed(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWarnings(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFailed(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInapplicable(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.MonitoringRegistry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.MonitoringRegistry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.MonitoringRegistry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.MonitoringRegistry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAccessibilityMetric();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getMainUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getIsMobile();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getIsLandscape();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getDisplayWidth();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getDisplayHeight();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getWebpagesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      9,
      f
    );
  }
  f = message.getLatestEvaluation();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.runtimePackage.EvalDate.serializeBinaryToWriter
    );
  }
  f = message.getScore();
  if (f !== 0.0) {
    writer.writeFloat(
      11,
      f
    );
  }
  f = message.getPassed();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getWarnings();
  if (f !== 0) {
    writer.writeInt32(
      13,
      f
    );
  }
  f = message.getFailed();
  if (f !== 0) {
    writer.writeInt32(
      14,
      f
    );
  }
  f = message.getInapplicable();
  if (f !== 0) {
    writer.writeInt32(
      15,
      f
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string accessibility_metric = 2;
 * @return {string}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getAccessibilityMetric = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setAccessibilityMetric = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string main_url = 4;
 * @return {string}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getMainUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setMainUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool is_mobile = 5;
 * @return {boolean}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getIsMobile = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setIsMobile = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool is_landscape = 6;
 * @return {boolean}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getIsLandscape = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setIsLandscape = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional int32 display_width = 7;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getDisplayWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setDisplayWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 display_height = 8;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getDisplayHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setDisplayHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * repeated string webpages = 9;
 * @return {!Array<string>}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getWebpagesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 9));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setWebpagesList = function(value) {
  return jspb.Message.setField(this, 9, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.addWebpages = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 9, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.clearWebpagesList = function() {
  return this.setWebpagesList([]);
};


/**
 * optional EvalDate latest_evaluation = 10;
 * @return {?proto.runtimePackage.EvalDate}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getLatestEvaluation = function() {
  return /** @type{?proto.runtimePackage.EvalDate} */ (
    jspb.Message.getWrapperField(this, proto.runtimePackage.EvalDate, 10));
};


/**
 * @param {?proto.runtimePackage.EvalDate|undefined} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
*/
proto.runtimePackage.MonitoringRegistry.prototype.setLatestEvaluation = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.clearLatestEvaluation = function() {
  return this.setLatestEvaluation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.runtimePackage.MonitoringRegistry.prototype.hasLatestEvaluation = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional float score = 11;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getScore = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setScore = function(value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};


/**
 * optional int32 passed = 12;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getPassed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setPassed = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional int32 warnings = 13;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getWarnings = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setWarnings = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};


/**
 * optional int32 failed = 14;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getFailed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setFailed = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional int32 inapplicable = 15;
 * @return {number}
 */
proto.runtimePackage.MonitoringRegistry.prototype.getInapplicable = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringRegistry} returns this
 */
proto.runtimePackage.MonitoringRegistry.prototype.setInapplicable = function(value) {
  return jspb.Message.setProto3IntField(this, 15, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebsiteMonitoringCyclesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesRequest}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebsiteMonitoringCyclesRequest;
  return proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebsiteMonitoringCyclesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesRequest}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebsiteMonitoringCyclesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.prototype.getMonitoringId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesRequest} returns this
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesRequest.prototype.setMonitoringId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
monitoringCyclesList: jspb.Message.toObjectList(msg.getMonitoringCyclesList(),
    proto.runtimePackage.MonitoringCycle.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebsiteMonitoringCyclesResponse;
  return proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.MonitoringCycle;
      reader.readMessage(value,proto.runtimePackage.MonitoringCycle.deserializeBinaryFromReader);
      msg.addMonitoringCycles(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMonitoringCyclesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.MonitoringCycle.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse} returns this
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated MonitoringCycle monitoring_cycles = 2;
 * @return {!Array<!proto.runtimePackage.MonitoringCycle>}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.getMonitoringCyclesList = function() {
  return /** @type{!Array<!proto.runtimePackage.MonitoringCycle>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.MonitoringCycle, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.MonitoringCycle>} value
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse} returns this
*/
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.setMonitoringCyclesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.MonitoringCycle=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.MonitoringCycle}
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.addMonitoringCycles = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.MonitoringCycle, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetWebsiteMonitoringCyclesResponse} returns this
 */
proto.runtimePackage.GetWebsiteMonitoringCyclesResponse.prototype.clearMonitoringCyclesList = function() {
  return this.setMonitoringCyclesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.MonitoringCycle.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.MonitoringCycle.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.MonitoringCycle} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.MonitoringCycle.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
cycleDate: (f = msg.getCycleDate()) && proto.runtimePackage.EvalDate.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.MonitoringCycle}
 */
proto.runtimePackage.MonitoringCycle.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.MonitoringCycle;
  return proto.runtimePackage.MonitoringCycle.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.MonitoringCycle} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.MonitoringCycle}
 */
proto.runtimePackage.MonitoringCycle.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.runtimePackage.EvalDate;
      reader.readMessage(value,proto.runtimePackage.EvalDate.deserializeBinaryFromReader);
      msg.setCycleDate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.MonitoringCycle.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.MonitoringCycle.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.MonitoringCycle} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.MonitoringCycle.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getCycleDate();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.runtimePackage.EvalDate.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.MonitoringCycle.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.MonitoringCycle} returns this
 */
proto.runtimePackage.MonitoringCycle.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional EvalDate cycle_date = 2;
 * @return {?proto.runtimePackage.EvalDate}
 */
proto.runtimePackage.MonitoringCycle.prototype.getCycleDate = function() {
  return /** @type{?proto.runtimePackage.EvalDate} */ (
    jspb.Message.getWrapperField(this, proto.runtimePackage.EvalDate, 2));
};


/**
 * @param {?proto.runtimePackage.EvalDate|undefined} value
 * @return {!proto.runtimePackage.MonitoringCycle} returns this
*/
proto.runtimePackage.MonitoringCycle.prototype.setCycleDate = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.runtimePackage.MonitoringCycle} returns this
 */
proto.runtimePackage.MonitoringCycle.prototype.clearCycleDate = function() {
  return this.setCycleDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.runtimePackage.MonitoringCycle.prototype.hasCycleDate = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetNewMonitoringCycleRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetNewMonitoringCycleRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetNewMonitoringCycleRequest}
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetNewMonitoringCycleRequest;
  return proto.runtimePackage.SetNewMonitoringCycleRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetNewMonitoringCycleRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetNewMonitoringCycleRequest}
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetNewMonitoringCycleRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetNewMonitoringCycleRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetNewMonitoringCycleRequest} returns this
 */
proto.runtimePackage.SetNewMonitoringCycleRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.SetNewMonitoringCycleResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.SetNewMonitoringCycleResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
monitoringCycleId: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.SetNewMonitoringCycleResponse}
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.SetNewMonitoringCycleResponse;
  return proto.runtimePackage.SetNewMonitoringCycleResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.SetNewMonitoringCycleResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.SetNewMonitoringCycleResponse}
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringCycleId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.SetNewMonitoringCycleResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.SetNewMonitoringCycleResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMonitoringCycleId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetNewMonitoringCycleResponse} returns this
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 monitoring_cycle_id = 2;
 * @return {number}
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.prototype.getMonitoringCycleId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.SetNewMonitoringCycleResponse} returns this
 */
proto.runtimePackage.SetNewMonitoringCycleResponse.prototype.setMonitoringCycleId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetMonitoredWebpagesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetMonitoredWebpagesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetMonitoredWebpagesRequest}
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetMonitoredWebpagesRequest;
  return proto.runtimePackage.GetMonitoredWebpagesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetMonitoredWebpagesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetMonitoredWebpagesRequest}
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetMonitoredWebpagesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetMonitoredWebpagesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoredWebpagesRequest} returns this
 */
proto.runtimePackage.GetMonitoredWebpagesRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetMonitoredWebpagesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetMonitoredWebpagesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
monitoredWebpagesList: jspb.Message.toObjectList(msg.getMonitoredWebpagesList(),
    proto.runtimePackage.Webpage.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetMonitoredWebpagesResponse}
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetMonitoredWebpagesResponse;
  return proto.runtimePackage.GetMonitoredWebpagesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetMonitoredWebpagesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetMonitoredWebpagesResponse}
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = new proto.runtimePackage.Webpage;
      reader.readMessage(value,proto.runtimePackage.Webpage.deserializeBinaryFromReader);
      msg.addMonitoredWebpages(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetMonitoredWebpagesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetMonitoredWebpagesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMonitoredWebpagesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.runtimePackage.Webpage.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoredWebpagesResponse} returns this
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated Webpage monitored_webpages = 2;
 * @return {!Array<!proto.runtimePackage.Webpage>}
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.getMonitoredWebpagesList = function() {
  return /** @type{!Array<!proto.runtimePackage.Webpage>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.runtimePackage.Webpage, 2));
};


/**
 * @param {!Array<!proto.runtimePackage.Webpage>} value
 * @return {!proto.runtimePackage.GetMonitoredWebpagesResponse} returns this
*/
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.setMonitoredWebpagesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.runtimePackage.Webpage=} opt_value
 * @param {number=} opt_index
 * @return {!proto.runtimePackage.Webpage}
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.addMonitoredWebpages = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.runtimePackage.Webpage, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.runtimePackage.GetMonitoredWebpagesResponse} returns this
 */
proto.runtimePackage.GetMonitoredWebpagesResponse.prototype.clearMonitoredWebpagesList = function() {
  return this.setMonitoredWebpagesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.Webpage.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.Webpage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.Webpage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Webpage.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, 0),
url: jspb.Message.getFieldWithDefault(msg, 2, ""),
needsAuthentication: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.Webpage}
 */
proto.runtimePackage.Webpage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.Webpage;
  return proto.runtimePackage.Webpage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.Webpage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.Webpage}
 */
proto.runtimePackage.Webpage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNeedsAuthentication(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.Webpage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.Webpage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.Webpage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.Webpage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNeedsAuthentication();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.runtimePackage.Webpage.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.Webpage} returns this
 */
proto.runtimePackage.Webpage.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string url = 2;
 * @return {string}
 */
proto.runtimePackage.Webpage.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.Webpage} returns this
 */
proto.runtimePackage.Webpage.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool needs_authentication = 3;
 * @return {boolean}
 */
proto.runtimePackage.Webpage.prototype.getNeedsAuthentication = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.Webpage} returns this
 */
proto.runtimePackage.Webpage.prototype.setNeedsAuthentication = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetEvaluationInfoRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetEvaluationInfoRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetEvaluationInfoRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationInfoRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0),
webpageId: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetEvaluationInfoRequest}
 */
proto.runtimePackage.GetEvaluationInfoRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetEvaluationInfoRequest;
  return proto.runtimePackage.GetEvaluationInfoRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetEvaluationInfoRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetEvaluationInfoRequest}
 */
proto.runtimePackage.GetEvaluationInfoRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWebpageId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetEvaluationInfoRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetEvaluationInfoRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetEvaluationInfoRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationInfoRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getWebpageId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetEvaluationInfoRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetEvaluationInfoRequest} returns this
 */
proto.runtimePackage.GetEvaluationInfoRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 webpage_id = 2;
 * @return {number}
 */
proto.runtimePackage.GetEvaluationInfoRequest.prototype.getWebpageId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetEvaluationInfoRequest} returns this
 */
proto.runtimePackage.GetEvaluationInfoRequest.prototype.setWebpageId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetEvaluationInfoResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetEvaluationInfoResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationInfoResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
displayWidth: jspb.Message.getFieldWithDefault(msg, 2, 0),
displayHeight: jspb.Message.getFieldWithDefault(msg, 3, 0),
isMobile: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
isLandscape: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
webpageUrl: jspb.Message.getFieldWithDefault(msg, 6, ""),
needsAuthentication: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
usernameFieldSelector: jspb.Message.getFieldWithDefault(msg, 8, ""),
passwordFieldSelector: jspb.Message.getFieldWithDefault(msg, 9, ""),
loginButtonSelector: jspb.Message.getFieldWithDefault(msg, 10, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse}
 */
proto.runtimePackage.GetEvaluationInfoResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetEvaluationInfoResponse;
  return proto.runtimePackage.GetEvaluationInfoResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetEvaluationInfoResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse}
 */
proto.runtimePackage.GetEvaluationInfoResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayWidth(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayHeight(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsMobile(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsLandscape(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setWebpageUrl(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNeedsAuthentication(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsernameFieldSelector(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setPasswordFieldSelector(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setLoginButtonSelector(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetEvaluationInfoResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetEvaluationInfoResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetEvaluationInfoResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getDisplayWidth();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getDisplayHeight();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getIsMobile();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getIsLandscape();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getWebpageUrl();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getNeedsAuthentication();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getUsernameFieldSelector();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getPasswordFieldSelector();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getLoginButtonSelector();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 display_width = 2;
 * @return {number}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getDisplayWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setDisplayWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 display_height = 3;
 * @return {number}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getDisplayHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setDisplayHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool is_mobile = 4;
 * @return {boolean}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getIsMobile = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setIsMobile = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool is_landscape = 5;
 * @return {boolean}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getIsLandscape = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setIsLandscape = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string webpage_url = 6;
 * @return {string}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getWebpageUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setWebpageUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional bool needs_authentication = 7;
 * @return {boolean}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getNeedsAuthentication = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setNeedsAuthentication = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional string username_field_selector = 8;
 * @return {string}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getUsernameFieldSelector = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setUsernameFieldSelector = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string password_field_selector = 9;
 * @return {string}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getPasswordFieldSelector = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setPasswordFieldSelector = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string login_button_selector = 10;
 * @return {string}
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.getLoginButtonSelector = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetEvaluationInfoResponse} returns this
 */
proto.runtimePackage.GetEvaluationInfoResponse.prototype.setLoginButtonSelector = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.DeleteWebpageRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.DeleteWebpageRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.DeleteWebpageRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.DeleteWebpageRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
webpageId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.DeleteWebpageRequest}
 */
proto.runtimePackage.DeleteWebpageRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.DeleteWebpageRequest;
  return proto.runtimePackage.DeleteWebpageRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.DeleteWebpageRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.DeleteWebpageRequest}
 */
proto.runtimePackage.DeleteWebpageRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setWebpageId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.DeleteWebpageRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.DeleteWebpageRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.DeleteWebpageRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.DeleteWebpageRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWebpageId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string webpage_id = 2;
 * @return {string}
 */
proto.runtimePackage.DeleteWebpageRequest.prototype.getWebpageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.DeleteWebpageRequest} returns this
 */
proto.runtimePackage.DeleteWebpageRequest.prototype.setWebpageId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.DeleteWebpageResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.DeleteWebpageResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.DeleteWebpageResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.DeleteWebpageResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.DeleteWebpageResponse}
 */
proto.runtimePackage.DeleteWebpageResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.DeleteWebpageResponse;
  return proto.runtimePackage.DeleteWebpageResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.DeleteWebpageResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.DeleteWebpageResponse}
 */
proto.runtimePackage.DeleteWebpageResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.DeleteWebpageResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.DeleteWebpageResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.DeleteWebpageResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.DeleteWebpageResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.DeleteWebpageResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.DeleteWebpageResponse} returns this
 */
proto.runtimePackage.DeleteWebpageResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringCycleId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest;
  return proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringCycleId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringCycleId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_cycle_id = 1;
 * @return {number}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.prototype.getMonitoringCycleId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest} returns this
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleRequest.prototype.setMonitoringCycleId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse;
  return proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse} returns this
 */
proto.runtimePackage.AddLatestEvaluationsToMonitoringCycleResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetMonitoringRegistryRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetMonitoringRegistryRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetMonitoringRegistryRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringRegistryRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetMonitoringRegistryRequest}
 */
proto.runtimePackage.GetMonitoringRegistryRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetMonitoringRegistryRequest;
  return proto.runtimePackage.GetMonitoringRegistryRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetMonitoringRegistryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetMonitoringRegistryRequest}
 */
proto.runtimePackage.GetMonitoringRegistryRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetMonitoringRegistryRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetMonitoringRegistryRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetMonitoringRegistryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringRegistryRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_registry_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringRegistryRequest.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryRequest} returns this
 */
proto.runtimePackage.GetMonitoringRegistryRequest.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetMonitoringRegistryResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetMonitoringRegistryResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringRegistryResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
accessibilityMetric: jspb.Message.getFieldWithDefault(msg, 2, ""),
name: jspb.Message.getFieldWithDefault(msg, 3, ""),
mainUrl: jspb.Message.getFieldWithDefault(msg, 4, ""),
isMobile: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
isLandscape: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
displayWidth: jspb.Message.getFieldWithDefault(msg, 7, 0),
displayHeight: jspb.Message.getFieldWithDefault(msg, 8, 0),
latestEvaluation: (f = msg.getLatestEvaluation()) && proto.runtimePackage.EvalDate.toObject(includeInstance, f),
score: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetMonitoringRegistryResponse;
  return proto.runtimePackage.GetMonitoringRegistryResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetMonitoringRegistryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccessibilityMetric(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMainUrl(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsMobile(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsLandscape(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayWidth(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayHeight(value);
      break;
    case 10:
      var value = new proto.runtimePackage.EvalDate;
      reader.readMessage(value,proto.runtimePackage.EvalDate.deserializeBinaryFromReader);
      msg.setLatestEvaluation(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setScore(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetMonitoringRegistryResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetMonitoringRegistryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringRegistryResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAccessibilityMetric();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getMainUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getIsMobile();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getIsLandscape();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getDisplayWidth();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getDisplayHeight();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getLatestEvaluation();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.runtimePackage.EvalDate.serializeBinaryToWriter
    );
  }
  f = message.getScore();
  if (f !== 0.0) {
    writer.writeFloat(
      11,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string accessibility_metric = 2;
 * @return {string}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getAccessibilityMetric = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setAccessibilityMetric = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string main_url = 4;
 * @return {string}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getMainUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setMainUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool is_mobile = 5;
 * @return {boolean}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getIsMobile = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setIsMobile = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool is_landscape = 6;
 * @return {boolean}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getIsLandscape = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setIsLandscape = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional int32 display_width = 7;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getDisplayWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setDisplayWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 display_height = 8;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getDisplayHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setDisplayHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional EvalDate latest_evaluation = 10;
 * @return {?proto.runtimePackage.EvalDate}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getLatestEvaluation = function() {
  return /** @type{?proto.runtimePackage.EvalDate} */ (
    jspb.Message.getWrapperField(this, proto.runtimePackage.EvalDate, 10));
};


/**
 * @param {?proto.runtimePackage.EvalDate|undefined} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
*/
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setLatestEvaluation = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.clearLatestEvaluation = function() {
  return this.setLatestEvaluation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.hasLatestEvaluation = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional float score = 11;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.getScore = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringRegistryResponse} returns this
 */
proto.runtimePackage.GetMonitoringRegistryResponse.prototype.setScore = function(value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetMonitoringCycleRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetMonitoringCycleRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetMonitoringCycleRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringCycleRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
monitoringCycleId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetMonitoringCycleRequest}
 */
proto.runtimePackage.GetMonitoringCycleRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetMonitoringCycleRequest;
  return proto.runtimePackage.GetMonitoringCycleRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetMonitoringCycleRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetMonitoringCycleRequest}
 */
proto.runtimePackage.GetMonitoringCycleRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringCycleId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetMonitoringCycleRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetMonitoringCycleRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetMonitoringCycleRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringCycleRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMonitoringCycleId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 monitoring_cycle_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringCycleRequest.prototype.getMonitoringCycleId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringCycleRequest} returns this
 */
proto.runtimePackage.GetMonitoringCycleRequest.prototype.setMonitoringCycleId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetMonitoringCycleResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetMonitoringCycleResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringCycleResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
id: jspb.Message.getFieldWithDefault(msg, 2, 0),
monitoringRegistryId: jspb.Message.getFieldWithDefault(msg, 3, 0),
cycleDate: (f = msg.getCycleDate()) && proto.runtimePackage.EvalDate.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetMonitoringCycleResponse}
 */
proto.runtimePackage.GetMonitoringCycleResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetMonitoringCycleResponse;
  return proto.runtimePackage.GetMonitoringCycleResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetMonitoringCycleResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetMonitoringCycleResponse}
 */
proto.runtimePackage.GetMonitoringCycleResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMonitoringRegistryId(value);
      break;
    case 4:
      var value = new proto.runtimePackage.EvalDate;
      reader.readMessage(value,proto.runtimePackage.EvalDate.deserializeBinaryFromReader);
      msg.setCycleDate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetMonitoringCycleResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetMonitoringCycleResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetMonitoringCycleResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getMonitoringRegistryId();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getCycleDate();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.runtimePackage.EvalDate.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringCycleResponse} returns this
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 id = 2;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringCycleResponse} returns this
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 monitoring_registry_id = 3;
 * @return {number}
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.getMonitoringRegistryId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetMonitoringCycleResponse} returns this
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.setMonitoringRegistryId = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional EvalDate cycle_date = 4;
 * @return {?proto.runtimePackage.EvalDate}
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.getCycleDate = function() {
  return /** @type{?proto.runtimePackage.EvalDate} */ (
    jspb.Message.getWrapperField(this, proto.runtimePackage.EvalDate, 4));
};


/**
 * @param {?proto.runtimePackage.EvalDate|undefined} value
 * @return {!proto.runtimePackage.GetMonitoringCycleResponse} returns this
*/
proto.runtimePackage.GetMonitoringCycleResponse.prototype.setCycleDate = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.runtimePackage.GetMonitoringCycleResponse} returns this
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.clearCycleDate = function() {
  return this.setCycleDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.runtimePackage.GetMonitoringCycleResponse.prototype.hasCycleDate = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebpageComparisonDataRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebpageComparisonDataRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
webpageId: jspb.Message.getFieldWithDefault(msg, 1, 0),
cycleId: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebpageComparisonDataRequest}
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebpageComparisonDataRequest;
  return proto.runtimePackage.GetWebpageComparisonDataRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebpageComparisonDataRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebpageComparisonDataRequest}
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWebpageId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCycleId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebpageComparisonDataRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebpageComparisonDataRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWebpageId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getCycleId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 webpage_id = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.prototype.getWebpageId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebpageComparisonDataRequest} returns this
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.prototype.setWebpageId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 cycle_id = 2;
 * @return {number}
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.prototype.getCycleId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebpageComparisonDataRequest} returns this
 */
proto.runtimePackage.GetWebpageComparisonDataRequest.prototype.setCycleId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.runtimePackage.GetWebpageComparisonDataResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.runtimePackage.GetWebpageComparisonDataResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
score: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
totalFails: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.runtimePackage.GetWebpageComparisonDataResponse}
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.runtimePackage.GetWebpageComparisonDataResponse;
  return proto.runtimePackage.GetWebpageComparisonDataResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.runtimePackage.GetWebpageComparisonDataResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.runtimePackage.GetWebpageComparisonDataResponse}
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setScore(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalFails(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.runtimePackage.GetWebpageComparisonDataResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.runtimePackage.GetWebpageComparisonDataResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getScore();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getTotalFails();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional int32 status_code = 1;
 * @return {number}
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.getStatusCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebpageComparisonDataResponse} returns this
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional float score = 2;
 * @return {number}
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.getScore = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebpageComparisonDataResponse} returns this
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.setScore = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional int32 total_fails = 3;
 * @return {number}
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.getTotalFails = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.runtimePackage.GetWebpageComparisonDataResponse} returns this
 */
proto.runtimePackage.GetWebpageComparisonDataResponse.prototype.setTotalFails = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


goog.object.extend(exports, proto.runtimePackage);
