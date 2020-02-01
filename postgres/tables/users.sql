BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS
        users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128),
        fullName VARCHAR(128),
        userName VARCHAR(128),
        password VARCHAR(500),
        access VARCHAR(128) DEFAULT 'User',
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );

COMMIT;
