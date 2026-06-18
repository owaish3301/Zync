import { emailSchema } from "@repo/validators";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../src/lib/prisma";

const [, , emailArgument, whitelistedByUserId] = process.argv;

const whitelistAnEmail = async (email: string, userId: string) => {
  const cleanEmail = emailSchema.parse(email);

  return prisma.whitelistEmail.create({
    data: {
      email: cleanEmail,
      whitelistedByUserId: userId,
    },
  });
};

const main = async () => {
  if (!emailArgument || !whitelistedByUserId) {
    throw new Error(
      "Usage: pnpm --filter server exec tsx scripts/whitelistAnEmail.ts <email> <whitelisted-by-user-id>",
    );
  }

  const whitelistedEmail = await whitelistAnEmail(
    emailArgument,
    whitelistedByUserId,
  );

  console.log(
    `Whitelisted ${whitelistedEmail.email} (id: ${whitelistedEmail.id}).`,
  );
};

main()
  .catch((error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("That email is already whitelisted.");
      } else if (error.code === "P2003") {
        console.error("The whitelisting user ID does not exist.");
      } else {
        console.error(`Prisma error ${error.code}: ${error.message}`);
      }
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
