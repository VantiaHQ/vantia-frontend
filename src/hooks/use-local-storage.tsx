"use client";

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key); // Re-introduced
      const stored = item ? JSON.parse(item) : initialValue;
      if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
        // Sanitize numeric properties to ensure they are numbers and not NaN
        const sanitizedStored = { ...stored };
        if (typeof sanitizedStored.agentCost === 'number' && isNaN(sanitizedStored.agentCost)) {
          sanitizedStored.agentCost = 0;
        }
        if (typeof sanitizedStored.initialAgentPayment === 'number' && isNaN(sanitizedStored.initialAgentPayment)) {
          sanitizedStored.initialAgentPayment = 0;
        }
        if (typeof sanitizedStored.annualAgentPayment === 'number' && isNaN(sanitizedStored.annualAgentPayment)) {
          sanitizedStored.annualAgentPayment = 0;
        }
        // Also sanitize monthlyPrice and initialCost within selectedModules if they exist
        if (Array.isArray(sanitizedStored.selectedModules)) {
          sanitizedStored.selectedModules = sanitizedStored.selectedModules.map((module: any) => {
            const sanitizedModule = { ...module };
            if (typeof sanitizedModule.monthlyPrice === 'number' && isNaN(sanitizedModule.monthlyPrice)) {
              sanitizedModule.monthlyPrice = 0;
            }
            if (typeof sanitizedModule.initialCost === 'number' && isNaN(sanitizedModule.initialCost)) {
              sanitizedModule.initialCost = 0;
            }
            return sanitizedModule;
          });
        }
        return sanitizedStored;
      }
      return stored;
    } catch (error) {
      console.error(`useLocalStorage: Error parsing item for key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
