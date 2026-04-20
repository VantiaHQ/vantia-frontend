export type Module = {
	id: string;
	name: string;
	isNeeded: boolean;
	description: string;
};

export const coreModules = [
	{
		id: "chatbot-24-7",
		name: "ChatBot 24/7",
		isNeeded: true,
		description:
			"Permite responder preguntas frecuentes de manera ágil y automatizada, liberando recursos humanos y mejorando la experiencia de los usuarios.",
	},
	{
		id: "rag",
		name: "RAG",
		isNeeded: true,
		description:
			"Accede a las bases de conocimiento de la empresa para ofrecer respuestas ajustadas al contexto, asegurando precisión en la información entregada.",
	},
];

export const extraModules = [
	{
		id: "captacion-de-informacion",
		name: "Captación de Información",
		isNeeded: false,
		description:
			"Diseñado para atraer y cualificar prospectos, facilitando la integración con los sistemas de marketing y ventas.",
	},
	{
		id: "gestion-de-citas",
		name: "Gestión de Citas",
		isNeeded: false,
		description:
			"Permite automatizar reservas y coordinación de agendas, optimizando la planificación con clientes y empleados.",
	},
	{
		id: "notificaciones",
		name: "Notificaciones",
		isNeeded: false,
		description:
			"Envía alertas, recordatorios y actualizaciones en tiempo real a través de múltiples canales de comunicación.",
	},
	{
		id: "genai",
		name: "GenAI",
		isNeeded: false,
		description:
			"Genera contenido dinámico y personalizado, creando interacciones más naturales y cercanas con los usuarios.",
	},
	{
		id: "generacion-de-enlaces-de-pago",
		name: "Generación de Enlaces de Pago",
		isNeeded: false,
		description:
			"Permite crear enlaces únicos de referencia para pagos o procesos de compra, potenciando programas de recomendación y ventas directas.",
	},
	{
		id: "analisis-de-sentimiento",
		name: "Análisis de Sentimiento",
		isNeeded: false,
		description:
			"Detecta la emoción detrás de cada interacción, clasificando el tono de los mensajes para mejorar la atención y la estrategia comunicativa.",
	},
	{
		id: "analisis-historico",
		name: "Análisis Histórico",
		isNeeded: false,
		description:
			"Recopila y estudia datos de interacciones pasadas para identificar tendencias, patrones de comportamiento y oportunidades de optimización.",
	},
	{
		id: "lectura-de-documentos-ocr",
		name: "Lectura de Documentos OCR",
		isNeeded: false,
		description:
			"Transforma texto en imágenes, documentos escaneados o PDFs en datos digitales estructurados, agilizando procesos documentales y reduciendo la intervención manual.",
	},
];
