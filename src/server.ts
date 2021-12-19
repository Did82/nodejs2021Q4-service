import Fastify, { FastifyInstance } from 'fastify';
import { PORT } from './common/config';
import usersRoutes from './resources/users/user.router';
import boardsRoutes from './resources/boards/board.router';
import tasksRoutes from './resources/tasks/task.router';

const fastify: FastifyInstance = Fastify({
  logger: true,
});

const port: number = parseInt(<string>PORT, 10) || 3000;

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'nodejs2021Q4-service' },
  },
});

fastify.register(usersRoutes);
fastify.register(boardsRoutes);
fastify.register(tasksRoutes);

const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
