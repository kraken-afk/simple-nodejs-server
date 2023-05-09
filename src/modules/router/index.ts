import RouterInterface from '../interfaces/router.interface';
import { readFile } from 'node:fs/promises';
import { RouteType } from '../@types';

/**
 * TODO: u know it
 */

export default class Router implements RouterInterface {
  constructor(
    private routes: RouteType
  ) {}

  public async get(url: string): Promise<string | Buffer> {
    const { routes } = this;

    if (!routes.has(url))
      throw new Error(`url of '${url} is not resgistered yet'`);

    const path = routes.get(url) ?? "";
    const buffer: Buffer = await readFile(path);
    return buffer;
  }
}