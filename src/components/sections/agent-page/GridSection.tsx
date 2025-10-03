
import { CheckCircle } from 'lucide-react';

type GridSectionProps = {
  title: string;
  items: string[];
  iconClassName?: string;
};

export default function GridSection({ title, items, iconClassName = 'text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]' }: GridSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <h2 className="text-4xl max-w-xl font-bold text-white mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item: string, itemIndex: number) => (
          <div key={itemIndex} className="bg-blue-950/60 pl-6 pr-7 pt-6 pb-8 rounded-lg border border-blue-400/30 shadow-lg flex items-start gap-4">
            <CheckCircle className={`mt-1 h-10 w-10 flex-shrink-0 ${iconClassName}`} />
            <span className="text-foreground/80 text-left text-lg">{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}
