"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../../common/db"));
const getAll = async () => db_1.default.boards;
const addColumn = (column) => {
    const id = (0, uuid_1.v4)();
    return { id, ...column };
};
const addBoard = async (board) => {
    const id = (0, uuid_1.v4)();
    const { title, columns } = board;
    const newColumns = columns.map((item) => addColumn(item));
    const newBoard = { id, title, columns: newColumns };
    db_1.default.boards = [...db_1.default.boards, newBoard];
    return newBoard;
};
const getBoard = async (id) => db_1.default.boards.find((item) => item.id === id);
const deleteBoard = async (id) => {
    let result = 'not_found';
    const board = db_1.default.boards.find((item) => item.id === id);
    if (board) {
        db_1.default.boards = db_1.default.boards.filter((item) => item.id !== id);
        db_1.default.tasks = db_1.default.tasks.filter((task) => task.boardId !== id);
        result = 'ok';
    }
    return result;
};
const updateBoard = async (id, body) => {
    const { title } = body;
    db_1.default.boards = db_1.default.boards.map((item) => item.id === id ? { id, title, columns: [...item.columns] } : item);
    return db_1.default.boards.find((item) => item.id === id);
};
exports.default = { getAll, addBoard, getBoard, deleteBoard, updateBoard };
