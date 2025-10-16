import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatoMoneda: Intl.NumberFormat;
  roiSummaryContent: any;
}

export const ROISummaryCardTooltip = ({ active, payload, label, formatoMoneda, roiSummaryContent }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-950/90 p-3 rounded-lg border border-blue-400/30 text-white text-sm shadow-lg">
        <p className="font-bold mb-1">{roiSummaryContent.tooltip.year} {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.name === roiSummaryContent.tooltip.cumulativeRoi ? `${entry.value}%` : formatoMoneda.format(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
