/**
 * Configuración global de reservas. Ajusta aquí franja horaria, duración y límites.
 */
export const bookingConfig = {
  /** IANA timezone para slots y eventos en Google Calendar */
  timeZone: 'Europe/Madrid',
  /** Duración de cada cita en minutos */
  slotMinutes: 30,
  /** Ventanas diarias en las que se ofrecen citas (hora local según timeZone) */
  dailyWindows: [{ start: '17:00', end: '20:00' }] as const,
  /** No permitir citas antes de ahora + estos minutos */
  leadTimeMinutes: 60,
  /** Máximo de días desde hoy para reservar */
  maxDaysAhead: 60,
} as const;

export type BookingConfig = typeof bookingConfig;
