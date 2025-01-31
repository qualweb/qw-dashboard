python3 -m grpc_tools.protoc -I. --python_out=../evaluations-database/protobuf_library --grpc_python_out=../evaluations-database/protobuf_library issues.proto

python3 -m grpc_tools.protoc -I. --python_out=../issues-database/protobuf_library --grpc_python_out=../issues-database/protobuf_library issues.proto
