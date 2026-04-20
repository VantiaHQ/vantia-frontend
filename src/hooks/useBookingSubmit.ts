'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  toastSuccessTitle,
  toastSuccessDescription,
  toastErrorTitle,
} from '@/components/sections/contact/BookingForm.content';

export type BookingPayload = {
  start: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
};

export function useBookingSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitBooking = async (payload: BookingPayload, onSuccess: () => void) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/booking/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Error al reservar');
      }
      toast({
        title: toastSuccessTitle,
        description: toastSuccessDescription,
      });
      onSuccess();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al reservar';
      toast({
        title: toastErrorTitle,
        description: msg,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitBooking, isSubmitting };
}
