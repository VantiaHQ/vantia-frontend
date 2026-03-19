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

export function getCalendarClient() {
  if (!isGoogleCalendarConfigured()) {
    throw new Error('Google Calendar no está configurado');
  }
  const oauth2 = new google.auth.OAuth2(
    env.GOOGLE_CALENDAR_CLIENT_ID,
    env.GOOGLE_CALENDAR_CLIENT_SECRET,
  );
  oauth2.setCredentials({
    refresh_token: env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  });
  return google.calendar({ version: 'v3', auth: oauth2 });
}
