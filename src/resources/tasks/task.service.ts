import { FastifyReply, FastifyRequest } from 'fastify';

import tasks, { ITaskPostBody } from './task.memory.repository';

import { IParams } from '../users/user.service';

export type MyReq = FastifyRequest<{
  Params: IParams;
  Body: ITaskPostBody;
}>;

const getTasksHandler = async () => tasks.getAll();

const getTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const task = await tasks.getTask(id);
  return task
    ? reply.send(task)
    : reply.code(404).send(new Error('Task not found'));
};

const addTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const newTask = await tasks.addTask(req);
  return reply.code(201).send(newTask);
};

const updateTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const updatedTask = await tasks.updateTask(id, req.body);
  return reply.code(200).send(updatedTask);
};

const deleteTaskHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const result = await tasks.deleteTask(id);
  return result === 'ok'
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
