const {
  getUsersHandler,
  addUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require('./user.service');

const {
  getUsersSchema,
  addUserSchema,
  getUserSchema,
  updateUserSchema,
} = require('./user.model');

function usersRoutes(fastify, options, done) {
  // Get all users
  fastify.get('/users', getUsersSchema, getUsersHandler);

  // Get single user
  fastify.get('/users/:id', getUserSchema, getUserHandler);

  // Add user
  fastify.post('/users', addUserSchema, addUserHandler);

  // Delete user
  fastify.delete('/users/:id', deleteUserHandler);

  // Update user
  fastify.put('/users/:id', updateUserSchema, updateUserHandler);

  done();
}

module.exports = usersRoutes;
