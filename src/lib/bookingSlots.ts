import { DateTime } from 'luxon';
import { bookingConfig } from '@/lib/bookingConfig';

export type SlotInterval = {
  startIso: string;
  endIso: string;
  label: string;
};

function parseHm(hm: string): { h: number; m: number } {
  const [h, m] = hm.split(':').map((x) => parseInt(x, 10));
  return { h, m };
}

/** Genera slots candidatos para un día YYYY-MM-DD (válido en timeZone de config). */
export function generateSlotsForDay(dateYmd: string): SlotInterval[] {
  const tz = bookingConfig.timeZone;
  const mins = bookingConfig.slotMinutes;
  const day = DateTime.fromISO(dateYmd, { zone: tz });
  if (!day.isValid) return [];

  const slots: SlotInterval[] = [];
  for (const win of bookingConfig.dailyWindows) {
    const { h: sh, m: sm } = parseHm(win.start);
    const { h: eh, m: em } = parseHm(win.end);
    let t = day.set({ hour: sh, minute: sm, second: 0, millisecond: 0 });
    const endWin = day.set({ hour: eh, minute: em, second: 0, millisecond: 0 });
    while (t < endWin) {
      const slotEnd = t.plus({ minutes: mins });
      if (slotEnd > endWin) break;
      slots.push({
        startIso: t.toUTC().toISO()!,
        endIso: slotEnd.toUTC().toISO()!,
        label: t.toFormat('HH:mm'),
      });
      t = slotEnd;
    }
  }
  return slots;
}

export function dayBoundsUtcIso(dateYmd: string): { timeMin: string; timeMax: string } | null {
  const tz = bookingConfig.timeZone;
  const day = DateTime.fromISO(dateYmd, { zone: tz });
  if (!day.isValid) return null;
  const start = day.startOf('day');
  const end = day.endOf('day');
  return {
    timeMin: start.toUTC().toISO()!,
    timeMax: end.toUTC().toISO()!,
  };
}

/** true si [slotStart, slotEnd) intersecta algún intervalo busy (RFC3339 o Date) */
export function slotOverlapsBusy(
  slotStartIso: string,
  slotEndIso: string,
  busy: { start?: string | null; end?: string | null }[],
): boolean {
  const a0 = new Date(slotStartIso).getTime();
  const a1 = new Date(slotEndIso).getTime();
  for (const b of busy) {
    if (!b.start || !b.end) continue;
    const b0 = new Date(b.start).getTime();
    const b1 = new Date(b.end).getTime();
    if (a0 < b1 && a1 > b0) return true;
  }
  return false;
}

export function isDateBookable(dateYmd: string, now: Date = new Date()): boolean {
  const tz = bookingConfig.timeZone;
  const day = DateTime.fromISO(dateYmd, { zone: tz }).startOf('day');
  if (!day.isValid) return false;
  const today = DateTime.fromJSDate(now, { zone: tz }).startOf('day');
  const max = today.plus({ days: bookingConfig.maxDaysAhead });
  if (day < today || day > max) return false;
  return true;
}

export function filterSlotsByLeadTime(slots: SlotInterval[], now: Date = new Date()): SlotInterval[] {
  const leadCutoff = DateTime.fromJSDate(now, { zone: bookingConfig.timeZone }).plus({
    minutes: bookingConfig.leadTimeMinutes,
  });
  return slots.filter((s) => {
    const start = DateTime.fromISO(s.startIso, { zone: 'utc' });
    return start >= leadCutoff;
  });
}
