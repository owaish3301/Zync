import AppError from "./app.error";

export class ValidationError extends AppError {
  constructor(message: string, code: number = 400) {
    super(message, code);
  }
}
