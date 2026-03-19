'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BookingForm from '@/components/sections/BookingForm';
import FadeInSection from '@/components/ui/fade-in-section';
import TargetCursor from '@/components/ui/TargetCursor';

export default function ReservarPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <TargetCursor />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <FadeInSection direction="up">
            <BookingForm />
          </FadeInSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
