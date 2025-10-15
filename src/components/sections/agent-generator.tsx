"use client";
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage'; // Import the hook
import { useAgentConfig } from '@/context/AgentConfigContext'; // Import useAgentConfig
import GeneratedAgentCard from './GeneratedAgentCard'; // Import the new card
import { coreModules, extraModules } from '@/app/configurar-agente/modules'; // Import module definitions

// Define the Module interface here or import it if it's defined elsewhere
interface Module {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  initialCost: number;
  isNeeded?: boolean;
}

const loadingMessages = [
  "Analizando sector...",
  "Identificando puntos de dolor...",
  "Diseñando automatizaciones...",
  "Estimando tiempo ahorrado...",
  "Calculando ahorros potenciales...",
  "Generando tu página de producto personalizada...",
];

export default function AgentGenerator() {
  const [companyDescription, setCompanyDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setAgentName, setSelectedModules, setAgentCost, setInitialAgentPayment, setAnnualAgentPayment, setCoreModulesCost, setExtraModulesCost, setPaymentOption, setIsAgentGenerated } = useAgentConfig(); // Get all setters from context

  // Use the local storage hook
  const [generatedAgent, setGeneratedAgent] = useLocalStorage<{ slug: string; name: string } | null>('generatedAgent', null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentLoadingMessage(loadingMessages[0]);

    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setCurrentLoadingMessage(loadingMessages[messageIndex]);
    }, 3000);

    try {
      const response = await fetch("/api/generar-agente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyDescription }),
      });

      clearInterval(interval);

      if (response.ok) {
        const { slug, name, modules } = await response.json();
        
        // Store the slug and the descriptive name in local storage
        setGeneratedAgent({ slug, name });
        setAgentName(name); // Set the agent name in the context
        setIsAgentGenerated(true); // Set the agent as generated

        const allAvailableModules = [...coreModules, ...extraModules];

        const normalizeModuleName = (name: string) => {
          if (name === "Conexión a tu Conocimiento") return "RAG";
          return name;
        };

        const selectedCoreModules: Module[] = (modules.core || []).map((moduleName: string) => {
          const normalizedName = normalizeModuleName(moduleName);
          const foundModule = allAvailableModules.find(m => m.name === normalizedName);
          return foundModule || {
            id: moduleName.toLowerCase().replace(/\s/g, '-'),
            name: moduleName,
            description: `Unknown Core module: ${moduleName}`,
            monthlyPrice: 0,
            initialCost: 0,
          };
        });

        const selectedExtraModules: Module[] = (modules.extra || []).map((moduleName: string) => {
          const normalizedName = normalizeModuleName(moduleName);
          const foundModule = allAvailableModules.find(m => m.name === normalizedName);
          return foundModule || {
            id: moduleName.toLowerCase().replace(/\s/g, '-'),
            name: moduleName,
            description: `Unknown Extra module: ${moduleName}`,
            monthlyPrice: 0,
            initialCost: 0,
          };
        });

        const selectedModulesWithDetails = [...selectedCoreModules, ...selectedExtraModules];

        setSelectedModules(selectedModulesWithDetails); // Set the selected modules in the context

        // Calculate total costs
        const totalCoreMonthlyPrice = selectedCoreModules.reduce((sum, module) => sum + module.monthlyPrice, 0);
        const totalExtraMonthlyPrice = selectedExtraModules.reduce((sum, module) => sum + module.monthlyPrice, 0);
        const totalMonthlyPrice = totalCoreMonthlyPrice + totalExtraMonthlyPrice;
        const totalInitialCost = selectedModulesWithDetails.reduce((sum, module) => sum + module.initialCost, 0);

        setAgentCost(totalMonthlyPrice);
        setInitialAgentPayment(totalInitialCost);
        setAnnualAgentPayment(totalMonthlyPrice * 12); // Initial annual payment without discount
        setCoreModulesCost(totalCoreMonthlyPrice);
        setExtraModulesCost(totalExtraMonthlyPrice);
        setPaymentOption('monthly'); // Default to monthly payment

        toast({
          title: "Página generada",
          description: "Redirigiendo a tu página de producto personalizada.",
        });
        router.push(`/agente/${slug}`);
      } else {
        let errorDescription = "Algo salió mal. Inténtalo de nuevo.";
        try {
          const errorData = await response.json();
          errorDescription = errorData.error || errorDescription;
        } catch (jsonError) {
          // If response is not JSON, use a generic message or response text
          errorDescription = `Server error (${response.status}): ${response.statusText || errorDescription}`;
        }
        console.error("API Error:", response.status, errorDescription);
        toast({
          title: "Error al generar",
          description: errorDescription,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      clearInterval(interval); // Clear interval here as well
      console.error("Network Error:", error);
      toast({
        title: "Error de red",
        description: "No se pudo conectar con el servidor. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCurrentLoadingMessage("");
    }
  };

  const placeholderText = isMobile
    ? "¿A qué se dedica tu empresa?"
    : "¿A qué se dedica tu empresa? ¿Qué tareas repetitivas te gustaría automatizar?";

  return (
    <>
      <section id="agent-generator" className="bg-[#070916] pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full font-extrabold tracking-tight text-white/90 mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
              Genera tu Agente IA
            </h2>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
              Describe tu empresa y tus necesidades de automatización para diseñar un agente a medida.
            </p>
            <div className="mt-12">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={placeholderText}
                    className="cursor-target pl-4 pr-4 py-6 bg-blue-950/60 border-blue-400/30 focus:border-blue-400 text-white/90 text-lg"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="cursor-target w-full bg-pink-500 hover:bg-pink-500 text-white/90 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:animate-shadow-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {currentLoadingMessage}
                    </span>
                  ) : (
                    "Generar Agente"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {generatedAgent && generatedAgent.slug && (
        <GeneratedAgentCard
          slug={generatedAgent.slug}
          name={generatedAgent.name}
          onClear={() => setGeneratedAgent(null)}
        />
      )}
    </>
  );
}