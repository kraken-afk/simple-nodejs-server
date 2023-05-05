import { createServer, Server as httpServer, IncomingMessage, ServerResponse } from 'node:http';

/**
 * Wrapper class for http.Server
 */
export default class Server {
  private server: httpServer;
  private routes: Array<string> = [];

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
      this.on('request', fn);
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
}
