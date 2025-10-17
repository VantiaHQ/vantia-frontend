export const AGENT_GENERATION_PROMPT = `Eres un experto en marketing de producto para soluciones de IA.
Tu tarea es crear el contenido para una landing page personalizada, fusionando dos piezas de información clave:

1.  **El Rol del Agente (el "qué"):** "{{AGENT_ROLE}}"
2.  **La Descripción de la Empresa (el "para quién"):** "{{companyDescription}}"

El resultado final debe ser una propuesta de valor para el **Rol del Agente APLICADO a la Empresa**. No ignores ninguna de las dos partes.

Ejemplo de Fusión:
- Si el Rol es "Agente de Gestión de Citas" y la Empresa es "una red de talleres mecánicos", el hero.title no debe ser "Gestiona tus Citas", sino "Optimiza las Reservas de Citas en tu Red de Talleres".
- Los benefits deben hablar de reducir tiempos de espera para los clientes de los talleres y optimizar la agenda de los mecánicos.

Cada pieza del contenido generado (títulos, beneficios, puntos de dolor) debe reflejar esta fusión.

### Asunción clave:
El potencial cliente es un **CEO**. Él busca una solución para que sus trabajadores automaticen tareas repetitivas de forma eficiente, reduzcan errores, atiendan mejor a los clientes, y dispongan de más tiempo para aportar valor a la empresa.  
Todos los textos deben hablarle directamente desde ese punto de vista (eficiencia, reducción de costes, productividad).

### Reglas:
1. Los módulos **Core** siempre deben estar incluidos:  
   - **ChatBot 24/7**: responde FAQs automatizadas y mejora experiencia del cliente, liberando tiempo del equipo humano.  
   - **RAG (Conexión a tu Conocimiento)**: asegura respuestas sobre la información propia de la empresa, fiabilidad total.  

2. Los **módulos Extra** deben proponerse solo si tienen sentido claro en el caso del sector. Modulos extra disponibles (el nombre tiene que coincidir exactamente):  
  - Captación de Información  
  - Gestión de Citas  
  - Notificaciones
  - GenAI
  - Generación de Enlaces de Pago  
  - Análisis de Sentimiento  
  - Análisis Histórico  
  - Lectura de Documentos OCR  

3. **Hero y textos personalizados**: siempre adaptados al sector y al CEO (eficiencia, ahorro de tiempo, ROI).  

4. Para las secciones "benefits.items", "painPoints" y "possibleAutomations", asegúrate de que la longitud de los caracteres de cada elemento dentro de cada grupo sea muy similar para mantener la coherencia visual y devuelve estrictamente el número de elementos indicados: 

5. Devuelve el resultado en **JSON con esta estructura**:

{
  "hero": {
    "title": "...",
    "subtitle": "...",
    "cta": ["...", "..."]
  },
  "whatIsIt": {
    "title": "...",
    "text": "..."
  },
  "benefits": {
    "title": "...",
    "items": ["...", "...", "...", "..."]
  },
  "howItWorks": {
    "title": "...",
    "steps": ["...", "...", "..."]
  },
  "faq": {
    "title": "...",
    "items": [
      {"q": "...", "a": "..."},
      {"q": "...", "a": "..."}
    ]
  },
  "testimonials": {
    "title": "...",
    "items": [
      {"text": "...", "author": "..."},
      {"text": "...", "author": "..."}
    ]
  },
  "finalCTA": {
    "text": "...",
    "buttons": ["...", "...", "...", "...", "..."]
  },
  "painPoints": ["...", "...", "...", "..."],
  "possibleAutomations": ["...", "...", "...", "..."],
  "modulesUsed": {
    "core": ["ChatBot 24/7", "Conexión a tu Conocimiento"],
    "extra": ["...", "..."]
  }
}

---

**IMPORTANTE**: El siguiente es un ejemplo del **formato de salida JSON requerido**. No copies el contenido. Usa las instrucciones anteriores para generar contenido nuevo y original basado en el ROL y la EMPRESA proporcionados.

### Ejemplo One-Shot:
Input: "Clínica médica privada"

Output:

{
  "hero": {
    "title": "Atiende a tus pacientes 24/7 sin sobrecargar a tu equipo",
    "subtitle": "Un agente inteligente que agenda citas, responde consultas y libera tiempo para que tu personal se enfoque en la atención médica.",
    "cta": ["Solicita una demo", "Empieza gratis hoy"]
  },
  "whatIsIt": {
    "title": "El asistente virtual para tu clínica",
    "text": "Un agente diseñado para gestionar consultas médicas, agendar citas y resolver dudas frecuentes de los pacientes. Reduce tareas repetitivas y aumenta la eficiencia de tu equipo."
  },
  "benefits": {
    "title": "Beneficios Clave",
    "items": [
      "Libera a tu personal de llamadas repetitivas gracias al ChatBot 24/7",
      "Conexión con la base de datos de pacientes para respuestas seguras y actualizadas",
      "Automatiza la gestión de citas y recordatorios con Notificaciones Inteligentes",
      "Mejora la experiencia del paciente con respuestas inmediatas y personalizadas"
    ]
  },
  "howItWorks": {
    "title": "Cómo Funciona",
    "steps": [
      "El paciente consulta en el chat 24/7 sus dudas o solicita cita",
      "El agente busca la información en la base de datos de la clínica y responde automáticamente",
      "El sistema agenda la cita y envía notificaciones automáticas para confirmar"
    ]
  },
  "faq": {
    "title": "Preguntas Frecuentes",
    "items": [
      {"q": "¿Mi personal necesita conocimientos técnicos?", "a": "No, el sistema es intuitivo y fácil de usar."},
      {"q": "¿Se puede integrar con WhatsApp y el calendario de la clínica?", "a": "Sí, el agente se conecta a WhatsApp para atender a los pacientes en su canal favorito y gestiona automáticamente las citas en tu calendario."},
      {"q": "¿Cuánto tiempo puede ahorrarme el agente automáticamente?", "a": "Puede ahorrar hasta el 80% del tiempo dedicado a la gestión de citas y consultas frecuentes, permitiendo que tu equipo se centre en tareas de mayor valor."},
      {"q": "¿El agente funciona las 24 horas del día?", "a": "Sí, está disponible para interactuar con los pacientes y gestionar solicitudes en cualquier momento, incluso fuera del horario de la clínica."},
      {"q": "¿Cómo se personaliza el agente para mi clínica?", "a": "Se configura con la información específica de tus servicios, horarios y políticas para ofrecer respuestas precisas y personalizadas a cada paciente."}
    ]
  },
  "testimonials": {
    "title": "Lo que dicen otras clínicas",
    "items": [
      {"text": "Redujimos un 60% las llamadas al personal administrativo y los pacientes están mejor informados.", "author": "Dra. García, Directora de clínica privada"},
      {"text": "El sistema agenda automáticamente las citas y evita la saturación del personal.", "author": "CEO de Red de Salud"}
    ]
  },
  "finalCTA": {
    "text": "Optimiza tu clínica y libera tiempo de tu equipo con un agente inteligente para la atención médica",
    "buttons": ["Solicita una demo", "Empieza gratis ahora"]
  },
  "painPoints": [
    "Personal saturado de llamadas y gestión manual de citas",
    "Pacientes que esperan demasiado tiempo para respuestas básicas",
    "Pacientes que quieren hacer gestiones fuera del horario de la clínica",
    "Pacientes que no reciben atención personalizada"
  ],
  "possibleAutomations": [
    "ChatBot 24/7 que responde dudas médicas frecuentes",
    "Gestión automática de citas",
    "Integración con WhatsApp para atender a los pacientes en su canal favorito",
    "RAG para respuestas precisas y actualizadas"
  ],
  "modulesUsed": {
    "core": ["ChatBot 24/7", "Conexión a tu Conocimiento"],
    "extra": ["Gestión de Citas", "Notificaciones Inteligentes"]
  }
}
`;

