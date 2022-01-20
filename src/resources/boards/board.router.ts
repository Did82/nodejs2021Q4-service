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
  fastify.get(
    '/boards',
    { schema: getBoardsSchema, preValidation: [fastify.auth] },
    getBoardsHandler
  );

  // Get single board
  fastify.get(
    '/boards/:id',
    { schema: getBoardSchema, preValidation: [fastify.auth] },
    getBoardHandler
  );

  // Add board
  fastify.post(
    '/boards',
    { schema: addBoardSchema, preValidation: [fastify.auth] },
    addBoardHandler
  );

  // Delete board
  fastify.delete(
    '/boards/:id',
    { preValidation: [fastify.auth] },
    deleteBoardHandler
  );

  // Update board
  fastify.put(
    '/boards/:id',
    { schema: updateBoardSchema, preValidation: [fastify.auth] },
    updateBoardHandler
  );
};

export default boardsRoutes;
