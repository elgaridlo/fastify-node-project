const fastify = require('fastify');
const db = require('./plugin/database')
const testRoute = require('./route/tempTestRoute')
const build = (opts = {}) => {
  const app = fastify(opts);

  // register plugins
  app.register(db);

  // register route
  // app.register(testRoute, {prefix: 'api/v1/test'})

  app.post('/api/v1/test', (req, reply) => {
    reply.code(200).send({ wtf: 'wtf!!!!'})
  })

  app.get('/', (req, reply) => {
    reply.code(200).send({ hello: 'world!' });
  });

  return app;
};

module.exports = build;
