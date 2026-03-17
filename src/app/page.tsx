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

import { Bot, Layout, Sparkles, ArrowRight } from 'lucide-react';

function ProductsPreview() {
  const products = [
    {
      title: 'Agente Modular',
      description: 'Un agente conversacional modular que se conecta a tus canales y sistemas para automatizar tareas clave de tu operación.',
      link: '/agente-modular',
      icon: Bot,
      color: 'blue',
      cta: 'Ver Agente Modular'
    },
    {
      title: 'Consultoría IA',
      description: 'Te acompañamos a definir la hoja de ruta de IA, priorizar casos de uso y ejecutar proyectos de alto impacto.',
      link: '/consultoria',
      icon: Layout,
      color: 'violet',
      cta: 'Ver Consultoría IA'
    },
    {
      title: 'Bruno',
      description: 'El trabajador digital que gestiona de forma autónoma las incidencias en despachos de Administración de Fincas.',
      link: '/bruno',
      icon: Sparkles,
      color: 'cyan',
      cta: 'Descubre Bruno'
    }
  ];

  return (
    <section className="bg-[#070916] py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white/90 mb-6">
            Soluciones de IA <span className="text-violet-400">adaptadas</span> a tu negocio
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-light">
            Descubre cómo podemos ayudarte con automatización conversacional, consultoría estratégica de IA
            y trabajadores digitales especializados.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <Link 
              href={product.link}
              key={product.title}
              className="group relative rounded-2xl border border-violet-400/10 bg-violet-950/10 p-8 shadow-2xl transition-all duration-500 hover:bg-violet-950/30 hover:border-violet-400/40 hover:-translate-y-2 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Background Glow */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/10 blur-3xl rounded-full group-hover:bg-violet-500/30 transition-all duration-500" />
              
              <div className="mb-6 relative">
                <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <product.icon className="w-7 h-7" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white/90 mb-4 group-hover:text-violet-300 transition-colors">
                {product.title}
              </h3>
              
              <p className="text-foreground/70 leading-relaxed mb-8 flex-1 font-light">
                {product.description}
              </p>

              <div className="mt-auto">
                <div className="inline-flex items-center gap-2 text-violet-400 font-bold group/btn text-sm uppercase tracking-wider">
                  <span>{product.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
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