const {
  getUsersHandler,
  addUserHandler,
  getUserHandler,
  // updateUserHandler,
  // deleteUserHandler,
} = require('./user.service');

const {
  getUsersSchema,
  addUserSchema,
  getUserSchema,
} = require('./user.model');

function usersRoutes(fastify, options, done) {
  // Get all users
  fastify.get('/users', getUsersSchema, getUsersHandler);

  // Get single user
  fastify.get('/users/:id', getUserSchema, getUserHandler);

  // Add user
  fastify.post('/users', addUserSchema, addUserHandler);

  // // Delete user
  // fastify.delete('/users/:id', deleteUserOpts);
  //
  // // Update user
  // fastify.put('/users/:id', updateUserOpts);

  done();
}

module.exports = usersRoutes;
