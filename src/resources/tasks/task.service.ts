import { FastifyReply, FastifyRequest } from 'fastify';

import { getRepository } from 'typeorm';

import { IParams } from '../users/user.service';
import { Task } from '../../db/entity/Task';

export interface ITaskPostBody {
  title: string;
  order: number;
  description: string;
  userId: string | undefined;
  boardId: string | undefined;
  columnId?: string | undefined;
}

export type MyReq = FastifyRequest<{
  Params: IParams;
  Body: ITaskPostBody;
}>;

const getTasksHandler = async (req: MyReq, reply: FastifyReply) => {
  const allBoards = await getRepository(Task).find();
  return reply.code(200).send(allBoards);
};

const getTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const task = await getRepository(Task).findOne(id);
  return task
    ? reply.send(task)
    : reply.code(404).send(new Error('Task not found'));
};

const addTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const boardId: string = req.url.split('/')[2];
  const newTask = await getRepository(Task).create(req.body);
  const task = { ...newTask, boardId };
  const savedTask = await getRepository(Task).save(task);
  return reply.code(201).send(savedTask);
};

const updateTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const updatedTask = await getRepository(Task).update(id, req.body);
  return reply.code(200).send(updatedTask);
};

const deleteTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const result = await getRepository(Task).delete(id);
  return result.affected === 1
    ? reply.code(200).send({ message: `Task with id: ${id} was DELETED` })
    : reply.code(404).send(new Error(`Task with id: ${id} NOT found`));
};

export {
  getTasksHandler,
  addTaskHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
};
