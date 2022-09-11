const fastify = require('fastify');
const db = require('./plugin/database')
const testRoute = require('./route/tempTestRoute')
const userRoute = require('./route/user')
const swaggerPg = require('./plugin/swagger')

const build = (opts = {}) => {
  const app = fastify(opts);

  // register plugins
  app.register(db);
  app.register(swaggerPg);

  // register route
  app.register(testRoute, { prefix: 'api/v1/test' });
  app.register(userRoute, { prefix: 'api/v1/users' });

  // ini bisa dihapus sih tp jangan juga
  app.get('/', (req, reply) => {
    reply.code(200).send({ hello: 'world - test!' });
  });

  return app;
};

module.exports = build;
