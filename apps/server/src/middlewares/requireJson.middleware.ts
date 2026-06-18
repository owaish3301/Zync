import type { Request, Response, NextFunction } from "express";
import { UnsupportedMediaTypeError } from "../errors/Validation.error";

export const requireJson = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.is("application/json")) {
      throw new UnsupportedMediaTypeError();
    }
    next();
  } catch (e) {
    next(e);
  }
};
