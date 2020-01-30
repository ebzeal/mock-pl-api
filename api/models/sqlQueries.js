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
};
