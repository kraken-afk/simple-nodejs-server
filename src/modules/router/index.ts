import RouterInterface from '@interfaces/router.interface';
import { RouteType } from '../@types';

export default class Router implements RouterInterface {
  constructor(
    private routes: RouteType
  ) {}

  public get(url: string): string | Buffer {
    const { routes } = this;

    if (!routes.has(url))
      throw new Error('so fucking hard');
  }
}