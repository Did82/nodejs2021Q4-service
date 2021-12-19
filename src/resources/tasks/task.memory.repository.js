"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../../common/db"));
const getAll = async () => db_1.default.tasks;
const addTask = async (req) => {
    const id = (0, uuid_1.v4)();
    const boardId = req.url.split('/')[2];
    const newTask = { id, ...req.body, boardId };
    db_1.default.tasks = [...db_1.default.tasks, newTask];
    return newTask;
};
const getTask = async (id) => db_1.default.tasks.find((item) => item.id === id);
const deleteTask = async (id) => {
    let result = 'not_found';
    const task = db_1.default.tasks.find((item) => item.id === id);
    if (task) {
        db_1.default.tasks = db_1.default.tasks.filter((item) => item.id !== id);
        result = 'ok';
    }
    return result;
};
const updateTask = async (id, body) => {
    db_1.default.tasks = db_1.default.tasks.map((item) => (item.id === id ? { id, ...body } : item));
    return db_1.default.tasks.find((item) => item.id === id);
};
exports.default = { getAll, addTask, getTask, deleteTask, updateTask };
