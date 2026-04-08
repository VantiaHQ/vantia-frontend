import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ConsultoriaIA from '@/components/sections/consultoria/ConsultoriaIA';
import Contact from '@/components/sections/contact/contact';
import TargetCursor from '@/components/ui/TargetCursor';

export default function ConsultoriaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <TargetCursor />
        <ConsultoriaIA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