export const AGENT_PAGE_GENERATION_RULES = `
INPUT: {{companyDescription}}

Rules:
- Output strictly valid JSON matching the required schema.
- Do not include markdown fences or any prose.
- Write all texts in Spanish, tailored to a CEO persona.
- Keep list items concise and of similar length for visual consistency.`;

export const AGENT_SUGGESTION_PROMPT = `Tu tarea es actuar como un recomendador de agentes de IA.
Se te proporcionará una descripción de una empresa y una lista de posibles agentes con sus puntuaciones de "potencial" en diferentes verticales de negocio.

Instrucciones:
1. Analiza la descripción de la empresa para entender su sector y necesidades.
2. Basado en el análisis, identifica las 1 o 2 verticales de negocio más relevantes de la lista de agentes.
3. Selecciona los 3 agentes que tengan la puntuación de "potencial" más alta en esas verticales relevantes.
4. Devuelve ÚNICAMENTE los nombres de esos 3 agentes.

Reglas de salida:
- La salida debe ser un objeto JSON válido con una única clave "suggestions", que contenga un array de 3 strings.
- No incluyas ninguna explicación, solo el JSON.
- Los nombres en el array deben coincidir EXACTAMENTE con los nombres de la lista de agentes proporcionada.

LISTA DE AGENTES DISPONIBLES:
{{agentList}}

DESCRIPCIÓN DE LA EMPRESA:
{{companyDescription}}
`;