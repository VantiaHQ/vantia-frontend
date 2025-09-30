import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CalculadoraAhorroContent from './CalculadoraAhorroContent';

export default function CalculadoraAhorroPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <CalculadoraAhorroContent />
      </main>
      <Footer />
    </div>
  );
}
