function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const GOOGLE_CLIENT_ID = getEnvVar("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnvVar("GOOGLE_CLIENT_SECRET");
export const NEXTAUTH_SECRET = getEnvVar("NEXTAUTH_SECRET");
