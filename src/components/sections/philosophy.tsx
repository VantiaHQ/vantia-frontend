import { Users, TrendingUp, Zap } from 'lucide-react';
import { mainTitle, subtitle, values, concludingParagraphPart1, concludingParagraphHighlight1, concludingParagraphPart2, concludingParagraphHighlight2, concludingParagraphPart3, concludingParagraphStrong } from './Philosophy.content';
import { FadeInSection } from '@/components/ui/fade-in-section';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto text-left lg:text-center px-0 lg:px-24">
          <FadeInSection>
            <h2 className="text-6xl sm:text-7xl font-extralight tracking-tight text-primary uppercase">
              {mainTitle}
            </h2>
          </FadeInSection>
        </div>
        <div className="mx-auto text-left lg:text-center mb-16">
          <FadeInSection>
            <p className="mt-4 text-lg text-foreground/80">
              {subtitle}
            </p>
          </FadeInSection>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {values.map((value) => (
            <FadeInSection key={value.title}>
              {/* --- NEW TYPOGRAPHIC CARD DESIGN --- */}
              <div className="flex flex-col items-start text-left">
                <h3 className="text-4xl font-extrabold text-white/90 mb-4">{value.title}</h3>
                <p className="text-lg text-foreground/80">{value.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
        <div className="mt-16 text-left lg:text-center px-0 lg:px-24">
          <FadeInSection>
             <p className="text-md text-foreground/70">
                 {concludingParagraphPart1}<span className="italic font-semibold text-primary">{concludingParagraphHighlight1}</span>{concludingParagraphPart2}<span className="font-semibold text-primary">{concludingParagraphHighlight2}</span>{concludingParagraphPart3}<strong>{concludingParagraphStrong}</strong>
             </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
