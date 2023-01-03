import { z } from "zod";

const envSchema = z.object({
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  throw new Error("❌ Invalid environment variables", _env.error);
}

export const env = _env.data;
