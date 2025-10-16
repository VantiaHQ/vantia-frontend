"use client";

import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/sections/ContactForm';
import FadeInSection from '@/components/ui/fade-in-section';
import TargetCursor from '@/components/ui/TargetCursor';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TargetCursor />
      <main className="flex-1">
        <FadeInSection direction="up">
          <ContactForm />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
}
