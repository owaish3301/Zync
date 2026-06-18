import { type Request, type Response } from "express";
import { isEmailWhitelisted } from "../../services/onboarding/checkWhitelistedEmail.service";

export const checkWhitelistedEmail = async (req: Request, res: Response) => {
  const cleanEmail = req.email;

  if (!cleanEmail) {
    return res.status(400).json({ message: "Invalid email." });
  }

  const result = await isEmailWhitelisted(cleanEmail);
  return res.status(200).json({ allowed: result });
};
