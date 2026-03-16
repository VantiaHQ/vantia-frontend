import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Bruno from '@/components/sections/Bruno';
import Contact from '@/components/sections/contact';

export default function BrunoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <Bruno />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

