import { FastifyReply, FastifyRequest } from 'fastify';

import boards, { IBoardPostBody } from './board.memory.repository';

import { IParams } from '../users/user.service';

type MyReq = FastifyRequest<{
  Params: IParams;
  Body: IBoardPostBody;
}>;

const getBoardsHandler = async () => boards.getAll();

const getBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const board = await boards.getBoard(id);
  return board
    ? reply.send(board)
    : reply.code(404).send(new Error('Board not found'));
};

const addBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const newBoard = await boards.addBoard(req.body);
  return reply.code(201).send(newBoard);
};

const updateBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const updatedBoard = await boards.updateBoard(id, req.body);
  return reply.code(200).send(updatedBoard);
};

const deleteBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const result = await boards.deleteBoard(id);
  return result === 'ok'
    ? reply.code(200).send({ message: `Board with id: ${id} was DELETED` })
    : reply.code(404).send(new Error(`Board with id: ${id} NOT found`));
};

export {
  getBoardsHandler,
  addBoardHandler,
  getBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
};
