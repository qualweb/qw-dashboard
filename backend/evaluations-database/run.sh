source .env

docker build -t evaluations-database-container -f Dockerfile .
docker run --name evaluations-database-container -d -p $MS_PORT:$MS_PORT --network microservices -e DATABASE_HOST=postgres-database -e ISSUES_DATABASE_HOST=issues-database-container evaluations-database-container