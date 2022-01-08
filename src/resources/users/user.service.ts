import { FastifyReply, FastifyRequest } from 'fastify';

import users, { IUserPostBody } from './user.memory.repository';

export interface IParams {
  id: string;
}

type MyReq = FastifyRequest<{
  Params: IParams;
  Body: IUserPostBody;
}>;

const getUsersHandler = async () => users.getAll();

const getUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const user = await users.getUser(id);
  return user
    ? reply.send(user)
    : reply.code(404).send(new Error('User not found'));
};

const addUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const newUser = await users.addUser(req.body);
  req.log.info({ body: req.body });
  return reply.code(201).send(newUser);
};

const updateUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const updatedUser = await users.updateUser(id, req.body);
  return reply.code(200).send(updatedUser);
};

const deleteUserHandler = async (req: MyReq, reply: FastifyReply) => {
  const { id } = req.params;
  const result = await users.deleteUser(id);
  return result === 'ok'
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
