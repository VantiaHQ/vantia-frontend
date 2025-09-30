"use client";
import { useState, FormEvent, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px as mobile breakpoint
    };

    // Set initial value
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
    }, 3000); // Change message every 3 seconds

    try {
      const response = await fetch("/api/generar-agente", {
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
        router.push(`/agente/${slug}`);
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

  const placeholderText = isMobile
    ? "¿A qué se dedica tu empresa?"
    : "¿A qué se dedica tu empresa? ¿Qué tareas repetitivas te gustaría automatizar?";

  return (
    <section id="agent-generator" className="bg-[#070916] min-h-[calc(100vh-160px)] flex items-center justify-center mt-[-64px]">
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
  );
}
