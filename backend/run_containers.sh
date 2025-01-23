chmod +x evaluations/run.sh
chmod +x evaluations-database/run.sh

docker network inspect microservices &>/dev/null || {
    echo "Creating Docker network..."
    docker network create microservices
}

./database.sh

cd evaluations
./run.sh
cd ..

cd evaluations-database
./run.sh
cd ..