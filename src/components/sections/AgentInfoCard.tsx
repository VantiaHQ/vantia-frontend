"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAgentConfig } from '@/context/AgentConfigContext';

export const AgentInfoCard: React.FC = () => {
  const { agentConfig, setAgentCost, setIsAgentGenerated, setAgentConfiguration } = useAgentConfig();
  const { agentCost, isAgentGenerated, agentConfiguration } = agentConfig;

  const formatoMoneda = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  if (!isAgentGenerated) {
    return null; // Don't render if no agent is generated
  }

  const handleResetAgent = () => {
    setAgentCost(5200 / 12); // Reset to default monthly cost
    setIsAgentGenerated(false);
    setAgentConfiguration({}); // Clear agent configuration
  };

  // Assuming agentConfiguration contains a 'slug' or 'id' for the detailed page
  const agentSlug = agentConfiguration?.slug || 'default-agent'; // Fallback to a default slug

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-12 pt-12">
      <Card className="bg-gradient-to-br from-purple-950/60 to-purple-900/60 backdrop-blur rounded-3xl border border-purple-400/30 shadow-lg text-white/90 cursor-pointer">
        <Link href={`/agente/${agentSlug}`} passHref>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Tu Propuesta de Agente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Módulos Incluidos:</span>
              <span className="text-lg font-bold">{agentConfiguration?.modules || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Costo Mensual Asociado:</span>
              <span className="text-lg font-bold">{formatoMoneda.format(agentCost)}</span>
            </div>
            {/* Add more details from agentConfiguration as needed */}
          </CardContent>
        </Link>
      </Card>
      <div className="text-center mt-4">
        <Button variant="link" onClick={handleResetAgent} className="text-red-400 hover:text-red-500">
          Eliminar agente y crear uno nuevo
        </Button>
      </div>
    </div>
  );
};
