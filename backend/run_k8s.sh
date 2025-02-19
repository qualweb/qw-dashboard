#!/bin/bash

chmod +x secrets.sh
chmod +x create_databases_k8s.sh

./secrets.sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
# kubectl get pods --namespace=ingress-nginx
kubectl wait --namespace ingress-nginx \
 --for=condition=ready pod \
 --selector=app.kubernetes.io/component=controller \
 --timeout=300s

# CREATE DATABASES
kubectl apply -f postgres.yaml

POD_NAME=$(kubectl get pods -l app=postgres -o jsonpath="{.items[0].metadata.name}")
kubectl wait --for=condition=ready pod/"$POD_NAME" --timeout=60s

./create_databases_k8s.sh

kubectl apply -f kubernetes.yaml
kubectl apply -f autoscaler.yaml
kubectl apply -f ingress.yaml

# kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80

# kubectl delete pods --all
# kubectl delete pods --all -n ingress-nginx
