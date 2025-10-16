# Vantia Frontend

## Empowering Businesses with Intelligent AI Agents

Welcome to the Vantia Frontend repository! This project powers the user-facing application for Vantia, a cutting-edge platform dedicated to helping businesses leverage the power of AI agents for automation, efficiency, and growth.

## 🚀 Features

- **AI Agent Generation**: Dynamically generate and configure AI agents tailored to specific business needs.
- **Interactive Savings Calculator**: Estimate potential time and cost savings by automating repetitive interactions with AI agents.
- **Comprehensive ROI Analysis**: Visualize the return on investment over multiple years, showcasing the long-term benefits of Vantia's solutions.
- **Modular Agent Configuration**: Explore and select various core and extra modules to customize AI agent functionalities.
- **Responsive Design**: A seamless user experience across all devices, from desktop to mobile.

## 🛠️ Technologies Used

- **Next.js**: A React framework for building performant and scalable web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Recharts**: A composable charting library built on React components for data visualization.
- **Local Storage**: For persisting user-specific data and preferences.

## 📦 Project Structure

```
. (root)
├── src/
│   ├── ai/                 # AI-related configurations and flows
│   ├── app/                # Next.js application pages and API routes
│   ├── components/         # Reusable UI components (e.g., CalculadoraAhorro, ROISummaryCard)
│   ├── context/            # React Context for global state management
│   ├── hooks/              # Custom React hooks for reusable logic
│   └── lib/                # Utility functions, constants, and external integrations
│       ├── constants.ts    # Centralized application constants (e.g., ROI_YEARS, HOURS_IN_WORKING_DAY)
│       ├── pricing.ts      # Default pricing configurations
│       └── roiCalculations.ts # Logic for ROI data calculations
├── public/                 # Static assets (images, favicons)
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

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

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

For any inquiries or support, please contact [support@vantia.com](mailto:support@vantia.com).