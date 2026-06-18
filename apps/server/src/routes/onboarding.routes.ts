import { Router } from "express";
import { checkWhitelistedEmail } from "../controllers/onboarding/checkWhitelistedEmail.controller";
import { emailValidation } from "../middlewares/onboarding/emailValidation.middleware";
import { requireJson } from "../middlewares/requireJson.middleware";

const router = Router();

router.post(
  "/check-email",
  requireJson,
  emailValidation,
  checkWhitelistedEmail,
);

export { router as onboardingRouter };
