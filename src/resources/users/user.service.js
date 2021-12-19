"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.getUserHandler = exports.addUserHandler = exports.getUsersHandler = void 0;
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
const getUsersHandler = async () => user_memory_repository_1.default.getAll();
exports.getUsersHandler = getUsersHandler;
const getUserHandler = async (req, reply) => {
    const { id } = req.params;
    const user = await user_memory_repository_1.default.getUser(id);
    return user
        ? reply.send(user)
        : reply.code(404).send(new Error('User not found'));
};
exports.getUserHandler = getUserHandler;
const addUserHandler = async (req, reply) => {
    const newUser = await user_memory_repository_1.default.addUser(req.body);
    return reply.code(201).send(newUser);
};
exports.addUserHandler = addUserHandler;
const updateUserHandler = async (req, reply) => {
    const { id } = req.params;
    const updatedUser = await user_memory_repository_1.default.updateUser(id, req.body);
    return reply.code(200).send(updatedUser);
};
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = async (req, reply) => {
    const { id } = req.params;
    const result = await user_memory_repository_1.default.deleteUser(id);
    return result === 'ok'
        ? reply.code(200).send({ message: `User with id: ${id} was DELETED` })
        : reply.code(404).send(new Error(`User with id: ${id} NOT found`));
};
exports.deleteUserHandler = deleteUserHandler;
