import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    title: 'Estrategia de IA y Hoja de Ruta',
    description: '¿Por dónde empezar? Analizamos tu negocio, identificamos las oportunidades de mayor impacto y creamos una hoja de ruta clara para tu transformación con IA.',
    imageId: 'consulting-strategy'
  },
  {
    title: 'Automatización Inteligente (RPA)',
    description: 'Liberamos a tu equipo de las tareas manuales y repetitivas. Automatizamos flujos de trabajo para aumentar la eficiencia y reducir errores.',
    imageId: 'consulting-automation'
  },
  {
    title: 'Análisis Predictivo y Big Data',
    description: 'Convertimos tus datos en tu activo más valioso. Anticipa tendencias del mercado y toma decisiones estratégicas con modelos predictivos.',
    imageId: 'consulting-predictive'
  },
  {
    title: 'Visión por Computadora',
    description: "Damos 'ojos' a tus operaciones. Analiza imágenes y vídeo en tiempo real para automatizar el control de calidad, la seguridad y mucho más.",
    imageId: 'consulting-vision'
  },
];

export default function ConsultoriaIA() {
  return (
    <section id="consultoria-ia" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0a1a]/90 to-black/95" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-left sm:text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-[0_0_32px_rgba(139,92,246,0.6)]">Más allá del Agente: <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Soluciones de IA a medida</span></h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-8 text-foreground/80">
            Nuestra experiencia no termina en la automatización conversacional. Te ayudamos a integrar la IA en el núcleo de tu negocio para desbloquear nuevas oportunidades.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const placeholder = PlaceHolderImages.find(p => p.id === service.imageId);
            if (!placeholder) return null;

            return (
              <div key={service.title} className="flex flex-col bg-blue-950/30 rounded-xl border border-blue-400/30 shadow-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="font-semibold text-lg text-white mb-2">{service.title}</h3>
                  <p className="text-foreground/80 flex-grow">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}