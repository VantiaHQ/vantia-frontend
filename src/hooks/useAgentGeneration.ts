import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAgentConfig } from '@/context/AgentConfigContext';
import { coreModules, extraModules, type Module } from '@/lib/modules';
import { agentGeneratorContent } from '@/components/sections/AgentGenerator.content';

export function useAgentGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { setAgentName, setSelectedModules } = useAgentConfig();
  const [, setGeneratedAgent] = useLocalStorage<{ slug: string; name: string } | null>('generatedAgentInfo', null);

  const generateAgent = async (companyDescription: string) => {
    setIsLoading(true);
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
        body: JSON.stringify({ companyDescription }),
      });

      clearInterval(interval);

      if (response.ok) {
        const { slug, name, modules } = await response.json();
        
        setGeneratedAgent({ slug, name });
        setAgentName(name);

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

        setSelectedModules(selectedModulesWithDetails);

        toast({
          title: agentGeneratorContent.toast.success.title,
          description: agentGeneratorContent.toast.success.description,
        });
        router.push(`/agente/${slug}`);
      } else {
        let errorDescription = agentGeneratorContent.toast.error.default;
        try {
          const errorData = await response.json();
          errorDescription = errorData.error || errorDescription;
        } catch (jsonError) {
          errorDescription = `Server error (${response.status}): ${response.statusText || errorDescription}`;
        }
        console.error("API Error:", response.status, errorDescription);
        toast({
          title: agentGeneratorContent.toast.error.title,
          description: errorDescription,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      clearInterval(interval);
      console.error("Network Error:", error);
      toast({
        title: agentGeneratorContent.toast.networkError.title,
        description: agentGeneratorContent.toast.networkError.description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCurrentLoadingMessage("");
    }
  };

  return { generateAgent, isLoading, currentLoadingMessage };
}