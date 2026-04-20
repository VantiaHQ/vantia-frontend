import { type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface KpiCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  highlight?: boolean
}

export function KpiCard({ title, value, icon: Icon, description, highlight = false }: KpiCardProps) {
  return (
    <Card
      className="relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50"
      style={
        highlight
          ? { boxShadow: "0 0 24px -4px oklch(0.68 0.15 185 / 0.25)" }
          : {}
      }
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
            {description && (
              <span className="text-xs text-muted-foreground mt-1">{description}</span>
            )}
          </div>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "oklch(0.68 0.15 185 / 0.12)",
              border: "1px solid oklch(0.68 0.15 185 / 0.25)",
            }}
          >
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        {highlight && (
          <div
            className="absolute inset-x-0 bottom-0 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.68 0.15 185), transparent)" }}
          />
        )}
      </CardContent>
    </Card>
  )
}
