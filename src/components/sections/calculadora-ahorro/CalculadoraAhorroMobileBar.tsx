import React from 'react';
import { Button } from "@/components/ui/button";

interface CalculadoraAhorroMobileBarProps {
  costeMensualActual: number;
  horasInvertidasMes: number;
  horasInvertidasAnual: number;
  formatoMoneda: Intl.NumberFormat;
  setShowResultsMobile: (show: boolean) => void;
  savingsCalculatorContent: any; // Define a more specific type if available
  ahorroAnualEstimado: number;
}

export const CalculadoraAhorroMobileBar: React.FC<CalculadoraAhorroMobileBarProps> = ({
  costeMensualActual,
  horasInvertidasMes,
  horasInvertidasAnual,
  formatoMoneda,
  setShowResultsMobile,
  savingsCalculatorContent,
  ahorroAnualEstimado,
}) => (
  <div className="fixed bottom-0 left-0 right-0 z-30 bg-blue-950/80 backdrop-blur border-t border-blue-400/30 px-4 py-3 flex lg:hidden items-center justify-between shadow-lg">
    <div className="flex flex-col">
      <span className="text-xs text-blue-100/90">{savingsCalculatorContent.resultsCardTitle}</span>
      <span className="text-lg font-bold text-blue-200">{formatoMoneda.format(ahorroAnualEstimado)}</span>
    </div>
    <div className="flex flex-col">
      <span className="text-xs text-blue-100/90">{savingsCalculatorContent.daysSavedLabel}</span>
      <span className="text-lg font-bold text-blue-200">{Math.round(horasInvertidasAnual / 8)}</span>
    </div>
    <Button onClick={() => setShowResultsMobile(true)} className="rounded-full border-blue-400 border-[1px] border-b-[0.5px] text-white/90 bg-transparent hover:bg-blue-400">{savingsCalculatorContent.showBreakdownButton}</Button>
  </div>
);