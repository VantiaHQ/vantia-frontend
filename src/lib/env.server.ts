import 'server-only';
import { z } from 'zod';

const optionalNonEmpty = z.preprocess(
  (v) => (typeof v === 'string' && v.trim().length > 0 ? v.trim() : undefined),
  z.string().min(1).optional(),
);

const ServerEnvSchema = z.object({
  /** Opcionales: solo necesarios para /api/booking/* */
  GOOGLE_CALENDAR_ID: optionalNonEmpty,
  /** JSON en claro o base64 del JSON (codificar en PowerShell, ver README) */
  GOOGLE_SERVICE_ACCOUNT_JSON: optionalNonEmpty,
  /**
   * Email de un usuario de Google Workspace a suplantar (Domain-Wide Delegation).
   * Si está definido, las reservas pueden enviar invitaciones de Calendar a los clientes.
   */
  GOOGLE_WORKSPACE_DELEGATED_USER: optionalNonEmpty,
  /** Webhook n8n: POST desde /api/contact y /api/booking/book */
  N8N_WEBHOOK_URL: optionalNonEmpty,
  /** Opcional: se envía como Authorization: Bearer … */
  N8N_WEBHOOK_SECRET: optionalNonEmpty,
});

type ServerEnv = z.infer<typeof ServerEnvSchema>;

export const env: ServerEnv = ServerEnvSchema.parse({
  GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
  GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
  GOOGLE_WORKSPACE_DELEGATED_USER: process.env.GOOGLE_WORKSPACE_DELEGATED_USER,
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  N8N_WEBHOOK_SECRET: process.env.N8N_WEBHOOK_SECRET,
});
