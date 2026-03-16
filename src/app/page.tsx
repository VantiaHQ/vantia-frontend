import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import Security from '@/components/sections/security';
import CaseStudy from '@/components/sections/CaseStudy';
import Channels from '@/components/sections/channels';
import Philosophy from '@/components/sections/philosophy';
import Contact from '@/components/sections/contact';
import TargetCursor from '@/components/ui/TargetCursor';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ProductsPreview() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90">
            Soluciones de IA adaptadas a tu negocio
          </h2>
          <p className="mt-3 text-foreground/80">
            Descubre cómo podemos ayudarte con automatización conversacional, consultoría estratégica de IA
            y un trabajador digital especializado para administradores de fincas.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background/80 p-6 shadow-lg flex flex-col">
            <h3 className="text-lg font-semibold text-white/90 mb-2">Agente Modular</h3>
            <p className="text-sm text-foreground/80 flex-1">
              Un agente conversacional modular que se conecta a tus canales y sistemas para automatizar
              tareas clave de tu operación.
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/agente-modular">Ver Agente Modular</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/80 p-6 shadow-lg flex flex-col">
            <h3 className="text-lg font-semibold text-white/90 mb-2">Consultoría IA</h3>
            <p className="text-sm text-foreground/80 flex-1">
              Te acompañamos a definir la hoja de ruta de IA, priorizar casos de uso y ejecutar proyectos de
              alto impacto.
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/consultoria">Ver Consultoría IA</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/80 p-6 shadow-lg flex flex-col">
            <h3 className="text-lg font-semibold text-white/90 mb-2">Bruno</h3>
            <p className="text-sm text-foreground/80 flex-1">
              El trabajador digital que gestiona de forma autónoma las incidencias en despachos de
              Administración de Fincas.
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/bruno">Descubre Bruno</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <TargetCursor />
        <HeroSection />
        <ProductsPreview />
        <Security />
        <CaseStudy />
        <Channels />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}