import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Bruno from '@/components/sections/Bruno';
import Contact from '@/components/sections/contact';
import Partners from '@/components/sections/Partners';

export default function BrunoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <Bruno />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

