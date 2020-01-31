-- CREATE DATABASE "mock_pl_test";
-- \connect "mock_pl_test"

DROP TABLE IF EXISTS users, teams, players, fixtures, matchOfficials;

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

CREATE TABLE IF NOT EXISTS
      matchOfficials(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128),
        role VARCHAR(128),
        uniqueId UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        fixture INTEGER REFERENCES fixtures(id) ON DELETE CASCADE
      );


INSERT INTO users (email, fullName, userName, password, access)VALUES('olu@me.com','olu Sola','olu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJFbWFpbCI6Im9sdUBtZS5jb20iLCJhY2Nlc3MiOiJBZG1pbiIsImlhdCI6MTU4MDI5OTY4NiwiZXhwIjoxNjQzMzcxNjg2fQ.DEvUL4rmTthxLqAkH4rIYAKEvJQ9CyLkabMrXogyBzg', 'Admin'),('bar@ney.com', 'Bar Ney', 'barney', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJFbWFpbCI6ImJhckBuZXkuY29tIiwiYWNjZXNzIjoiVXNlciIsImlhdCI6MTU4MDI5OTc5MCwiZXhwIjoxNjQzMzcxNzkwfQ.4hn40LrFiOt6Gmyoj1b8sbXuAYA-aICneob4jDJCVEQ', 'User');

INSERT INTO teams(name, location, coach, image)VALUES('Punjabi Tigers','Punjab', 'Maresh Kishan', 'image'),('Delhi Wolves','New Delhi', 'Raheem Rahman', 'image'),('Bengal Boys','Bengaluru', 'Ezekiel Bolai', 'image');

INSERT INTO players(playerName, playerPosition, playerNumber, team_id)VALUES('Lang Lei','Goal Keeper', 1, 1),('Barba Rar','Midfielder', 7, 1),('Bordus Maraj','Defender', 2, 2),('Bordus Maraday','Forward', 14, 2);

INSERT INTO fixtures(homeTeam, awayTeam, matchDate, season, location, status)VALUES(1,2,'01-02-2020','2020','Punjab', 'completed'),(2,1,'01-08-2020','2020','New Delhi', 'completed'),(3,2,'02-20-2020','2020','Bengalaru', 'pending'),(1,3,'02-27-2020','2020','Punjab', 'pending');

INSERT INTO matchOfficials(name,role,fixture)VALUES('Holam Mapuy', 'referee', 1),('Borgan Mappa', 'assistant referee', 1),('Benadaiah Benji', 'VAR referee', 1),('Homal Pumauy', 'referee', 2),('Gargan Tuan', 'assistant referee', 2),('Great Bright', 'VAR referee', 2),('Pandary', 'referee', 3),('Mylia Every', 'assistant referee', 3),('Naon Mill', 'VAR referee', 3),('Holam Mauy', 'referee', 4),('Born Mappa', 'assistant referee', 4),('Benad Beni', 'VAR referee', 4);
