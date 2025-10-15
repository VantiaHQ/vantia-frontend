"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';

interface Module {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  initialCost: number;
  isNeeded?: boolean; // Optional, for UI indication
}

interface AgentConfig {
  agentName: string;
  agentCost: number; // Monthly recurring cost of selected modules
  initialAgentPayment: number; // Total initial cost of selected modules
  annualAgentPayment: number; // Total annual recurring cost of selected modules
  coreModulesCost: number;
  extraModulesCost: number;
  paymentOption: 'monthly' | 'annual';
  isAgentGenerated: boolean;
  agentConfiguration: any; // Consider a more specific type
  selectedModules: Module[];
}

const initialAgentConfig: AgentConfig = {
  agentName: "",
  agentCost: 5200 / 12, // Default base cost: 5200/year converted to monthly
  initialAgentPayment: 2500, // Default initial payment
  annualAgentPayment: 5200, // Default annual payment
  coreModulesCost: 0,
  extraModulesCost: 0,
  paymentOption: 'monthly',
  isAgentGenerated: false,
  agentConfiguration: {},
  selectedModules: [],
};

interface AgentConfigContextType {
  agentConfig: AgentConfig;
  setAgentCost: (cost: number) => void;
  setInitialAgentPayment: (cost: number) => void;
  setAnnualAgentPayment: (cost: number) => void;
  setCoreModulesCost: (cost: number) => void;
  setExtraModulesCost: (cost: number) => void;
  setPaymentOption: (option: 'monthly' | 'annual') => void;
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
    const totalMonthlyPrice = modules.reduce((sum, module) => {
      const price = typeof module.monthlyPrice === 'number' && !isNaN(module.monthlyPrice) ? module.monthlyPrice : 0;
      return sum + price;
    }, 0);
    const totalInitialCost = modules.reduce((sum, module) => {
      const cost = typeof module.initialCost === 'number' && !isNaN(module.initialCost) ? module.initialCost : 0;
      return sum + cost;
    }, 0);

    const sanitizedModules = modules.map(module => ({
      ...module,
      monthlyPrice: typeof module.monthlyPrice === 'number' && !isNaN(module.monthlyPrice) ? module.monthlyPrice : 0,
      initialCost: typeof module.initialCost === 'number' && !isNaN(module.initialCost) ? module.initialCost : 0,
    }));

    setAgentConfig(prevConfig => ({
      ...prevConfig,
      selectedModules: sanitizedModules, // Store the sanitized modules
      agentCost: totalMonthlyPrice,
      initialAgentPayment: totalInitialCost,
      annualAgentPayment: totalMonthlyPrice * 12,
    }));
  };

  const setAgentName = (name: string) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, agentName: name }));
  };

  const setCoreModulesCost = (cost: number) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, coreModulesCost: cost }));
  };

  const setExtraModulesCost = (cost: number) => {
    setAgentConfig(prevConfig => ({ ...prevConfig, extraModulesCost: cost }));
  };

  const setPaymentOption = (option: 'monthly' | 'annual') => {
    setAgentConfig(prevConfig => ({ ...prevConfig, paymentOption: option }));
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
      setCoreModulesCost,
      setExtraModulesCost,
      setPaymentOption,
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
