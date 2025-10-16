import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import AgentContent from './AgentContent';
export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from('ai_generated_pages')
    .select('content')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AgentContent content={data.content} />
      </main>
      <Footer />
    </div>
  );
}
