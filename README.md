# Vantia Frontend

## Empowering Businesses with Intelligent AI Agents

Welcome to the Vantia Frontend repository! This project powers the user-facing application for Vantia, a cutting-edge platform focused on helping businesses leverage the power of AI agents for automation, efficiency, and growth.

## 🚀 Features

- **AI Agent Generation**: Dynamically generate and configure AI agent proposals tailored to specific business needs.
- **Interactive Savings Calculator**: Estimate potential time and cost savings by automating repetitive interactions with AI agents.
- **Comprehensive ROI Analysis**: Visualize the return on investment over multiple years, showcasing the long-term benefits of Vantia's solutions.
- **Responsive Design**: A seamless user experience across all devices, from desktop to mobile.

## 🛠️ Technologies Used

- **Next.js**: A React framework for building performant and scalable web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Recharts**: A composable charting library built on React components for data visualization.
- **Local Storage**: For persisting user-specific data and preferences.

## 📦 Project Structure

The project follows a standard Next.js application structure, with additional directories for AI-related configurations, custom hooks, and utility functions.

```
. (root)
├── src/
│   ├── ai/                 # AI-related configurations and flows
│   │   ├── dev.ts          # Development-specific AI configurations
│   │   ├── genkit.ts       # Genkit (Google's AI framework) configurations
│   │   ├── flows/          # AI workflow definitions (e.g., chatbot, agent generation)
│   │   ├── prompts/        # AI prompt templates
│   │   └── schemas/        # Data schemas for AI interactions
│   ├── app/                # Next.js application pages and API routes
│   │   ├── [slug]/         # Dynamic routes for agent pages
│   │   ├── api/            # Backend API routes (e.g., contact form, agent generation)
│   │   ├── calculadora-ahorro/ # Pages and components for the savings calculator
│   │   └── ...             # Other application pages
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components (e.g., button, card, dialog)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── sections/       # Larger sections of pages (Hero, Contact, AgenteModular)
│   │   └── calculadora-ahorro/ # Components specific to the savings calculator
│   ├── context/            # React Context for global state management (e.g., AgentConfigContext)
│   ├── hooks/              # Custom React hooks for reusable logic (e.g., useAgentGeneration, useLocalStorage)
│   └── lib/                # Utility functions, constants, and external integrations
│       ├── constants.ts    # Centralized application constants (e.g., ROI_YEARS, HOURS_IN_WORKING_DAY)
│       ├── pricing.ts      # Default pricing configurations and related constants
│       ├── roiCalculations.ts # Logic for ROI data calculations
│       ├── modules.ts      # Definitions for core and extra AI modules
│       ├── supabase.ts     # Supabase client configuration
│       └── utils.ts        # General utility functions
├── public/                 # Static assets (images, favicons, robots.txt, sitemap.xml)
├── .git/                   # Git version control
├── node_modules/           # Project dependencies
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## 🏁 Getting Started

Follow these steps to set up and run the Vantia Frontend locally:

### Prerequisites

- Node.js (v18 or higher)
- npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/vantia-frontend.git
    cd vantia-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

### Reservas con Google Calendar (`/reservar`)

La página de reserva crea eventos en Google Calendar con una **service account**. Variables de entorno **opcionales** en servidor (si falta el JSON, `/api/booking/*` responde 503):

- `GOOGLE_SERVICE_ACCOUNT_JSON` — JSON de la clave de la cuenta de servicio **o** la misma cadena en **base64** (recomendado en secrets). En PowerShell: `[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((Get-Content -Raw ".\ruta\al.json")))` (opcional `| Set-Clipboard`). El calendario debe estar compartido con el `client_email` del JSON con permiso de hacer cambios en eventos.
- `GOOGLE_CALENDAR_ID` — opcional; por defecto `primary`.
- `GOOGLE_WORKSPACE_DELEGATED_USER` — opcional; email de un usuario **de tu dominio Google Workspace** (ej. `agenda@tudominio.com`). Si está definido, la API suplanta a ese usuario y **Google envía invitaciones de calendario** al cliente. Requiere delegación de dominio (pasos abajo). Sin esta variable, el evento se crea como la service account: sin invitaciones automáticas (solo descripción + n8n).

**Delegación de dominio (Workspace)** — no aplica a Gmail personal; hace falta ser **administrador** del dominio. Resumen:

1. En [Google Cloud Console](https://console.cloud.google.com/) → IAM → tu cuenta de servicio → pestaña **Detalles** → activar **Delegación de dominio de Google Workspace** y copiar el **ID de cliente** (número largo).
2. En [Admin de Google](https://admin.google.com/) → **Seguridad** → **Controles de acceso y datos de la API** → **Delegación de todo el dominio** → **Añadir nuevo** → pegar el ID de cliente y como ámbito OAuth: `https://www.googleapis.com/auth/calendar`
3. El usuario de `GOOGLE_WORKSPACE_DELEGATED_USER` debe existir en el dominio y tener acceso al calendario donde se crean las citas (`GOOGLE_CALENDAR_ID` o su calendario principal si usas `primary`).

Guía oficial: [Delegar autoridad de dominio](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority).

Horario de reservas (solo servidor): [`src/lib/bookingConfig.ts`](src/lib/bookingConfig.ts) lee **variables de entorno** opcionales — `BOOKING_SLOT_MINUTES`, `BOOKING_WINDOW_START`, `BOOKING_WINDOW_END`, `BOOKING_TIME_ZONE` — con fallback en código. El límite de días en el calendario del formulario está en [`src/lib/bookingConstants.ts`](src/lib/bookingConstants.ts) (`BOOKING_MAX_DAYS_AHEAD`, alineado con el servidor).

### Webhook n8n (contacto + reservas)

Si defines la URL, el servidor hace **POST** con JSON tras un envío correcto:

- **Formulario de contacto** (`POST /api/contact`): envío directo a n8n.
- **Reserva** (`POST /api/booking/book`): después de crear el evento en Google Calendar.

Variables **opcionales** en servidor:

- `N8N_WEBHOOK_URL` — URL del nodo *Webhook* en n8n (o URL completa del flujo).
- `N8N_WEBHOOK_SECRET` — opcional; si existe, se envía `Authorization: Bearer <valor>`.

Cuerpo del POST (campos comunes + `submittedAt` en ISO):

| `source`        | Campos extra |
|-----------------|--------------|
| `contact_form`  | `name`, `company`, `email`, `budget`, `message` |
| `booking`       | `name`, `email`, `phone`, `notes`, `slotStart`, `slotEnd`, `timeZone`, `slotLabelLocal`, `calendarEventId`, `htmlLink`, `meetLink` |

Comportamiento ante error del webhook:
- Contacto (`/api/contact`): estricto, devuelve error al usuario si n8n falla o no está configurado.
- Reservas (`/api/booking/book`): no bloqueante, la reserva sigue en calendario y el fallo del webhook se deja en logs.

## 🤝 Contributing

We welcome contributions to the Vantia Frontend! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and ensure they adhere to the project's coding standards.
4.  Write clear, concise commit messages.
5.  Push your branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE.md). (Note: You might need to create a LICENSE.md file if it doesn't exist).

## ✉️ Contact

For any inquiries or support, please contact [infovantia@gmail.com](mailto:infovantia@gmail.com).
