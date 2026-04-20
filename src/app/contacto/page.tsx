'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ContactPageContent from '@/components/sections/contact/ContactPageContent';
import TargetCursor from '@/components/ui/TargetCursor';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <TargetCursor />

      <main className="flex-1 pt-32 pb-20">
        <Suspense
          fallback={
            <div className="container mx-auto px-6 pt-20 text-center text-violet-400">Cargando...</div>
          }
        >
          <ContactPageContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
