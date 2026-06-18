import express, { Express } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { onboardingRouter } from "./routes/onboarding.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import cors from "cors";
import { FRONTEND_ORIGIN } from "./config/env";

const app: Express = express();

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use("/api/onboarding/", onboardingRouter);

app.use(globalErrorHandler);

export default app;
