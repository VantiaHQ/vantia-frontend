import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  return (
  <section id="contact" className="relative w-full overflow-hidden dotted-bg bg-black/95">
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 lg:via-background/50"></div>
      <div className="container mx-auto px-6 relative h-[55vh] flex items-center">
        <div className="mx-auto max-w-3xl text-center z-20 w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
            <span className="text-primary drop-shadow-[0_0_32px_rgba(139,92,246,0.2)]">Lleva tu negocio al siguiente nivel</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl leading-8 text-foreground/80">
            Descubre cómo podemos ayudarte.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="cursor-target group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white/90 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
            >
              <Link href="/contacto" className="transition duration-300 ease-in-out">
                Solicita una consulta gratuita
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-icon-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Agrega en tu CSS global o tailwind.config.js:
@layer utilities {
  .animate-pulse-slow {
    animation: pulse-scale 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
  }
  @keyframes pulse-scale {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.045); opacity: 0.96; }
  }
}
*/
