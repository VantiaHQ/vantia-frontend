import { BrainCircuit, Bot, LineChart, Eye } from 'lucide-react';

export default function ConsultoriaIA() {
  return (
    <section id="consultoria-ia" className="bg-[#0a0a1a] py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)]">Consultoría en IA y Soluciones Complementarias</h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            Además del Agente Modular, ofrecemos un amplio abanico de servicios de IA diseñados para acompañar a tu empresa en cada etapa de su transformación digital:
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <BrainCircuit className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)]" />
            <h3 className="font-semibold text-lg text-white">Estrategia y Consultoría en IA</h3>
            <p className="text-foreground/80">Identificamos oportunidades para implementar soluciones de inteligencia artificial y diseñamos hojas de ruta claras para maximizar el impacto en tu negocio.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Bot className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)]" />
            <h3 className="font-semibold text-lg text-white">Automatización de Procesos (RPA)</h3>
            <p className="text-foreground/80">Digitalizamos y optimizamos tareas repetitivas para aumentar la eficiencia operativa.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <LineChart className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)]" />
            <h3 className="font-semibold text-lg text-white">Análisis Predictivo y Big Data</h3>
            <p className="text-foreground/80">Utilizamos modelos avanzados que permiten anticipar tendencias y facilitar decisiones empresariales basadas en datos.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Eye className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)]" />
            <h3 className="font-semibold text-lg text-white">Visión por Computadora</h3>
            <p className="text-foreground/80">Implantamos sistemas que analizan imágenes y videos para optimizar procesos de calidad, seguridad o experiencia del cliente.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
