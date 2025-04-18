#!/bin/bash

docker build -t users-container -f Dockerfile .
docker run --name users-container --rm -d -p 8082:8082 --network microservices -e USERS_DATABASE_HOST=users-database-container users-container