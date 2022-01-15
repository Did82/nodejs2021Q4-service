import { FastifyReply, FastifyRequest } from 'fastify';

import { getRepository } from 'typeorm';
import { IUserPostBody } from './user.memory.repository';
import { User } from '../../db/entity/User';

export interface IParams {
  id: string;
}

type MyReq = FastifyRequest<{
  Params: IParams;
  Body: IUserPostBody;
}>;

const getUsersHandler = async (req: MyReq, reply: FastifyReply) => {
  const allUsers = await getRepository(User).find();
  return reply.code(200).send(allUsers);
};

const getUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const user = await getRepository(User).findOne(id);
  return user
    ? reply.send(user)
    : reply.code(404).send(new Error('User not found'));
};

const addUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const newUser = await getRepository(User).create(req.body);
  const savedUser = await getRepository(User).save(newUser);
  return reply.code(201).send(savedUser);
};

const updateUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const user = await getRepository(User).findOneOrFail(id);
  getRepository(User).merge(user, req.body);
  const updatedUser = await getRepository(User).save(user);
  return reply.code(200).send(updatedUser);
};

const deleteUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const result = await getRepository(User).delete(id);
  return result.affected === 1
    ? reply.code(200).send({ message: `User with id: ${id} was DELETED` })
    : reply.code(404).send(new Error(`User with id: ${id} NOT found`));
};

export {
  getUsersHandler,
  addUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
