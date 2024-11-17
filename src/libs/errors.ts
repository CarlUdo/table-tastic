export class AppError extends Error {
  cause?: Error;
  constructor(message: string, cause?: Error) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    if (cause) {
      this.cause = cause;
    }
    this.name = this.constructor.name;
  }
  get statusCode() {
    if (this.name === "NotFoundError") return 404;
    if (this.name === "DuplicateKeyError") return 409;
    return 500;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class DuplicateKeyError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
