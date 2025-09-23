import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Lleva tu negocio al siguiente nivel
          </h2>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Estamos listos para ayudarte a transformar tus desafíos en oportunidades con el poder de la Inteligencia Artificial.
            Ponte en contacto con nosotros para una consulta gratuita y descubre cómo podemos ayudarte.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="https://wa.me/34622590122">
                Solicita una consulta gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
