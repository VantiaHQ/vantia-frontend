import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { bookingConfig } from '@/lib/bookingConfig';
import {
  dayBoundsUtcIso,
  filterSlotsByLeadTime,
  generateSlotsForDay,
  isDateBookable,
  slotOverlapsBusy,
} from '@/lib/bookingSlots';
import { getCalendarClient, getCalendarId, isGoogleCalendarConfigured } from '@/lib/googleCalendar';
import { getClientIp, isRateLimited } from '@/lib/rateLimitIp';

export const runtime = 'nodejs';

const QuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip, 60_000, 30)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        { error: 'Reservas no disponibles (Calendar no configurado)' },
        { status: 503 },
      );
    }

    const { searchParams } = new URL(req.url);
    const parsed = QuerySchema.safeParse({ date: searchParams.get('date') });
    if (!parsed.success) {
      return NextResponse.json({ error: 'Parámetro date inválido (YYYY-MM-DD)' }, { status: 400 });
    }
    const { date } = parsed.data;

    if (!isDateBookable(date)) {
      return NextResponse.json({ slots: [] }, { status: 200 });
    }

    const bounds = dayBoundsUtcIso(date);
    if (!bounds) {
      return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 });
    }

    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    const freebusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: bounds.timeMin,
        timeMax: bounds.timeMax,
        items: [{ id: calendarId }],
      },
    });

    const busy = freebusy.data.calendars?.[calendarId]?.busy ?? [];

    let slots = generateSlotsForDay(date);
    slots = filterSlotsByLeadTime(slots);
    const available = slots.filter(
      (s) => !slotOverlapsBusy(s.startIso, s.endIso, busy as { start?: string; end?: string }[]),
    );

    return NextResponse.json({
      timeZone: bookingConfig.timeZone,
      slots: available.map((s) => ({
        start: s.startIso,
        end: s.endIso,
        label: s.label,
      })),
    });
  } catch (e: unknown) {
    console.error('booking/availability', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
