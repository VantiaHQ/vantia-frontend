import { google } from 'googleapis';
import { env } from '@/lib/env.server';

/**
 * Acepta JSON en claro o la misma cadena codificada en base64 (recomendado en Vercel).
 * Si el valor (tras trim) empieza por `{`, se interpreta como JSON; si no, se decodifica base64.
 */
function parseServiceAccountCredentials(raw: string): Record<string, unknown> {
  const trimmed = raw.trim();
  const jsonText =
    trimmed.startsWith('{') || trimmed.startsWith('[')
      ? trimmed
      : Buffer.from(trimmed.replace(/\s/g, ''), 'base64').toString('utf8');
  return JSON.parse(jsonText) as Record<string, unknown>;
}

function asServiceAccountKey(c: Record<string, unknown>): { client_email: string; private_key: string } {
  const client_email = c.client_email;
  const private_key = c.private_key;
  if (typeof client_email !== 'string' || typeof private_key !== 'string') {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON inválido: faltan client_email o private_key');
  }
  return { client_email, private_key };
}

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(env.GOOGLE_SERVICE_ACCOUNT_JSON);
}

/** True si el calendario usa suplantación Workspace → se pueden enviar invitaciones a asistentes. */
export function supportsWorkspaceCalendarInvites(): boolean {
  return Boolean(env.GOOGLE_WORKSPACE_DELEGATED_USER);
}

export function getCalendarId(): string {
  return env.GOOGLE_CALENDAR_ID ?? 'primary';
}

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

// Module-level singleton so the auth client (and its cached access token)
// is reused across requests within the same serverless instance.
let _calendarClient: ReturnType<typeof google.calendar> | null = null;

export function getCalendarClient() {
  if (!env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Google Calendar no está configurado (falta GOOGLE_SERVICE_ACCOUNT_JSON)');
  }
  if (_calendarClient) return _calendarClient;

  const parsed = parseServiceAccountCredentials(env.GOOGLE_SERVICE_ACCOUNT_JSON);

  if (env.GOOGLE_WORKSPACE_DELEGATED_USER) {
    const { client_email, private_key } = asServiceAccountKey(parsed);
    const jwt = new google.auth.JWT({
      email: client_email,
      key: private_key,
      scopes: [CALENDAR_SCOPE],
      subject: env.GOOGLE_WORKSPACE_DELEGATED_USER,
    });
    _calendarClient = google.calendar({ version: 'v3', auth: jwt });
  } else {
    const auth = new google.auth.GoogleAuth({
      credentials: parsed,
      scopes: [CALENDAR_SCOPE],
    });
    _calendarClient = google.calendar({ version: 'v3', auth });
  }

  return _calendarClient;
}
