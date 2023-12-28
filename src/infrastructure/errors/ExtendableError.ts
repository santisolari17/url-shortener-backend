export class ExtendableError extends Error {
  public msg: string;

  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    this.msg = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
