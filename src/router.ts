import * as http from 'node:http';
import { readFile } from 'node:fs/promises'

export const router = {
  // main url handler
  '/': (req: http.IncomingMessage, res: http.ServerResponse): void => {
    readFile('@public/index.html')
      .then((data: Buffer): void => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      })
      .catch((): void => {
        res.writeHead(500);
        res.end();
      })
  },
// unavailable page handler
'404': (req: http.IncomingMessage, res: http.ServerResponse): void => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'fail',
    code: 404,
    message: 'Resource not found'
  }));
}
};
