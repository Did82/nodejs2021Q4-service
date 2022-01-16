import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { FastifyInstance } from 'fastify';
import { User } from './entity/User';
import { Board } from './entity/Board';
import { Task } from './entity/Task';

export default fp(async (fastify: FastifyInstance) => {
  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      entities: [User, Board, Task],
    });
    await createConnection(connectionOptions);
    fastify.log.info('database connected');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
