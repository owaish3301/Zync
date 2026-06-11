import { emailSchema } from "@repo/validators";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../errors/Validation.error";

export const emailValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      throw new ValidationError("Invalid email.");
    }

    req.email = parsed.data;
    next();
  } catch (e) {
    next(e);
  }
};
