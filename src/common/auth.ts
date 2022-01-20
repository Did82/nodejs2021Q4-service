// import fastifyJwt from 'fastify-jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';
import { JWT_SECRET_KEY } from './config';

const secretJwt: string = JWT_SECRET_KEY!;

const auth = async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: secretJwt,
  });

  fastify.decorate('auth', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  });
};

declare module 'fastify' {
  export interface FastifyInstance {
    auth(): void;
  }
  export interface FastifyRequest {
    jwtVerify(): void;
  }
}

export default fp(auth);
