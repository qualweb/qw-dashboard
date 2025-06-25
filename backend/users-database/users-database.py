import psycopg2.pool
import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
from dotenv import load_dotenv
import requests

import protobuf_library.users_pb2_grpc as users_pb2_grpc

from protobuf_library.users_pb2 import (
    AddUserResponse,
    GetUserResponse
)

load_dotenv()
MS_PORT = os.getenv("MS_PORT")
DATABASE_HOST = os.getenv("DATABASE_HOST")
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT"))
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")

connection_pool = None

class UsersDatabaseService(users_pb2_grpc.UsersServicer):
    def AddUser(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                INSERT INTO Users (
                    auth0_id, nickname, picture, email
                ) VALUES (
                    %s, %s, %s, %s
                ) RETURNING id
            ''', (
                request.auth0_id, request.nickname, request.picture, request.email
            ))

            user_id = cursor.fetchone()[0]

            conn.commit()
            cursor.close()
            print("Insert successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
                
            return AddUserResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return AddUserResponse(status_code=200, user_id=user_id)

    def GetUser(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT * FROM Users
                WHERE auth0_id = %s
            ''', (request.auth0_id, ))

            user = cursor.fetchone()
            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
                
            return GetUserResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        if not user:
            return GetUserResponse(status_code=404)

        return GetUserResponse(status_code=200, user_id=user[0], nickname=user[2], picture=user[3], email=user[4])

def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), 
        interceptors=interceptors,
        options=[
            ("grpc.max_receive_message_length", 100 * 1024 * 1024),
            ("grpc.max_send_message_length", 100 * 1024 * 1024),
            ("grpc.keepalive_time_ms", 10000),
            ("grpc.keepalive_timeout_ms", 5000),
            ("grpc.keepalive_permit_without_calls", 1),
            ("grpc.http2.max_pings_without_data", 0)
        ]
    )
    users_pb2_grpc.add_UsersServicer_to_server(
        UsersDatabaseService(), server
    )

    server.add_insecure_port("[::]:" + MS_PORT)
    server.start()
    server.wait_for_termination()

    if connection_pool:
        connection_pool.closeall()

if __name__ == "__main__":
    connection_pool = psycopg2.pool.ThreadedConnectionPool(
        minconn = 1,
        maxconn = 50,
        dbname = POSTGRES_DB,
        user = POSTGRES_USER,
        password = POSTGRES_PASSWORD,
        host = DATABASE_HOST,
        port = POSTGRES_PORT
    )

    serve()
