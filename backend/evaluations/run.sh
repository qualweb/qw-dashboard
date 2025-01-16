docker build -t evaluations-container -f Dockerfile .
docker run --name evaluations-container --rm -d -p 8081:8081 --network microservices evaluations-container