import { createServer, Server as httpServer, IncomingMessage, ServerResponse } from 'node:http';
import { access, constants } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

/**
 * Wrapper class for http.Server
 * @class
 */
export default class Server {
  private server: httpServer;
  private routes: Map<string, string> = new Map();

  /**
   * @constructor
   * @param port define server port
   * @param host define server host
   * @param fn Callback function for on request handler
   */
  constructor(
    protected port: number,
    protected host: string,
    fn?: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
  ) {
    const { on } = this;
    this.server = createServer();

    if (typeof fn === 'function')
      on('request', fn);
  }

  /**
   *
   * @param fn Callback for http.Server.listen
   */
  public start(fn?: CallableFunction): void {
    const { server, port, host } = this;

    server.listen(port, host, (): void => {
      console.info(`\nServer is ready at http://${host}:${port}\n`);

      if (typeof fn === 'function')
        fn();
    });
  }

  /**
   *
   * @param event event name of http.Server event emitter
   * @param fn callback function
   */
  public on(event: string, fn: CallableFunction): void {
    if (!this.server)
      throw new Error('Server is not started yet!');

    this.server.on(event, (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void => fn(req, res));
  }

  /**
   * method for registering pages
   * @param url
   * @param path - path to html file
   * ```ts
   * Server.register('/home', 'pages/home/' | 'pages/home/index.html)
   * ```
   */
  public async register(url: string, path: string): Promise<void> {
    const { routes } = this;

    // adjusting path
    if (!path.includes('.')) {
      if (!RegExp('(.*)/$').test(path))
        path += '/';
      path += 'index.html'
    }

    if (extname(path) !== '.html')
      throw new TypeError('Use html file for register a page');

    await access(resolve(__dirname, path), constants.R_OK);

    if (routes.has(url))
      throw new Error(`Route of ${url} is already exist`);

    routes.set(url, path);
  }
}
