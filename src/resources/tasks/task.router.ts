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
  fastify.get('/boards/:id/tasks', getTasksSchema, getTasksHandler);

  // Get single task
  fastify.get('/boards/:id/tasks/:id', getTaskSchema, getTaskHandler);

  // Add task
  fastify.post('/boards/:id/tasks', addTaskSchema, addTaskHandler);

  // Delete task
  fastify.delete('/boards/:id/tasks/:id', deleteTaskHandler);

  // Update task
  fastify.put('/boards/:id/tasks/:id', updateTaskSchema, updateTaskHandler);
};

export default tasksRoutes;
