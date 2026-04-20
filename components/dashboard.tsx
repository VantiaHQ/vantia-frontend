"use client"

import { useEffect, useState } from "react"
import { Users, Link, MessageSquare, TrendingUp, Bot, RefreshCw, AlertCircle } from "lucide-react"
import { KpiCard } from "@/components/kpi-card"
import { LeadsChart } from "@/components/leads-chart"
import { CreditsFooter } from "@/components/credits-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchMetricasFromSupabase, type MetricasData } from "@/lib/metrics"

// ─── Tipos de datos ──────────────────────────────────────────────────────────

interface DashboardState {
  metrics: MetricasData | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

// ─────────────────────────────────────────────────────────────────────────────

export function Dashboard() {
  const [state, setState] = useState<DashboardState>({
    metrics: null,
    loading: true,
    error: null,
    lastUpdated: null,
  })

  const loadMetrics = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const data = await fetchMetricasFromSupabase()
      setState({
        metrics: data,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al cargar métricas"
      console.error("[v0] Dashboard error:", errorMessage)
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
    }
  }

  useEffect(() => {
    loadMetrics()
  }, [])

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md"
              style={{
                background: "oklch(0.68 0.15 185 / 0.15)",
                border: "1px solid oklch(0.68 0.15 185 / 0.3)",
              }}
            >
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-none text-foreground">
                Panel de Control IA
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">Camper Nordest</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {state.lastUpdated && (
              <span className="hidden text-xs text-muted-foreground sm:block">
                Actualizado: {state.lastUpdated.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={loadMetrics}
              disabled={state.loading}
              className="border-border bg-secondary text-foreground hover:bg-muted hover:text-foreground"
            >
              <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${state.loading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8 flex-1">
        {/* Section title */}
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-0.5 rounded-full"
            style={{ background: "oklch(0.68 0.15 185)" }}
          />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Resumen del Agente IA
          </h2>
        </div>

        {/* Error Alert */}
        {state.error && (
          <Card className="border-destructive bg-card">
            <CardContent className="p-4 flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Error al cargar métricas</p>
                <p className="text-xs text-muted-foreground mt-1">{state.error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* KPI Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {state.loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-lg border border-border bg-card"
              />
            ))
          ) : state.metrics ? (
            <>
              <KpiCard
                title="Leads Contactados"
                value={state.metrics.conversaciones_iniciadas}
                icon={Users}
                description="Conversaciones iniciadas por el agente"
              />
              <KpiCard
                title="Enlaces de Reunión"
                value={state.metrics.enlaces_enviados}
                icon={Link}
                description="Links de calendario enviados"
              />
              <KpiCard
                title="Mensajes Enviados"
                value={state.metrics.mensajes_enviados}
                icon={MessageSquare}
                description="Total de mensajes del agente"
              />
              <KpiCard
                title="Tasa de Conversión"
                value={`${state.metrics.tasa_conversion}%`}
                icon={TrendingUp}
                description="Enlaces / Leads"
                highlight
              />
            </>
          ) : null}
        </div>

        {/* Chart - Central position */}
        <LeadsChart />

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          Datos actualizados en tiempo real desde Supabase
        </p>
      </main>

      {/* Credits Footer */}
      {!state.loading && state.metrics && (
        <CreditsFooter
          creditosTotales={state.metrics.creditos_totales}
          creditosGastados={state.metrics.creditos_gastados}
          creditosDisponibles={state.metrics.creditos_disponibles}
        />
      )}
    </div>
  )
}
