const PORT = process.env.PORT || 9000;

const server = require('./src/app')({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'req.headers,res'
      },
    },
  },
});

const start = async () => {
  try {
    await server.listen(PORT, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
