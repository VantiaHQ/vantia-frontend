import { Bot, Zap } from 'lucide-react';

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-[#0a0a1a]/80 to-black" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bot className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Nuestra Filosofía</h2>
            </div>
            <p className="text-lg text-foreground/80">
              Creemos que la verdadera innovación surge de una profunda colaboración. No solo implementamos tecnología, nos asociamos contigo para entender tus desafíos, diseñar soluciones a medida y asegurar que la IA se integre de manera fluida en tu estrategia de negocio. Nuestro objetivo es ser tu socio de confianza en la era de la transformación digital.
            </p>
            <p className="text-lg text-foreground/80">
              Nuestra misión es clara: facilitar la adaptación y el crecimiento en el marco del mayor cambio transformacional que ha experimentado la humanidad.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Nuestra Esencia</h2>
            </div>
            <p className="text-lg text-foreground/80">
              El auge de la inteligencia artificial no representa únicamente un avance tecnológico, sino un nuevo paradigma productivo y social. Desde Vantia articulamos proyectos y servicios que permiten a las empresas responder con agilidad y aprovechar las oportunidades que genera este cambio histórico.
            </p>
            <p className="text-lg text-foreground/80">
              Vantia combina la palabra <span className="italic font-semibold text-primary">avant</span> (adelante, en valenciano) e <span className="font-semibold text-primary">IA</span> (inteligencia artificial), como un símbolo de innovación con raíces sólidas y visión de futuro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
