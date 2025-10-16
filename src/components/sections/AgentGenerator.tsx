"use client";
import { useState, FormEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';
import GeneratedAgentCard from './GeneratedAgentCard';
import { agentGeneratorContent } from './AgentGenerator.content';
import { useAgentGeneration } from '@/hooks/useAgentGeneration';

export default function AgentGenerator() {
  const [companyDescription, setCompanyDescription] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  const { generateAgent, isLoading, currentLoadingMessage } = useAgentGeneration();
  const [generatedAgent, setGeneratedAgent] = useLocalStorage<{ slug: string; name: string } | null>('generatedAgentInfo', null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    generateAgent(companyDescription);
  };

  const placeholderText = isMobile
    ? agentGeneratorContent.placeholder.mobile
    : agentGeneratorContent.placeholder.desktop;

  return (
    <>
      {generatedAgent && generatedAgent.slug ? (
        <>
          <div className="container mx-auto px-6 text-center pt-32 pb-8">
            <p className="text-lg text-foreground/80">
              Ya tienes un agente generado. Si deseas crear uno nuevo, primero debes eliminar el actual.
            </p>
          </div>
          <GeneratedAgentCard
            slug={generatedAgent.slug}
            name={generatedAgent.name}
            onClear={() => setGeneratedAgent(null)}
          />
        </>
      ) : (
        <section id="agent-generator" className="bg-[#070916] pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full font-extrabold tracking-tight text-white/90 mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
                {agentGeneratorContent.title}
              </h2>
              <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
                {agentGeneratorContent.description}
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
                      agentGeneratorContent.buttonText
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}