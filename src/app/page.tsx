import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/home/hero';
import Security from '@/components/sections/home/security';
import CaseStudy from '@/components/sections/home/CaseStudy';
import Channels from '@/components/sections/home/channels';
import Philosophy from '@/components/sections/home/philosophy';
import Contact from '@/components/sections/contact/contact';
import Partners from '@/components/sections/home/Partners';
import ProductsPreview from '@/components/sections/home/ProductsPreview';
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
