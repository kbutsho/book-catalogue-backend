import { Server } from 'http';
import app from './app';
import config from './config';
import { bold, yellow } from 'colorette';

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log(yellow(bold(`server is running on port ${config.port}`)));
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log(`server closed!`)
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error)
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  process.on('SIGTERM', () => {
    if (server) {
      server.close();
    }
  });
}
main();