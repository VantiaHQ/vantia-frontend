"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';
import { savingsCalculatorContent } from './content';

export default function CalculadoraAhorroContent() {
  const [interaccionesDia, setInteraccionesDia] = useState(15);
  const [precioHora, setPrecioHora] = useState(25);
  const [duracionMedia, setDuracionMedia] = useState(10);
  const [showResultsMobile, setShowResultsMobile] = useState(false);

  // Cálculos
  const diasLaboralesMes = 22;
  const interaccionesMes = interaccionesDia * diasLaboralesMes;
  const horasInvertidasMes = (interaccionesMes * duracionMedia) / 60;
  const costeMensualActual = horasInvertidasMes * precioHora;

  // Formateadores para una bonita visualización
  const formatoMoneda = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const ResultsCardContent = () => (
    <>
      <div className="w-full">
        <p className="text-lg text-blue-100/90">{savingsCalculatorContent.moneySavedLabel}</p>
        <p className="text-5xl md:text-6xl font-extrabold tracking-tight">
          {formatoMoneda.format(costeMensualActual)}
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
            <span className="font-semibold">{Math.round(horasInvertidasMes)}h</span>
          </div>
          <div className="flex justify-between">
            <span>{savingsCalculatorContent.currentMonthlyCostLabel}</span>
            <span className="font-semibold">{formatoMoneda.format(costeMensualActual)}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-12 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white/90/90">
            {savingsCalculatorContent.title}
          </h1>
          <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
            {savingsCalculatorContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-28 lg:pb-0">
          {/* Columna de Parámetros */}
          <Card className="bg-gradient-to-br from-blue-950/60 to-blue-900/60 backdrop-blur rounded-3xl border border-blue-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white/90">
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
            </CardContent>
          </Card>

          {/* Columna de Resultados (Desktop) */}
                    <SpotlightCard className="custom-spotlight-card bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 shadow-lg text-white/90 hidden lg:flex flex-col" spotlightColor="rgba(96, 165, 250, 0.2)">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              {savingsCalculatorContent.resultsCardTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 text-center flex-1">
            <ResultsCardContent />
          </CardContent>
        </SpotlightCard>
        </div>
      </div>

      {/* Bottom Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-blue-950/80 backdrop-blur border-t border-blue-400/30 px-4 py-3 flex lg:hidden items-center justify-between shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs text-blue-100/90">{savingsCalculatorContent.moneySavedLabel}</span>
          <span className="text-lg font-bold text-blue-200">{formatoMoneda.format(costeMensualActual)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-blue-100/90">{savingsCalculatorContent.hoursSavedLabel}</span>
          <span className="text-lg font-bold text-blue-200">{Math.round(horasInvertidasMes)}h</span>
        </div>
        <Button onClick={() => setShowResultsMobile(true)} className="rounded-full border-blue-400 border-[1px] border-b-[0.5px] text-white/90 bg-transparent hover:bg-blue-400">{savingsCalculatorContent.showBreakdownButton}</Button>
      </div>

      {/* Modal de Resultados (Mobile) */}
      {showResultsMobile && (
        <div className="fixed inset-0 z-40 flex items-end justify-center lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity" onClick={() => setShowResultsMobile(false)} />
          <div className="w-full max-w-md bg-blue-950/80 backdrop-blur rounded-t-2xl border border-blue-400/30 border-b-0 p-6 shadow-lg animate-fadeInUp relative z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-light text-white/70">{savingsCalculatorContent.mobileModalTitle}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowResultsMobile(false)}><X className="h-6 w-6" /></Button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <ResultsCardContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}