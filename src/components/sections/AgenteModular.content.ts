import { ArrowRight, CheckCircle, Database, MessageSquare, Calendar, Bell, Sparkles, Link2, Smile, BarChart2, ScanText } from 'lucide-react';

export const agenteModularContent = {
    mainTitle: "El agente que trabaja por ti",
    mainParagraph: "Imagina un miembro de tu equipo que nunca duerme, responde al instante y se encarga de las tareas repetitivas para que los trabajadores pueda centrarse en lo que de verdad importa. Nuestro Agente Modular hace exactamente eso. Lo diseñamos a medida para que se integre en los procesos de tu empresa, automatice tareas complejas y se comunique con tus clientes de forma natural y eficiente.",
    stats: [
        { value: "+120h", label: "Tiempo recuperado /mes" },
        { value: "24/7", label: "Atención en paralelo" },
        { value: "99.9%", label: "Disponibilidad y fiabilidad" },
        { value: "+500", label: "Consultas resueltas /mes" }
    ],
    example: {
        label: "Ejemplo",
        title: "Agente de Recepción de Incidencias",
        paragraph: "Imagina un agente virtual especializado para una Gestoría de Fincas, capaz de recibir y gestionar incidencias de vecinos y propietarios de manera automatizada. El agente registra cada incidencia, notifica a los responsables y reduce tiempos de espera. El resultado: una atención más rápida, trazable y profesional, con ahorro significativo de tiempo humano y mejora en la satisfacción de los usuarios.",
        cta: "Crea tu Agente IA",
        featuresLabel: "Funcionalidades",
        features: [
            "Registro automatizado de incidencias con todos los detalles relevantes",
            "Notificación inmediata a responsables a través de canales seleccionados",
            "Derivación inteligente a gestores humanos para confirmaciones y casos complejos",
            "Integración con canales de comunicación y base documental",
            "Ahorro de tiempo humano y mejora en la trazabilidad y satisfacción"
        ]
    },
    coreModulesTitle: "Módulos Core",
    extraModulesTitle: "Módulos Extra"
};

export const coreModules = [
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

export const extraModules = [
  {
    icon: CheckCircle,
    title: 'Captación de Información',
    description:
      'Obtiene información, identifica y cualifica clientes potenciales automáticamente, nutriendo tus ventas incluso fuera del horario laboral.',
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

