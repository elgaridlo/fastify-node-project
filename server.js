const PORT = process.env.PORT || 9000;

const server = require('./src/app')({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'req.headers,res',
      },
    },
  },
});

const start = async () => {
  try {
    await server.listen(PORT, '127.0.0.1');
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
