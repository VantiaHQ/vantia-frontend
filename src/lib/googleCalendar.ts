import { google } from 'googleapis';
import { env } from '@/lib/env.server';

export function isGoogleCalendarConfigured(): boolean {
  return !!(
    env.GOOGLE_CALENDAR_CLIENT_ID &&
    env.GOOGLE_CALENDAR_CLIENT_SECRET &&
    env.GOOGLE_CALENDAR_REFRESH_TOKEN
  );
}

export function getCalendarId(): string {
  return env.GOOGLE_CALENDAR_ID ?? 'primary';
}

// Module-level singleton so the OAuth2 client (and its cached access token)
// is reused across requests within the same serverless instance.
let _calendarClient: ReturnType<typeof google.calendar> | null = null;

export function getCalendarClient() {
  if (!isGoogleCalendarConfigured()) {
    throw new Error('Google Calendar no está configurado');
  }
  if (_calendarClient) return _calendarClient;

  const oauth2 = new google.auth.OAuth2(
    env.GOOGLE_CALENDAR_CLIENT_ID,
    env.GOOGLE_CALENDAR_CLIENT_SECRET,
  );
  oauth2.setCredentials({
    refresh_token: env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  });
  _calendarClient = google.calendar({ version: 'v3', auth: oauth2 });
  return _calendarClient;
}
