import AppError from "./app.error";

export class ValidationError extends AppError {
  constructor(message: string, code: number = 400) {
    super(message, code);
  }
}

export class UnsupportedMediaTypeError extends AppError {
  constructor(
    message: string = "Content-Type must be application/json",
    code: number = 415,
  ) {
    super(message, code);
  }
}
