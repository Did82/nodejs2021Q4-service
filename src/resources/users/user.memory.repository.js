const { v4: uuidv4 } = require('uuid');
const db = require('../../common/db');

const getAll = () => {
  console.log(db.users);
  return db.users;
};

const addUser = (user) => {
  const id = uuidv4();
  const newUser = { id, ...user };
  db.users = [...db.users, newUser];
  return newUser;
};

const getUser = (id) => db.users.find((item) => item.id === id);

module.exports = { getAll, addUser, getUser };
