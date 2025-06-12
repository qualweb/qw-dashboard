#!/bin/bash

docker tag evaluations-database-container tomasbarreto/evaluations-database-container
docker tag evaluations-container tomasbarreto/evaluations-container
docker tag users-database-container tomasbarreto/users-database-container
docker tag users-container tomasbarreto/users-container
docker tag scheduler-database-container tomasbarreto/scheduler-database-container
docker tag scheduler-container tomasbarreto/scheduler-container


docker push tomasbarreto/evaluations-database-container
docker push tomasbarreto/evaluations-container
docker push tomasbarreto/users-database-container
docker push tomasbarreto/users-container
docker push tomasbarreto/scheduler-database-container
docker push tomasbarreto/scheduler-container