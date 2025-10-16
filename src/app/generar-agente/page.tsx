import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AgentGenerator from '@/components/sections/agent-generator';
import TargetCursor from '@/components/ui/TargetCursor';

export default function GenerateAgentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TargetCursor />
      <Header />
      <main className="flex-1">
        <AgentGenerator />
      </main>
      <Footer />
    </div>
  );
}
