#!/bin/bash

docker build -t auth-container -f Dockerfile .
docker run -e TZ=Europe/Lisbon --name auth-container -d -p 5000:5000 --network microservices auth-container