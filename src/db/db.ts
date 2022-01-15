import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { FastifyInstance } from 'fastify';
import { User } from './entity/User';

export default fp(async (fastify: FastifyInstance) => {
  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      entities: [User],
    });

    // const connection = await createConnection(connectionOptions);
    await createConnection(connectionOptions);
    fastify.log.info('database connected');

    // fastify.decorate('db', {
    //   users: connection.getRepository(User),
    // });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
