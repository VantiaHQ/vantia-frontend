
import FadeInSection from '@/components/ui/fade-in-section';

type HowItWorksProps = {
  content: {
    title: string;
    steps: string[];
  };
};

export default function HowItWorks({ content }: HowItWorksProps) {
  if (!content) return null;

  return (
    <>
      <h2 className="text-4xl max-w-xl font-bold text-white mb-8">{content.title}</h2>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-24 gap-x-8 text-foreground/80 text-left">
        {content.steps.map((step: string, itemIndex: number) => (
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
    </>
  );
}
