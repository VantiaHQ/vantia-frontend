import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Philosophy from '@/components/sections/Philosophy';
import AgenteModular from '@/components/sections/AgenteModular';
import Channels from '@/components/sections/Channels';
import CaseStudy from '@/components/sections/CaseStudy';
import ConsultoriaIA from '@/components/sections/ConsultoriaIA';
import Contact from '@/components/sections/Contact';
import FadeInSection from '@/components/ui/fade-in-section';
import Security from '@/components/sections/Security';
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