import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
import psycopg2

from protobuf_library.evaluations_pb2 import (
    AddEvaluationResponse
)

import protobuf_library.evaluations_pb2_grpc as evaluations_pb2_grpc

database_host = os.getenv("DATABASE_HOST", "localhost")

class EvaluationsDatabaseService(evaluations_pb2_grpc.EvaluationsServicer):
    global database

    def AddEvaluation(self, request, context):
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

    database.close()

database = None
if __name__ == "__main__":
    database = psycopg2.connect(
        database = "evaluations",
        user = "postgres",
        host = database_host,
        password = "password",
        port = 5432
    )

    print("helloge", file=sys.stderr, flush=True)
    serve()