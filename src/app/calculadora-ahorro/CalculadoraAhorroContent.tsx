"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';
import { savingsCalculatorContent } from './content';

// Import new components
import { CalculadoraAhorroResults } from '@/components/calculadora-ahorro/CalculadoraAhorroResults';
import { CalculadoraAhorroParameters } from '@/components/calculadora-ahorro/CalculadoraAhorroParameters';
import { CalculadoraAhorroMobileBar } from '@/components/calculadora-ahorro/CalculadoraAhorroMobileBar';
import { CalculadoraAhorroMobileResultsModal } from '@/components/calculadora-ahorro/CalculadoraAhorroMobileResultsModal';

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
  const ahorroAnualEstimado = costeMensualActual * 12;

  // Formateadores para una bonita visualización
  const formatoMoneda = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-12 pt-12">
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
          <CalculadoraAhorroParameters
            interaccionesDia={interaccionesDia}
            setInteraccionesDia={setInteraccionesDia}
            precioHora={precioHora}
            setPrecioHora={setPrecioHora}
            duracionMedia={duracionMedia}
            setDuracionMedia={setDuracionMedia}
            formatoMoneda={formatoMoneda}
            savingsCalculatorContent={savingsCalculatorContent}
          />

          {/* Columna de Resultados (Desktop) */}
                    <SpotlightCard className="custom-spotlight-card bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 shadow-lg text-white/90 hidden lg:flex flex-col" spotlightColor="rgba(96, 165, 250, 0.2)">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              {savingsCalculatorContent.resultsCardTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 text-center flex-1">
            <CalculadoraAhorroResults
                formatoMoneda={formatoMoneda}
                costeMensualActual={costeMensualActual}
                horasInvertidasMes={horasInvertidasMes}
                interaccionesMes={interaccionesMes}
                ahorroAnualEstimado={ahorroAnualEstimado}
                savingsCalculatorContent={savingsCalculatorContent}
              />
          </CardContent>
        </SpotlightCard>
        </div>
      </div>

      {/* Bottom Bar (Mobile) */}
      <CalculadoraAhorroMobileBar
        costeMensualActual={costeMensualActual}
        horasInvertidasMes={horasInvertidasMes}
        formatoMoneda={formatoMoneda}
        setShowResultsMobile={setShowResultsMobile}
        savingsCalculatorContent={savingsCalculatorContent}
      />

      {/* Modal de Resultados (Mobile) */}
      <CalculadoraAhorroMobileResultsModal
        showResultsMobile={showResultsMobile}
        setShowResultsMobile={setShowResultsMobile}
        savingsCalculatorContent={savingsCalculatorContent}
        formatoMoneda={formatoMoneda}
        costeMensualActual={costeMensualActual}
        horasInvertidasMes={horasInvertidasMes}
        interaccionesMes={interaccionesMes}
        ahorroAnualEstimado={ahorroAnualEstimado}
      />
    </>
  );
}