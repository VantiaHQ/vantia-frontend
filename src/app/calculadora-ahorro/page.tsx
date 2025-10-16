import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculadoraAhorroContent from './CalculadoraAhorroContent';
import { SavingsCalculatorProvider } from '@/context/SavingsCalculatorContext';

export default function CalculadoraAhorroPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <SavingsCalculatorProvider>
          <CalculadoraAhorroContent />
        </SavingsCalculatorProvider>
      </main>
      <Footer />
    </div>
  );
}
