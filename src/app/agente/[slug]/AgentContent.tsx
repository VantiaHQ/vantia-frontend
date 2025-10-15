'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { agentContentStrings } from './content';

import SectionWrapper from '@/components/sections/agent-page/SectionWrapper';
import WhatIsIt from '@/components/sections/agent-page/WhatIsIt';
import GridSection from '@/components/sections/agent-page/GridSection';
import HowItWorks from '@/components/sections/agent-page/HowItWorks';
import ModulesUsed from '@/components/sections/agent-page/ModulesUsed';
import Testimonials from '@/components/sections/agent-page/Testimonials';
import Faq from '@/components/sections/agent-page/Faq';
import FinalCTA from '@/components/sections/agent-page/FinalCTA';

type AgentContentProps = {
  content: any;
};

export default function AgentContent({ content }: AgentContentProps) {
  if (!content) return null;

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

      {content.whatIsIt && (
        <SectionWrapper id="whatIsIt" hasSquares>
          <WhatIsIt content={content.whatIsIt} />
        </SectionWrapper>
      )}

      {content.benefits && (
        <SectionWrapper id="benefits" hasSquares>
          <GridSection title={content.benefits.title} items={content.benefits.items} />
        </SectionWrapper>
      )}

      {content.howItWorks && (
        <SectionWrapper id="howItWorks" hasSquares>
          <HowItWorks content={content.howItWorks} />
        </SectionWrapper>
      )}

      {content.painPoints && (
        <SectionWrapper id="painPoints" hasSquares>
          <GridSection title={agentContentStrings.painPointsTitle} items={content.painPoints} iconClassName="text-red-400 drop-shadow-[0_0_8px_rgba(255,100,100,0.7)]" />
        </SectionWrapper>
      )}

      {content.possibleAutomations && (
        <SectionWrapper id="possibleAutomations" hasSquares>
          <GridSection title={agentContentStrings.possibleAutomationsTitle} items={content.possibleAutomations} iconClassName="text-green-400 drop-shadow-[0_0_8px_rgba(100,255,100,0.7)]" />
        </SectionWrapper>
      )}

      {content.modulesUsed && (
        <SectionWrapper id="modulesUsed" bg="bg-[#070916]">
          <ModulesUsed content={content.modulesUsed} />
        </SectionWrapper>
      )}

      {content.testimonials && (
        <SectionWrapper id="testimonials">
          <Testimonials content={content.testimonials} />
        </SectionWrapper>
      )}

      {content.faq && (
        <SectionWrapper id="faq" bg="bg-[#070916]">
          <Faq content={content.faq} />
        </SectionWrapper>
      )}

      {content.finalCTA && (
        <SectionWrapper id="finalCTA" bg="bg-[#070916]">
          <FinalCTA content={content.finalCTA} />
        </SectionWrapper>
      )}
    </>
  );
}
