const fastify = require('fastify')({
  logger: true,
});
const { PORT } = require('./common/config');

const port = PORT || 3000;

fastify.register(require('./resources/users/user.router'));

const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
