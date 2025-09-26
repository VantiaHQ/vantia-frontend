import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400' });

const caseStudyImage = PlaceHolderImages.find((img) => img.id === 'case-study-clinic');

const results = [
  "Manejo de más del 70% de las consultas de programación.",
  "Reducción de los tiempos de espera telefónica en un 50%.",
  "Personal disponible para la atención presencial.",
];

const modules = [
    "ChatBot", "RAG", "Captación de leads", "Gestión de Citas", "Notificaciones", "Análisis Histórico"
]

export default function CaseStudy() {
  if (!caseStudyImage) return null;

  return (
    <section id="case-study" className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center mb-12">
            <span className="block text-base font-light uppercase tracking-widest text-white/40 mb-2">Caso de Estudio</span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Mejora de la Experiencia del Paciente</h2>
            <p className="mt-4 text-lg font-light text-white/60">
                Clínica Sanitaria
            </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl lg:h-full">
                <Image
                    src={caseStudyImage.imageUrl}
                    alt={caseStudyImage.description}
                    data-ai-hint={caseStudyImage.imageHint}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-semibold text-white/80">Desafío</h3>
                    <p className="mt-2 text-foreground/90">
                    La clínica experimentaba un alto volumen de llamadas y mensajes de whatsapp para agendar citas, lo que saturaba a su personal de recepción y generaba largos tiempos de espera.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-white/80">Solución</h3>
                    <p className="mt-2 text-foreground/90">
                    Implantamos un Agente Modular impulsado por IA conversacional que se integró en sus canales: sitio web y whatsapp. El Agente Modular gestiona la programación de citas, responde a preguntas frecuentes y proporciona información sobre los servicios 24/7.
                    </p>
                </div>

                <blockquote className="relative border-l-4 border-primary pl-6 py-6 text-white/80">
                    <p className={`text-3xl ${instrumentSerif.className}`}>
                        "Vantia transformó nuestra recepción. El agente inteligente gestiona la mayoría de las citas por sí solo, 24/7. Ahora el personal dedica más tiempo a la atención personalizada en la clínica y los pacientes ya no tienen que esperar al teléfono. Ha sido un cambio radical."
                    </p>
                    <footer className="mt-4 text-base font-light text-foreground/80">- Ana García de la Torre, COO</footer>
                </blockquote>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="text-white">Resultados y Módulos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                             <h4 className="font-semibold mb-3 text-white">Resultados Clave</h4>
                             <ul className="space-y-2">
                                {results.map((result, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-white" />
                                    <span>{result}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-white">Módulos Contratados</h4>
                            <div className="flex flex-wrap gap-2">
                                {modules.map((module) => (
                                    <Badge key={module} variant="secondary">{module}</Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
