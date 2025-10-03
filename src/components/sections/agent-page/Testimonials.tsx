
import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: ['400'] });

type TestimonialsProps = {
  content: {
    title: string;
    items: { text: string; author: string }[];
  };
};

export default function Testimonials({ content }: TestimonialsProps) {
  if (!content) return null;

  return (
    <>
      <h2 className="text-4xl max-w-xl font-bold text-white mb-8">{content.title}</h2>
      <div className="space-y-8 text-left">
        {content.items.map((item: { text: string; author: string }, itemIndex: number) => (
          <blockquote key={itemIndex} className="relative border-l-4 border-primary pl-6 py-6 text-white/80">
            <p className={`text-5xl ${instrumentSerif.className}`}>
              "{item.text}"
            </p>
            <footer className="mt-4 text-md font-light text-foreground/80">- {item.author}</footer>
          </blockquote>
        ))}
      </div>
    </>
  );
}
