import Server from '@App/Server';
import { env } from 'node:process';
import { IncomingMessage, ServerResponse } from 'node:http';

// somehow it'll return false if comparing with strict equal sign
const port = env.NODE_ENV.includes('development', 0) ? 3000 : 80;
const host = env.NODE_ENV.includes('development', 0) ? '127.0.0.1' : '0.0.0.0';
const server = new Server(port, host,
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void => {
    res.end('hello!');
  }
);

server.start();