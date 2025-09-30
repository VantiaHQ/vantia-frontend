import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import AgenteModular from '@/components/sections/agente-modular';
import Channels from '@/components/sections/channels';
import CaseStudy from '@/components/sections/case-study';
import ConsultoriaIA from '@/components/sections/consultoria-ia';
import Contact from '@/components/sections/contact';
import FadeInSection from '@/components/ui/fade-in-section';
import Security from '@/components/sections/security';
import TargetCursor from '@/components/ui/TargetCursor';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <TargetCursor />
        <FadeInSection direction="up"><Hero /></FadeInSection>
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