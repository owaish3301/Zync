import express, { Express } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Express = express();

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

export default app;
