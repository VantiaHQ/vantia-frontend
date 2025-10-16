import Image from 'next/image';
import { AppImages } from '@/lib/appImages';
import { consultoriaIAContent, services } from './ConsultoriaIA.content'; // Import content

export default function ConsultoriaIA() {
  return (
    <section id="consultoria-ia" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0a1a]/90 to-black/95" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-left sm:text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight text-white/90 mb-4 drop-shadow-[0_0_32px_rgba(139,92,246,0.6)]" dangerouslySetInnerHTML={{ __html: consultoriaIAContent.mainTitle }} />
          <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-8 text-foreground/80">
            {consultoriaIAContent.mainParagraph}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const placeholder = AppImages.find(p => p.id === service.imageId);
            if (!placeholder) return null;

            return (
              <div key={service.title} className="flex flex-col bg-blue-950/30 rounded-xl border border-blue-400/30 shadow-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="font-semibold text-lg text-white/90 mb-2">{service.title}</h3>
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