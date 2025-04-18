python3 -m grpc_tools.protoc -I. --python_out=../users/protobuf_library --grpc_python_out=../users/protobuf_library users.proto

python3 -m grpc_tools.protoc -I. --python_out=../users-database/protobuf_library --grpc_python_out=../users-database/protobuf_library users.proto