import { Users, TrendingUp, Zap } from 'lucide-react';

const values = [
  {
    icon: Users,
    title: 'Nos integramos en tu equipo',
    description:
      'No somos un simple proveedor; nos convertimos en tu socio estratégico. Trabajamos codo a codo contigo para entender tus desafíos y asegurar que cada solución se alinee con tus objetivos.',
  },
  {
    icon: TrendingUp,
    title: 'Soluciones con impacto real',
    description:
      'La tecnología es solo el medio. Nuestro foco está en entregar resultados que puedas ver y medir, optimizando tus procesos, reduciendo costes y abriendo nuevas oportunidades de crecimiento.',
  },
  {
    icon: Zap,
    title: 'Tecnología de vanguardia, siempre',
    description:
      'El mundo de la IA evoluciona a una velocidad vertiginosa. Nos mantenemos a la vanguardia para que tu inversión de hoy sea sólida, escalable y relevante en el futuro.',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tu socio en la era de la IA
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Más que un proveedor, somos el copiloto que tu empresa necesita para navegar la transformación digital.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:bg-primary/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-foreground/80">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <p className="text-md text-foreground/70">
                Nuestro nombre, Vantia, combina la palabra <span className="italic font-semibold text-primary">avant</span> (adelante, en valenciano) e <span className="font-semibold text-primary">IA</span>, como símbolo de nuestro compromiso: <br/>llevar tu negocio siempre un paso adelante.
            </p>
        </div>
      </div>
    </section>
  );
}