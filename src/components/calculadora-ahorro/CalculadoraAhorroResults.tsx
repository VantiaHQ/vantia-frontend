import React from 'react';

interface CalculadoraAhorroResultsProps {
  formatoMoneda: Intl.NumberFormat;
  costeMensualActual: number;
  horasInvertidasMes: number;
  interaccionesMes: number;
  ahorroAnualEstimado: number;
  savingsCalculatorContent: any; // Define a more specific type if available
}

export const CalculadoraAhorroResults: React.FC<CalculadoraAhorroResultsProps> = ({
  formatoMoneda,
  costeMensualActual,
  horasInvertidasMes,
  interaccionesMes,
  ahorroAnualEstimado,
  savingsCalculatorContent,
}) => (
  <>
    <div className="w-full">
      <p className="text-lg text-blue-100/90">{savingsCalculatorContent.resultsCardTitle}</p>
      <p className="text-5xl md:text-6xl font-extrabold tracking-tight">
        {formatoMoneda.format(ahorroAnualEstimado)}
      </p>
    </div>
    <div className="w-full">
      <p className="text-lg text-blue-100/90">{savingsCalculatorContent.hoursSavedLabel}</p>
      <p className="text-5xl md:text-6xl font-extrabold tracking-tight">
        {Math.round(horasInvertidasMes)}{" "}
        <span className="text-4xl font-medium">{savingsCalculatorContent.hoursUnit}</span>
      </p>
    </div>
    <div className="w-full pt-6 border-t border-blue-500/50">
      <h3 className="text-lg text-left font-semibold text-blue-100/90 mb-3">
        {savingsCalculatorContent.breakdownTitle}
      </h3>
      <div className="space-y-2 text-base text-blue-100/90">
        <div className="flex justify-between">
          <span>{savingsCalculatorContent.interactionsPerMonthLabel}</span>
          <span className="font-semibold">{interaccionesMes}</span>
        </div>
        <div className="flex justify-between">
          <span>{savingsCalculatorContent.hoursInvestedPerMonthLabel}</span>
          <span className="font-semibold">{horasInvertidasMes}</span>
        </div>
        <div className="flex justify-between">
          <span>{savingsCalculatorContent.monthlySavingsLabel}</span>
          <span className="font-semibold">{formatoMoneda.format(costeMensualActual)}</span>
        </div>
      </div>
    </div>
  </>
);