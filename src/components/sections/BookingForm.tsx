'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { User, Mail, Phone, MessageSquare, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { bookingConfig } from '@/lib/bookingConfig';
import { useBookingSubmit } from '@/hooks/useBookingSubmit';
import {
  mainTitle,
  description,
  stepPickDate,
  stepPickTime,
  stepYourData,
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  notesPlaceholder,
  loadingSlots,
  noSlots,
  selectDateFirst,
  calendarNotConfigured,
  submitLabel,
  submittingLabel,
} from './BookingForm.content';
import { cn } from '@/lib/utils';

type Slot = { start: string; end: string; label: string };

function dateToYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [configError, setConfigError] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const { submitBooking, isSubmitting } = useBookingSubmit();

  const today = startOfDay(new Date());
  const maxDate = addDays(today, bookingConfig.maxDaysAhead);

  const disabledDays = useCallback(
    (d: Date) => isBefore(d, today) || isAfter(d, maxDate),
    [today, maxDate],
  );

  const dateYmd = selectedDate ? dateToYmd(selectedDate) : null;

  useEffect(() => {
    if (!dateYmd) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }
    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError(null);
    setSelectedSlot(null);
    fetch(`/api/booking/availability?date=${encodeURIComponent(dateYmd)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 503) setConfigError(true);
          throw new Error(data.error || 'Error al cargar horarios');
        }
        if (cancelled) return;
        setConfigError(false);
        setSlots(Array.isArray(data.slots) ? data.slots : []);
      })
      .catch((e) => {
        if (!cancelled) {
          setSlotsError(e instanceof Error ? e.message : 'Error');
          setSlots([]);
        }
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dateYmd]);

  const resetAfterSuccess = useCallback(() => {
    setSelectedDate(undefined);
    setSlots([]);
    setSelectedSlot(null);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
  }, []);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    void submitBooking(
      {
        start: selectedSlot.start,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        notes: notes.trim() || undefined,
      },
      resetAfterSuccess,
    );
  };

  const slotGrid = useMemo(() => {
    if (!dateYmd) return null;
    if (slotsLoading) {
      return (
        <div className="flex items-center gap-2 text-violet-400 py-4">
          <Clock className="w-5 h-5 animate-pulse" />
          <p className="text-sm">{loadingSlots}</p>
        </div>
      );
    }
    if (slotsError) {
      return (
        <p className="text-red-400 text-sm py-4 bg-red-400/10 border border-red-400/20 px-4 rounded-lg">
          {slotsError}
        </p>
      );
    }
    if (configError) {
      return (
        <p className="text-amber-400/90 text-sm py-4 bg-amber-400/10 border border-amber-400/20 px-4 rounded-lg">
          {calendarNotConfigured}
        </p>
      );
    }
    if (slots.length === 0) {
      return <p className="text-foreground/70 text-sm py-4">{noSlots}</p>;
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-3">
        {slots.map((s) => (
          <Button
            key={s.start}
            type="button"
            variant={selectedSlot?.start === s.start ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'cursor-target transition-all duration-300',
              selectedSlot?.start === s.start 
                ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.4)]' 
                : 'border-violet-400/20 hover:border-violet-400/50 hover:bg-violet-400/5'
            )}
            onClick={() => setSelectedSlot(s)}
          >
            {s.label}
          </Button>
        ))}
      </div>
    );
  }, [dateYmd, slotsLoading, slotsError, configError, slots, selectedSlot]);

  return (
    <div id="booking-form" className="relative">
      <div className="mx-auto max-w-3xl text-left">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white/90 mb-4 drop-shadow-[0_0_16px_rgba(167,139,250,0.3)]">
            {mainTitle}
          </h2>
          <p className="text-lg text-foreground/70 mb-2 leading-relaxed">{description}</p>
          <p className="text-sm font-light text-violet-400/60 inline-flex items-center gap-2 bg-violet-400/5 py-1 px-3 rounded-full border border-violet-400/10">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {bookingConfig.slotMinutes} min · {bookingConfig.timeZone}
            </span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white/80 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-xs text-violet-400 border border-violet-400/20">
                1
              </span>
              {stepPickDate}
            </h3>
              <div className="rounded-2xl border border-violet-400/20 bg-violet-950/20 p-2 shadow-2xl backdrop-blur-sm transition-all hover:border-violet-400/30">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={disabledDays}
                  className="text-foreground"
                  classNames={{
                    day_today: "bg-transparent border border-violet-500 text-violet-400 font-bold",
                    day_selected: "bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.4)]",
                  }}
                />
              </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white/80 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-xs text-violet-400 border border-violet-400/20">
                2
              </span>
              {stepPickTime}
            </h3>
            <div className="min-h-[200px]">
              {!dateYmd && (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 rounded-2xl border border-dashed border-violet-400/20 bg-violet-400/5">
                  <CalendarIcon className="w-8 h-8 text-violet-400/30 mb-2" />
                  <p className="text-foreground/50 text-sm italic">{selectDateFirst}</p>
                </div>
              )}
              {dateYmd && slotGrid}
            </div>
          </div>
        </div>

        {selectedSlot && (
          <form onSubmit={handleConfirm} className="mt-16 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="space-y-2 border-l-2 border-violet-500 pl-6">
              <h3 className="text-xl font-bold text-white/90 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-xs text-violet-400 border border-violet-400/20">
                  3
                </span>
                {stepYourData}
              </h3>
              <p className="text-sm text-foreground/60">
                Sesión confirmada para el <span className="font-bold text-violet-300">{dateYmd}</span> a las <span className="font-bold text-violet-300">{selectedSlot.label}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                <Input
                  className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl h-12"
                  placeholder={namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                <Input
                  type="email"
                  className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl h-12"
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                <Input
                  type="tel"
                  className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl h-12"
                  placeholder={phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                <Textarea
                  className="cursor-target pl-12 pt-3 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl min-h-[48px] overflow-hidden resize-none"
                  placeholder={notesPlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={1}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-target w-full bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-full h-12 shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

