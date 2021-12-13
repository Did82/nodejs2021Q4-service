const users = require('./user.memory.repository');
const { getUser } = require('./user.memory.repository');

const getUsersHandler = () => users.getAll();

const getUserHandler = (req, reply) => {
  const { id } = req.params;
  const user = getUser(id);
  return user
    ? reply.send(user)
    : reply.code(404).send(new Error('User not found'));
};

const addUserHandler = (req, reply) => {
  const newUser = users.addUser(req.body);
  return reply.code(201).send(newUser);
};

const updateUserHandler = () => users.getAll();

const deleteUserHandler = () => users.getAll();

module.exports = {
  getUsersHandler,
  addUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
