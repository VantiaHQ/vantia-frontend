export type CaseStudyItem = {
  tag: string;
  title: string;
  subtitle: string;
  imageId: string;
  challenge: { title: string; text: string };
  solution: { title: string; text: string };
  quote: { text: string; author: string };
  results: {
    title: string;
    keyResultsTitle: string;
    items: string[];
  };
  modules: { title: string; items: string[] };
};

/** Añade aquí nuevos casos de éxito. La imagen debe existir en src/lib/appImages.json con el mismo imageId. */
export const caseStudies: CaseStudyItem[] = [
  {
    tag: "Caso de Estudio",
    title: "Mejora de la Experiencia del Paciente",
    subtitle: "Clínica Sanitaria",
    imageId: "case-study-clinic",
    challenge: {
      title: "Desafío",
      text: "La clínica experimentaba un alto volumen de llamadas y mensajes de whatsapp para agendar citas, lo que saturaba a su personal de recepción y generaba largos tiempos de espera."
    },
    solution: {
      title: "Solución",
      text: "Implantamos un Agente Modular impulsado por IA conversacional que se integró en sus canales: sitio web y whatsapp. El Agente Modular gestiona la programación de citas, responde a preguntas frecuentes y proporciona información sobre los servicios 24/7."
    },
    quote: {
      text: "Vantia transformó nuestra recepción. El agente inteligente gestiona la mayoría de las citas por sí solo, 24/7. Ahora el personal dedica más tiempo a la atención personalizada en la clínica y los pacientes ya no tienen que esperar al teléfono. Ha sido un cambio radical.",
      author: "Ana García de la Torre, COO"
    },
    results: {
      title: "Resultados y Módulos",
      keyResultsTitle: "Resultados Clave",
      items: [
        "Manejo de más del 70% de las consultas de programación.",
        "Reducción de los tiempos de espera telefónica en un 50%.",
        "Personal disponible para la atención presencial.",
      ]
    },
    modules: {
      title: "Módulos Contratados",
      items: [
        "ChatBot", "RAG", "Captación de leads", "Gestión de Citas", "Notificaciones", "Análisis Histórico"
      ]
    }
  },
  {
    tag: "Caso de Estudio",
    title: "Funnel de ventas y calentamiento de leads",
    subtitle: "Alquiler de caravanas",
    imageId: "case-study-caravanas",
    challenge: {
      title: "Desafío",
      text: "La empresa recibía leads de distintas fuentes pero no tenía capacidad para contactar a todos a tiempo ni para saber cuáles estaban realmente interesados. El equipo comercial perdía tiempo con contactos fríos y les costaba priorizar las citas con los leads más calientes."
    },
    solution: {
      title: "Solución",
      text: "Diseñamos e implementamos un funnel de ventas con un agente conversacional que contactaba a los usuarios por WhatsApp. El agente calentaba el lead: comprobaba el interés real, resolvía dudas y cualificaba al usuario. El objetivo era que el usuario agendara una cita para que un empleado completara la venta del producto. Así el equipo comercial solo atendía citas con leads ya cualificados."
    },
    quote: {
      text: "El agente nos permite no dejar ningún lead sin contestar y llegar a la cita con el cliente ya caliente. Nuestro equipo cierra más porque solo habla con quien de verdad quiere alquilar.",
      author: "Cliente, sector alquiler de caravanas"
    },
    results: {
      title: "Resultados y Módulos",
      keyResultsTitle: "Resultados Clave",
      items: [
        "Contacto automático con todos los leads por WhatsApp.",
        "Cualificación y calentamiento del lead antes de la cita.",
        "Equipo comercial centrado en citas agendadas y venta.",
      ]
    },
    modules: {
      title: "Módulos Contratados",
      items: [
        "ChatBot", "WhatsApp", "Captación de leads", "Calentamiento de leads", "Gestión de Citas"
      ]
    }
  },
];