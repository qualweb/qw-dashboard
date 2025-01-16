chmod +x evaluations/run.sh

docker network inspect microservices &>/dev/null || {
    echo "Creating Docker network..."
    docker network create microservices
}

cd evaluations
./run.sh
cd ..