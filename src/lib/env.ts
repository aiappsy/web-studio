import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  OPENROUTER_API_KEY: z.string().min(10),
  OPENROUTER_BASE_URL: z.string().url().default("https://openrouter.ai/api/v1"),
  AI_DEFAULT_MODEL: z.string().default("deepseek/deepseek-r1-0528:free"),
  AI_MODEL_FALLBACK: z.string().default("openai/o3-mini"),
  USER_OPENROUTER_KEY_ENABLED: z.string().default("false"),

  JWT_SECRET: z.string().min(32),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Queue
  QUEUE_PROVIDER: z.enum(["coolify", "inmemory", "redis"]).default("coolify"),
  QUEUE_CONCURRENCY: z.string().default("5"),
  UPSTASH_REDIS_URL: z.string().optional(),

  // Debugging
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(process.env);
