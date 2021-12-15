const boards = require('./board.memory.repository');

const getBoardsHandler = () => boards.getAll();

const getBoardHandler = (req, reply) => {
  const { id } = req.params;
  const board = boards.getBoard(id);
  return board
    ? reply.send(board)
    : reply.code(404).send(new Error('Board not found'));
};

const addBoardHandler = (req, reply) => {
  const newBoard = boards.addBoard(req.body);
  return reply.code(201).send(newBoard);
};

const updateBoardHandler = (req, reply) => {
  const { id } = req.params;
  const updatedBoard = boards.updateBoard(id, req.body);
  return reply.code(200).send(updatedBoard);
};

const deleteBoardHandler = (req, reply) => {
  const { id } = req.params;
  const result = boards.deleteBoard(id);
  return result === 'ok'
    ? reply.code(200).send({ message: `Board with id: ${id} was DELETED` })
    : reply.code(404).send(new Error(`Board with id: ${id} NOT found`));
};

module.exports = {
  getBoardsHandler,
  addBoardHandler,
  getBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
};
