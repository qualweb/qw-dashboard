docker build -t users-database-container -f Dockerfile .
docker run --name users-database-container -d -p 6001:6001 --network microservices -e DATABASE_HOST=postgres-database users-database-container