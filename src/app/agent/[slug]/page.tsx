import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

interface AgentPageProps {
  params: { slug: string };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = params;

  const { data, error } = await supabase
    .from('ai_generated_pages')
    .select('content')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error("Error fetching agent page:", error);
    notFound();
  }

  const pageContent = data.content as any; // Cast to any for now, assuming it's the JSON structure

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px] pt-8">
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full font-extrabold tracking-tight text-white mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
                {pageContent.hero.title}
              </h1>
              <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
                {pageContent.hero.subtitle}
              </p>

              {/* Render other sections based on pageContent */}
              <div className="mt-12 space-y-12">
                {/* What is it */}
                {pageContent.whatIsIt && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">{pageContent.whatIsIt.title}</h2>
                    <p className="text-foreground/80">{pageContent.whatIsIt.text}</p>
                  </div>
                )}

                {/* Benefits */}
                {pageContent.benefits && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">{pageContent.benefits.title}</h2>
                    <ul className="list-disc list-inside text-foreground/80 space-y-2">
                      {pageContent.benefits.items.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* How It Works */}
                {pageContent.howItWorks && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">{pageContent.howItWorks.title}</h2>
                    <ol className="list-decimal list-inside text-foreground/80 space-y-2">
                      {pageContent.howItWorks.steps.map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* FAQ */}
                {pageContent.faq && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">{pageContent.faq.title}</h2>
                    <div className="space-y-4">
                      {pageContent.faq.items.map((item: { q: string; a: string }, index: number) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold text-white">{item.q}</h3>
                          <p className="text-foreground/80">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonials */}
                {pageContent.testimonials && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">{pageContent.testimonials.title}</h2>
                    <div className="space-y-4">
                      {pageContent.testimonials.items.map((item: { text: string; author: string }, index: number) => (
                        <div key={index} className="bg-blue-950/60 p-4 rounded-lg">
                          <p className="italic text-foreground/80">"{item.text}"</p>
                          <p className="text-white mt-2">- {item.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pain Points */}
                {pageContent.painPoints && pageContent.painPoints.length > 0 && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">Puntos de Dolor Identificados</h2>
                    <ul className="list-disc list-inside text-foreground/80 space-y-2">
                      {pageContent.painPoints.map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Possible Automations */}
                {pageContent.possibleAutomations && pageContent.possibleAutomations.length > 0 && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">Posibles Automatizaciones</h2>
                    <ul className="list-disc list-inside text-foreground/80 space-y-2">
                      {pageContent.possibleAutomations.map((automation: string, index: number) => (
                        <li key={index}>{automation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Modules Used */}
                {pageContent.modulesUsed && (
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4">Módulos de IA Utilizados</h2>
                    {pageContent.modulesUsed.core && pageContent.modulesUsed.core.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white">Core:</h3>
                        <ul className="list-disc list-inside text-foreground/80 space-y-1">
                          {pageContent.modulesUsed.core.map((module: string, index: number) => (
                            <li key={index}>{module}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {pageContent.modulesUsed.extra && pageContent.modulesUsed.extra.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-white">Extra:</h3>
                        <ul className="list-disc list-inside text-foreground/80 space-y-1">
                          {pageContent.modulesUsed.extra.map((module: string, index: number) => (
                            <li key={index}>{module}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Final CTA */}
                {pageContent.finalCTA && (
                  <div className="text-center mt-12">
                    <p className="text-2xl font-bold text-white mb-4">{pageContent.finalCTA.text}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      {pageContent.finalCTA.buttons.map((buttonText: string, index: number) => (
                        <Button key={index} size="lg" className="cursor-target bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors">
                          {buttonText}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
