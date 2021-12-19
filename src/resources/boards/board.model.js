"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoardSchema = exports.addBoardSchema = exports.getBoardSchema = exports.getBoardsSchema = void 0;
const board = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: {
            type: 'array',
            item: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    order: { type: 'string' },
                },
            },
        },
    },
};
const getBoardsSchema = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: board,
            },
        },
    },
};
exports.getBoardsSchema = getBoardsSchema;
const getBoardSchema = {
    schema: {
        response: {
            200: board,
        },
    },
};
exports.getBoardSchema = getBoardSchema;
const addBoardSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'columns'],
            properties: {
                title: { type: 'string' },
                columns: {
                    type: 'array',
                    item: {
                        type: 'object',
                        required: ['title', 'order'],
                        properties: {
                            title: { type: 'string' },
                            order: { type: 'string' },
                        },
                    },
                },
            },
        },
        response: {
            201: board,
        },
    },
};
exports.addBoardSchema = addBoardSchema;
const updateBoardSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'columns'],
            properties: {
                title: { type: 'string' },
                columns: {
                    type: 'array',
                    item: {
                        type: 'object',
                        required: ['title', 'order'],
                        properties: {
                            title: { type: 'string' },
                            order: { type: 'string' },
                        },
                    },
                },
            },
        },
        response: {
            200: board,
        },
    },
};
exports.updateBoardSchema = updateBoardSchema;
