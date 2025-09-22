import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import Services from '@/components/sections/services';
import Channels from '@/components/sections/channels';
import CaseStudy from '@/components/sections/case-study';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px] pt-8">
        <Hero />
        <Philosophy />
        <Services />
        <Channels />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
