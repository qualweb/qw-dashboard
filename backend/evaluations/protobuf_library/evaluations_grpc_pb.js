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


var EvaluationsService = exports.EvaluationsService = {
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
};

exports.EvaluationsClient = grpc.makeGenericClientConstructor(EvaluationsService);
