from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import grpc
import os

from SchedulerHelper import Scheduler

from protobuf_library.scheduler_pb2 import (
    AddScheduleRequest,
    GetSchedulesRequest,
    GetWebsiteSchedulesRequest,
    GetScheduleRequest
)
from protobuf_library.scheduler_pb2_grpc import SchedulerStub

# Connect to the database visualization service
scheduler_database_host = os.getenv("SCHEDULER_DATABASE_HOST", "localhost")
scheduler_database_channel = grpc.insecure_channel(f"{scheduler_database_host}:6002")
scheduler_database_client = SchedulerStub(scheduler_database_channel)

scheduler = None

def load_schedules():
    global scheduler
    try:
        get_schedules_response = scheduler_database_client.GetSchedules(GetSchedulesRequest())
        scheduler = Scheduler(get_schedules_response.schedules)

        return "Successfully loaded schedules", 200
    except Exception as e:
        print(f"Unexpected error: {e}", flush=True)
        return jsonify({"error": "An unexpected error occurred"}), 500

load_schedules()

app = Flask(__name__)
cors = CORS(app)


@app.route("/api/scheduler/add-schedule", methods=["POST"])
def add_schedule():
    global scheduler

    request_body = request.json

    add_schedule_request = AddScheduleRequest(
        schedule_type=request_body.get('schedule_type', ''),
        monitoring_id=request_body.get('monitoring_id', ''),
        webpages_ids=request_body.get('webpages_ids', []),
        day=request_body.get('day', ''),
        month=request_body.get('month', ''),
        year=request_body.get('year', ''),
        hour=request_body.get('hour', ''),
        minute=request_body.get('minute', ''),
        second=request_body.get('second', ''),
        day_of_week=request_body.get('day_of_week', '')
    )

    response = scheduler_database_client.AddSchedule(add_schedule_request)

    get_schedule_request = GetScheduleRequest(
        schedule_id=response.schedule_id
    )

    if response.status_code == 200:
        response = scheduler_database_client.GetSchedule(get_schedule_request)

        if response.status_code == 200:
            scheduler.add_job(response.schedule)
            return jsonify({"message": "Schedule added successfully"}), 200
        else:
            return jsonify({"error": "Failed to add schedule"}), 500
    else:
        return jsonify({"error": "Failed to add schedule"}), 500
    
    
@app.route("/api/scheduler/<monitoring_id>", methods=["GET"])
def get_website_schedules(monitoring_id):
    response = scheduler_database_client.GetWebsiteSchedules(GetWebsiteSchedulesRequest(
        monitoring_id=monitoring_id
    ))
    
    if response.status_code == 200:
        return jsonify(response.schedules), 200
    else:
        return jsonify({"error": "An error occurred"}), response.status_code
    
@app.route("/api/scheduler/<schedule_id>", methods=["DELETE"])
def delete_schedule(schedule_id):
    delete_schedule_request = scheduler_database_client.DeleteWebsiteScheduleRequest(schedule_id=schedule_id)

    response = scheduler_database_client.DeleteWebsiteSchedule(delete_schedule_request)
    
    if response.status_code == 200:
        return jsonify({"message": "Schedule deleted successfully"}), 200
    else:
        return jsonify({"error": "An error occurred"}), response.status_code