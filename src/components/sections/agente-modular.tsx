import { CheckCircle, Database, MessageSquare, Calendar, Bell, Sparkles, Link2, Smile, BarChart2, ScanText } from 'lucide-react';

const coreModules = [
  {
    icon: MessageSquare,
    title: 'ChatBot 24/7',
    description:
      'Responde al instante las preguntas frecuentes de tus clientes, mejorando su experiencia y liberando a tu equipo.',
  },
  {
    icon: Database,
    title: 'Conexión a tu Conocimiento (RAG)',
    description:
      'Conecta el agente a tus sistemas internos para dar respuestas siempre precisas y actualizadas, basadas en tu propia información.',
  },
];

const extraModules = [
  {
    icon: CheckCircle,
    title: 'Captación de Clientes',
    description:
      'Identifica y cualifica clientes potenciales automáticamente, nutriendo tus ventas incluso fuera del horario laboral.',
  },
  {
    icon: Calendar,
    title: 'Gestión de Citas',
    description:
      'Automatiza la reserva y coordinación de agendas para optimizar la planificación con tus clientes y equipo.',
  },
  {
    icon: Bell,
    title: 'Notificaciones Inteligentes',
    description:
      'Envía alertas, recordatorios y actualizaciones en tiempo real a través de los canales de comunicación preferidos por tus usuarios.',
  },
  {
    icon: Sparkles,
    title: 'Interacciones Humanas (GenAI)',
    description:
      'Genera contenido y respuestas dinámicas para crear conversaciones más naturales y cercanas con tus clientes.',
  },
  {
    icon: Link2,
    title: 'Generación de Enlaces de Pago',
    description:
      'Crea enlaces únicos de pago o checkout para potenciar programas de referidos y facilitar ventas directas desde el chat.',
  },
  {
    icon: Smile,
    title: 'Análisis de Sentimiento',
    description:
      'Detecta la emoción en cada interacción para clasificar el tono de los mensajes y mejorar la estrategia comunicativa.',
  },
  {
    icon: BarChart2,
    title: 'Análisis de Conversaciones',
    description:
      'Recopila y estudia datos de interacciones para identificar tendencias, patrones de comportamiento y oportunidades de mejora.',
  },
  {
    icon: ScanText,
    title: 'Lectura de Documentos (OCR)',
    description:
      'Transforma texto de imágenes o PDFs en datos estructurados para agilizar procesos y reducir la entrada manual de datos.',
  },
];

