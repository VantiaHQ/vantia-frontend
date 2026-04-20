import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreditsFooterProps {
  creditosTotales: number
  creditosGastados: number
  creditosDisponibles: number
}

export function CreditsFooter({ creditosTotales, creditosGastados, creditosDisponibles }: CreditsFooterProps) {
  const percentageUsed = creditosTotales > 0 ? (creditosGastados / creditosTotales) * 100 : 0
  const percentageAvailable = 100 - percentageUsed
  const isLowCredit = percentageAvailable < 10
  const barColor = isLowCredit ? "oklch(0.55 0.22 27)" : "oklch(0.68 0.15 185)"

  return (
    <div className="border-t border-border bg-gradient-to-b from-background to-background/70">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side: Main Credits Card */}
          <div className="flex-1 w-full">
            <div
              className="relative rounded-xl border p-8 overflow-hidden"
              style={{
                background: isLowCredit
                  ? "linear-gradient(135deg, oklch(0.55 0.22 27 / 0.1) 0%, oklch(0.55 0.22 27 / 0.05) 100%)"
                  : "linear-gradient(135deg, oklch(0.68 0.15 185 / 0.08) 0%, oklch(0.68 0.15 185 / 0.03) 100%)",
                borderColor: isLowCredit
                  ? "oklch(0.55 0.22 27 / 0.3)"
                  : "oklch(0.68 0.15 185 / 0.2)",
              }}
            >
              {/* Background glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-20"
                style={{
                  background: isLowCredit
                    ? "radial-gradient(circle at top right, oklch(0.55 0.22 27 / 0.3), transparent 70%)"
                    : "radial-gradient(circle at top right, oklch(0.68 0.15 185 / 0.2), transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div className="relative flex items-center justify-between gap-6">
                {/* Icon and label */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg shrink-0"
                    style={{
                      background: isLowCredit
                        ? "oklch(0.55 0.22 27 / 0.15)"
                        : "oklch(0.68 0.15 185 / 0.15)",
                      border: isLowCredit
                        ? "1px solid oklch(0.55 0.22 27 / 0.3)"
                        : "1px solid oklch(0.68 0.15 185 / 0.3)",
                      boxShadow: isLowCredit
                        ? "0 0 12px oklch(0.55 0.22 27 / 0.2)"
                        : "0 0 12px oklch(0.68 0.15 185 / 0.15)",
                    }}
                  >
                    <Zap
                      className="h-6 w-6"
                      style={{ color: isLowCredit ? "oklch(0.55 0.22 27)" : "oklch(0.68 0.15 185)" }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Créditos Disponibles
                    </p>
                  </div>
                </div>

                {/* Main KPI number */}
                <div className="text-right">
                  <p className="text-5xl font-bold text-foreground">
                    {creditosDisponibles.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {percentageAvailable.toFixed(1)}% disponible este mes
                  </p>
                </div>
              </div>

              {/* Progress bar - Full width */}
              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Consumo mensual</span>
                  <span className="text-xs font-medium text-foreground">
                    {creditosGastados.toLocaleString()} / {creditosTotales.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden border border-border">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percentageUsed}%`,
                      background: barColor,
                      boxShadow: isLowCredit
                        ? "0 0 16px -2px oklch(0.55 0.22 27 / 0.5)"
                        : "0 0 12px -2px oklch(0.68 0.15 185 / 0.4)",
                    }}
                  />
                </div>
              </div>

              {/* Alert message if low credit */}
              {isLowCredit && (
                <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                  ⚠ Tus créditos se están agotando. Recarga pronto para evitar interrupciones en tu servicio.
                </div>
              )}
            </div>
          </div>

          {/* Right side: Button and info */}
          <div className="flex flex-col items-stretch gap-4 w-full lg:w-auto lg:items-end">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8"
            >
              <Zap className="h-4 w-4 mr-2" />
              Recargar Créditos
            </Button>
            <p className="text-xs text-muted-foreground text-center lg:text-right">
              Saldo se reinicia mensualmente
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
