import type { EmailType } from "@repo/validators";

declare global {
  namespace Express {
    interface Request {
      email?: EmailType;
    }
  }
}

export {};
