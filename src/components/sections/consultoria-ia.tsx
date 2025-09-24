import { BrainCircuit, Bot, LineChart, Eye } from 'lucide-react';

export default function ConsultoriaIA() {
  return (
    <section id="consultoria-ia" className="relative py-20 sm:py-28 overflow-hidden">
  <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0a1a]/90 to-black/95" />
  <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold tracking-tight text-white mb-4 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)]">Consultoría en IA y Soluciones Complementarias</h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-8 text-foreground/80">
            Además del Agente Modular, ofrecemos un amplio abanico de servicios de IA diseñados para acompañar a tu empresa en cada etapa de su transformación digital:
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className="group bg-blue-950/30 rounded-xl border border-blue-400/30 p-8 shadow-lg hover:border-blue-400 hover:shadow-blue-400/40 hover:shadow-2xl transition-all flex flex-col items-center text-center">
            <BrainCircuit className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)] group-hover:drop-shadow-[0_0_24px_rgba(80,200,255,0.5)] transition-all" />
            <h3 className="font-semibold text-lg text-white mb-2">Estrategia y Consultoría en IA</h3>
            <p className="text-foreground/80">Identificamos oportunidades para implementar soluciones de inteligencia artificial y diseñamos hojas de ruta claras para maximizar el impacto en tu negocio.</p>
          </div>
          <div className="group bg-blue-950/30 rounded-xl border border-blue-400/30 p-8 shadow-lg hover:border-blue-400 hover:shadow-blue-400/40 hover:shadow-2xl transition-all flex flex-col items-center text-center">
            <Bot className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)] group-hover:drop-shadow-[0_0_24px_rgba(80,200,255,0.5)] transition-all" />
            <h3 className="font-semibold text-lg text-white mb-2">Automatización de Procesos (RPA)</h3>
            <p className="text-foreground/80">Digitalizamos y optimizamos tareas repetitivas para aumentar la eficiencia operativa.</p>
          </div>
          <div className="group bg-blue-950/30 rounded-xl border border-blue-400/30 p-8 shadow-lg hover:border-blue-400 hover:shadow-blue-400/40 hover:shadow-2xl transition-all flex flex-col items-center text-center">
            <LineChart className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)] group-hover:drop-shadow-[0_0_24px_rgba(80,200,255,0.5)] transition-all" />
            <h3 className="font-semibold text-lg text-white mb-2">Análisis Predictivo y Big Data</h3>
            <p className="text-foreground/80">Utilizamos modelos avanzados que permiten anticipar tendencias y facilitar decisiones empresariales basadas en datos.</p>
          </div>
          <div className="group bg-blue-950/30 rounded-xl border border-blue-400/30 p-8 shadow-lg hover:border-blue-400 hover:shadow-blue-400/40 hover:shadow-2xl transition-all flex flex-col items-center text-center">
            <Eye className="h-10 w-10 text-blue-200 mb-2 drop-shadow-[0_0_16px_rgba(80,200,255,0.18)] group-hover:drop-shadow-[0_0_24px_rgba(80,200,255,0.5)] transition-all" />
            <h3 className="font-semibold text-lg text-white mb-2">Visión por Computadora</h3>
            <p className="text-foreground/80">Implantamos sistemas que analizan imágenes y videos para optimizar procesos de calidad, seguridad o experiencia del cliente.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
