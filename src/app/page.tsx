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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px] pt-8">
        <FadeInSection direction="up"><Hero /></FadeInSection>
        <FadeInSection direction="up"><Philosophy /></FadeInSection>
        <FadeInSection direction="up"><AgenteModular /></FadeInSection>
        <FadeInSection direction="left"><Channels /></FadeInSection>
        <FadeInSection direction="right"><CaseStudy /></FadeInSection>
        <FadeInSection direction="up"><ConsultoriaIA /></FadeInSection>
        <FadeInSection direction="up"><Contact /></FadeInSection>
      </main>
      <Footer />
    </div>
  );
}
