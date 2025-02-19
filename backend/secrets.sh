kubectl delete secret app-secrets

kubectl create secret generic app-secrets --from-literal=EVALUATIONS_HOST=evaluations \
 --from-literal=EVALUATIONS_DATABASE_HOST=evaluations-database \
 --from-literal=ISSUES_DATABASE_HOST=issues-database \
 --from-literal=DATABASE_HOST=postgres-database
 