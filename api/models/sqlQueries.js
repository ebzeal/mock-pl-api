/* eslint-disable indent */
const checkUser = 'SELECT * FROM users WHERE email=$1';
const checkUserName = 'SELECT * FROM users WHERE userName=$1';
const insertUser = `INSERT INTO
users(fullName, userName, email, password)
VALUES($1, $2, $3, $4)
returning *`;
const findUser = 'SELECT * FROM users WHERE email=$1 OR userName=$1';
const findUsers = 'SELECT * FROM users';
const findUserById = 'SELECT * FROM users WHERE id=$1';
const updateUser = "UPDATE users SET access = 'Admin' WHERE id=$1";

const findTeam = 'SELECT * FROM teams WHERE name=$1';
const addTeam = 'INSERT INTO teams(name, location, coach)VALUES($1, $2, $3)';
const addPlayers = 'INSERT INTO players(playerName, playerPosition, playerNumber, team_id)VALUES($1, $2, $3, $4)';
const findTeams = 'SELECT id, name, location coach FROM teams';
const findTeamById = 'SELECT * FROM teams WHERE id=$1';
const getTeamWithPlayers = 'SELECT * FROM teams t INNER JOIN players p ON $1=p.team_id AND $1=t.id';
const getTeamsWithPlayers = 'SELECT * FROM teams t INNER JOIN players p ON t.id=p.team_id';
const updateTeam = 'UPDATE teams SET name=$2, location=$3, coach=$4 WHERE id=$1';
const updatePlayers = 'INSERT INTO players(playerName, playerPosition, playerNumber, team_id, uniqueId)VALUES($1, $2, $3, $4, $5) ON CONFLICT(uniqueId) DO UPDATE SET playerName=$1, playerPosition=$2';
const deleteTeam = 'DELETE FROM teams WHERE id=$1';

const findFixture = 'SELECT * FROM fixtures WHERE homeTeam=$1 AND awayTeam=$2 AND season=$3 AND location=$4';
const findAllFixtures = 'SELECT * FROM fixtures';
const findFixtureById = 'SELECT * FROM fixtures WHERE id=$1';
const getTeamLocation = 'SELECT location FROM teams where id=$1';
const getTeamDetails = 'SELECT id, name, location FROM teams where id=$1';
const getTeamName = 'SELECT name FROM teams where id=$1';
const findFixtureConflict = 'SELECT * FROM fixtures WHERE matchDate=$1 AND (homeTeam=$2 OR awayTeam=$3)';
const createFixture = 'INSERT INTO fixtures(homeTeam, awayTeam, matchDate, season, location, status)VALUES($1, $2, $3, $4, $5, $6) ';
const updateFixture = 'UPDATE fixtures SET homeTeam=$1, awayTeam=$2, matchDate=$3, season=$4, location=$5, status=$6, link=$7 WHERE id=$8';
const deleteFixture = 'DELETE FROM fixtures WHERE id=$1';
const updateFixtureStatus = 'UPDATE fixtures SET status=$2 WHERE id=$1';


const addMatchOfficials = 'INSERT INTO matchOfficials(name,role,fixture)VALUES($1, $2, $3)';
const getMatchOfficials = 'SELECT name, role FROM  matchOfficials WHERE fixture=$1';
const updateMatchOfficials = 'INSERT INTO players(name, role, uniqueId)VALUES($1, $2, $3) ON CONFLICT(uniqueId) DO UPDATE SET name=$1, role=$2';


export {
    checkUser,
    checkUserName,
    insertUser,
    findUser,
    findUsers,
    findUserById,
    updateUser,
    findTeam,
    findTeams,
    addTeam,
    addPlayers,
    findTeamById,
    getTeamWithPlayers,
    getTeamsWithPlayers,
    updateTeam,
    updatePlayers,
    deleteTeam,
    findFixture,
    getTeamLocation,
    findFixtureConflict,
    getTeamDetails,
    getTeamName,
    createFixture,
    addMatchOfficials,
    findFixtureById,
    getMatchOfficials,
    findAllFixtures,
    updateFixture,
    updateMatchOfficials,
    deleteFixture,
    updateFixtureStatus,
};