export default function AgenteModular() {
 return (
 <section id="agente-modular" className="bg-[#070916] py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-3xl text-left">
					<h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full sm:max-w-xl font-extrabold tracking-tight text-white mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
						El agente que trabaja por ti
					</h2>
					<p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
                        Imagina un miembro de tu equipo que nunca duerme, responde al instante y se encarga de las tareas repetitivas para que tu personal pueda centrarse en lo que de verdad importa. Nuestro Agente Modular hace exactamente eso. Lo diseñamos a medida para que se integre en tus procesos, automatice tareas complejas y se comunique con tus clientes de forma natural y eficiente.
					</p>
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col justify-center">
							<span className="text-4xl font-extrabold text-blue-200 mb-2">+120h</span>
							<span className="text-blue-100/90 text-base">Tiempo recuperado</span>
						</div>
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col justify-center">
							<span className="text-4xl font-extrabold text-blue-200 mb-2">24/7</span>
							<span className="text-blue-100/90 text-base">Atención en paralelo</span>
						</div>
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col justify-center">
							<span className="text-4xl font-extrabold text-blue-200 mb-2">99.9%</span>
							<span className="text-blue-100/90 text-base">Disponibilidad y fiabilidad</span>
						</div>
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col justify-center">
							<span className="text-4xl font-extrabold text-blue-200 mb-2">+500</span>
							<span className="text-blue-100/90 text-base">Consultas resueltas</span>
						</div>
					</div>
				</div>
				<div className="mx-auto w-full mt-14 mb-24 bg-background/80 rounded-xl shadow-lg p-0 border border-blue-400/20 overflow-hidden">
					<div className="flex flex-col">
						<div className="w-full">
							<img
								src="/images/workflow.png"
								alt="Agente n8n"
								className="w-full h-auto object-cover p-8"
							/>
						</div>
						<div className="flex flex-col md:flex-row items-center p-8">
							<div className="flex-1 md:pr-8">
								<div className="flex flex-col md:flex-row gap-8">
									<div className="flex-1">
										<span className="block text-base font-semibold text-blue-200 tracking-wide mb-1">
											Ejemplo
										</span>
										<h3 className="text-2xl font-bold text-white mb-2">
											Agente de Recepción de Incidencias
										</h3>
										<p className="text-foreground/80">
											Imagina un agente virtual especializado para una Gestoría de Fincas, capaz de recibir y gestionar incidencias de vecinos y propietarios de manera automatizada. El agente registra cada incidencia, notifica a los responsables y reduce tiempos de espera. El resultado: una atención más rápida, trazable y profesional, con ahorro significativo de tiempo humano y mejora en la satisfacción de los usuarios.
										</p>
									</div>
									<div className="flex-1 md:border-l md:border-blue-400/20 md:pl-8">
										<span className="block text-base font-semibold text-blue-200 tracking-wide mb-2">
											Funcionalidades
										</span>
										<ul className="space-y-3">
											<li className="grid grid-cols-[auto,1fr] items-start gap-3">
												<CheckCircle className="mt-2 h-5 w-5 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
												<span className="text-blue-100/90">Registro automatizado de incidencias con todos los detalles relevantes</span>
											</li>
											<li className="grid grid-cols-[auto,1fr] items-start gap-3">
												<CheckCircle className="mt-2 h-5 w-5 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
												<span className="text-blue-100/90">Notificación inmediata a responsables y seguimiento del estado</span>
											</li>
											<li className="grid grid-cols-[auto,1fr] items-start gap-3">
												<CheckCircle className="mt-2 h-5 w-5 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
												<span className="text-blue-100/90">Derivación inteligente a gestores humanos para casos complejos (human-in-the-loop)</span>
											</li>
											<li className="grid grid-cols-[auto,1fr] items-start gap-3">
												<CheckCircle className="mt-2 h-5 w-5 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
												<span className="text-blue-100/90">Integración con sistemas internos y base documental</span>
											</li>
											<li className="grid grid-cols-[auto,1fr] items-start gap-3">
												<CheckCircle className="mt-2 h-5 w-5 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
												<span className="text-blue-100/90">Ahorro de tiempo humano y mejora en la trazabilidad y satisfacción</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid gap-8 py-20 sm:py-28">
					<div>
						<span className="block text-5xl font-extralight uppercase text-blue-200/80 tracking-tighter mb-4">
							Módulos Core
						</span>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{coreModules.map((mod, i) => (
								<div
									key={i}
                                    // --- HOVER EFFECT REMOVED ---
									className="group bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 p-6 flex items-center gap-6 shadow-lg"
								>
									<mod.icon className="h-16 w-16 text-blue-200 drop-shadow-[0_0_18px_rgba(80,200,255,0.8)]" />
									<div>
										<div className="font-bold text-lg text-white mb-1">
											{mod.title}
										</div>
										<div className="text-blue-100/90">
											{mod.description}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<span className="block text-5xl font-extralight uppercase text-blue-200/80 tracking-tighter mb-4 mt-8">
							Módulos Extra
						</span>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{extraModules.map((mod, i) => (
								<div
									key={i}
                                    // --- HOVER STYLE APPLIED AS DEFAULT ---
									className="group bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400 p-6 flex items-center gap-6 shadow-lg shadow-blue-400/20"
								>
									<mod.icon className="h-16 w-16 text-blue-200 drop-shadow-[0_0_32px_rgba(80,200,255,1)]" />
									<div>
										<div className="font-bold text-lg text-white mb-1">
											{mod.title}
										</div>
										<div className="text-blue-100/90">
											{mod.description}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
