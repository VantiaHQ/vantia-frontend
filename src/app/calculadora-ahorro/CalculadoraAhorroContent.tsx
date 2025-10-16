"use client";

import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import SpotlightCard from '@/components/SpotlightCard';
import { savingsCalculatorContent } from '@/components/calculadora-ahorro/CalculadoraAhorro.content';
import { WORKING_DAYS_PER_MONTH } from '@/lib/constants';
import { DEFAULT_INITIAL_PAYMENT, DEFAULT_ANNUAL_RECURRING_PAYMENT } from '@/lib/pricing';

// Import new components
import { CalculadoraAhorroResults } from '@/components/calculadora-ahorro/CalculadoraAhorroResults';
import { CalculadoraAhorroParameters } from '@/components/calculadora-ahorro/CalculadoraAhorroParameters';
import { CalculadoraAhorroMobileBar } from '@/components/calculadora-ahorro/CalculadoraAhorroMobileBar';
import { CalculadoraAhorroMobileResultsModal } from '@/components/calculadora-ahorro/CalculadoraAhorroMobileResultsModal';
import { ROISummaryCard } from '@/components/calculadora-ahorro/ROISummaryCard';

const formatoMoneda = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function CalculadoraAhorroContent() {
  const [interaccionesDia, setInteraccionesDia] = useState(15);
  const [precioHora, setPrecioHora] = useState(15);
  const [duracionMediaMinutos, setduracionMediaMinutos] = useState(10);
  const [showResultsMobile, setShowResultsMobile] = useState(false);

  const diasLaboralesMes = WORKING_DAYS_PER_MONTH;
  const interaccionesMes = interaccionesDia * diasLaboralesMes;
  const horasInvertidasMes = (interaccionesMes * duracionMediaMinutos) / 60;
  const costeMensualActual = horasInvertidasMes * precioHora;
  const ahorroAnualEstimado = costeMensualActual * 12;
  const horasInvertidasAnual = horasInvertidasMes * 12;
  const initialAgentPayment = DEFAULT_INITIAL_PAYMENT;

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-12 pt-12">
        <div className="text-center mb-10">
          <h1 className="text-md uppercase tracking-widest font-light text-blue-300/60">
            {savingsCalculatorContent.title}
          </h1>
          <p className="mt-3 text-md text-foreground/80 max-w-2xl mx-auto">
            {savingsCalculatorContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-28 lg:pb-0">
          {/* Parameters Column */}
          <CalculadoraAhorroParameters
            interaccionesDia={interaccionesDia}
            setInteraccionesDia={setInteraccionesDia}
            precioHora={precioHora}
            setPrecioHora={setPrecioHora}
            duracionMediaMinutos={duracionMediaMinutos}
            setduracionMediaMinutos={setduracionMediaMinutos}
            formatoMoneda={formatoMoneda}
            savingsCalculatorContent={savingsCalculatorContent}
          />

          {/* Parameters Column (Desktop) */}
          <SpotlightCard className="custom-spotlight-card bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 shadow-lg text-white/90 hidden lg:flex flex-col" spotlightColor="rgba(96, 165, 250, 0.2)">

          <CardContent className="flex flex-col items-center justify-center space-y-6 text-center flex-1">
            <CalculadoraAhorroResults
                formatoMoneda={formatoMoneda}
                costeMensualActual={costeMensualActual}
                horasInvertidasMes={horasInvertidasMes}
                horasInvertidasAnual={horasInvertidasAnual}
                interaccionesMes={interaccionesMes}
                ahorroAnualEstimado={ahorroAnualEstimado}
                savingsCalculatorContent={savingsCalculatorContent}
              />
          </CardContent>
        </SpotlightCard>
        </div>

        {/* ROI Summary Card (Desktop) */}
        <div className="mt-8 hidden lg:flex">
          <ROISummaryCard
            ahorroAnualEstimado={ahorroAnualEstimado}
            horasInvertidasAnual={horasInvertidasAnual}
            formatoMoneda={formatoMoneda}
            initialAgentPayment={initialAgentPayment}
            annualAgentPayment={DEFAULT_ANNUAL_RECURRING_PAYMENT}
          />
        </div>
      </div>

      {/* Bottom Bar (Mobile) */}
      <CalculadoraAhorroMobileBar
        costeMensualActual={costeMensualActual}
        horasInvertidasMes={horasInvertidasMes}
        horasInvertidasAnual={horasInvertidasAnual}
        ahorroAnualEstimado={ahorroAnualEstimado}
        formatoMoneda={formatoMoneda}
        setShowResultsMobile={setShowResultsMobile}
        savingsCalculatorContent={savingsCalculatorContent}
      />

      {/* Results Modal (Mobile) */}
      <CalculadoraAhorroMobileResultsModal
        showResultsMobile={showResultsMobile}
        setShowResultsMobile={setShowResultsMobile}
        savingsCalculatorContent={savingsCalculatorContent}
        formatoMoneda={formatoMoneda}
        costeMensualActual={costeMensualActual}
        horasInvertidasMes={horasInvertidasMes}
        interaccionesMes={interaccionesMes}
        ahorroAnualEstimado={ahorroAnualEstimado}
        horasInvertidasAnual={horasInvertidasAnual}
      />
    </>
  );
}