import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { PORT } from './common/config';
import usersRoutes from './resources/users/user.router';
import boardsRoutes from './resources/boards/board.router';
import tasksRoutes from './resources/tasks/task.router';

const fastify = Fastify({
  // logger: {
  //   level: 'info',
  //   file: './log.txt',
  //   prettyPrint: {
  //     colorize: false,
  //     translateTime: 'SYS:HH:MM:ss',
  //     ignore: 'pid,hostname',
  //   },
  // },
  logger: {
    level: 'info',
    prettyPrint: {
      colorize: true,
      translateTime: 'SYS:dd.mm.yyyy HH:MM:ss',
      ignore: 'pid,hostname',
    },
    serializers: {
      res(reply: FastifyReply) {
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request: FastifyRequest) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          query: request.query,
        };
      },
    },
  },
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
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
