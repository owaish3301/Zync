import { Router } from "express";
import { checkWhitelistedEmail } from "../controllers/onboarding/checkWhitelistedEmail.controller";
import { emailValidation } from "../middlewares/onboarding/emailValidation.middleware";

const router = Router();

router.post("/check-email", emailValidation, checkWhitelistedEmail);

export { router as onboardingRouter };
