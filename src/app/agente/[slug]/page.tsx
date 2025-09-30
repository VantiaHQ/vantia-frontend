'use client';
import { notFound, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Rocket } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import TargetCursor from '@/components/ui/TargetCursor';
import Squares from '@/components/Squares';
import FadeInSection from '@/components/ui/fade-in-section'; // Re-add this import


const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: ['400'] });



export default function AgentPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [topOffsets, setTopOffsets] = useState<number[]>([]);

  useEffect(() => {
    const fetchPageContent = async () => {
      const { data, error } = await supabase
        .from('ai_generated_pages')
        .select('content')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error("Error fetching agent page:", error);
        notFound();
      }
      setPageContent(data.content);
      // Introduce a 2-second delay before setting loading to false
      setTimeout(() => {
        setLoading(false);
      }, 2200);
    };

    fetchPageContent();
  }, [slug]);

  useEffect(() => {
    const calculateOffsets = () => {
      let accumulatedHeight = 0;
      const newOffsets: number[] = [];
      headingRefs.current.forEach((ref, index) => {
        if (ref) {
          newOffsets[index] = accumulatedHeight;
          accumulatedHeight += ref.offsetHeight;
        }
      });
      setTopOffsets(newOffsets);
    };

    // Recalculate offsets on mount and on window resize
    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);

    return () => {
      window.removeEventListener('resize', calculateOffsets);
    };
  }, [pageContent]); // Recalculate when pageContent changes

  

  

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-[9999]">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Circle */}
          <div className="absolute w-24 h-24 rounded-full bg-primary opacity-20 animate-pulse" />
          <div className="absolute w-16 h-16 rounded-full bg-primary opacity-40 animate-pulse animation-delay-200" />
          <div className="absolute w-8 h-8 rounded-full bg-primary opacity-60 animate-pulse animation-delay-400" />

          {/* Loading Message */}
          <p className="text-white text-xl font-semibold z-10">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!pageContent) {
    return notFound();
  }

  const sections = [
    { id: "whatIsIt", title: pageContent.whatIsIt?.title, content: pageContent.whatIsIt, bg: "bg-background" },
    { id: "benefits", title: pageContent.benefits?.title, content: pageContent.benefits, bg: "bg-[#070916]" },
    { id: "howItWorks", title: pageContent.howItWorks?.title, content: pageContent.howItWorks, bg: "bg-background" },
    { id: "painPoints", title: "Puntos de Dolor Identificados", content: pageContent.painPoints, bg: "bg-[#070916]" },
    { id: "possibleAutomations", title: "Posibles Automatizaciones", content: pageContent.possibleAutomations, bg: "bg-background" },
    { id: "modulesUsed", title: "Módulos de IA Utilizados", content: pageContent.modulesUsed, bg: "bg-[#070916]" },
    { id: "testimonials", title: pageContent.testimonials?.title, content: pageContent.testimonials, bg: "bg-background" },
    { id: "faq", title: pageContent.faq?.title, content: pageContent.faq, bg: "bg-[#070916]" },
    { id: "finalCTA", title: pageContent.finalCTA?.text, content: pageContent.finalCTA, bg: "bg-[#070916]" },
  ].filter(section => section.content);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TargetCursor />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 overflow-hidden bg-[#070916]">
          <Image
            src="/images/modular-agent.webp" // Generic image, consider making this dynamic
            alt="Hero Background"
            priority
            fill
            style={{ objectFit: "cover" }}
            quality={75}
            className="absolute inset-0 z-0 opacity-20"
          />
          <div className="container min-h-[60vh] mx-auto flex flex-col justify-center relative z-10 text-center max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-3xl mx-auto font-extrabold tracking-tight text-white mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
              {pageContent.hero.title}
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80 max-w-2xl mx-auto">
              {pageContent.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="cursor-target group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
              >
                <Link href="/contacto" className="transition duration-300 ease-in-out">
                  {pageContent.hero.cta[1]} <Rocket className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-icon-pulse" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="cursor-target bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow hover:border-primary"
              >
                <Link href="#whatIsIt" className="transition duration-300 ease-in-out">Consulta las Funcionalidades</Link>
              </Button>
            </div>
          </div>
        </section>

        {sections.map((section, index) => {
          const isStickySection = [
            "benefits",
            "howItWorks", // Re-add this
            "painPoints",
            "possibleAutomations",
          ].includes(section.id);

          const hasSquaresBackground = [
            "whatIsIt",
            "benefits",
            "howItWorks",
            "painPoints",
            "possibleAutomations",
          ].includes(section.id);

          const stickyBgClass = "bg-background"; // Consistent background for sticky sections

          return (
            <div key={section.id} className="relative">
              <section id={section.id} className={`py-20 sm:py-28 ${isStickySection ? stickyBgClass : section.bg} ${section.id === "finalCTA" ? "dotted-bg" : ""} ${isStickySection ? 'min-h-[200vh]' : ''} ${hasSquaresBackground ? 'relative' : ''}`}>
                {hasSquaresBackground && (
                  <Squares speed={0.5} squareSize={20} direction='up' borderColor='rgba(96, 165, 250, 0.05)' hoverFillColor='rgba(0, 0, 0, 0)' />
                )}
                <div
                  className={`container mx-auto px-6 py-24 max-w-3xl ${isStickySection ? 'sticky top-1/2 -translate-y-1/2' : ''} ${hasSquaresBackground ? 'relative z-10' : ''}`}
                  style={isStickySection ? { zIndex: 50 - index } : {}}
                >
                  <h2
                    ref={el => (headingRefs.current[index] = el)}
                    className={`text-4xl max-w-xl font-bold text-white mb-8 ${isStickySection ? 'py-4' : ''}`}
                  >
                    {section.title}
                  </h2>
                  {section.id === "whatIsIt" && (
                    <p className="text-6xl font-extralight leading-16 text-blue-300/80 text-left mb-12 min-h-[50vh]">{section.content.text}</p>
                  )}
                  {section.id === "benefits" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.content.items.map((item: string, itemIndex: number) => (
                        <div key={itemIndex} className="bg-blue-950/60 pl-6 pr-7 pt-6 pb-8 rounded-lg border border-blue-400/30 shadow-lg flex items-start gap-4">
                          <CheckCircle className="mt-1 h-10 w-10 flex-shrink-0 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
                          <span className="text-foreground/80 text-left text-lg">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.id === "howItWorks" && (
                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-24 gap-x-8 text-foreground/80 text-left">
                      {section.content.steps.map((step: string, itemIndex: number) => (
                        <FadeInSection key={itemIndex} direction="up" delay={itemIndex * 200} className={`
                          relative flex items-start pl-12 max-w-xs mx-auto
                          ${itemIndex % 3 === 0 ? 'md:justify-self-start' : ''}
                          ${itemIndex % 3 === 1 ? 'md:justify-self-center' : ''}
                          ${itemIndex % 3 === 2 ? 'md:justify-self-end' : ''}
                        `}>
                          <span className="absolute left-0 top-1 text-4xl font-bold text-blue-300">{itemIndex + 1}.</span>
                          <p className="text-lg">{step}</p>
                        </FadeInSection>
                      ))}
                    </ol>
                  )}
                  {section.id === "painPoints" && section.content.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.content.map((point: string, itemIndex: number) => (
                        <div key={itemIndex} className="bg-blue-950/60 p-6 rounded-lg border border-blue-400/30 shadow-lg flex items-start gap-4">
                          <CheckCircle className="mt-1 h-10 w-10 flex-shrink-0 text-red-400 drop-shadow-[0_0_8px_rgba(255,100,100,0.7)]" />
                          <span className="text-foreground/80 text-left text-lg">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.id === "possibleAutomations" && section.content.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.content.map((automation: string, itemIndex: number) => (
                        <div key={itemIndex} className="bg-blue-950/60 p-6 rounded-lg border border-blue-400/30 shadow-lg flex items-start gap-4">
                          <CheckCircle className="mt-1 h-10 w-10 flex-shrink-0 text-green-400 drop-shadow-[0_0_8px_rgba(100,255,100,0.7)]" />
                          <span className="text-foreground/80 text-left text-lg">{automation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.id === "modulesUsed" && (
                    <>
                      {section.content.core && section.content.core.length > 0 && (
                        <div className="mb-6 text-left">
                          <h3 className="text-2xl font-semibold text-white mb-4">Core:</h3>
                          <div className="flex flex-wrap gap-3">
                            {section.content.core.map((module: string, itemIndex: number) => (
                              <div key={itemIndex} className="bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 p-6 flex items-center gap-6 shadow-lg">
                                <div className="font-bold text-lg text-white mb-1 text-left">
                                  {module}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {section.content.extra && section.content.extra.length > 0 && (
                        <div className="text-left">
                          <h3 className="text-2xl font-semibold text-white mb-4">Extra:</h3>
                          <div className="flex flex-wrap gap-3">
                            {section.content.extra.map((module: string, itemIndex: number) => (
                              <div key={itemIndex} className="bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400 p-6 flex items-center gap-6 shadow-lg shadow-blue-400/20">
                                <div className="font-bold text-lg text-white mb-1 text-left">
                                  {module}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {section.id === "testimonials" && (
                    <div className="space-y-8 text-left">
                      {section.content.items.map((item: { text: string; author: string }, itemIndex: number) => (
                        <blockquote key={itemIndex} className="relative border-l-4 border-primary pl-6 py-6 text-white/80">
                          <p className={`text-5xl ${instrumentSerif.className}`}>
                            "{item.text}"
                          </p>
                          <footer className="mt-4 text-md font-light text-foreground/80">- {item.author}</footer>
                        </blockquote>
                      ))}
                    </div>
                  )}
                  {section.id === "faq" && (
                    <div className="space-y-6 text-left">
                      {section.content.items.map((item: { q: string; a: string }, itemIndex: number) => (
                        <div key={itemIndex} className="bg-blue-950/60 p-6 rounded-lg border border-blue-400/30 shadow-lg">
                          <h3 className="text-xl font-semibold text-white mb-2">{item.q}</h3>
                          <p className="text-foreground/80">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.id === "finalCTA" && (
                    <div className="mx-auto max-w-3xl">
                      <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl max-w-full sm:max-w-xl font-extrabold tracking-tight text-primary mb-8 drop-shadow-[0_0_32px_rgba(139,92,246,0.2)]">
                        {section.content.title}
                      </h2>
                      <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
                        {section.content.text}
                      </p>
                      <div className="mt-10 flex justify-start">
                        <Button
                          asChild
                          size="lg"
                          className="cursor-target group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
                        >
                          <Link href="/contacto" className="transition duration-300 ease-in-out">
                            Contactar <Rocket className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-icon-pulse" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}
