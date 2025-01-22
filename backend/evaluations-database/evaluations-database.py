import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys


from protobuf_library.evaluations_pb2 import (
    AddEvaluationResponse
)

import protobuf_library.evaluations_pb2_grpc as evaluations_pb2_grpc

class EvaluationsDatabaseService(evaluations_pb2_grpc.EvaluationsServicer):
    def AddEvaluation(self, request, context):
        print("This is an error message", file=sys.stderr, flush=True)
        return AddEvaluationResponse(status_code=200)

def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), interceptors=interceptors
    )
    evaluations_pb2_grpc.add_EvaluationsServicer_to_server(
        EvaluationsDatabaseService(), server
    )

    server.add_insecure_port("[::]:6000")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    print("helloge", file=sys.stderr, flush=True)
    serve()