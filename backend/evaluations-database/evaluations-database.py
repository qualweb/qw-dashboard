import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
import psycopg2
from dotenv import load_dotenv

from protobuf_library.evaluations_pb2 import (
    AddEvaluationResponse
)

import protobuf_library.evaluations_pb2_grpc as evaluations_pb2_grpc

load_dotenv()
MS_PORT = os.getenv("MS_PORT")
DATABASE_HOST = os.getenv("DATABASE_HOST")
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT"))
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")

class EvaluationsDatabaseService(evaluations_pb2_grpc.EvaluationsServicer):
    global database

    def AddEvaluation(self, request, context):
        cursor = database.cursor()

        try:
            cursor.execute('''
                INSERT INTO Evaluation (
                    qualweb_version, input_url, domainName, domain, uri, 
                    complete_url, is_mobile, is_landscape, display_width, display_height, 
                    dom, title, element_count, passed, warning, failed, inapplicable
                ) VALUES (
                    %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, %s, %s
                )
            ''', (
                str(request.qualweb_version), str(request.input_url), 
                str(request.domain_name), str(request.domain), str(request.uri), 
                str(request.complete_url), str(bool(request.mobile)).upper(), str(bool(request.landscape)).upper(), 
                str(int(request.display_width)), str(int(request.display_height)), 
                str(request.dom), str(request.title), str(request.element_count), 
                str(int(request.passed)), str(int(request.warning)), str(int(request.failed)), str(int(request.inapplicable))
            ))

            database.commit()
            print("Insert successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            database.rollback()

        cursor.close()

        return AddEvaluationResponse(status_code=200)

def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), interceptors=interceptors
    )
    evaluations_pb2_grpc.add_EvaluationsServicer_to_server(
        EvaluationsDatabaseService(), server
    )

    server.add_insecure_port("[::]:" + MS_PORT)
    server.start()
    server.wait_for_termination()

    database.close()

database = None
if __name__ == "__main__":
    database = psycopg2.connect(
        dbname = POSTGRES_DB,
        user = POSTGRES_USER,
        password = POSTGRES_PASSWORD,
        host = DATABASE_HOST,
        port = POSTGRES_PORT
    )

    serve()