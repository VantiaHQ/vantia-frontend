import { ShieldCheck, Lock, ScrollText } from 'lucide-react';

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: 'Privacidad desde el Diseño',
    description:
      'Construimos cada solución con la privacidad como pilar fundamental, asegurando que los datos de tus clientes se manejen siempre con la máxima confidencialidad.',
  },
  {
    icon: Lock,
    title: 'Cifrado de Datos de Extremo a Extremo',
    description:
      'Toda la información se protege con los más altos estándares de cifrado, tanto en tránsito como en reposo. La seguridad de tus datos no es una opción, es una garantía.',
  },
  {
    icon: ScrollText,
    title: 'Cumplimiento Normativo',
    description:
      'Operamos en estricto cumplimiento de las regulaciones como el RGPD y la LSSI, garantizando la legalidad en la implementación de IA en tu empresa.',
  },
];

export default function Security() {
  return (
    <section id="security" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Seguridad y Confianza
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Tu tranquilidad es nuestra prioridad. Por eso, integramos las mejores prácticas de seguridad en cada capa de nuestras soluciones.
          </p>
        </div>
        {/* --- MODIFIED GRID BEHAVIOR --- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {securityFeatures.map((feature) => (
            // --- MODIFIED CARD STYLING ---
            <div key={feature.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-primary/5 border border-primary/20 shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}