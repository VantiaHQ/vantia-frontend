import {
  MessageSquare,
  Phone,
  Warehouse,
  BrainCircuit,
  Bot,
  LineChart,
  Eye,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const services = [
  {
    icon: MessageSquare,
    title: 'Chatbots y Agentes Conversacionales',
    description: 'Soluciones conversacionales, desde chatbots básicos hasta agentes inteligentes que ejecutan tareas complejas con RAG.',
  },
  {
    icon: Phone,
    title: 'Agente de Recepción por Voz',
    description: 'Agentes de voz que responden llamadas de clientes y resuelven dudas básicas, liberando a tu personal.',
  },
  {
    icon: Warehouse,
    title: 'Agente de Almacén Inteligente',
    description: 'Monitorización de inventario en tiempo real y realización de pedidos de forma autónoma para evitar roturas de stock.',
  },
  {
    icon: BrainCircuit,
    title: 'Consultoría en Estrategia de IA',
    description: 'Te ayudamos a identificar oportunidades de IA, creando una hoja de ruta clara para tu negocio y optimizar tus procesos.',
  },
  {
    icon: Bot,
    title: 'Automatización de Procesos (RPA)',
    description: 'Automatizamos tareas repetitivas y basadas en reglas, creando flujos de trabajo eficientes que liberan a tu equipo.',
  },
  {
    icon: LineChart,
    title: 'Análisis Predictivo y Big Data',
    description: 'Modelos avanzados para analizar grandes volúmenes de datos, permitiéndote predecir tendencias y tomar decisiones informadas.',
  },
  {
    icon: Eye,
    title: 'Visión por Computadora',
    description: 'Sistemas de IA que analizan imágenes y videos para aplicaciones en control de calidad, seguridad y experiencia del cliente.',
  },
  {
    icon: FileText,
    title: 'Informes y Métricas',
    description: 'Servicio opcional que incluye un panel personalizado con métricas clave y generación de informes para tus agentes.',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-secondary py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Un Abanico Completo de Servicios de IA</h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            Ofrecemos servicios de automatización e IA diseñados para cubrir las necesidades específicas de tu empresa, desde la estrategia inicial hasta la implementación completa.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="flex transform-gpu flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="pt-4 text-lg font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="px-6 pb-6 flex-grow">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
