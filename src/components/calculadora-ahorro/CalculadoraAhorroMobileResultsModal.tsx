import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { CalculadoraAhorroResults } from './CalculadoraAhorroResults'; // Import the new component

interface CalculadoraAhorroMobileResultsModalProps {
  showResultsMobile: boolean;
  setShowResultsMobile: (show: boolean) => void;
  savingsCalculatorContent: any; // Define a more specific type if available
  formatoMoneda: Intl.NumberFormat;
  costeMensualActual: number;
  horasInvertidasMes: number;
  interaccionesMes: number;
}

export const CalculadoraAhorroMobileResultsModal: React.FC<CalculadoraAhorroMobileResultsModalProps> = ({
  showResultsMobile,
  setShowResultsMobile,
  savingsCalculatorContent,
  formatoMoneda,
  costeMensualActual,
  horasInvertidasMes,
  interaccionesMes,
}) => {
  if (!showResultsMobile) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity" onClick={() => setShowResultsMobile(false)} />
      <div className="w-full max-w-md bg-blue-950/80 backdrop-blur rounded-t-2xl border border-blue-400/30 border-b-0 p-6 shadow-lg animate-fadeInUp relative z-50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-light text-white/70">{savingsCalculatorContent.mobileModalTitle}</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowResultsMobile(false)}><X className="h-6 w-6" /></Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <CalculadoraAhorroResults
            formatoMoneda={formatoMoneda}
            costeMensualActual={costeMensualActual}
            horasInvertidasMes={horasInvertidasMes}
            interaccionesMes={interaccionesMes}
            savingsCalculatorContent={savingsCalculatorContent}
          />
        </div>
      </div>
    </div>
  );
};