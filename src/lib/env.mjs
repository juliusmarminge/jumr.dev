import { z } from "zod";

const envSchema = z.object({
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXTAUTH_URL: z.preprocess(
    (str) =>
      process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : str,
    z.string().url(),
  ),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  throw new Error("❌ Invalid environment variables", _env.error.flatten());
}

export const env = _env.data;
