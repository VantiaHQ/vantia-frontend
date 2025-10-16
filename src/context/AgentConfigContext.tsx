"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

interface Module {
  id: string;
  name: string;
  description: string;
  isNeeded?: boolean; // Optional, for UI indication
}

interface AgentConfig {
  agentName: string;
  agentCost: number; // Monthly recurring cost of selected modules
  initialAgentPayment: number; // Total initial cost of selected modules
  annualAgentPayment: number; // Total annual recurring cost of selected modules
  isAgentGenerated: boolean;
  agentConfiguration: any; // Consider a more specific type
  selectedModules: Module[];
}

import { DEFAULT_MONTHLY_COST, DEFAULT_INITIAL_PAYMENT, DEFAULT_ANNUAL_RECURRING_PAYMENT } from '@/lib/pricing';

const initialAgentConfig: AgentConfig = {
  agentName: "",
  agentCost: DEFAULT_MONTHLY_COST,
  initialAgentPayment: DEFAULT_INITIAL_PAYMENT,
  annualAgentPayment: DEFAULT_ANNUAL_RECURRING_PAYMENT,
  isAgentGenerated: false,
  agentConfiguration: {},
  selectedModules: [],
};

interface AgentConfigContextType {
  agentConfig: AgentConfig;
  setAgentCost: (cost: number) => void;
  setInitialAgentPayment: (cost: number) => void;
  setAnnualAgentPayment: (cost: number) => void;
  setIsAgentGenerated: (generated: boolean) => void;
  setAgentConfiguration: (config: any) => void;
  setSelectedModules: (modules: Module[]) => void;
  setAgentName: (name: string) => void;
}

const AgentConfigContext = createContext<AgentConfigContextType | undefined>(undefined);

export const AgentConfigProvider = ({ children }: { children: ReactNode }) => {
  const [agentConfig, setAgentConfig] = useLocalStorage<AgentConfig>('generatedAgent', initialAgentConfig);

  const setAgentCost = (cost: number) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, agentCost: cost }));
  };

  const setInitialAgentPayment = (cost: number) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, initialAgentPayment: cost }));
  };

  const setAnnualAgentPayment = (cost: number) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, annualAgentPayment: cost }));
  };

  const setIsAgentGenerated = (generated: boolean) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, isAgentGenerated: generated }));
  };

  const setAgentConfiguration = (config: any) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, agentConfiguration: config }));
  };

  const setSelectedModules = (modules: Module[]) => {
    setAgentConfig(prevConfig => ({
      ...prevConfig,
      selectedModules: modules,
    }));
  };

  const setAgentName = (name: string) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, agentName: name }));
  };

  return (
    <AgentConfigContext.Provider value={{
      agentConfig,
      setAgentCost,
      setInitialAgentPayment,
      setAnnualAgentPayment,
      setIsAgentGenerated,
      setAgentConfiguration,
      setSelectedModules,
      setAgentName,
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