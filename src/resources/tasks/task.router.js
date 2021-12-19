"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("./task.service");
const task_model_1 = require("./task.model");
const tasksRoutes = async (fastify) => {
    // Get all tasks
    fastify.get('/boards/:id/tasks', task_model_1.getTasksSchema, task_service_1.getTasksHandler);
    // Get single task
    fastify.get('/boards/:id/tasks/:id', task_model_1.getTaskSchema, task_service_1.getTaskHandler);
    // Add task
    fastify.post('/boards/:id/tasks', task_model_1.addTaskSchema, task_service_1.addTaskHandler);
    // Delete task
    fastify.delete('/boards/:id/tasks/:id', task_service_1.deleteTaskHandler);
    // Update task
    fastify.put('/boards/:id/tasks/:id', task_model_1.updateTaskSchema, task_service_1.updateTaskHandler);
};
exports.default = tasksRoutes;
