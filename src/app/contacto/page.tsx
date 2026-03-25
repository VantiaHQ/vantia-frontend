"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ContactForm from '@/components/sections/ContactForm';
import BookingForm from '@/components/sections/BookingForm';
import FadeInSection from '@/components/ui/fade-in-section';
import TargetCursor from '@/components/ui/TargetCursor';
import { cn } from '@/lib/utils';
import { MessageSquare, Calendar } from 'lucide-react';

export type ContactPageTab = 'booking' | 'contact';

function ContactContentInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeTab = useMemo((): ContactPageTab => {
    return searchParams.get('tab') === 'contact' ? 'contact' : 'booking';
  }, [searchParams]);

  const setActiveTab = (tab: ContactPageTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-6">
      {/* Tab Switcher */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex p-1 bg-violet-950/20 border border-violet-400/10 rounded-full backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('booking')}
            className={cn(
              "cursor-target flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
              activeTab === 'booking' 
                ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                : "text-foreground/60 hover:text-white"
            )}
          >
            <Calendar className="w-4 h-4" />
            Reservar Cita
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={cn(
              "cursor-target flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
              activeTab === 'contact' 
                ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                : "text-foreground/60 hover:text-white"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Enviar Mensaje
          </button>
        </div>
      </div>

      <div className="relative">
        {activeTab === 'contact' && (
          <FadeInSection key="contact" direction="up">
            <ContactForm />
          </FadeInSection>
        )}
        {activeTab === 'booking' && (
          <FadeInSection key="booking" direction="up">
            <BookingForm />
          </FadeInSection>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <TargetCursor />
      
      <main className="flex-1 pt-32 pb-20">
        <Suspense fallback={<div className="container mx-auto px-6 pt-20 text-center text-violet-400">Cargando...</div>}>
          <ContactContentInner />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}


