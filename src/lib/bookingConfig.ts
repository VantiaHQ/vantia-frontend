import 'server-only';

/**
 * Configuración de reservas (solo servidor: API + bookingSlots).
 * Variables: BOOKING_SLOT_MINUTES, BOOKING_WINDOW_START/END, BOOKING_TIME_ZONE.
 */

import { BOOKING_LEAD_TIME_MINUTES, BOOKING_MAX_DAYS_AHEAD } from '@/lib/bookingConstants';

const DEFAULT_TIME_ZONE = 'Europe/Madrid';
const DEFAULT_SLOT_MINUTES = 30;
const DEFAULT_WINDOW = { start: '17:00', end: '20:00' } as const;

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (raw == null || !String(raw).trim()) return fallback;
  const n = parseInt(String(raw).trim(), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function trimOrEmpty(s: string | undefined): string {
  return typeof s === 'string' ? s.trim() : '';
}

function slotMinutesFromEnv(): number {
  return parsePositiveInt(process.env.BOOKING_SLOT_MINUTES, DEFAULT_SLOT_MINUTES);
}

function timeZoneFromEnv(): string {
  const tz = trimOrEmpty(process.env.BOOKING_TIME_ZONE);
  return tz || DEFAULT_TIME_ZONE;
}

function dailyWindowsFromEnv(): readonly { start: string; end: string }[] {
  const start = trimOrEmpty(process.env.BOOKING_WINDOW_START);
  const end = trimOrEmpty(process.env.BOOKING_WINDOW_END);
  if (start && end) return [{ start, end }] as const;
  return [DEFAULT_WINDOW];
}

export const bookingConfig = {
  timeZone: timeZoneFromEnv(),
  slotMinutes: slotMinutesFromEnv(),
  dailyWindows: dailyWindowsFromEnv(),
  leadTimeMinutes: BOOKING_LEAD_TIME_MINUTES,
  maxDaysAhead: BOOKING_MAX_DAYS_AHEAD,
} satisfies {
  timeZone: string;
  slotMinutes: number;
  dailyWindows: readonly { start: string; end: string }[];
  leadTimeMinutes: number;
  maxDaysAhead: number;
};

export type BookingConfig = typeof bookingConfig;
