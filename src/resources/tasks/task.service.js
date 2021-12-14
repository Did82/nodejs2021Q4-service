const tasks = require('./task.memory.repository');

const getTasksHandler = () => tasks.getAll();

const getTaskHandler = (req, reply) => {
  const { id } = req.params;
  const task = tasks.getTask(id);
  return task
    ? reply.send(task)
    : reply.code(404).send(new Error('Task not found'));
};

const addTaskHandler = (req, reply) => {
  const newTask = tasks.addTask(req);
  return reply.code(201).send(newTask);
};

const updateTaskHandler = (req, reply) => {
  const { id } = req.params;
  const updatedTask = tasks.updateTask(id, req.body);
  return reply.code(200).send(updatedTask);
};

const deleteTaskHandler = (req, reply) => {
  const { id } = req.params;
  const result = tasks.deleteTask(id);
  return result === 'ok'
    ? reply.code(200).send({ message: `Task with id: ${id} was DELETED` })
    : reply.code(404).send(new Error(`Task with id: ${id} NOT found`));
};

module.exports = {
  getTasksHandler,
  addTaskHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
};
