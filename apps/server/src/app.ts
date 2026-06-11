import express, { Express } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { onboardingRouter } from "./routes/onboarding.routes";
import { globalErrorHandler } from "./middlewares/error";

const app: Express = express();

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use("/api/onboarding/", onboardingRouter);

app.use(globalErrorHandler);

export default app;
