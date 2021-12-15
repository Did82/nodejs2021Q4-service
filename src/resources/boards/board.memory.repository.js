const { v4: uuidv4 } = require('uuid');
const db = require('../../common/db');

const getAll = () => db.boards;

const addColumn = (column) => {
  const id = uuidv4();
  const newColumn = { id, ...column };
  return newColumn;
};

const addBoard = (board) => {
  const id = uuidv4();
  const { title, columns } = board;
  const newColumns = columns.map((item) => addColumn(item));
  const newBoard = { id, title, columns: newColumns };
  db.boards = [...db.boards, newBoard];
  return newBoard;
};

const getBoard = (id) => db.boards.find((item) => item.id === id);

const deleteBoard = (id) => {
  let result = 'not_found';
  const board = db.boards.find((item) => item.id === id);
  if (board) {
    db.boards = db.boards.filter((item) => item.id !== id);
    db.tasks = db.tasks.filter((task) => task.boardId !== id);
    result = 'ok';
  }
  return result;
};

const updateBoard = (id, body) => {
  const { title } = body;
  db.boards = db.boards.map((item) =>
    item.id === id ? { id, title, columns: [...item.columns] } : item
  );
  return db.boards.find((item) => item.id === id);
};

module.exports = { getAll, addBoard, getBoard, deleteBoard, updateBoard };
