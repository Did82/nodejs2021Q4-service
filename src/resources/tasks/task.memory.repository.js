const { v4: uuidv4 } = require('uuid');
const db = require('../../common/db');

const getAll = () => db.tasks;

const addTask = (req) => {
  const id = uuidv4();
  const boardId = req.url.split('/')[2];
  const newTask = { id, ...req.body, boardId };
  db.tasks = [...db.tasks, newTask];
  return newTask;
};

const getTask = (id) => db.tasks.find((item) => item.id === id);

const deleteTask = (id) => {
  let result = 'not_found';
  const task = db.tasks.find((item) => item.id === id);
  if (task) {
    db.tasks = db.tasks.filter((item) => item.id !== id);
    result = 'ok';
  }
  return result;
};

const updateTask = (id, body) => {
  db.tasks = db.tasks.map((item) => (item.id === id ? { id, ...body } : item));
  return db.tasks.find((item) => item.id === id);
};

module.exports = { getAll, addTask, getTask, deleteTask, updateTask };
