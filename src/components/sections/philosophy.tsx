import { Users, TrendingUp, Zap } from 'lucide-react';

// --- ICON PROPERTY REMOVED ---
const values = [
  {
    title: 'Nos integramos en tu equipo',
    description:
      'No somos un simple proveedor; nos convertimos en tu socio estratégico. Trabajamos codo a codo contigo para entender tus desafíos y asegurar que cada solución se alinee con tus objetivos.',
  },
  {
    title: 'Soluciones con impacto real',
    description:
      'La tecnología es solo el medio. Nuestro foco está en entregar resultados que puedas ver y medir, optimizando tus procesos, reduciendo costes y abriendo nuevas oportunidades de crecimiento.',
  },
  {
    title: 'Tecnología de vanguardia, siempre',
    description:
      'El mundo de la IA evoluciona a una velocidad vertiginosa. Nos mantenemos a la vanguardia para que tu inversión de hoy sea sólida, escalable y relevante en el futuro.',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto text-left lg:text-center px-0 lg:px-24">
          <h2 className="text-7xl font-extralight tracking-tight text-primary uppercase">
            Tu socio en la era de la IA
          </h2>    
        </div>
        <div className="mx-auto text-left lg:text-center mb-16">
          <p className="mt-4 text-lg text-foreground/80">
            Un copiloto para navegar la transformación digital.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {values.map((value) => (
            // --- NEW TYPOGRAPHIC CARD DESIGN ---
            <div key={value.title} className="flex flex-col items-start text-left">
              <h3 className="text-4xl font-extrabold text-white mb-4">{value.title}</h3>
              <p className="text-lg text-foreground/80">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-left lg:text-center px-0 lg:px-24">
            <p className="text-md text-foreground/70">
                Nuestro nombre, Vantia, combina la palabra <span className="italic font-semibold text-primary">avant</span> (adelante, en valenciano) e <span className="font-semibold text-primary">IA</span>, como símbolo de nuestro compromiso: <strong>llevar tu negocio siempre un paso adelante.</strong>
            </p>
        </div>
      </div>
    </section>
  );
}