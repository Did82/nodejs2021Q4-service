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
  fastify.get(
    '/users',
    { schema: getUsersSchema, preValidation: [fastify.auth] },
    getUsersHandler
  );

  // Get single user
  fastify.get(
    '/users/:id',
    { schema: getUserSchema, preValidation: [fastify.auth] },
    getUserHandler
  );

  // Add user
  fastify.post(
    '/users',
    { schema: addUserSchema, preValidation: [fastify.auth] },
    addUserHandler
  );

  // Delete user
  fastify.delete(
    '/users/:id',
    { schema: getUserSchema, preValidation: [fastify.auth] },
    deleteUserHandler
  );

  // Update user
  fastify.put(
    '/users/:id',
    { schema: updateUserSchema, preValidation: [fastify.auth] },
    updateUserHandler
  );
};

export default usersRoutes;
