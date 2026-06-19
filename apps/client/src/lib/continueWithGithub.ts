import { authClient } from "./auth-client";

export const continueWithGithub = async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: `${window.location.origin}/dashboard`,
  });
};
