import psycopg2.pool
import grpc
from grpc_interceptor import ExceptionToStatusInterceptor
from concurrent import futures
import sys
import os
from dotenv import load_dotenv
import requests

import protobuf_library.scheduler_pb2_grpc as scheduler_pb2_grpc

from protobuf_library.scheduler_pb2 import (
    AddScheduleResponse,
    GetSchedulesResponse,
    GetWebsiteSchedulesResponse,
    DeleteWebsiteScheduleResponse,
    Schedule,
    GetScheduleResponse
)

load_dotenv()
MS_PORT = os.getenv("MS_PORT")
DATABASE_HOST = os.getenv("DATABASE_HOST")
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT"))
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")

connection_pool = None

class SchedulerDatabaseService(scheduler_pb2_grpc.SchedulerServicer):
    def AddSchedule(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                INSERT INTO Schedule (
                    schedule_type, monitoring_id, webpages_ids, day, month, year, hour, minute, second, day_of_week
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            ''', (
                request.schedule_type, request.monitoring_id, list(request.webpages_ids), request.day, request.month, 
                request.year, request.hour, request.minute, request.second, request.day_of_week
            ))

            schedule_id = cursor.fetchone()[0]

            conn.commit()
            cursor.close()
            print("Insert successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
            return AddScheduleResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)
        
        return AddScheduleResponse(status_code=200, schedule_id=schedule_id)
    
    def GetSchedules(self, request, context):
        conn = None
        schedules = []

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('SELECT * FROM Schedule')
            rows = cursor.fetchall()

            for row in rows:
                schedules.append(Schedule(
                    id= row[0],
                    schedule_type=row[1],
                    monitoring_id=row[2],
                    webpages_ids=row[3],
                    day=row[4],
                    month=row[5],
                    year=row[6],
                    hour=row[7],
                    minute=row[8],
                    second=row[9],
                    day_of_week=row[10]
                ))

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
            return GetSchedulesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetSchedulesResponse(status_code=200, schedules=schedules)
    
    def GetWebsiteSchedules(self, request, context):
        conn = None
        schedules = []

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT * FROM Schedule
                WHERE monitoring_id = %s
            ''', (request.monitoring_id, ))
            rows = cursor.fetchall()

            for row in rows:
                schedules.append(Schedule(
                    id=row[0],
                    schedule_type=row[1],
                    monitoring_id=row[2],
                    webpages_ids=row[3],
                    day=row[4],
                    month=row[5],
                    year=row[6],
                    hour=row[7],
                    minute=row[8],
                    second=row[9],
                    day_of_week=row[10]
                ))

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
            return GetWebsiteSchedulesResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetWebsiteSchedulesResponse(status_code=200, schedules=schedules)
    
    def DeleteWebsiteSchedule(self, request, context):
        conn = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                DELETE FROM Schedule
                WHERE id = %s
            ''', (request.schedule_id, ))

            if cursor.rowcount == 0:
                return DeleteWebsiteScheduleResponse(status_code=404)

            conn.commit()
            cursor.close()
            print("Delete successful", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
            return DeleteWebsiteScheduleResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return DeleteWebsiteScheduleResponse(status_code=200)
    
    def GetSchedule(self, request, context):
        conn = None
        schedule = None

        try:
            conn = connection_pool.getconn()
            cursor = conn.cursor()
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED)

            cursor.execute('''
                SELECT * FROM Schedule
                WHERE id = %s
            ''', (request.schedule_id, ))
            row = cursor.fetchone()

            if row:
                schedule = Schedule(
                    id=row[0],
                    schedule_type=row[1],
                    monitoring_id=row[2],
                    webpages_ids=row[3],
                    day=row[4],
                    month=row[5],
                    year=row[6],
                    hour=row[7],
                    minute=row[8],
                    second=row[9],
                    day_of_week=row[10]
                )

            cursor.close()
        except Exception as e:
            print(f"Error occurred: {e}", file=sys.stderr, flush=True)
            if conn:
                conn.rollback()
            return GetScheduleResponse(status_code=500)
        finally:
            if conn:
                connection_pool.putconn(conn)

        return GetScheduleResponse(status_code=200, schedule=schedule)
        
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
    scheduler_pb2_grpc.add_SchedulerServicer_to_server(
        SchedulerDatabaseService(), server
    )

    server.add_insecure_port("[::]:" + MS_PORT)
    server.start()
    server.wait_for_termination()

    if connection_pool:
        connection_pool.closeall()

if __name__ == "__main__":
    connection_pool = psycopg2.pool.ThreadedConnectionPool(
        minconn = 1,
        maxconn = 10,
        dbname = POSTGRES_DB,
        user = POSTGRES_USER,
        password = POSTGRES_PASSWORD,
        host = DATABASE_HOST,
        port = POSTGRES_PORT
    )

    serve()
