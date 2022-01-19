import { FastifyReply, FastifyRequest } from 'fastify';

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../../db/entity/User';
import { Task } from '../../db/entity/Task';

export interface IParams {
  id: string;
}

interface IUserPostBody {
  name: string;
  login: string;
  password: string;
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
  newUser.password = await hash(newUser.password, 10);
  const savedUser = await getRepository(User).save(newUser);
  return reply.code(201).send(savedUser);
};

const updateUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const updatedUser = await getRepository(User).update(id, req.body);

  return reply.code(200).send(updatedUser);
};

const deleteUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const result = await getRepository(User).delete(id);
  await getRepository(Task).update({ userId: id }, { userId: null });
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
