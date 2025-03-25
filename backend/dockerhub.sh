#!/bin/bash

docker tag evaluations-database-container tomasbarreto/evaluations-database-container
docker tag issues-database-container tomasbarreto/issues-database-container
docker tag evaluations-container tomasbarreto/evaluations-container
docker tag issues-container tomasbarreto/issues-container

docker push tomasbarreto/evaluations-database-container
docker push tomasbarreto/issues-database-container
docker push tomasbarreto/evaluations-container
docker push tomasbarreto/issues-container