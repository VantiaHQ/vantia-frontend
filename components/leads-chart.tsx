"use client"

import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { fetchActivityLast30Days, type MonthlyActivityData } from "@/lib/leads"

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg border border-border px-3 py-2 text-sm shadow-lg space-y-1"
        style={{ background: "oklch(0.17 0.006 220)" }}
      >
        <p className="text-muted-foreground font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function LeadsChart() {
  const [monthlyData, setMonthlyData] = useState<MonthlyActivityData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleSeries, setVisibleSeries] = useState<Set<string>>(new Set(["conversaciones", "mensajes"]))

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchActivityLast30Days()
        setMonthlyData(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error al cargar datos"
        console.error("[v0] Failed to load activity chart:", errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calculate dynamic Y-axis domain
  const maxValue = Math.max(...monthlyData.flatMap((d) => [d.conversaciones, d.mensajes]), 0)
  const yAxisMax = Math.max(maxValue * 1.2, 5)

  // Handle legend click to toggle series visibility
  const handleLegendClick = (e: any) => {
    const newVisible = new Set(visibleSeries)
    if (newVisible.has(e.dataKey)) {
      newVisible.delete(e.dataKey)
    } else {
      newVisible.add(e.dataKey)
    }
    setVisibleSeries(newVisible)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">Evolución de Actividad</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Últimos 30 días — conversaciones y mensajes por el Agente IA
            </CardDescription>
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              background: "oklch(0.68 0.15 185 / 0.12)",
              color: "oklch(0.68 0.15 185)",
              border: "1px solid oklch(0.68 0.15 185 / 0.25)",
            }}
          >
            Este mes
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        {loading ? (
          <div className="h-56 animate-pulse rounded-lg bg-secondary" />
        ) : error ? (
          <div className="flex items-center justify-center h-56 text-sm text-muted-foreground">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 20 }}>
              <defs>
                <linearGradient id="conversacionesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.68 0.15 185)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="oklch(0.68 0.15 185)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mensajesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.04 220)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="oklch(0.72 0.04 220)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.008 220)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "oklch(0.58 0.01 220)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "oklch(0.58 0.01 220)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                domain={[0, yAxisMax]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(0.68 0.15 185 / 0.3)", strokeWidth: 1 }} />
              <Legend
                wrapperStyle={{ paddingTop: "16px", cursor: "pointer" }}
                iconType="line"
                onClick={handleLegendClick}
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    conversaciones: "Conversaciones Iniciadas",
                    mensajes: "Mensajes Enviados",
                  }
                  return labels[value] || value
                }}
              />
              {visibleSeries.has("conversaciones") && (
                <Area
                  type="monotone"
                  dataKey="conversaciones"
                  stroke="oklch(0.68 0.15 185)"
                  strokeWidth={2.5}
                  fill="url(#conversacionesFill)"
                  dot={{ fill: "oklch(0.68 0.15 185)", r: 4, strokeWidth: 0 }}
                  activeDot={{ fill: "oklch(0.68 0.15 185)", r: 6, strokeWidth: 0 }}
                  name="conversaciones"
                />
              )}
              {visibleSeries.has("mensajes") && (
                <Area
                  type="monotone"
                  dataKey="mensajes"
                  stroke="oklch(0.72 0.04 220)"
                  strokeWidth={2.5}
                  fill="url(#mensajesFill)"
                  dot={{ fill: "oklch(0.72 0.04 220)", r: 4, strokeWidth: 0 }}
                  activeDot={{ fill: "oklch(0.72 0.04 220)", r: 6, strokeWidth: 0 }}
                  name="mensajes"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
