import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { prisma } from "./prisma";
import {
  FRONTEND_ORIGIN,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "../config/env";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { emailSchema } from "@repo/validators";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [username()],
  trustedOrigins: [FRONTEND_ORIGIN],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      if (!ctx.body || !("email" in ctx.body)) {
        throw new APIError("BAD_REQUEST", {
          message: "Email is required.",
        });
      }
      const parsedEmail = emailSchema.safeParse(ctx.body.email);
      if (!parsedEmail.success) {
        throw new APIError("BAD_REQUEST", {
          message: "Invalid email.",
        });
      }

      const email = await prisma.whitelistEmail.findUnique({
        where: {
          email: parsedEmail.data,
        },
      });
      if (!email) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Can not signup with this email. Try again with an email thats been invited to join zync.",
        });
      }
    }),
  },
});
