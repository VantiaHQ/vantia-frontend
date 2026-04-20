import { Zap, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CreditsCardProps {
  creditosTotales: number
  creditosGastados: number
  creditosDisponibles: number
}

export function CreditsCard({ creditosTotales, creditosGastados, creditosDisponibles }: CreditsCardProps) {
  // Calculate percentage
  const percentageUsed = creditosTotales > 0 ? (creditosGastados / creditosTotales) * 100 : 0
  const percentageAvailable = 100 - percentageUsed

  // Determine if in low credit state (less than 10%)
  const isLowCredit = percentageAvailable < 10

  // Determine bar color
  const barColor = isLowCredit ? "oklch(0.55 0.22 27)" : "oklch(0.68 0.15 185)"
  const barOpacity = isLowCredit ? 1 : 0.9

  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: isLowCredit ? "oklch(0.55 0.22 27 / 0.12)" : "oklch(0.68 0.15 185 / 0.12)",
                border: isLowCredit ? "1px solid oklch(0.55 0.22 27 / 0.25)" : "1px solid oklch(0.68 0.15 185 / 0.25)",
              }}
            >
              <Zap
                className="h-5 w-5"
                style={{ color: isLowCredit ? "oklch(0.55 0.22 27)" : "oklch(0.68 0.15 185)" }}
              />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Consumo de Créditos</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Gestión de saldo mensual</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-border bg-secondary text-foreground hover:bg-muted hover:text-foreground text-xs"
          >
            Recargar
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main metric display */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Créditos Disponibles</p>
            <p className="text-4xl font-bold tracking-tight text-foreground">{creditosDisponibles.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold" style={{ color: barColor }}>
              {percentageAvailable.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">disponibles</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden border border-border">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${percentageAvailable}%`,
                  background: barColor,
                  opacity: barOpacity,
                  boxShadow:
                    isLowCredit
                      ? "0 0 12px -2px oklch(0.55 0.22 27 / 0.4)"
                      : "0 0 12px -2px oklch(0.68 0.15 185 / 0.3)",
                }}
              />
            </div>
            {isLowCredit && (
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Has consumido <span className="font-semibold text-foreground">{creditosGastados.toLocaleString()}</span> de{" "}
            <span className="font-semibold text-foreground">{creditosTotales.toLocaleString()}</span> créditos este mes
          </p>
        </div>

        {/* Alert message if low credit */}
        {isLowCredit && (
          <div
            className="rounded-lg border p-3 flex gap-2"
            style={{
              background: "oklch(0.55 0.22 27 / 0.08)",
              borderColor: "oklch(0.55 0.22 27 / 0.25)",
            }}
          >
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">
              Tus créditos se están agotando. Considera recargar para evitar interrupciones en el servicio.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
