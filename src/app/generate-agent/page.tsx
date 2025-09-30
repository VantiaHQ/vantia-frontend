import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AgentGenerator from '@/components/sections/agent-generator';
import TargetCursor from '@/components/ui/TargetCursor';

export default function GenerateAgentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TargetCursor />
      <Header />
      <main className="flex-1 mt-[-80px] pt-8">
        <AgentGenerator />
      </main>
      <Footer />
    </div>
  );
}
