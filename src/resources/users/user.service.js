const users = require('./user.memory.repository');

const getUsersHandler = () => users.getAll();

const getUserHandler = (req, reply) => {
  const { id } = req.params;
  const user = users.getUser(id);
  return user
    ? reply.send(user)
    : reply.code(404).send(new Error('User not found'));
};

const addUserHandler = (req, reply) => {
  const newUser = users.addUser(req.body);
  return reply.code(201).send(newUser);
};

const updateUserHandler = (req, reply) => {
  const { id } = req.params;
  const updatedUser = users.updateUser(id, req.body);
  return reply.code(200).send(updatedUser);
};

const deleteUserHandler = (req, reply) => {
  const { id } = req.params;
  const result = users.deleteUser(id);
  return result === 'ok'
    ? reply.code(200).send({ message: `User with id: ${id} was DELETED` })
    : reply.code(404).send(new Error(`User with id: ${id} NOT found`));
};

module.exports = {
  getUsersHandler,
  addUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
