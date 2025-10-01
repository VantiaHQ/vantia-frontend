import React from 'react';
import { Instrument_Serif } from 'next/font/google';
import { Slider } from "@/components/ui/slider";

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
});
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAgentConfig } from '@/context/AgentConfigContext';

interface CalculadoraAhorroParametersProps {
  interaccionesDia: number;
  setInteraccionesDia: (value: number) => void;
  precioHora: number;
  setPrecioHora: (value: number) => void;
  duracionMedia: number;
  setDuracionMedia: (value: number) => void;
  formatoMoneda: Intl.NumberFormat;
  savingsCalculatorContent: any; // Define a more specific type if available
}

export const CalculadoraAhorroParameters: React.FC<CalculadoraAhorroParametersProps> = ({
  interaccionesDia,
  setInteraccionesDia,
  precioHora,
  setPrecioHora,
  duracionMedia,
  setDuracionMedia,
  formatoMoneda,
  savingsCalculatorContent,
}) => {
  const { agentConfig } = useAgentConfig();
  const displayAgentCost = agentConfig.isAgentGenerated ? agentConfig.agentCost : 0; // Assuming 0 as base cost

  return (
  <Card className="bg-gradient-to-br from-blue-950/60 to-blue-900/60 backdrop-blur rounded-3xl border border-blue-400/30 shadow-lg">
    <CardHeader>
      <CardTitle className={`text-5xl md:text-7xl font-thin text-blue-400/90 ${instrumentSerif.className}`}>
        {savingsCalculatorContent.cardTitle}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-8 pt-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="interacciones" className="text-base font-medium text-blue-100/90">
            {savingsCalculatorContent.interactionsPerDayLabel}
          </Label>
          <span className="text-lg font-bold text-blue-200">
            {interaccionesDia}
          </span>
        </div>
        <Slider
          id="interacciones"
          value={[interaccionesDia]}
          onValueChange={(value) => setInteraccionesDia(value[0])}
          min={1}
          max={50}
          step={1}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="precio" className="text-base font-medium text-blue-100/90">
            {savingsCalculatorContent.pricePerHourLabel}
          </Label>
          <span className="text-lg font-bold text-blue-200">
            {formatoMoneda.format(precioHora)}
          </span>
        </div>
        <Slider
          id="precio"
          value={[precioHora]}
          onValueChange={(value) => setPrecioHora(value[0])}
          min={1}
          max={50}
          step={1}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="duracion" className="text-base font-medium text-blue-100/90">
            {savingsCalculatorContent.averageDurationLabel}
          </Label>
          <span className="text-lg font-bold text-blue-200">
            {duracionMedia} {savingsCalculatorContent.minutesUnit}
          </span>
        </div>
        <Slider
          id="duracion"
          value={[duracionMedia]}
          onValueChange={(value) => setDuracionMedia(value[0])}
          min={1}
          max={60}
          step={1}
        />
      </div>

      {/* Agent Cost Display */}
      <div className="space-y-3 pt-4 border-t border-blue-500/50">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium text-blue-100/90">
            {savingsCalculatorContent.estimatedAnnualCostLabel}
          </Label>
          <span className="text-lg font-bold text-blue-200">
            {formatoMoneda.format(displayAgentCost)}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);