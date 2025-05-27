python3 -m grpc_tools.protoc -I. --python_out=../scheduler/protobuf_library --grpc_python_out=../scheduler/protobuf_library scheduler.proto

python3 -m grpc_tools.protoc -I. --python_out=../scheduler-database/protobuf_library --grpc_python_out=../scheduler-database/protobuf_library scheduler.proto