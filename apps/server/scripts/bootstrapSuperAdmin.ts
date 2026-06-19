import { emailSchema } from "@repo/validators";
import { AccountStatus, Prisma, Role } from "../generated/prisma/client";
import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

const [, , emailArgument, password, nameArgument, usernameArgument] =
  process.argv;

const bootstrapSuperAdmin = async (
  email: string,
  adminPassword: string,
  name: string,
  username?: string,
) => {
  const existingUserCount = await prisma.user.count();

  if (existingUserCount > 0) {
    throw new Error(
      "Bootstrap stopped: at least one user already exists in the database.",
    );
  }

  const cleanEmail = emailSchema.parse(email);

  process.env.ZYNC_BOOTSTRAP_SUPER_ADMIN = "true";
  const signUpResult = await auth.api.signUpEmail({
    body: {
      email: cleanEmail,
      password: adminPassword,
      name,
      username,
    },
  });

  const userId = signUpResult.user.id;

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: true,
      userProfile: {
        upsert: {
          create: {
            role: Role.ADMIN,
            status: AccountStatus.ACTIVE,
          },
          update: {
            role: Role.ADMIN,
            status: AccountStatus.ACTIVE,
            deletedAt: null,
          },
        },
      },
    },
    include: {
      userProfile: true,
    },
  });

  return user;
};

const main = async () => {
  if (!emailArgument || !password || !nameArgument) {
    throw new Error(
      "Usage: pnpm --filter server exec tsx scripts/bootstrapSuperAdmin.ts <email> <password> <name> [username]",
    );
  }

  const user = await bootstrapSuperAdmin(
    emailArgument,
    password,
    nameArgument,
    usernameArgument,
  );

  console.log(
    `Bootstrapped superadmin ${user.email} (id: ${user.id}, role: ${user.userProfile?.role}).`,
  );
};

main()
  .catch((error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error ${error.code}: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
