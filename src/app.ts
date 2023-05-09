import Server from '@server';
import { env } from 'node:process';
import { IncomingMessage, ServerResponse } from 'node:http';

// somehow it'll return false if comparing with strict equal sign
const port = env.NODE_ENV?.includes('production', 0) ? 80 : 3000;
const host = env.NODE_ENV?.includes('production', 0) ? '0.0.0.0' : '127.0.0.1';
const server = new Server(port, host);

server.register('/', 'pages/home');

server.start();
