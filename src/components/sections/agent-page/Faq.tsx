
type FaqProps = {
  content: {
    title: string;
    items: { q: string; a: string }[];
  };
};

export default function Faq({ content }: FaqProps) {
  if (!content) return null;

  return (
    <>
      <h2 className="text-4xl max-w-xl font-bold text-white mb-8">{content.title}</h2>
      <div className="space-y-6 text-left">
        {content.items.map((item: { q: string; a: string }, itemIndex: number) => (
          <div key={itemIndex} className="bg-blue-950/60 p-6 rounded-lg border border-blue-400/30 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-2">{item.q}</h3>
            <p className="text-foreground/80">{item.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
