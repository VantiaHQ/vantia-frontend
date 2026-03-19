import { z } from 'zod';

const optionalNonEmpty = z.preprocess(
  (v) => (typeof v === 'string' && v.trim().length > 0 ? v.trim() : undefined),
  z.string().min(1).optional(),
);

const ServerEnvSchema = z.object({
  GEMINI_API_KEY: optionalNonEmpty,
  /** Opcionales: solo necesarios para /api/booking/* */
  GOOGLE_CALENDAR_CLIENT_ID: optionalNonEmpty,
  GOOGLE_CALENDAR_CLIENT_SECRET: optionalNonEmpty,
  GOOGLE_CALENDAR_REFRESH_TOKEN: optionalNonEmpty,
  GOOGLE_CALENDAR_ID: optionalNonEmpty,
});

type ServerEnv = z.infer<typeof ServerEnvSchema>;

export const env: ServerEnv = ServerEnvSchema.parse({
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GOOGLE_CALENDAR_CLIENT_ID: process.env.GOOGLE_CALENDAR_CLIENT_ID,
  GOOGLE_CALENDAR_CLIENT_SECRET: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  GOOGLE_CALENDAR_REFRESH_TOKEN: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
});
