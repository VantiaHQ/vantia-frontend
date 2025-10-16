import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import AgenteModular from '@/components/sections/AgenteModular';
import ConsultoriaIA from '@/components/sections/ConsultoriaIA';
import Security from '@/components/sections/security';
import CaseStudy from '@/components/sections/CaseStudy';
import Channels from '@/components/sections/channels';
import Philosophy from '@/components/sections/Philosophy';
import Contact from '@/components/sections/Contact';
import TargetCursor from '@/components/ui/TargetCursor';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <TargetCursor />
        <Hero />
        <AgenteModular />
        <ConsultoriaIA />
        <Security />
        <CaseStudy />
        <Channels />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}