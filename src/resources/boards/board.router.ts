import { FastifyInstance, FastifyPluginAsync } from 'fastify';

import {
  getBoardsHandler,
  addBoardHandler,
  getBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
} from './board.service';

import {
  getBoardsSchema,
  addBoardSchema,
  getBoardSchema,
  updateBoardSchema,
} from './board.model';

const boardsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
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
};

export default boardsRoutes;
