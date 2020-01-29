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

export { checkUser, checkUserName, insertUser, findUser, findUsers, findUserById, updateUser };
