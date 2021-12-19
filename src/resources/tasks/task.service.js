"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskHandler = exports.updateTaskHandler = exports.getTaskHandler = exports.addTaskHandler = exports.getTasksHandler = void 0;
const task_memory_repository_1 = __importDefault(require("./task.memory.repository"));
const getTasksHandler = async () => task_memory_repository_1.default.getAll();
exports.getTasksHandler = getTasksHandler;
const getTaskHandler = async (req, reply) => {
    const { id } = req.params;
    const task = await task_memory_repository_1.default.getTask(id);
    return task
        ? reply.send(task)
        : reply.code(404).send(new Error('Task not found'));
};
exports.getTaskHandler = getTaskHandler;
const addTaskHandler = async (req, reply) => {
    const newTask = await task_memory_repository_1.default.addTask(req);
    return reply.code(201).send(newTask);
};
exports.addTaskHandler = addTaskHandler;
const updateTaskHandler = async (req, reply) => {
    const { id } = req.params;
    const updatedTask = await task_memory_repository_1.default.updateTask(id, req.body);
    return reply.code(200).send(updatedTask);
};
exports.updateTaskHandler = updateTaskHandler;
const deleteTaskHandler = async (req, reply) => {
    const { id } = req.params;
    const result = await task_memory_repository_1.default.deleteTask(id);
    return result === 'ok'
        ? reply.code(200).send({ message: `Task with id: ${id} was DELETED` })
        : reply.code(404).send(new Error(`Task with id: ${id} NOT found`));
};
exports.deleteTaskHandler = deleteTaskHandler;
