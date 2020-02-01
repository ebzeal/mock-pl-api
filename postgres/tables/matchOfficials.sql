BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS
      matchOfficials(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128),
        role VARCHAR(128),
        uniqueId UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        fixture INTEGER REFERENCES fixtures(id) ON DELETE CASCADE
      );

COMMIT;
