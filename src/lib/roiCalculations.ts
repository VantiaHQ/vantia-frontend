import { ROI_YEARS } from "./constants";

interface RoiDataPoint {
  year: number;
  costeAcumulado: number;
  ahorroAcumulado: number;
  roiAcumulado: number;
}

export function calculateRoiData(
  ahorroAnualEstimado: number,
  initialAgentPayment: number,
  annualAgentPayment: number
): RoiDataPoint[] {
  const data: RoiDataPoint[] = [];
  let costeAcumulado = 0;
  let ahorroAcumulado = 0;

  for (let year = 1; year <= ROI_YEARS; year++) {
    if (year === 1) {
      costeAcumulado = initialAgentPayment + annualAgentPayment;
    } else {
      costeAcumulado += annualAgentPayment;
    }
    ahorroAcumulado += ahorroAnualEstimado;

    const roi = ((ahorroAcumulado - costeAcumulado) / costeAcumulado) * 100;

    data.push({
      year,
      costeAcumulado: Math.round(costeAcumulado),
      ahorroAcumulado: Math.round(ahorroAcumulado),
      roiAcumulado: parseFloat(roi.toFixed(1)),
    });
  }
  return data;
}
