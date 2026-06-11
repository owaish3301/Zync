import { type Request, type Response, type NextFunction } from "express";
import AppError from "../errors/app.error";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/client";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(500).json({ message: "Database error." });
  }
  if (err instanceof PrismaClientInitializationError) {
    return res.status(500).json({ message: "Database connection error." });
  }
  return res.status(500).json({ message: "Internal server error." });
};
