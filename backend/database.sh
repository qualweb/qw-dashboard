docker pull postgres
docker run --name postgres-database -e POSTGRES_HOST_AUTH_METHOD=trust -p 9000:9000 -d postgres
