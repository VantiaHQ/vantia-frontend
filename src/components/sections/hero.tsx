
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function Hero() {
  if (!heroImage) return null;

  const [starStyle, setStarStyle] = useState({
    transform: 'translateY(0) scale(1)',
    opacity: 1,
    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight / 3;

      if (scrollY > triggerPoint) {
        const progress = Math.min((scrollY - triggerPoint) / (window.innerHeight / 2), 1);
        setStarStyle({
          transform: `translateY(-${progress * 500}px) scale(${1 - progress * 0.5})`,
          opacity: 1 - progress,
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        });
      } else {
        setStarStyle({
          transform: 'translateY(0) scale(1)',
          opacity: 1,
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
            />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 items-center min-h-[80vh] py-20">
                <div className="text-center lg:text-left">
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

                <div className="relative h-96 w-full mt-12 lg:mt-6 lg:h-full flex items-center justify-center">
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
