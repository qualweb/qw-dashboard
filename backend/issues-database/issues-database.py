import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
import psycopg2
from dotenv import load_dotenv

from protobuf_library.issues_pb2 import (
    AddIssuesResponse
)

import protobuf_library.issues_pb2_grpc as issues_pb2_grpc

load_dotenv()
MS_PORT = os.getenv("MS_PORT")
DATABASE_HOST = os.getenv("DATABASE_HOST")
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT"))
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")

class IssuesDatabaseService(issues_pb2_grpc.IssuesServicer):
    global database

    def AddIssues(self, request, context):
        cursor = database.cursor()

        try:
            for i in range(request.issues_quantity):
                cursor.execute('''
                    INSERT INTO Issue (
                        assertion_id, verdict, description, result_code
                    ) VALUES (
                        %s, %s, %s, %s
                    ) RETURNING id
                ''', (
                    request.issues[i].assertion_id, request.issues[i].verdict, 
                    request.issues[i].description, request.issues[i].result_code
                ))

                issue_id = cursor.fetchone()[0]

                for k in range(request.issues[i].elements_quantity):
                    cursor.execute('''
                        INSERT INTO Element (
                            issue_id, html_code, pointer
                        ) VALUES (
                            %s, %s, %s
                        )
                    ''', (
                        issue_id, request.issues[i].elements[k].html_code, request.issues[i].elements[k].pointer 
                    ))

            database.commit()
            print("Insert successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            database.rollback()
            return AddIssuesResponse(status_code=500)

        return AddIssuesResponse(status_code=200)

def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), 
        interceptors=interceptors,
        options=[
            ("grpc.max_receive_message_length", 100 * 1024 * 1024),
            ("grpc.max_send_message_length", 100 * 1024 * 1024)
        ]
    )
    issues_pb2_grpc.add_IssuesServicer_to_server(
        IssuesDatabaseService(), server
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