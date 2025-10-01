'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Squares from '@/components/Squares';
import FadeInSection from '@/components/ui/fade-in-section';
import { CheckCircle, Rocket } from 'lucide-react';
import { Instrument_Serif } from 'next/font/google';
import { agentContentStrings } from './content';
import ConfigureAgentModalButton from '@/components/sections/ConfigureAgentModalButton';

const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: ['400'] });

type AgentContentProps = {
  content: any;
};

export default function AgentContent({ content }: AgentContentProps) {
  if (!content) return null;

  const sections = [
    { id: 'whatIsIt', title: content.whatIsIt?.title, content: content.whatIsIt, bg: 'bg-background' },
    { id: 'benefits', title: content.benefits?.title, content: content.benefits, bg: 'bg-background' },
    { id: 'howItWorks', title: content.howItWorks?.title, content: content.howItWorks, bg: 'bg-background' },
    { id: 'painPoints', title: agentContentStrings.painPointsTitle, content: content.painPoints, bg: 'bg-background' },
    { id: 'possibleAutomations', title: agentContentStrings.possibleAutomationsTitle, content: content.possibleAutomations, bg: 'bg-background' },
    { id: 'modulesUsed', title: 'Módulos de IA Utilizados', content: content.modulesUsed, bg: 'bg-[#070916]' },
    { id: 'testimonials', title: content.testimonials?.title, content: content.testimonials, bg: 'bg-background' },
    { id: 'faq', title: content.faq?.title, content: content.faq, bg: 'bg-[#070916]' },
    { id: 'finalCTA', title: content.finalCTA?.text, content: content.finalCTA, bg: 'bg-[#070916]' },
  ].filter(section => section.content);

  return (
    <>
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#070916]">
        <Image
          src="/images/modular-agent.webp"
          alt="Hero Background"
          priority
          fill
          style={{ objectFit: 'cover' }}
          quality={75}
          className="absolute inset-0 z-0 opacity-20"
        />
        <div className="container min-h-[60vh] mx-auto flex flex-col justify-center relative z-10 text-center max-w-xl lg:max-w-4xl px-8">
          <h1 className="text-4xl md:text-5xl lg:text-7xl max-w-3xl mx-auto font-extrabold tracking-tight text-white mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
            {content.hero?.title}
          </h1>
          <p className="mt-4 text-lg lg:text-2xl leading-9 text-foreground/80 max-w-2xl mx-auto">
            {content.hero?.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
            >
              <Link href="/contacto" className="transition duration-300 ease-in-out">
                {content.hero?.cta?.[1] ?? agentContentStrings.contactButton} <Rocket className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-icon-pulse" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow hover:border-primary"
            >
              <Link href="#whatIsIt" className="transition duration-300 ease-in-out">{agentContentStrings.functionalitiesButton}</Link>
            </Button>
          </div>
        </div>
      </section>

      {sections.map((section, index) => {
        const hasSquaresBackground = [
          'whatIsIt',
          'benefits',
          'howItWorks',
          'painPoints',
          'possibleAutomations',
        ].includes(section.id);

        return (
          <div key={section.id} className="relative">
            <section id={section.id} className={`py-20 sm:py-28 ${section.bg} ${section.id === 'finalCTA' ? 'dotted-bg' : ''} ${hasSquaresBackground ? 'relative' : ''}`}>
              {hasSquaresBackground && (
                <Squares speed={0.5} squareSize={20} direction='up' borderColor='rgba(96, 165, 250, 0.05)' hoverFillColor='rgba(0, 0, 0, 0)' />
              )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-b from-transparent to-[hsl(var(--background))] z-[5]" />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-t from-transparent to-[hsl(var(--background))] z-[5]" />
              
              <div className={`container mx-auto px-6 py-24 max-w-3xl relative z-10`}>
                <h2 className={`text-4xl max-w-xl font-bold text-white mb-8`}>
                  {section.title}
                </h2>
                {section.id === 'whatIsIt' && (
                  <p className="text-4xl lg:text-6xl font-extralight leading-16 text-blue-300/80 text-left mb-12 min-h-full">{section.content.text}</p>
                )}
                {section.id === 'benefits' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.content.items.map((item: string, itemIndex: number) => (
                      <div key={itemIndex} className="bg-blue-950/60 pl-6 pr-7 pt-6 pb-8 rounded-lg border border-blue-400/30 shadow-lg flex items-start gap-4">
                        <CheckCircle className="mt-1 h-10 w-10 flex-shrink-0 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
                        <span className="text-foreground/80 text-left text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {section.id === 'howItWorks' && (
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
                {section.id === 'painPoints' && section.content.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.content.map((point: string, itemIndex: number) => (
                      <div key={itemIndex} className="bg-blue-950/60 p-6 rounded-lg border border-blue-400/30 shadow-lg flex items-start gap-4">
                        <CheckCircle className="mt-1 h-10 w-10 flex-shrink-0 text-red-400 drop-shadow-[0_0_8px_rgba(255,100,100,0.7)]" />
                        <span className="text-foreground/80 text-left text-lg">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
                {section.id === 'possibleAutomations' && section.content.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.content.map((automation: string, itemIndex: number) => (
                      <div key={itemIndex} className="bg-blue-950/60 p-6 rounded-lg border border-blue-400/30 shadow-lg flex items-start gap-4">
                        <CheckCircle className="mt-1 h-10 w-10 flex-shrink-0 text-green-400 drop-shadow-[0_0_8px_rgba(100,255,100,0.7)]" />
                        <span className="text-foreground/80 text-left text-lg">{automation}</span>
                      </div>
                    ))}
                  </div>
                )}
                {section.id === 'modulesUsed' && (
                  <>
                    {section.content.core && section.content.core.length > 0 && (
                      <div className="mb-6 text-left">
                        <h3 className="text-2xl font-semibold text-white mb-4">{agentContentStrings.coreModulesTitle}</h3>
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
                        <h3 className="text-2xl font-semibold text-white mb-4">{agentContentStrings.extraModulesTitle}</h3>
                        <div className="flex flex-wrap gap-3">
                          {section.content.extra.map((module: string, itemIndex: number) => (
                            <div key={itemIndex} className="bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400 p-6 flex items-center gap-6 shadow-lg shadow-blue-400/20">
                              <div className="font-bold text-lg text-white mb-1 text-left">
                                {module}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end"></div>
                      </div>
                    )}
                    <ConfigureAgentModalButton
                      preSelectedModules={[
                        ...(section.content.core?.map((mod: any) => mod) || []),
                        ...(section.content.extra?.map((mod: any) => mod) || []),
                      ]}
                    />
                  </>
                )}
                {section.id === 'testimonials' && (
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
                {section.id === 'faq' && (
                  <div className="space-y-6 text-left">
                    {section.content.items.map((item: { q: string; a: string }, itemIndex: number) => (
                      <div key={itemIndex} className="bg-blue-950/60 p-6 rounded-lg border border-blue-400/30 shadow-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">{item.q}</h3>
                        <p className="text-foreground/80">{item.a}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.id === 'finalCTA' && (
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
                        className="group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
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
    </>
  );
}



