CREATE EXTENSION "uuid-ossp";
-- Deploy fresh database tabels:
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/teams.sql'
\i '/docker-entrypoint-initdb.d/tables/players.sql'
\i '/docker-entrypoint-initdb.d/tables/fixtures.sql'
\i '/docker-entrypoint-initdb.d/tables/matchOfficials.sql'

-- For testing purposes only. This file will add dummy data
\i '/docker-entrypoint-initdb.d/seed/seed.sql'
