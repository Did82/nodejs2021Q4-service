const {
  getTasksHandler,
  addTaskHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} = require('./task.service');

const {
  getTasksSchema,
  addTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} = require('./task.model');

function tasksRoutes(fastify, options, done) {
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

  done();
}

module.exports = tasksRoutes;
