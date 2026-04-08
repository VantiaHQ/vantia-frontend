import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AgenteModular from '@/components/sections/agente-modular/AgenteModular';
import Contact from '@/components/sections/contact/contact';
import TargetCursor from '@/components/ui/TargetCursor';

export const metadata: Metadata = {
  title: 'Agente modular',
};

export default function AgenteModularPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <TargetCursor />
        <AgenteModular />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

