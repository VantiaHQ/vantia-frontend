
import Squares from '@/components/Squares';

type SectionWrapperProps = {
  id: string;
  bg?: string;
  hasSquares?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({ id, bg = 'bg-background', hasSquares = false, children, className = '' }: SectionWrapperProps) {
  const isFinalCTA = id === 'finalCTA';

  return (
    <div className="relative">
      <section id={id} className={`py-20 sm:py-28 ${bg} ${isFinalCTA ? 'dotted-bg' : ''} ${hasSquares ? 'relative' : ''} ${className}`}>
        {hasSquares && (
          <Squares speed={0.5} squareSize={20} direction='up' borderColor='rgba(96, 165, 250, 0.05)' hoverFillColor='rgba(0, 0, 0, 0)' />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-b from-transparent to-[hsl(var(--background))] z-[5]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-t from-transparent to-[hsl(var(--background))] z-[5]" />
        
        <div className="container mx-auto px-6 py-24 max-w-3xl relative z-10">
          {children}
        </div>
      </section>
    </div>
  );
}
