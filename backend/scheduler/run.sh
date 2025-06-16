#!/bin/bash

docker build -t scheduler-container -f Dockerfile .
docker run -e TZ=Europe/Lisbon --name scheduler-container -d -p 8083:8083 --network microservices -e SCHEDULER_DATABASE_HOST=scheduler-database-container -e EVALUATIONS_HOST=evaluations-container scheduler-container