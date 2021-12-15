const { v4: uuidv4 } = require('uuid');
const db = require('../../common/db');

const getAll = () => db.users;

const addUser = (user) => {
  const id = uuidv4();
  const newUser = { id, ...user };
  db.users = [...db.users, newUser];
  return newUser;
};

const getUser = (id) => db.users.find((item) => item.id === id);

const deleteUser = (id) => {
  let result = 'not_found';
  const user = db.users.find((item) => item.id === id);
  if (user) {
    db.users = db.users.filter((item) => item.id !== id);
    db.tasks = db.tasks.map((item) =>
      item.userId === id ? { ...item, userId: null } : item
    );
    result = 'ok';
  }
  return result;
};

const updateUser = (id, body) => {
  db.users = db.users.map((item) => (item.id === id ? { id, ...body } : item));
  return db.users.find((item) => item.id === id);
};

module.exports = { getAll, addUser, getUser, deleteUser, updateUser };
