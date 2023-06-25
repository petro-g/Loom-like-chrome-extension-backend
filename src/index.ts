import path from 'path';

import fastify from 'fastify';
import now from 'fastify-now';
import fastifyMultipart from 'fastify-multipart';
import fastifyCors from 'fastify-cors';

// Load env vars
import loadConfig, { APP_CONFIG } from './config';
loadConfig();

export async function createServer() {
  const server = fastify({
    logger: true,
  });
  server.register(fastifyCors);

  server.register(fastifyMultipart);

  server.register(now, {
    routesFolder: path.join(__dirname, './routes'),
    pathPrefix: '/api',
  });

  await server.ready();
  return server;
}

export async function startServer() {
  process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
  });

  const server = await createServer();
  await server.listen(APP_CONFIG.port, APP_CONFIG.host);

  if (process.env.NODE_ENV === 'production') {
    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, () =>
        server.close().then((err) => {
          console.log(`close application on ${signal}`);
          process.exit(err ? 1 : 0);
        }),
      );
    }
  }
}

if (!APP_CONFIG.isTest) {
  startServer();
}
