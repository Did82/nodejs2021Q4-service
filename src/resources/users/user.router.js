"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const user_service_1 = require("./user.service");
const usersRoutes = async (fastify) => {
    // Get all users
    fastify.get('/users', user_model_1.getUsersSchema, user_service_1.getUsersHandler);
    // Get single user
    fastify.get('/users/:id', user_model_1.getUserSchema, user_service_1.getUserHandler);
    // Add user
    fastify.post('/users', user_model_1.addUserSchema, user_service_1.addUserHandler);
    // Delete user
    fastify.delete('/users/:id', user_service_1.deleteUserHandler);
    // Update user
    fastify.put('/users/:id', user_model_1.updateUserSchema, user_service_1.updateUserHandler);
};
exports.default = usersRoutes;
