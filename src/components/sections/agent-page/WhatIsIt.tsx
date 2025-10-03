
type WhatIsItProps = {
  content: {
    title: string;
    text: string;
  };
};

export default function WhatIsIt({ content }: WhatIsItProps) {
  if (!content) return null;

  return (
    <>
      <h2 className="text-4xl max-w-xl font-bold text-white mb-8">{content.title}</h2>
      <p className="text-4xl lg:text-6xl font-extralight leading-16 text-blue-300/80 text-left mb-12 min-h-full">{content.text}</p>
    </>
  );
}
