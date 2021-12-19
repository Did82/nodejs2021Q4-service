"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoardHandler = exports.updateBoardHandler = exports.getBoardHandler = exports.addBoardHandler = exports.getBoardsHandler = void 0;
const board_memory_repository_1 = __importDefault(require("./board.memory.repository"));
const getBoardsHandler = async () => board_memory_repository_1.default.getAll();
exports.getBoardsHandler = getBoardsHandler;
const getBoardHandler = async (req, reply) => {
    const { id } = req.params;
    const board = await board_memory_repository_1.default.getBoard(id);
    return board
        ? reply.send(board)
        : reply.code(404).send(new Error('Board not found'));
};
exports.getBoardHandler = getBoardHandler;
const addBoardHandler = async (req, reply) => {
    const newBoard = await board_memory_repository_1.default.addBoard(req.body);
    return reply.code(201).send(newBoard);
};
exports.addBoardHandler = addBoardHandler;
const updateBoardHandler = async (req, reply) => {
    const { id } = req.params;
    const updatedBoard = await board_memory_repository_1.default.updateBoard(id, req.body);
    return reply.code(200).send(updatedBoard);
};
exports.updateBoardHandler = updateBoardHandler;
const deleteBoardHandler = async (req, reply) => {
    const { id } = req.params;
    const result = await board_memory_repository_1.default.deleteBoard(id);
    return result === 'ok'
        ? reply.code(200).send({ message: `Board with id: ${id} was DELETED` })
        : reply.code(404).send(new Error(`Board with id: ${id} NOT found`));
};
exports.deleteBoardHandler = deleteBoardHandler;
