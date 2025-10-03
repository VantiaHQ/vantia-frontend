
import ConfigureAgentModalButton from '@/components/sections/ConfigureAgentModalButton';
import { agentContentStrings } from '@/app/agente/[slug]/content';

type ModulesUsedProps = {
  content: {
    core: string[];
    extra: string[];
  };
};

export default function ModulesUsed({ content }: ModulesUsedProps) {
  if (!content) return null;

  return (
    <>
      <h2 className="text-4xl max-w-xl font-bold text-white mb-8">Módulos de IA Utilizados</h2>
      {content.core && content.core.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-2xl font-semibold text-white mb-4">{agentContentStrings.coreModulesTitle}</h3>
          <div className="flex flex-wrap gap-3">
            {content.core.map((module: string, itemIndex: number) => (
              <div key={itemIndex} className="bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 p-6 flex items-center gap-6 shadow-lg">
                <div className="font-bold text-lg text-white mb-1 text-left">
                  {module}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {content.extra && content.extra.length > 0 && (
        <div className="text-left">
          <h3 className="text-2xl font-semibold text-white mb-4">{agentContentStrings.extraModulesTitle}</h3>
          <div className="flex flex-wrap gap-3">
            {content.extra.map((module: string, itemIndex: number) => (
              <div key={itemIndex} className="bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400 p-6 flex items-center gap-6 shadow-lg shadow-blue-400/20">
                <div className="font-bold text-lg text-white mb-1 text-left">
                  {module}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end"></div>
        </div>
      )}
      <ConfigureAgentModalButton
        preSelectedModules={[
          ...(content.core?.map((mod: any) => mod) || []),
          ...(content.extra?.map((mod: any) => mod) || []),
        ]}
      />
    </>
  );
}
