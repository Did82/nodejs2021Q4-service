"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../../common/db"));
const getAll = async () => db_1.default.users;
const addUser = async (user) => {
    const id = (0, uuid_1.v4)();
    const newUser = { id, ...user };
    db_1.default.users = [...db_1.default.users, newUser];
    return newUser;
};
const getUser = async (id) => db_1.default.users.find((item) => item.id === id);
const deleteUser = async (id) => {
    let result = 'not_found';
    const user = db_1.default.users.find((item) => item.id === id);
    if (user) {
        db_1.default.users = db_1.default.users.filter((item) => item.id !== id);
        db_1.default.tasks = db_1.default.tasks.map((item) => item.userId === id ? { ...item, userId: null } : item);
        result = 'ok';
    }
    return result;
};
const updateUser = async (id, body) => {
    db_1.default.users = db_1.default.users.map((item) => (item.id === id ? { id, ...body } : item));
    return db_1.default.users.find((item) => item.id === id);
};
exports.default = { getAll, addUser, getUser, deleteUser, updateUser };
