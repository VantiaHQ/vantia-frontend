import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateRoiData } from '@/lib/roiCalculations';
import { ROISummaryCardTooltip } from './ROISummaryCardTooltip';

interface ROISummaryCardProps {
  ahorroAnualEstimado: number;
  horasInvertidasAnual: number;
  formatoMoneda: Intl.NumberFormat;
  initialAgentPayment: number;
  annualAgentPayment: number;
  roiSummaryContent: any;
}

export const ROISummaryCard: React.FC<ROISummaryCardProps> = ({
  ahorroAnualEstimado,
  formatoMoneda,
  initialAgentPayment,
  annualAgentPayment,
  roiSummaryContent,
}) => {
  
  const roiData = useMemo(() => {
    return calculateRoiData(ahorroAnualEstimado, initialAgentPayment, annualAgentPayment);
  }, [ahorroAnualEstimado, initialAgentPayment, annualAgentPayment]);

  return (
    <Card className="bg-gradient-to-br from-blue-950/60 to-navy-700/90 backdrop-blur rounded-3xl border border-blue-400/30 shadow-lg text-white/90">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          {roiSummaryContent.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6 text-center flex-1">
        <div className="space-y-2 text-base text-blue-100/90 w-full lg:w-1/2">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b border-blue-500/50">
                  <th className="py-2 px-4">{roiSummaryContent.tableHeaders.year}</th>
                  <th className="py-2 px-4">{roiSummaryContent.tableHeaders.cumulativeCost}</th>
                  <th className="py-2 px-4">{roiSummaryContent.tableHeaders.cumulativeSavings}</th>
                  <th className="py-2 px-4">{roiSummaryContent.tableHeaders.cumulativeRoi}</th>
                </tr>
              </thead>
              <tbody>
                {roiData.map((row) => (
                  <tr key={row.year} className="border-b border-blue-500/20 last:border-b-0">
                    <td className="py-2 px-4">{row.year}</td>
                    <td className="py-2 px-4">{formatoMoneda.format(row.costeAcumulado)}</td>
                    <td className="py-2 px-4">{formatoMoneda.format(row.ahorroAcumulado)}</td>
                    <td className="py-2 px-4">{row.roiAcumulado}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full h-64 lg:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roiData} margin={{ top: 24, right: 32, left: 32, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3B82F6" />
              <XAxis dataKey="year" stroke="#BFDBFE" />
              <YAxis stroke="#BFDBFE" tickFormatter={(value) => formatoMoneda.format(value)} />
              <Tooltip content={<ROISummaryCardTooltip formatoMoneda={formatoMoneda} roiSummaryContent={roiSummaryContent} />} cursor={false} />
              <Bar dataKey="ahorroAcumulado" fill="#60A5FA" name={roiSummaryContent.barNames.cumulativeSavings} />
              <Bar dataKey="costeAcumulado" fill="#80859A" name={roiSummaryContent.barNames.cumulativeCost} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
