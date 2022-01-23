import { FastifyInstance, FastifyPluginAsync } from 'fastify';

import { loginSchema } from './login.model';

import { loginHandler } from './login.service';

const loginRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post('/login', loginSchema, loginHandler);
};

export default loginRoute;
