import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import Security from '@/components/sections/security';
import CaseStudy from '@/components/sections/CaseStudy';
import Channels from '@/components/sections/channels';
import Philosophy from '@/components/sections/philosophy';
import Contact from '@/components/sections/contact';
import Partners from '@/components/sections/Partners';
import ProductsPreview from '@/components/sections/ProductsPreview';
import TargetCursor from '@/components/ui/TargetCursor';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <TargetCursor />
        <HeroSection />
        <Partners />

        <ProductsPreview />
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
