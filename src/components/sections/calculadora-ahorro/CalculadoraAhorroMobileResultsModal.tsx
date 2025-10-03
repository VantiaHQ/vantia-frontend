import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { CalculadoraAhorroResults } from './CalculadoraAhorroResults'; // Import the new component
/*CalculadoraAhorroContent is in app/calculadora/ahorro*/
import CalculadoraAhorroContent from '@/app/calculadora-ahorro/CalculadoraAhorroContent';
import { ROISummaryCard } from '@/components/sections/calculadora-ahorro/ROISummaryCard';
import Link from 'next/link'; // Import Link for the CTA

interface CalculadoraAhorroMobileResultsModalProps {
  showResultsMobile: boolean;
  setShowResultsMobile: (show: boolean) => void;
  savingsCalculatorContent: any; // Define a more specific type if available
  formatoMoneda: Intl.NumberFormat;
  costeMensualActual: number;
  horasInvertidasMes: number;
  interaccionesMes: number;
  ahorroAnualEstimado: number;
  horasInvertidasAnual: number;
}

export const CalculadoraAhorroMobileResultsModal: React.FC<CalculadoraAhorroMobileResultsModalProps> = ({
  showResultsMobile,
  setShowResultsMobile,
  savingsCalculatorContent,
  formatoMoneda,
  costeMensualActual,
  horasInvertidasMes,
  interaccionesMes,
  ahorroAnualEstimado,
  horasInvertidasAnual,
}) => {
  if (!showResultsMobile) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity" onClick={() => setShowResultsMobile(false)} />
      <div className="w-full max-w-md bg-blue-950/80 backdrop-blur rounded-t-2xl border border-blue-400/30 border-b-0 p-6 shadow-lg animate-fadeInUp relative z-50">
        <div className="flex justify-end items-center mb-0">
          <Button variant="ghost" size="sm" onClick={() => setShowResultsMobile(false)}><X className="h-6 w-6" /></Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <CalculadoraAhorroResults
            formatoMoneda={formatoMoneda}
            costeMensualActual={costeMensualActual}
            horasInvertidasMes={horasInvertidasMes}
            horasInvertidasAnual={horasInvertidasAnual}
            interaccionesMes={interaccionesMes}
            ahorroAnualEstimado={ahorroAnualEstimado}
            savingsCalculatorContent={savingsCalculatorContent}
          />
        </div>

      </div>
    </div>
  );
};