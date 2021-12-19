"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_service_1 = require("./board.service");
const board_model_1 = require("./board.model");
const boardsRoutes = async (fastify) => {
    // Get all boards
    fastify.get('/boards', board_model_1.getBoardsSchema, board_service_1.getBoardsHandler);
    // Get single board
    fastify.get('/boards/:id', board_model_1.getBoardSchema, board_service_1.getBoardHandler);
    // Add board
    fastify.post('/boards', board_model_1.addBoardSchema, board_service_1.addBoardHandler);
    // Delete board
    fastify.delete('/boards/:id', board_service_1.deleteBoardHandler);
    // Update board
    fastify.put('/boards/:id', board_model_1.updateBoardSchema, board_service_1.updateBoardHandler);
};
// module.exports = boardsRoutes;
exports.default = boardsRoutes;
