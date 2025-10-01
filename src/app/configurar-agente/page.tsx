import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ConfigurarAgenteContent from './ConfigurarAgenteContent';

export default function ConfigurarAgentePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1">
        <ConfigurarAgenteContent />
      </main>
      <Footer />
    </div>
  );
}
