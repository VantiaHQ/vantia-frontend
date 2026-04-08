import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AgenteModular from '@/components/sections/AgenteModular';
import Contact from '@/components/sections/contact';
import TargetCursor from '@/components/ui/TargetCursor';

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

