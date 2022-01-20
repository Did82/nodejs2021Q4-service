import fastify, { FastifyReply, FastifyRequest } from 'fastify';

import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { User } from '../../db/entity/User';
import { IParams } from '../users/user.service';
// eslint-disable-next-line import/no-cycle
// import { fastify } from '../../server';

const app = fastify();

interface ILogin {
  login: string;
  password: string;
}

type MyReq = FastifyRequest<{
  Params: IParams;
  Body: ILogin;
}>;

const loginHandler = async (req: MyReq, reply: FastifyReply) => {
  const { login, password } = req.body;
  const user = await getRepository(User).findOneOrFail({ login });
  const isPasswordCorrect = await compare(password, user.password);
  if (!user || !isPasswordCorrect)
    return reply.code(403).send(new Error(`Wrong login or password`));
  const token = app.jwt.sign({ userId: user.id, login: user.login });
  return reply.code(201).send({ token });
};

export { loginHandler };
