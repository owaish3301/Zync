import { EmailType } from "@repo/validators";
import { prisma } from "../../lib/prisma";

export const isEmailWhitelisted = async (email: EmailType) => {
  const whitelistEntry = await prisma.whitelistEmail.findUnique({
    where: { email },
  });
  return Boolean(whitelistEntry);
};
