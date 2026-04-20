import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DateTime } from 'luxon';
import { bookingConfig } from '@/lib/bookingConfig';
import {
  dayBoundsUtcIso,
  generateSlotsForDay,
  isDateBookable,
  slotOverlapsBusy,
} from '@/lib/bookingSlots';
import {
  getCalendarClient,
  getCalendarId,
  isGoogleCalendarConfigured,
  supportsWorkspaceCalendarInvites,
} from '@/lib/googleCalendar';
import { notifyN8n } from '@/lib/n8nWebhook';
import { getClientIp, isRateLimited } from '@/lib/rateLimitIp';

export const runtime = 'nodejs';

const BookSchema = z.object({
  start: z.string().refine((s) => DateTime.fromISO(s).isValid, 'ISO datetime inválido'),
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(6).max(40).optional(),
  notes: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip, 60_000, 10)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        { error: 'Reservas no disponibles (Calendar no configurado)' },
        { status: 503 },
      );
    }

    const body = await req.json();
    const parsed = BookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten() }, { status: 400 });
    }

    const { start, name, email, phone, notes } = parsed.data;
    const startDt = DateTime.fromISO(start, { setZone: true });
    if (!startDt.isValid) {
      return NextResponse.json({ error: 'Fecha/hora inválida' }, { status: 400 });
    }

    const leadCutoff = DateTime.now()
      .setZone(bookingConfig.timeZone)
      .plus({ minutes: bookingConfig.leadTimeMinutes });
    if (startDt < leadCutoff) {
      return NextResponse.json({ error: 'Debes reservar con más antelación' }, { status: 400 });
    }

    const dateYmd = startDt.setZone(bookingConfig.timeZone).toFormat('yyyy-MM-dd');
    if (!isDateBookable(dateYmd)) {
      return NextResponse.json({ error: 'Fecha no permitida' }, { status: 400 });
    }

    const candidates = generateSlotsForDay(dateYmd);
    const endDt = startDt.plus({ minutes: bookingConfig.slotMinutes });
    const startMs = startDt.toUTC().toMillis();
    const endMs = endDt.toUTC().toMillis();
    const startIso = startDt.toUTC().toISO()!;
    const endIso = endDt.toUTC().toISO()!;

    const validSlot = candidates.some((s) => {
      const a = DateTime.fromISO(s.startIso, { zone: 'utc' }).toMillis();
      const b = DateTime.fromISO(s.endIso, { zone: 'utc' }).toMillis();
      return a === startMs && b === endMs;
    });
    if (!validSlot) {
      return NextResponse.json({ error: 'Horario no válido' }, { status: 400 });
    }

    const bounds = dayBoundsUtcIso(dateYmd);
    if (!bounds) {
      return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 });
    }

    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    const freebusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: startIso,
        timeMax: endIso,
        items: [{ id: calendarId }],
      },
    });
    const busy = freebusy.data.calendars?.[calendarId]?.busy ?? [];
    if (slotOverlapsBusy(startIso, endIso, busy as { start?: string; end?: string }[])) {
      return NextResponse.json({ error: 'Ese horario ya no está disponible' }, { status: 409 });
    }

    const description = [
      `Email: ${email}`,
      phone ? `Tel: ${phone}` : null,
      notes ? `Notas: ${notes}` : null,
      '',
      `Reserva web · ${bookingConfig.timeZone}`,
    ]
      .filter(Boolean)
      .join('\n');

    const sendInvites = supportsWorkspaceCalendarInvites();

    const event = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: sendInvites ? 'all' : 'none',
      requestBody: {
        summary: `Cita — ${name}`,
        description,
        start: {
          dateTime: startDt.setZone(bookingConfig.timeZone).toFormat("yyyy-MM-dd'T'HH:mm:ss"),
          timeZone: bookingConfig.timeZone,
        },
        end: {
          dateTime: endDt.setZone(bookingConfig.timeZone).toFormat("yyyy-MM-dd'T'HH:mm:ss"),
          timeZone: bookingConfig.timeZone,
        },
        ...(sendInvites ? { attendees: [{ email, displayName: name }] } : {}),
        conferenceData: {
          createRequest: {
            requestId: `vantia-${startIso.replace(/\D/g, '')}-${Math.random().toString(36).slice(2, 8)}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: { useDefault: true },
      },
    });

    const meetLink =
      event.data.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === 'video')?.uri ??
      null;

    await notifyN8n({
      source: 'booking',
      name,
      email,
      phone: phone ?? null,
      notes: notes ?? null,
      slotStart: startIso,
      slotEnd: endIso,
      timeZone: bookingConfig.timeZone,
      slotLabelLocal: startDt.setZone(bookingConfig.timeZone).toFormat("yyyy-MM-dd HH:mm"),
      calendarEventId: event.data.id ?? null,
      htmlLink: event.data.htmlLink ?? null,
      meetLink,
    });

    return NextResponse.json({ ok: true, eventId: event.data.id, meetLink });
  } catch (e: unknown) {
    console.error('booking/book', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
