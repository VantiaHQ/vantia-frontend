import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import {
  toastSuccessTitle,
  toastSuccessDescription,
  toastErrorTitle,
  toastErrorGenericDescription,
  apiErrorMessage,
} from "@/components/sections/ContactForm.content";

interface ContactFormInputs {
  name: string;
  company: string;
  email: string;
  budget: string;
  message: string;
}

export const useContactFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, formData: ContactFormInputs, resetForm: () => void) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || apiErrorMessage);
      }

      toast({
        title: toastSuccessTitle,
        description: toastSuccessDescription,
      });
      resetForm();
    } catch (error: any) {
      toast({
        title: toastErrorTitle,
        description: error.message || toastErrorGenericDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
