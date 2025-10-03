
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Orb from '@/components/Orb';
import { Rocket } from 'lucide-react';

type FinalCTAProps = {
  content: {
    title?: string;
    text?: string;
  };
};

export default function FinalCTA({ content }: FinalCTAProps) {
  if (!content) return null;

  return (
    <div className="mx-auto max-w-full relative flex flex-col items-center justify-center text-center h-[80vh]">
        <div className="absolute w-full h-full scale-100 md:scale-90 lg:scale-110">
            <Orb
            hoverIntensity={0}
            scale={1}
            />
        </div>
        <div className="absolute z-10 flex flex-col items-center">
            <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl px-8 font-extrabold tracking-tight text-white mb-0 drop-shadow-[0_0_32px_rgba(139,92,246,0.2)] text-center">
                    {content.title || content.text}
                </h2>
            </div>
            <div className="mt-10 flex justify-center">
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
    </div>
  );
}
