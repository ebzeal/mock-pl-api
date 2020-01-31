 echo "Setting up mock_pl_test"

 dropdb -h localhost -p 5432 --if-exists -U postgres "mock_pl_test"
 createdb -h localhost -p 5432 -U postgres "mock_pl_test"
 
 psql mock_pl_test -U postgres < ./api/models/testDbMigrationAndSeeder.sql

 echo "$database completed"
