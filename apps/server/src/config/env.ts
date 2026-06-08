import "dotenv/config";

const validEnv = (env: string): string => {
  const value = process.env[env];
  if (!value) {
    throw new Error(`Invalid : ${env}`);
  }
  return value;
};

const PORT = Number(validEnv("PORT"));
const DATABASE_URL = validEnv("DATABASE_URL");
const GITHUB_CLIENT_ID = validEnv("GITHUB_CLIENT_ID");
const GITHUB_CLIENT_SECRET = validEnv("GITHUB_CLIENT_SECRET");

export { PORT, DATABASE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET };
