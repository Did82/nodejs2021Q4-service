import { FastifyInstance, FastifyPluginAsync } from 'fastify';

import {
  addTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from './task.service';

import {
  addTaskSchema,
  getTaskSchema,
  getTasksSchema,
  updateTaskSchema,
} from './task.model';

const tasksRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Get all tasks
  fastify.get(
    '/boards/:id/tasks',
    { schema: getTasksSchema, preValidation: [fastify.auth] },
    getTasksHandler
  );

  // Get single task
  fastify.get(
    '/boards/:id/tasks/:id',
    { schema: getTaskSchema, preValidation: [fastify.auth] },
    getTaskHandler
  );

  // Add task
  fastify.post(
    '/boards/:id/tasks',
    { schema: addTaskSchema, preValidation: [fastify.auth] },
    addTaskHandler
  );

  // Delete task
  fastify.delete(
    '/boards/:id/tasks/:id',
    { preValidation: [fastify.auth] },
    deleteTaskHandler
  );

  // Update task
  fastify.put(
    '/boards/:id/tasks/:id',
    { schema: updateTaskSchema, preValidation: [fastify.auth] },
    updateTaskHandler
  );
};

export default tasksRoutes;
