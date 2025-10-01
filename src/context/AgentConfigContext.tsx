"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AgentConfig {
  agentCost: number;
  isAgentGenerated: boolean;
  agentConfiguration: any; // Consider a more specific type
}

interface AgentConfigContextType {
  agentConfig: AgentConfig;
  setAgentCost: (cost: number) => void;
  setIsAgentGenerated: (generated: boolean) => void;
  setAgentConfiguration: (config: any) => void;
}

const AgentConfigContext = createContext<AgentConfigContextType | undefined>(undefined);

export const AgentConfigProvider = ({ children }: { children: ReactNode }) => {
  const [agentCost, setAgentCostState] = useState<number>(5200 / 12); // Default base cost: 5200/year converted to monthly
  const [isAgentGenerated, setIsAgentGeneratedState] = useState<boolean>(false);
  const [agentConfiguration, setAgentConfigurationState] = useState<any>({});

  const setAgentCost = (cost: number) => {
    setAgentCostState(cost);
  };

  const setIsAgentGenerated = (generated: boolean) => {
    setIsAgentGeneratedState(generated);
  };

  const setAgentConfiguration = (config: any) => {
    setAgentConfigurationState(config);
  };

  return (
    <AgentConfigContext.Provider value={{
      agentConfig: { agentCost, isAgentGenerated, agentConfiguration },
      setAgentCost,
      setIsAgentGenerated,
      setAgentConfiguration,
    }}>
      {children}
    </AgentConfigContext.Provider>
  );
};

export const useAgentConfig = () => {
  const context = useContext(AgentConfigContext);
  if (context === undefined) {
    throw new Error('useAgentConfig must be used within an AgentConfigProvider');
  }
  return context;
};
