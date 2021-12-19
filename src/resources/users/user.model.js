"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.addUserSchema = exports.getUserSchema = exports.getUsersSchema = void 0;
const user = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
    },
};
const getUsersSchema = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: user,
            },
        },
    },
};
exports.getUsersSchema = getUsersSchema;
const getUserSchema = {
    schema: {
        response: {
            200: user,
        },
    },
};
exports.getUserSchema = getUserSchema;
const addUserSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            201: user,
        },
    },
};
exports.addUserSchema = addUserSchema;
const updateUserSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: user,
        },
    },
};
exports.updateUserSchema = updateUserSchema;
