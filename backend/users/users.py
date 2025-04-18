from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import grpc
import os

from protobuf_library.users_pb2 import AddUserRequest, GetUserRequest
from protobuf_library.users_pb2_grpc import UsersStub

# Connect to the database visualization service
users_database_host = os.getenv("USERS_DATABASE_HOST", "localhost")
users_database_channel = grpc.insecure_channel(f"{users_database_host}:6001")
users_database_client = UsersStub(users_database_channel)

app = Flask(__name__)

cors = CORS(app)

@app.route("/api/users/register", methods=["POST"])
def register_user():
    request_body = request.json

    user_register_request = AddUserRequest(
        auth0_id=request_body['auth0_id'],
        nickname=request_body['nickname'],
        picture=request_body['picture'],
        email=request_body['email']
    )

    user_register_response = users_database_client.AddUser(user_register_request)

    if user_register_response.status_code == 200:
        return jsonify({"user_id": user_register_response.user_id}), user_register_response.status_code
    else:
        return jsonify({"error": "An error occurred"}), user_register_response.status_code

@app.route("/api/users/<auth0_id>", methods=["GET"])
def get_user(auth0_id):
    get_user_request = GetUserRequest(
        auth0_id=auth0_id
    )

    get_user_response = users_database_client.GetUser(get_user_request)

    if get_user_response.status_code == 200:
        return jsonify({
            "exists": True,
            "user_id": get_user_response.user_id, 
            "nickname": get_user_response.nickname,
            "picture": get_user_response.picture,
            "email": get_user_response.email
        }), get_user_response.status_code
    elif get_user_response.status_code == 404:
        return jsonify({"exists": False, "message": "User not found"}), get_user_response.status_code
    else:
        return jsonify({"error": "An error occurred"}), get_user_response.status_code