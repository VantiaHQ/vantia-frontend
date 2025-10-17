import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAgentConfig } from '@/context/AgentConfigContext';
import { coreModules, extraModules, type Module } from '@/lib/modules';
import { agentGeneratorContent } from '@/components/sections/AgentGenerator.content';

type GenerationStep = 'initial' | 'suggestions' | 'loading' | 'done';

export function useAgentGeneration() {
  const [step, setStep] = useState<GenerationStep>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const router = useRouter();
  const { toast } = useToast();
  const { setAgentName, setSelectedModules } = useAgentConfig();
  const [, setGeneratedAgent] = useLocalStorage<{ slug: string; name: string } | null>('generatedAgentInfo', null);

  const handleApiError = (error: any, response?: Response) => {
    let errorDescription = agentGeneratorContent.toast.error.default;
    if (response) {
      try {
        // Try to parse error from response body
        response.json().then(errorData => {
          errorDescription = errorData.error || errorDescription;
        });
      } catch (jsonError) {
        errorDescription = `Server error (${response.status}): ${response.statusText || errorDescription}`;
      }
    }
    console.error("API Error:", error);
    toast({
      title: agentGeneratorContent.toast.error.title,
      description: errorDescription,
      variant: "destructive",
    });
  };

  const fetchSuggestions = async (description: string) => {
    setCompanyDescription(description);
    setIsLoading(true);
    setStep('loading');
    setCurrentLoadingMessage("Buscando sugerencias...");

    try {
      const response = await fetch("/api/sugerir-agentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyDescription: description }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setStep('suggestions');
      } else {
        handleApiError("Failed to fetch suggestions", response);
        setStep('initial');
      }
    } catch (error) {
      handleApiError(error);
      setStep('initial');
    } finally {
      setIsLoading(false);
    }
  };

  const generateFinalAgent = async (agentType: string) => {
    console.log("[DEBUG] Iniciando generateFinalAgent");
    console.log("[DEBUG] agentType seleccionado:", agentType);
    console.log("[DEBUG] Descripción de la empresa guardada:", companyDescription);
    setIsLoading(true);
    setStep('loading');
    const { loadingMessages } = agentGeneratorContent;
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
        body: JSON.stringify({ companyDescription, agentType }),
      });

      clearInterval(interval);

      if (response.ok) {
        const { slug, name, modules } = await response.json();
        setGeneratedAgent({ slug, name });
        setAgentName(name);

        const allAvailableModules = [...coreModules, ...extraModules];
        const normalizeModuleName = (name: string) => name === "Conexión a tu Conocimiento" ? "RAG" : name;

        const selectedCoreModules: Module[] = (modules.core || []).map((moduleName: string) => {
            const normalizedName = normalizeModuleName(moduleName);
            return allAvailableModules.find(m => m.name === normalizedName) || { id: moduleName, name: moduleName, description: '' };
        });
        const selectedExtraModules: Module[] = (modules.extra || []).map((moduleName: string) => {
            const normalizedName = normalizeModuleName(moduleName);
            return allAvailableModules.find(m => m.name === normalizedName) || { id: moduleName, name: moduleName, description: '' };
        });

        setSelectedModules([...selectedCoreModules, ...selectedExtraModules]);
        toast({
          title: agentGeneratorContent.toast.success.title,
          description: agentGeneratorContent.toast.success.description,
        });
        router.push(`/agente/${slug}`);
      } else {
        handleApiError("Failed to generate final agent", response);
        setStep('suggestions');
      }
    } catch (error) {
      clearInterval(interval);
      handleApiError(error);
      setStep('suggestions');
    } finally {
      setIsLoading(false);
      setCurrentLoadingMessage("");
    }
  };
  
  const startOver = () => {
    setStep('initial');
    setCompanyDescription("");
    setSuggestions([]);
  }

  return { 
    step, 
    isLoading, 
    currentLoadingMessage, 
    suggestions,
    fetchSuggestions, 
    generateFinalAgent,
    startOver
  };
}
