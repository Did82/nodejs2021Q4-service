import { FastifyReply, FastifyRequest } from 'fastify';

import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { IParams } from '../users/user.service';
import { Board } from '../../db/entity/Board';
import { Task } from '../../db/entity/Task';

type MyReq = FastifyRequest<{
  Params: IParams;
  Body: IBoardPostBody;
}>;

interface IBoardPostBody {
  title: string;
  columns: IColumnPostBody[];
}

interface IColumnPostBody {
  title: string;
  order: number;
}

const addColumn = (column: IColumnPostBody) => {
  const id: string = uuidv4();
  return { id, ...column };
};

const getBoardsHandler = async (req: MyReq, reply: FastifyReply) => {
  const allBoards = await getRepository(Board).find();
  return reply.code(200).send(allBoards);
};

const getBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const board = await getRepository(Board).findOne(id);
  return board
    ? reply.send(board)
    : reply.code(404).send(new Error('Board not found'));
};

const addBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const { title, columns } = req.body;

  const savedColumns = columns.map((column) => addColumn(column));

  const board = { title, columns: savedColumns };
  const newBoard = await getRepository(Board).create(board);
  const savedBoard = await getRepository(Board).save(newBoard);
  return reply.code(201).send(savedBoard);
};

const updateBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const updatedBoard = await getRepository(Board).update(id, req.body);
  return reply.code(200).send(updatedBoard);
};

const deleteBoardHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const result = await getRepository(Board).delete(id);
  await getRepository(Task).delete({ boardId: id });
  return result.affected === 1
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
