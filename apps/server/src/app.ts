import express, { Express } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { onboardingRouter } from "./routes/onboarding.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import cors from "cors";

const app: Express = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use("/api/onboarding/", onboardingRouter);

app.use(globalErrorHandler);

export default app;
