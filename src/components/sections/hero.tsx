
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function Hero() {
  if (!heroImage) return null;

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
    <section className="relative w-full overflow-hidden dotted-bg">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
        <div className="container mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 items-center min-h-[80vh] py-28">
                <div className="text-center lg:text-left z-20">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                        <span className="text-primary">Avanza seguro</span> y descubre nuevos horizontes
                    </h1>
                    <p className="mt-6 text-lg text-foreground/80 sm:text-xl md:text-2xl">
                        En un entorno en el que el tiempo se ha consolidado como el recurso más limitado y valioso, Vantia nace con el propósito de aportar soluciones que optimicen su uso en personas y organizaciones.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Button asChild size="lg">
                            <Link href="#services">
                                Nuestros Servicios <Rocket className="ml-2 h-5 w-5 animate-pulse" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="#contact">Habla con un experto</Link>
                        </Button>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-0 lg:relative lg:h-full mt-12 lg:mt-24 h-96 w-full">
                    <Image
                        src="/images/star-3d.png"
                        alt="Estrella tridimensional flotante"
                        width={500}
                        height={500}
                        className="object-contain animate-float"
                        data-ai-hint="3d star"
                        style={starStyle}
                    />
                </div>
            </div>
        </div>
    </section>
  );
}
