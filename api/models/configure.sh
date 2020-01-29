 echo "Setting up mock_pl"

 dropdb -h localhost -p 5432 --if-exists -U postgres "mock_pl"
 createdb -h localhost -p 5432 -U postgres "mock_pl"
 
 psql mock_pl -U postgres < ./api/models/dbMigrationAndSeeder.sql

 echo "$database completed"
