import { z } from 'zod';

const ServerEnvSchema = z.object({
  GEMINI_API_KEY: z.string().min(1),
});

type ServerEnv = z.infer<typeof ServerEnvSchema>;

export const env: ServerEnv = ServerEnvSchema.parse({
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
});
