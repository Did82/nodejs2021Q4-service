import { FastifyReply, FastifyRequest } from 'fastify';

const myLogger = {
  file: './LOG/syslog.log',
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
};

export default myLogger;
