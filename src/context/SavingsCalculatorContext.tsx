"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

interface SavingsCalculatorContextType {
  interaccionesDia: number;
  setInteraccionesDia: (value: number) => void;
  precioHora: number;
  setPrecioHora: (value: number) => void;
  duracionMediaMinutos: number;
  setDuracionMediaMinutos: (value: number) => void;
}

const SavingsCalculatorContext = createContext<SavingsCalculatorContextType | undefined>(undefined);

export const SavingsCalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [interaccionesDia, setInteraccionesDia] = useLocalStorage<number>('interaccionesDia', 15);
  const [precioHora, setPrecioHora] = useLocalStorage<number>('precioHora', 15);
  const [duracionMediaMinutos, setDuracionMediaMinutos] = useLocalStorage<number>('duracionMediaMinutos', 10);

  return (
    <SavingsCalculatorContext.Provider
      value={{
        interaccionesDia,
        setInteraccionesDia,
        precioHora,
        setPrecioHora,
        duracionMediaMinutos,
        setDuracionMediaMinutos,
      }}
    >
      {children}
    </SavingsCalculatorContext.Provider>
  );
};

export const useSavingsCalculator = () => {
  const context = useContext(SavingsCalculatorContext);
  if (context === undefined) {
    throw new Error('useSavingsCalculator must be used within a SavingsCalculatorProvider');
  }
  return context;
};
