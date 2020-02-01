BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS
        teams(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128),
        location VARCHAR(128),
        coach VARCHAR(128) NOT NULL,
        image VARCHAR(128),
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );

COMMIT;
