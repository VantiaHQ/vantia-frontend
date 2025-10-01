import React from 'react';

interface CalculadoraAhorroResultsProps {
  formatoMoneda: Intl.NumberFormat;
  costeMensualActual: number;
  horasInvertidasMes: number;
  horasInvertidasAnual: number;
  interaccionesMes: number;
  ahorroAnualEstimado: number;
  savingsCalculatorContent: any; // Define a more specific type if available
}

export const CalculadoraAhorroResults: React.FC<CalculadoraAhorroResultsProps> = ({
  formatoMoneda,
  costeMensualActual,
  horasInvertidasMes,
  horasInvertidasAnual,
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
      <p className="text-lg text-blue-100/90">{savingsCalculatorContent.daysSavedLabel}</p>
      <p className="text-5xl md:text-6xl font-extrabold tracking-tight">
        {Math.round(horasInvertidasAnual / 8)}{" "}
        <span className="text-4xl font-medium">{savingsCalculatorContent.daysUnit}</span>
      </p>
    </div>
    <div className="w-full pt-6 border-t border-blue-500/50">
      <h3 className="text-lg text-left font-semibold text-blue-100/90 mb-3">
        {savingsCalculatorContent.breakdownTitle}
      </h3>
      <div className="space-y-2 text-base text-blue-100/90">
        <div className="flex justify-between">
          <span>{savingsCalculatorContent.interactionsPerMonthLabel}</span>
          <span className="font-semibold">{Math.round(interaccionesMes)}</span>
        </div>
        <div className="flex justify-between">
          <span>{savingsCalculatorContent.hoursInvestedPerMonthLabel}</span>
          <span className="font-semibold">{Math.round(horasInvertidasMes)}</span>
        </div>
        <div className="flex justify-between">
          <span>{savingsCalculatorContent.monthlySavingsLabel}</span>
          <span className="font-semibold">{formatoMoneda.format(costeMensualActual)}</span>
        </div>
      </div>
    </div>
  </>
);