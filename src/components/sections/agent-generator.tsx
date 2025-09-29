"use client";
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentLoadingMessage(loadingMessages[0]);

    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setCurrentLoadingMessage(loadingMessages[messageIndex]);
    }, 3000); // Change message every 3 seconds

    try {
      const response = await fetch("/api/generate-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyDescription }),
      });

      clearInterval(interval);

      if (response.ok) {
        const { slug } = await response.json();
        toast({
          title: "Página generada",
          description: "Redirigiendo a tu página de producto personalizada.",
        });
        router.push(`/agent/${slug}`);
      } else {
        const errorData = await response.json();
        toast({
          title: "Error al generar",
          description: errorData.error || "Algo salió mal. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      clearInterval(interval);
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

  return (
    <section id="agent-generator" className="bg-[#070916] py-20 sm:py-28 min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full font-extrabold tracking-tight text-white mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
            Genera tu Agente IA
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
            Describe tu empresa y tus necesidades de automatización para que nuestra IA diseñe un agente a medida.
          </p>
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="¿A qué se dedica tu empresa? ¿Qué tareas repetitivas te gustaría automatizar?"
                  className="pl-4 pr-4 py-6 bg-blue-950/60 border-blue-400/30 focus:border-blue-400 text-white text-lg"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
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
  );
}
