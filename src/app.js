const fastify = require('fastify');
const db = require('../plugin/database')

const build = (opts = {}) => {
  const app = fastify(opts);

  // register plugins
  app.register(db);

  app.get('/', (req, reply) => {
    reply.code(200).send({ hello: 'world!' });
  });

  return app;
};

module.exports = build;
