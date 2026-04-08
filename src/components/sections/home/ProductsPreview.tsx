import Link from 'next/link';
import { Bot, Layout, Sparkles, ArrowRight } from 'lucide-react';

const products = [
  {
    title: 'Agente Modular',
    description:
      'Un agente conversacional modular que se conecta a tus canales y sistemas para automatizar tareas clave de tu operación.',
    link: '/agente-modular',
    icon: Bot,
    cta: 'Ver Agente Modular',
  },
  {
    title: 'Consultoría IA',
    description:
      'Te acompañamos a definir la hoja de ruta de IA, priorizar casos de uso y ejecutar proyectos de alto impacto.',
    link: '/consultoria',
    icon: Layout,
    cta: 'Ver Consultoría IA',
  },
  {
    title: 'Bruno',
    description:
      'El trabajador digital que gestiona de forma autónoma las incidencias en despachos de Administración de Fincas.',
    link: '/bruno',
    icon: Sparkles,
    cta: 'Descubre Bruno',
  },
];

export default function ProductsPreview() {
  return (
    <section id="products" className="relative overflow-hidden bg-[#070916] py-24 sm:py-32">
      <div
        className="absolute top-0 left-1/2 h-px w-full max-w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white/90 sm:text-5xl">
            Soluciones de IA <span className="text-violet-400">adaptadas</span> a tu negocio
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-foreground/70">
            Descubre cómo podemos ayudarte con automatización conversacional, consultoría estratégica de IA y
            trabajadores digitales especializados.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <Link
              href={product.link}
              key={product.title}
              className="cursor-target group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-violet-400/10 bg-violet-950/10 p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:bg-violet-950/30"
            >
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/30" />

              <div className="relative mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-inner transition-transform duration-500 group-hover:scale-110">
                  <product.icon className="h-7 w-7" />
                </div>
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white/90 transition-colors group-hover:text-violet-300">
                {product.title}
              </h3>

              <p className="mb-8 flex-1 font-light leading-relaxed text-foreground/70">{product.description}</p>

              <div className="mt-auto">
                <div className="group/btn inline-flex items-center gap-2 text-sm font-bold tracking-wider text-violet-400 uppercase">
                  <span>{product.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
