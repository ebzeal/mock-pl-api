BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS
      players(
        id SERIAL PRIMARY KEY,
        playerName VARCHAR(128),
        playerPosition VARCHAR(128),
        playerNumber VARCHAR(128),
        team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
        uniqueId UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );

COMMIT;
