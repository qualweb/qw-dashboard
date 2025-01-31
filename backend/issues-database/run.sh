source .env

docker build -t issues-database-container -f Dockerfile .
docker run --name issues-database-container -d -p $MS_PORT:$MS_PORT --network microservices -e DATABASE_HOST=postgres-database issues-database-container