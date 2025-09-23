import { CheckCircle, Database, MessageSquare, Calendar, Bell, Sparkles, Link2, Smile, BarChart2, ScanText } from 'lucide-react';

const coreModules = [
	{
		icon: MessageSquare,
		title: 'ChatBot',
		description:
			'Permite responder preguntas frecuentes de manera ágil y automatizada, liberando recursos humanos y mejorando la experiencia de los usuarios.',
	},
	{
		icon: Database,
		title: 'RAG',
		description:
			'Accede a las bases de conocimiento de la empresa para ofrecer respuestas ajustadas al contexto, asegurando precisión en la información entregada.',
	},
];

const extraModules = [
	{
		icon: CheckCircle,
		title: 'Captación',
		description:
			'Diseñado para atraer y cualificar prospectos, facilitando la integración con los sistemas de marketing y ventas.',
	},
	{
		icon: Calendar,
		title: 'Gestión de Citas',
		description:
			'Permite automatizar reservas y coordinación de agendas, optimizando la planificación con clientes y empleados.',
	},
	{
		icon: Bell,
		title: 'Notificaciones',
		description:
			'Envía alertas, recordatorios y actualizaciones en tiempo real a través de múltiples canales de comunicación.',
	},
	{
		icon: Sparkles,
		title: 'GenAI',
		description:
			'Genera contenido dinámico y personalizado, creando interacciones más naturales y cercanas con los usuarios.',
	},
	{
		icon: Link2,
		title: 'Generación de Referral Checkout URL',
		description:
			'Permite crear enlaces únicos de referencia para pagos o procesos de compra, potenciando programas de recomendación y ventas directas.',
	},
	{
		icon: Smile,
		title: 'Análisis de Sentimiento',
		description:
			'Detecta la emoción detrás de cada interacción, clasificando el tono de los mensajes para mejorar la atención y la estrategia comunicativa.',
	},
	{
		icon: BarChart2,
		title: 'Análisis Histórico',
		description:
			'Recopila y estudia datos de interacciones pasadas para identificar tendencias, patrones de comportamiento y oportunidades de optimización.',
	},
	{
		icon: ScanText,
		title: 'OCR',
		description:
			'Transforma texto en imágenes, documentos escaneados o PDFs en datos digitales estructurados, agilizando procesos documentales y reduciendo la intervención manual.',
	},
];

const allModules = [...coreModules, ...extraModules];

export default function AgenteModular() {
	return (
		<section id="agente-modular" className="bg-secondary py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4 drop-shadow-[0_0_16px_rgba(80,200,255,0.7)]">
						Agente Modular
					</h2>
					<p className="mt-4 text-xl leading-9 text-foreground/80">
						Nuestro Agente Modular es una solución conversacional adaptable a
						las necesidades de cada empresa. Desde chatbots básicos que atienden
						preguntas frecuentes hasta agentes inteligentes capaces de ejecutar
						tareas complejas de forma autónoma, el agente integra tecnologías
						avanzadas como la Generación Aumentada por Recuperación (RAG) para
						proporcionar respuestas precisas, contextuales y alineadas con la
						información interna de tu organización.
					</p>
				</div>
				<div className="mx-auto w-full mt-14 mb-12 bg-background/80 rounded-xl shadow-lg p-0 border border-blue-400/20 overflow-hidden">
					<div className="flex flex-col">
						<div className="w-full">
							<img
								src="/images/agent.png"
								alt="Agente n8n"
								className="w-full h-auto object-cover p-8"
							/>
						</div>
						<div className="flex flex-col md:flex-row items-center p-8">
							<div className="flex-1 md:pr-8">
								<span className="block text-base font-semibold text-blue-200 tracking-wide mb-1">
									Ejemplo
								</span>
								<h3 className="text-2xl font-bold text-white mb-2">
									Agente de Recepción
								</h3>
								<p className="text-foreground/80">
									Imagina un asistente virtual que, conectado a la base de datos
									documental de tu empresa, resuelve las dudas de los empleados sobre
									recursos humanos, políticas internas o procesos administrativos. Este
									Agente de Recepción no solo responde preguntas básicas, sino que
									también es capaz de entregar información contextualizada, reducir
									tiempos de búsqueda y mejorar la eficiencia en la atención interna.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="grid gap-8">
					<div>
						<span className="block text-base font-semibold text-blue-200 tracking-wide mb-2">
							Módulos Core
						</span>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{coreModules.map((mod, i) => (
								<div
									key={i}
									className="group bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 p-6 flex items-center gap-6 shadow-lg transition-all hover:border-blue-400 hover:shadow-blue-400/40 hover:shadow-2xl"
								>
									<mod.icon className="h-16 w-16 text-blue-200 drop-shadow-[0_0_18px_rgba(80,200,255,0.8)] group-hover:drop-shadow-[0_0_32px_rgba(80,200,255,1)] transition-all" />
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
						<span className="block text-base font-semibold text-blue-200 tracking-wide mb-2">
							Módulos Extra
						</span>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{extraModules.map((mod, i) => (
								<div
									key={i}
									className="group bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 p-6 flex items-center gap-6 shadow-lg transition-all hover:border-blue-400 hover:shadow-blue-400/40 hover:shadow-2xl"
								>
									<mod.icon className="h-16 w-16 text-blue-200 drop-shadow-[0_0_18px_rgba(80,200,255,0.8)] group-hover:drop-shadow-[0_0_32px_rgba(80,200,255,1)] transition-all" />
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
