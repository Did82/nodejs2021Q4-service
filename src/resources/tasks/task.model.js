"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.addTaskSchema = exports.getTaskSchema = exports.getTasksSchema = void 0;
const task = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
    },
};
const getTasksSchema = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: task,
            },
        },
    },
};
exports.getTasksSchema = getTasksSchema;
const getTaskSchema = {
    schema: {
        response: {
            200: task,
        },
    },
};
exports.getTaskSchema = getTaskSchema;
const addTaskSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'order', 'boardId'],
            properties: {
                title: { type: 'string' },
                order: { type: 'number' },
                description: { type: 'string' },
                userId: { type: ['string', 'null'] },
                boardId: { type: ['string', 'null'] },
                columnId: { type: ['string', 'null'] },
            },
        },
        response: {
            201: task,
        },
    },
};
exports.addTaskSchema = addTaskSchema;
const updateTaskSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'order', 'boardId'],
            properties: {
                title: { type: 'string' },
                order: { type: 'number' },
                description: { type: 'string' },
                userId: { type: ['string', 'null'] },
                boardId: { type: ['string', 'null'] },
                columnId: { type: ['string', 'null'] },
            },
        },
        response: {
            200: task,
        },
    },
};
exports.updateTaskSchema = updateTaskSchema;
