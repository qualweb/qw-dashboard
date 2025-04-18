// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var evaluations_pb = require('./evaluations_pb.js');

function serialize_runtimePackage_AddEvaluationRequest(arg) {
  if (!(arg instanceof evaluations_pb.AddEvaluationRequest)) {
    throw new Error('Expected argument of type runtimePackage.AddEvaluationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_AddEvaluationRequest(buffer_arg) {
  return evaluations_pb.AddEvaluationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_AddEvaluationResponse(arg) {
  if (!(arg instanceof evaluations_pb.AddEvaluationResponse)) {
    throw new Error('Expected argument of type runtimePackage.AddEvaluationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_AddEvaluationResponse(buffer_arg) {
  return evaluations_pb.AddEvaluationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_AddMonitoringRegistryRequest(arg) {
  if (!(arg instanceof evaluations_pb.AddMonitoringRegistryRequest)) {
    throw new Error('Expected argument of type runtimePackage.AddMonitoringRegistryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_AddMonitoringRegistryRequest(buffer_arg) {
  return evaluations_pb.AddMonitoringRegistryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_AddMonitoringRegistryResponse(arg) {
  if (!(arg instanceof evaluations_pb.AddMonitoringRegistryResponse)) {
    throw new Error('Expected argument of type runtimePackage.AddMonitoringRegistryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_AddMonitoringRegistryResponse(buffer_arg) {
  return evaluations_pb.AddMonitoringRegistryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_AddWebpagesRequest(arg) {
  if (!(arg instanceof evaluations_pb.AddWebpagesRequest)) {
    throw new Error('Expected argument of type runtimePackage.AddWebpagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_AddWebpagesRequest(buffer_arg) {
  return evaluations_pb.AddWebpagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_AddWebpagesResponse(arg) {
  if (!(arg instanceof evaluations_pb.AddWebpagesResponse)) {
    throw new Error('Expected argument of type runtimePackage.AddWebpagesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_AddWebpagesResponse(buffer_arg) {
  return evaluations_pb.AddWebpagesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_CalculateAccessibilityScoreRequest(arg) {
  if (!(arg instanceof evaluations_pb.CalculateAccessibilityScoreRequest)) {
    throw new Error('Expected argument of type runtimePackage.CalculateAccessibilityScoreRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_CalculateAccessibilityScoreRequest(buffer_arg) {
  return evaluations_pb.CalculateAccessibilityScoreRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_CalculateAccessibilityScoreResponse(arg) {
  if (!(arg instanceof evaluations_pb.CalculateAccessibilityScoreResponse)) {
    throw new Error('Expected argument of type runtimePackage.CalculateAccessibilityScoreResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_CalculateAccessibilityScoreResponse(buffer_arg) {
  return evaluations_pb.CalculateAccessibilityScoreResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetAssertionResultsRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetAssertionResultsRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetAssertionResultsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetAssertionResultsRequest(buffer_arg) {
  return evaluations_pb.GetAssertionResultsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetAssertionResultsResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetAssertionResultsResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetAssertionResultsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetAssertionResultsResponse(buffer_arg) {
  return evaluations_pb.GetAssertionResultsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetCurrentWarningsRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetCurrentWarningsRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetCurrentWarningsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetCurrentWarningsRequest(buffer_arg) {
  return evaluations_pb.GetCurrentWarningsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetCurrentWarningsResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetCurrentWarningsResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetCurrentWarningsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetCurrentWarningsResponse(buffer_arg) {
  return evaluations_pb.GetCurrentWarningsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetEvaluationHistoryRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetEvaluationHistoryRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetEvaluationHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetEvaluationHistoryRequest(buffer_arg) {
  return evaluations_pb.GetEvaluationHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetEvaluationHistoryResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetEvaluationHistoryResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetEvaluationHistoryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetEvaluationHistoryResponse(buffer_arg) {
  return evaluations_pb.GetEvaluationHistoryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetIssuesStatsRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetIssuesStatsRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetIssuesStatsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetIssuesStatsRequest(buffer_arg) {
  return evaluations_pb.GetIssuesStatsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetIssuesStatsResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetIssuesStatsResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetIssuesStatsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetIssuesStatsResponse(buffer_arg) {
  return evaluations_pb.GetIssuesStatsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestACTAssertionsRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestACTAssertionsRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestACTAssertionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestACTAssertionsRequest(buffer_arg) {
  return evaluations_pb.GetLatestACTAssertionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestACTAssertionsResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestACTAssertionsResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestACTAssertionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestACTAssertionsResponse(buffer_arg) {
  return evaluations_pb.GetLatestACTAssertionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestAssertionsByTestRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestAssertionsByTestRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestAssertionsByTestRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestAssertionsByTestRequest(buffer_arg) {
  return evaluations_pb.GetLatestAssertionsByTestRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestAssertionsByTestResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestAssertionsByTestResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestAssertionsByTestResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestAssertionsByTestResponse(buffer_arg) {
  return evaluations_pb.GetLatestAssertionsByTestResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestAssertionsByWebpageRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestAssertionsByWebpageRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestAssertionsByWebpageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestAssertionsByWebpageRequest(buffer_arg) {
  return evaluations_pb.GetLatestAssertionsByWebpageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestAssertionsByWebpageResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestAssertionsByWebpageResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestAssertionsByWebpageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestAssertionsByWebpageResponse(buffer_arg) {
  return evaluations_pb.GetLatestAssertionsByWebpageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestEvaluationsRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestEvaluationsRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestEvaluationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestEvaluationsRequest(buffer_arg) {
  return evaluations_pb.GetLatestEvaluationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetLatestEvaluationsResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetLatestEvaluationsResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetLatestEvaluationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetLatestEvaluationsResponse(buffer_arg) {
  return evaluations_pb.GetLatestEvaluationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetMonitoredWebsitesRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetMonitoredWebsitesRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetMonitoredWebsitesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetMonitoredWebsitesRequest(buffer_arg) {
  return evaluations_pb.GetMonitoredWebsitesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetMonitoredWebsitesResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetMonitoredWebsitesResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetMonitoredWebsitesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetMonitoredWebsitesResponse(buffer_arg) {
  return evaluations_pb.GetMonitoredWebsitesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetMonitoringRegistryRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetMonitoringRegistryRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetMonitoringRegistryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetMonitoringRegistryRequest(buffer_arg) {
  return evaluations_pb.GetMonitoringRegistryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetMonitoringRegistryResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetMonitoringRegistryResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetMonitoringRegistryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetMonitoringRegistryResponse(buffer_arg) {
  return evaluations_pb.GetMonitoringRegistryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetResultElementsRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetResultElementsRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetResultElementsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetResultElementsRequest(buffer_arg) {
  return evaluations_pb.GetResultElementsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetResultElementsResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetResultElementsResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetResultElementsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetResultElementsResponse(buffer_arg) {
  return evaluations_pb.GetResultElementsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetUserMonitoringRegistriesRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetUserMonitoringRegistriesRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetUserMonitoringRegistriesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetUserMonitoringRegistriesRequest(buffer_arg) {
  return evaluations_pb.GetUserMonitoringRegistriesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetUserMonitoringRegistriesResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetUserMonitoringRegistriesResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetUserMonitoringRegistriesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetUserMonitoringRegistriesResponse(buffer_arg) {
  return evaluations_pb.GetUserMonitoringRegistriesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetWebpageScreenshotRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetWebpageScreenshotRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetWebpageScreenshotRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetWebpageScreenshotRequest(buffer_arg) {
  return evaluations_pb.GetWebpageScreenshotRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetWebpageScreenshotResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetWebpageScreenshotResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetWebpageScreenshotResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetWebpageScreenshotResponse(buffer_arg) {
  return evaluations_pb.GetWebpageScreenshotResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetWebsiteScoreRequest(arg) {
  if (!(arg instanceof evaluations_pb.GetWebsiteScoreRequest)) {
    throw new Error('Expected argument of type runtimePackage.GetWebsiteScoreRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetWebsiteScoreRequest(buffer_arg) {
  return evaluations_pb.GetWebsiteScoreRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_GetWebsiteScoreResponse(arg) {
  if (!(arg instanceof evaluations_pb.GetWebsiteScoreResponse)) {
    throw new Error('Expected argument of type runtimePackage.GetWebsiteScoreResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_GetWebsiteScoreResponse(buffer_arg) {
  return evaluations_pb.GetWebsiteScoreResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_SetAccessibilityMetricAllWebsitesRequest(arg) {
  if (!(arg instanceof evaluations_pb.SetAccessibilityMetricAllWebsitesRequest)) {
    throw new Error('Expected argument of type runtimePackage.SetAccessibilityMetricAllWebsitesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_SetAccessibilityMetricAllWebsitesRequest(buffer_arg) {
  return evaluations_pb.SetAccessibilityMetricAllWebsitesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_SetAccessibilityMetricAllWebsitesResponse(arg) {
  if (!(arg instanceof evaluations_pb.SetAccessibilityMetricAllWebsitesResponse)) {
    throw new Error('Expected argument of type runtimePackage.SetAccessibilityMetricAllWebsitesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_SetAccessibilityMetricAllWebsitesResponse(buffer_arg) {
  return evaluations_pb.SetAccessibilityMetricAllWebsitesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_SetAccessibilityMetricRequest(arg) {
  if (!(arg instanceof evaluations_pb.SetAccessibilityMetricRequest)) {
    throw new Error('Expected argument of type runtimePackage.SetAccessibilityMetricRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_SetAccessibilityMetricRequest(buffer_arg) {
  return evaluations_pb.SetAccessibilityMetricRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_SetAccessibilityMetricResponse(arg) {
  if (!(arg instanceof evaluations_pb.SetAccessibilityMetricResponse)) {
    throw new Error('Expected argument of type runtimePackage.SetAccessibilityMetricResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_SetAccessibilityMetricResponse(buffer_arg) {
  return evaluations_pb.SetAccessibilityMetricResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_SetLatestEvaluationRequest(arg) {
  if (!(arg instanceof evaluations_pb.SetLatestEvaluationRequest)) {
    throw new Error('Expected argument of type runtimePackage.SetLatestEvaluationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_SetLatestEvaluationRequest(buffer_arg) {
  return evaluations_pb.SetLatestEvaluationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_runtimePackage_SetLatestEvaluationResponse(arg) {
  if (!(arg instanceof evaluations_pb.SetLatestEvaluationResponse)) {
    throw new Error('Expected argument of type runtimePackage.SetLatestEvaluationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_runtimePackage_SetLatestEvaluationResponse(buffer_arg) {
  return evaluations_pb.SetLatestEvaluationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EvaluationsService = exports.EvaluationsService = {
  addMonitoringRegistry: {
    path: '/runtimePackage.Evaluations/AddMonitoringRegistry',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.AddMonitoringRegistryRequest,
    responseType: evaluations_pb.AddMonitoringRegistryResponse,
    requestSerialize: serialize_runtimePackage_AddMonitoringRegistryRequest,
    requestDeserialize: deserialize_runtimePackage_AddMonitoringRegistryRequest,
    responseSerialize: serialize_runtimePackage_AddMonitoringRegistryResponse,
    responseDeserialize: deserialize_runtimePackage_AddMonitoringRegistryResponse,
  },
  addEvaluation: {
    path: '/runtimePackage.Evaluations/AddEvaluation',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.AddEvaluationRequest,
    responseType: evaluations_pb.AddEvaluationResponse,
    requestSerialize: serialize_runtimePackage_AddEvaluationRequest,
    requestDeserialize: deserialize_runtimePackage_AddEvaluationRequest,
    responseSerialize: serialize_runtimePackage_AddEvaluationResponse,
    responseDeserialize: deserialize_runtimePackage_AddEvaluationResponse,
  },
  getMonitoredWebsites: {
    path: '/runtimePackage.Evaluations/GetMonitoredWebsites',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetMonitoredWebsitesRequest,
    responseType: evaluations_pb.GetMonitoredWebsitesResponse,
    requestSerialize: serialize_runtimePackage_GetMonitoredWebsitesRequest,
    requestDeserialize: deserialize_runtimePackage_GetMonitoredWebsitesRequest,
    responseSerialize: serialize_runtimePackage_GetMonitoredWebsitesResponse,
    responseDeserialize: deserialize_runtimePackage_GetMonitoredWebsitesResponse,
  },
  setAccessibilityMetric: {
    path: '/runtimePackage.Evaluations/SetAccessibilityMetric',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.SetAccessibilityMetricRequest,
    responseType: evaluations_pb.SetAccessibilityMetricResponse,
    requestSerialize: serialize_runtimePackage_SetAccessibilityMetricRequest,
    requestDeserialize: deserialize_runtimePackage_SetAccessibilityMetricRequest,
    responseSerialize: serialize_runtimePackage_SetAccessibilityMetricResponse,
    responseDeserialize: deserialize_runtimePackage_SetAccessibilityMetricResponse,
  },
  calculateAccessibilityScore: {
    path: '/runtimePackage.Evaluations/CalculateAccessibilityScore',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.CalculateAccessibilityScoreRequest,
    responseType: evaluations_pb.CalculateAccessibilityScoreResponse,
    requestSerialize: serialize_runtimePackage_CalculateAccessibilityScoreRequest,
    requestDeserialize: deserialize_runtimePackage_CalculateAccessibilityScoreRequest,
    responseSerialize: serialize_runtimePackage_CalculateAccessibilityScoreResponse,
    responseDeserialize: deserialize_runtimePackage_CalculateAccessibilityScoreResponse,
  },
  setLatestEvaluation: {
    path: '/runtimePackage.Evaluations/SetLatestEvaluation',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.SetLatestEvaluationRequest,
    responseType: evaluations_pb.SetLatestEvaluationResponse,
    requestSerialize: serialize_runtimePackage_SetLatestEvaluationRequest,
    requestDeserialize: deserialize_runtimePackage_SetLatestEvaluationRequest,
    responseSerialize: serialize_runtimePackage_SetLatestEvaluationResponse,
    responseDeserialize: deserialize_runtimePackage_SetLatestEvaluationResponse,
  },
  addWebpages: {
    path: '/runtimePackage.Evaluations/AddWebpages',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.AddWebpagesRequest,
    responseType: evaluations_pb.AddWebpagesResponse,
    requestSerialize: serialize_runtimePackage_AddWebpagesRequest,
    requestDeserialize: deserialize_runtimePackage_AddWebpagesRequest,
    responseSerialize: serialize_runtimePackage_AddWebpagesResponse,
    responseDeserialize: deserialize_runtimePackage_AddWebpagesResponse,
  },
  setAccessibilityMetricAllWebsites: {
    path: '/runtimePackage.Evaluations/SetAccessibilityMetricAllWebsites',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.SetAccessibilityMetricAllWebsitesRequest,
    responseType: evaluations_pb.SetAccessibilityMetricAllWebsitesResponse,
    requestSerialize: serialize_runtimePackage_SetAccessibilityMetricAllWebsitesRequest,
    requestDeserialize: deserialize_runtimePackage_SetAccessibilityMetricAllWebsitesRequest,
    responseSerialize: serialize_runtimePackage_SetAccessibilityMetricAllWebsitesResponse,
    responseDeserialize: deserialize_runtimePackage_SetAccessibilityMetricAllWebsitesResponse,
  },
  getLatestAssertionsByWebpage: {
    path: '/runtimePackage.Evaluations/GetLatestAssertionsByWebpage',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetLatestAssertionsByWebpageRequest,
    responseType: evaluations_pb.GetLatestAssertionsByWebpageResponse,
    requestSerialize: serialize_runtimePackage_GetLatestAssertionsByWebpageRequest,
    requestDeserialize: deserialize_runtimePackage_GetLatestAssertionsByWebpageRequest,
    responseSerialize: serialize_runtimePackage_GetLatestAssertionsByWebpageResponse,
    responseDeserialize: deserialize_runtimePackage_GetLatestAssertionsByWebpageResponse,
  },
  getLatestAssertionsByTest: {
    path: '/runtimePackage.Evaluations/GetLatestAssertionsByTest',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetLatestAssertionsByTestRequest,
    responseType: evaluations_pb.GetLatestAssertionsByTestResponse,
    requestSerialize: serialize_runtimePackage_GetLatestAssertionsByTestRequest,
    requestDeserialize: deserialize_runtimePackage_GetLatestAssertionsByTestRequest,
    responseSerialize: serialize_runtimePackage_GetLatestAssertionsByTestResponse,
    responseDeserialize: deserialize_runtimePackage_GetLatestAssertionsByTestResponse,
  },
  getCurrentWarnings: {
    path: '/runtimePackage.Evaluations/GetCurrentWarnings',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetCurrentWarningsRequest,
    responseType: evaluations_pb.GetCurrentWarningsResponse,
    requestSerialize: serialize_runtimePackage_GetCurrentWarningsRequest,
    requestDeserialize: deserialize_runtimePackage_GetCurrentWarningsRequest,
    responseSerialize: serialize_runtimePackage_GetCurrentWarningsResponse,
    responseDeserialize: deserialize_runtimePackage_GetCurrentWarningsResponse,
  },
  getWebsiteScore: {
    path: '/runtimePackage.Evaluations/GetWebsiteScore',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetWebsiteScoreRequest,
    responseType: evaluations_pb.GetWebsiteScoreResponse,
    requestSerialize: serialize_runtimePackage_GetWebsiteScoreRequest,
    requestDeserialize: deserialize_runtimePackage_GetWebsiteScoreRequest,
    responseSerialize: serialize_runtimePackage_GetWebsiteScoreResponse,
    responseDeserialize: deserialize_runtimePackage_GetWebsiteScoreResponse,
  },
  getMonitoringRegistry: {
    path: '/runtimePackage.Evaluations/GetMonitoringRegistry',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetMonitoringRegistryRequest,
    responseType: evaluations_pb.GetMonitoringRegistryResponse,
    requestSerialize: serialize_runtimePackage_GetMonitoringRegistryRequest,
    requestDeserialize: deserialize_runtimePackage_GetMonitoringRegistryRequest,
    responseSerialize: serialize_runtimePackage_GetMonitoringRegistryResponse,
    responseDeserialize: deserialize_runtimePackage_GetMonitoringRegistryResponse,
  },
  getIssuesStats: {
    path: '/runtimePackage.Evaluations/GetIssuesStats',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetIssuesStatsRequest,
    responseType: evaluations_pb.GetIssuesStatsResponse,
    requestSerialize: serialize_runtimePackage_GetIssuesStatsRequest,
    requestDeserialize: deserialize_runtimePackage_GetIssuesStatsRequest,
    responseSerialize: serialize_runtimePackage_GetIssuesStatsResponse,
    responseDeserialize: deserialize_runtimePackage_GetIssuesStatsResponse,
  },
  getWebpageScreenshot: {
    path: '/runtimePackage.Evaluations/GetWebpageScreenshot',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetWebpageScreenshotRequest,
    responseType: evaluations_pb.GetWebpageScreenshotResponse,
    requestSerialize: serialize_runtimePackage_GetWebpageScreenshotRequest,
    requestDeserialize: deserialize_runtimePackage_GetWebpageScreenshotRequest,
    responseSerialize: serialize_runtimePackage_GetWebpageScreenshotResponse,
    responseDeserialize: deserialize_runtimePackage_GetWebpageScreenshotResponse,
  },
  getLatestEvaluations: {
    path: '/runtimePackage.Evaluations/GetLatestEvaluations',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetLatestEvaluationsRequest,
    responseType: evaluations_pb.GetLatestEvaluationsResponse,
    requestSerialize: serialize_runtimePackage_GetLatestEvaluationsRequest,
    requestDeserialize: deserialize_runtimePackage_GetLatestEvaluationsRequest,
    responseSerialize: serialize_runtimePackage_GetLatestEvaluationsResponse,
    responseDeserialize: deserialize_runtimePackage_GetLatestEvaluationsResponse,
  },
  getLatestACTAssertions: {
    path: '/runtimePackage.Evaluations/GetLatestACTAssertions',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetLatestACTAssertionsRequest,
    responseType: evaluations_pb.GetLatestACTAssertionsResponse,
    requestSerialize: serialize_runtimePackage_GetLatestACTAssertionsRequest,
    requestDeserialize: deserialize_runtimePackage_GetLatestACTAssertionsRequest,
    responseSerialize: serialize_runtimePackage_GetLatestACTAssertionsResponse,
    responseDeserialize: deserialize_runtimePackage_GetLatestACTAssertionsResponse,
  },
  getAssertionResults: {
    path: '/runtimePackage.Evaluations/GetAssertionResults',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetAssertionResultsRequest,
    responseType: evaluations_pb.GetAssertionResultsResponse,
    requestSerialize: serialize_runtimePackage_GetAssertionResultsRequest,
    requestDeserialize: deserialize_runtimePackage_GetAssertionResultsRequest,
    responseSerialize: serialize_runtimePackage_GetAssertionResultsResponse,
    responseDeserialize: deserialize_runtimePackage_GetAssertionResultsResponse,
  },
  getResultElement: {
    path: '/runtimePackage.Evaluations/GetResultElement',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetResultElementsRequest,
    responseType: evaluations_pb.GetResultElementsResponse,
    requestSerialize: serialize_runtimePackage_GetResultElementsRequest,
    requestDeserialize: deserialize_runtimePackage_GetResultElementsRequest,
    responseSerialize: serialize_runtimePackage_GetResultElementsResponse,
    responseDeserialize: deserialize_runtimePackage_GetResultElementsResponse,
  },
  getEvaluationHistory: {
    path: '/runtimePackage.Evaluations/GetEvaluationHistory',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetEvaluationHistoryRequest,
    responseType: evaluations_pb.GetEvaluationHistoryResponse,
    requestSerialize: serialize_runtimePackage_GetEvaluationHistoryRequest,
    requestDeserialize: deserialize_runtimePackage_GetEvaluationHistoryRequest,
    responseSerialize: serialize_runtimePackage_GetEvaluationHistoryResponse,
    responseDeserialize: deserialize_runtimePackage_GetEvaluationHistoryResponse,
  },
  getUserMonitoringRegistries: {
    path: '/runtimePackage.Evaluations/GetUserMonitoringRegistries',
    requestStream: false,
    responseStream: false,
    requestType: evaluations_pb.GetUserMonitoringRegistriesRequest,
    responseType: evaluations_pb.GetUserMonitoringRegistriesResponse,
    requestSerialize: serialize_runtimePackage_GetUserMonitoringRegistriesRequest,
    requestDeserialize: deserialize_runtimePackage_GetUserMonitoringRegistriesRequest,
    responseSerialize: serialize_runtimePackage_GetUserMonitoringRegistriesResponse,
    responseDeserialize: deserialize_runtimePackage_GetUserMonitoringRegistriesResponse,
  },
};

exports.EvaluationsClient = grpc.makeGenericClientConstructor(EvaluationsService);
