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
  statusMessage() {
    if (this.name === "NotFoundError") return "NOT_FOUND_ERROR";
    if (this.name === "BadRequestError") return "BAD_REQUEST_ERROR";
    return 500;
  }
}
export class BadRequestError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
