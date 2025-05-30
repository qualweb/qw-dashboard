from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import grpc
import os

from SchedulerHelper import Scheduler

from protobuf_library.scheduler_pb2 import (
    AddScheduleRequest,
    LoadSchedulesRequest,
    GetWebsiteSchedulesRequest,
    GetScheduleRequest,
    DeleteWebsiteScheduleRequest
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
        get_schedules_response = scheduler_database_client.LoadSchedules(LoadSchedulesRequest())
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

    print(f"Received request body: {request_body}", flush=True)

    add_schedule_request = AddScheduleRequest(
        monitoring_id=int(request_body.get('monitoring_id', -1)),
        webpages_ids=request_body.get('webpages_ids', []),
        day=request_body.get('day', -1),
        month=request_body.get('month', -1),
        year=request_body.get('year', -1),
        hour=request_body.get('hour', -1),
        minute=request_body.get('minute', -1),
        second=request_body.get('second', -1),
        day_of_week=request_body.get('day_of_week', -1),
        schedule_type=request_body.get('schedule_type', '')
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
        monitoring_id=int(monitoring_id)
    ))
    
    if response.status_code == 200:
        return jsonify(list(response.schedules_ids)), 200
    else:
        return jsonify({"error": "An error occurred"}), response.status_code
    
@app.route("/api/scheduler/schedules/<schedule_id>", methods=["GET"])
def get_schedule(schedule_id):
    response = scheduler_database_client.GetSchedule(GetScheduleRequest(
        schedule_id=int(schedule_id)
    ))
    
    if response.status_code == 200:
        return jsonify({
            "id": response.schedule.id,
            "monitoring_id": response.schedule.monitoring_id,
            "webpages_ids": list(response.schedule.webpages_ids),
            "day": response.schedule.day,
            "month": response.schedule.month,
            "year": response.schedule.year,
            "hour": response.schedule.hour,
            "minute": response.schedule.minute,
            "second": response.schedule.second,
            "day_of_week": response.schedule.day_of_week,
            "schedule_type": response.schedule.schedule_type
        }), 200
    else:
        return jsonify({"error": "An error occurred"}), response.status_code

@app.route("/api/scheduler/<schedule_id>", methods=["DELETE"])
def delete_schedule(schedule_id):

    response = scheduler_database_client.DeleteWebsiteSchedule(DeleteWebsiteScheduleRequest(
        schedule_id=int(schedule_id)
    ))

    if response.status_code == 200:
        scheduler.remove_job(str(response.schedule_id))

        return jsonify({"message": "Schedule deleted successfully"}), 200
    else:
        return jsonify({"error": "An error occurred"}), response.status_code
    