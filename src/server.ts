import Fastify from 'fastify';
import 'reflect-metadata';
import { PORT } from './common/config';
import usersRoutes from './resources/users/user.router';
import boardsRoutes from './resources/boards/board.router';
import tasksRoutes from './resources/tasks/task.router';
import myLogger from './common/logger';

const fastify = Fastify({
  logger: myLogger,
});

const port: number = parseInt(<string>PORT, 10) || 3000;

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'nodejs2021Q4-service' },
  },
});

fastify.register(usersRoutes).after((err) => {
  if (err) throw err;
});
fastify.register(boardsRoutes).after((err) => {
  if (err) throw err;
});
fastify.register(tasksRoutes).after((err) => {
  if (err) throw err;
});

const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
