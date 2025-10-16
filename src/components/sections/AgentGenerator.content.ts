export const agentGeneratorContent = {
  title: "Genera tu Agente IA",
  description: "Describe tu empresa y tus necesidades de automatización para diseñar un agente a medida.",
  existingAgentMessage: "Ya hay una propuesta de agente generada. Si deseas crear una nueva propuesta, primero debes eliminar la actual.",
  placeholder: {
    mobile: "¿A qué se dedica tu empresa?",
    desktop: "¿A qué se dedica tu empresa? ¿Qué tareas repetitivas te gustaría automatizar?"
  },
  buttonText: "Generar Agente",
  loadingMessages: [
    "Analizando sector...",
    "Identificando puntos de dolor...",
    "Diseñando automatizaciones...",
    "Estimando tiempo ahorrado...",
    "Calculando ahorros potenciales...",
    "Generando tu página de producto personalizada...",
  ],
  toast: {
    success: {
      title: "Página generada",
      description: "Redirigiendo a tu página de producto personalizada.",
    },
    error: {
      title: "Error al generar",
      default: "Algo salió mal. Inténtalo de nuevo.",
    },
    networkError: {
        title: "Error de red",
        description: "No se pudo conectar con el servidor. Inténtalo de nuevo.",
    }
  }
};