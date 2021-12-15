const {
  getBoardsHandler,
  addBoardHandler,
  getBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
} = require('./board.service');

const {
  getBoardsSchema,
  addBoardSchema,
  getBoardSchema,
  updateBoardSchema,
} = require('./board.model');

function boardsRoutes(fastify, options, done) {
  // Get all boards
  fastify.get('/boards', getBoardsSchema, getBoardsHandler);

  // Get single board
  fastify.get('/boards/:id', getBoardSchema, getBoardHandler);

  // Add board
  fastify.post('/boards', addBoardSchema, addBoardHandler);

  // Delete board
  fastify.delete('/boards/:id', deleteBoardHandler);

  // Update board
  fastify.put('/boards/:id', updateBoardSchema, updateBoardHandler);

  done();
}

module.exports = boardsRoutes;
