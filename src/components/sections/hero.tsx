import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Rocket } from 'lucide-react';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function Hero() {
  if (!heroImage) return null;

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
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

      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-primary">Avanza seguro</span> y descubre nuevos horizontes
            </h1>
            <p className="mt-6 text-lg text-foreground/80 sm:text-xl md:text-2xl">
              En un entorno en el que el tiempo se ha consolidado como el recurso más limitado y valioso, Vantia nace con el propósito de aportar soluciones que optimicen su uso en personas y organizaciones.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
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
        </div>
      </div>
    </section>
  );
}
