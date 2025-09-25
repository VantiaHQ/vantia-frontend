'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {

  const [starStyle, setStarStyle] = useState({
    transform: 'translateY(0px) scale(1)',
    transition: 'transform 0.2s ease-out',
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const yOffset = Math.max(0, scrollY * 1.5);
      const scale = Math.max(0, 1 - scrollY / window.innerHeight);

      setStarStyle({
        transform: `translateY(-${yOffset}px) scale(${scale})`,
        transition: 'transform 0.2s ease-out',
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
  <section className="relative mt-[-16px] w-full px-8 min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 dotted-bg">
  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-transparent z-10"></div>
  <div className="container mx-auto px-6 relative h-full flex items-center max-w-[1200px]">
            <div className="grid lg:grid-cols-2 items-start w-full min-h-[100vh] mt-[20vh]">
                <div className="text-center lg:text-left z-20">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_0_24px_rgba(139,92,246,0.3)] transition duration-300 ease-in-out">
            <span className="text-primary drop-shadow-[0_0_32px_rgba(139,92,246,0.2)]">Recupera tu tiempo</span> con IA.
          </h1>
                    <p className="mt-6 text-lg sm:text-xl md:text-2xl text-foreground/80">
                        Vantia optimiza tu tiempo y el de tu organización con soluciones de IA innovadoras, transformando la gestión de recursos en una ventaja competitiva.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Button
                          asChild
                          size="lg"
                          className="group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
                        >
                          <Link href="#contact" className="transition duration-300 ease-in-out">
                            Habla con un experto <Rocket className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-icon-pulse" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="secondary"
                          size="lg"
                          className="bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow hover:border-primary"
                        >
                          <Link href="#case-study" className="transition duration-300 ease-in-out">Ver caso de éxito</Link>
                        </Button>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-start justify-center z-0 pt-32 lg:pt-8  lg:relative lg:h-full h-96 w-full">
          <Image
            src="/images/star-3d.png"
            alt="Estrella tridimensional flotante"
            width={600}
            height={600}
            className="object-contain animate-float-slow transition-transform duration-500 hover:scale-110 drop-shadow-[0_32px_128px_rgba(139,92,246,0.4)] brightness-[70%] lg:brightness-110 lg:saturate-125 lg:opacity-100"
            data-ai-hint="3d star"
            style={starStyle}
          />
                </div>
            </div>
        </div>
    </section>
  );
}
