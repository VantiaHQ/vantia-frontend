"use client";
import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';
import GeneratedAgentCard from './GeneratedAgentCard';
import { agentGeneratorContent } from './AgentGenerator.content';
import { useAgentGeneration } from '@/hooks/useAgentGeneration';

export default function AgentGenerator() {
  const [companyDescription, setCompanyDescription] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const {
    step,
    isLoading,
    currentLoadingMessage,
    suggestions,
    fetchSuggestions,
    generateFinalAgent,
    startOver,
  } = useAgentGeneration();

  const [generatedAgent, setGeneratedAgent] = useLocalStorage<{ slug: string; name: string } | null>('generatedAgentInfo', null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 'initial') {
      fetchSuggestions(companyDescription);
    }
  };

  return (
    <>
      {generatedAgent && generatedAgent.slug ? (
        <div className="pt-32">
          <GeneratedAgentCard
            slug={generatedAgent.slug}
            name={generatedAgent.name}
            onClear={() => setGeneratedAgent(null)}
          />
          <div className="container mx-auto px-6 text-center pt-8 pb-12">
            <p className="text-sm text-foreground/80">
              {agentGeneratorContent.existingAgentMessage}
            </p>
          </div>
        </div>
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
                      placeholder={agentGeneratorContent.placeholder}
                      className="cursor-target pl-4 pr-4 py-6 bg-blue-950/60 border-blue-400/30 focus:border-blue-400 text-white/90 text-lg"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      required
                      disabled={isLoading || step === 'suggestions'}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="cursor-target w-full bg-pink-500 hover:bg-pink-500 text-white/90 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:animate-shadow-glow"
                    disabled={isLoading || step === 'suggestions'}
                  >
                    {isLoading && step === 'loading' ? (
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

              {step === 'suggestions' && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white/90 mb-6">{agentGeneratorContent.suggestionsTitle}</h3>
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        onClick={() => {
                          setSelectedSuggestion(suggestion);
                          generateFinalAgent(suggestion);
                        }}
                        variant="outline"
                        className="cursor-target bg-transparent border-blue-400/30 hover:bg-blue-900/40 text-white/90"
                        disabled={isLoading}
                      >
                        {isLoading && selectedSuggestion === suggestion ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          suggestion
                        )}
                      </Button>
                    ))}
                  </div>
                  <Button onClick={startOver} variant="link" className="text-gray-400">
                    {agentGeneratorContent.startOverButtonText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
