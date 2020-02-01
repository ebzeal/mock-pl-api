BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS
      fixtures(
        id SERIAL PRIMARY KEY,
        homeTeam INTEGER REFERENCES teams(id) ON DELETE CASCADE,
        awayTeam INTEGER REFERENCES teams(id) ON DELETE CASCADE,
        matchDate DATE NOT NULL,
        season VARCHAR(128),
        location VARCHAR(128),
        status VARCHAR(128),
        link VARCHAR(128) DEFAULT '#',
        dateAdded DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );

COMMIT;
