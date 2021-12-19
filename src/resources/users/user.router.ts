import { FastifyInstance, FastifyPluginAsync } from 'fastify';

import {
  addUserSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} from './user.model';

import {
  addUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from './user.service';

const usersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
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
};

export default usersRoutes;
