import ClientError from "./ClientError";

export default class NotFoundError extends ClientError {
  constructor(message: string, code: number = 404) {
    super(message, code);
  }
}
