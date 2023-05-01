import * as http from 'node:http';
import * as process from 'node:process';
import { router } from './router';

// Somehow it'll return false when comparing with '==='
const { host, port } = RegExp('production').test(process.env.NODE_ENV) ? { host: '0.0.0.0', port: 80 } : { host: '127.0.0.1', port: 3000 };
const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {

  // suposed to log incoming information of a client, for development
  if (RegExp('development').test(process.env.NODE_ENV)) {
    console.log('incoming message from ' + req.headers['user-agent']);
    console.log('url: ' + req.url);
  }

  if (!(req.url in router)) router['404'](req, res);
  else router[req.url](req, res);

});

server.listen(port, host, (): void => {
  if (RegExp('development').test(process.env.NODE_ENV))
    console.log(`\nServer is ready at http://${host}:${port}\n`);
});
