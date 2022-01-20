import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions, getRepository } from 'typeorm';
import { FastifyInstance } from 'fastify';
import { hash } from 'bcryptjs';
import { User } from './entity/User';
import { Board } from './entity/Board';
import { Task } from './entity/Task';
import { SALT } from '../common/config';

export default fp(async (fastify: FastifyInstance) => {
  const salt: number = parseInt(SALT!, 10);
  const admin = {
    name: 'admin',
    login: 'admin',
    password: await hash('admin', salt),
  };

  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      entities: [User, Board, Task],
    });
    await createConnection(connectionOptions);
    fastify.log.info('database connected');

    const userRepo = getRepository(User);
    const isAdmin = !!(await userRepo.findOne({ login: 'admin' }));
    if (!isAdmin) await userRepo.save(admin);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
