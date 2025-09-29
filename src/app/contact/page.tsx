"use client";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ContactForm from '@/components/sections/contact-form';
import FadeInSection from '@/components/ui/fade-in-section';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px] pt-8">
        <FadeInSection direction="up">
          <ContactForm />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
}
