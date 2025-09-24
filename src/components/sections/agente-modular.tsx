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
 <section id="agente-modular" className="bg-[#070916] py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-3xl text-left">
					<h2 className="sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
						Agente Modular
					</h2>
					<p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
						Nuestro Agente Modular es una solución conversacional adaptable a
						las necesidades de cada empresa. Desde chatbots que atienden
						preguntas frecuentes hasta agentes inteligentes capaces de ejecutar
						tareas complejas de forma autónoma.
						El agente integra tecnologías
						avanzadas como la Generación Aumentada por Recuperación (RAG) para
						proporcionar respuestas precisas, contextuales y alineadas con la
						información interna de tu organización.
					</p>
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col items-center justify-center text-center">
							<span className="text-3xl font-extrabold text-blue-200 mb-2">+120h</span>
							<span className="text-blue-100/90 text-base">Tiempo recuperado al mes</span>
						</div>
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col items-center justify-center text-center">
							<span className="text-3xl font-extrabold text-blue-200 mb-2">24/7</span>
							<span className="text-blue-100/90 text-base">Atención en paralelo y sin pausas</span>
						</div>
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col items-center justify-center text-center">
							<span className="text-3xl font-extrabold text-blue-200 mb-2">99.9%</span>
							<span className="text-blue-100/90 text-base">Disponibilidad y fiabilidad</span>
						</div>
						<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col items-center justify-center text-center">
							<span className="text-3xl font-extrabold text-blue-200 mb-2">+500</span>
							<span className="text-blue-100/90 text-base">Consultas resueltas mensualmente</span>
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
						<span className="block text-base font-semibold text-blue-200 tracking-wide mb-4">
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
						<span className="block text-base font-semibold text-blue-200 tracking-wide mt-8 mb-4">
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
