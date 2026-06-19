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

const normalizeEmail = (email: string | null | undefined) => {
  const parsedEmail = emailSchema.safeParse(email);
  return parsedEmail.success ? parsedEmail.data : null;
};

const assertEmailCanSignUp = async (email: string | null | undefined) => {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    throw new APIError("BAD_REQUEST", {
      message: "A valid email is required to sign up.",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: cleanEmail,
    },
  });
  if (existingUser) {
    return cleanEmail;
  }

  const whitelistEmail = await prisma.whitelistEmail.findUnique({
    where: {
      email: cleanEmail,
    },
  });
  if (!whitelistEmail) {
    throw new APIError("BAD_REQUEST", {
      message:
        "Can not signup with this email. Try again with an email thats been invited to join zync.",
    });
  }

  return cleanEmail;
};

const isFirstUserBootstrap = async () => {
  if (process.env.ZYNC_BOOTSTRAP_SUPER_ADMIN !== "true") {
    return false;
  }

  const existingUserCount = await prisma.user.count();
  return existingUserCount === 0;
};

const getAvailableUsername = async (username: string | null | undefined) => {
  if (
    !username ||
    username.length < 3 ||
    username.length > 30 ||
    !/^[a-zA-Z0-9_.]+$/.test(username)
  ) {
    return null;
  }

  const normalizedUsername = username.toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: {
      username: normalizedUsername,
    },
  });

  return existingUser ? null : normalizedUsername;
};

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
      async mapProfileToUser(profile) {
        const cleanEmail = await assertEmailCanSignUp(profile.email);
        const username = await getAvailableUsername(profile.login);

        return {
          email: cleanEmail,
          name: profile.name || profile.login || "",
          ...(username ? { username } : {}),
        };
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        async after(user) {
          await prisma.userProfile.create({
            data: {
              userId: user.id,
            },
          });
        },
      },
    },
  },
  plugins: [username()],
  trustedOrigins: [FRONTEND_ORIGIN],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      if (await isFirstUserBootstrap()) {
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
