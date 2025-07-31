docker pull postgres
docker run -e TZ=Europe/Lisbon --name postgres-database -d -p 5432:5432 --network microservices -e POSTGRES_PASSWORD=password postgres
