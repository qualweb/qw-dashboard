python3 -m grpc_tools.protoc -I. --python_out=../evaluations-database/protobuf_library --grpc_python_out=../evaluations-database/protobuf_library evaluations.proto

protoc \
    --plugin=protoc-gen-ts=$(which protoc-gen-ts) \
    --plugin=protoc-gen-grpc=$(which grpc_tools_node_protoc_plugin) \
    --ts_opt=esModuleInterop=true \
    --js_out=import_style=commonjs,binary:../evaluations/protobuf_library \
    --ts_out=../evaluations/protobuf_library \
    --grpc_out=../evaluations/protobuf_library \
    --proto_path=. \
    evaluations.proto
