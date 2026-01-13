import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "primary" | "success" | "warning" | "destructive"
}

export function StatsCard({ title, value, description, icon: Icon, trend, variant = "default" }: StatsCardProps) {
  const iconColors = {
    default: "dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-800 dark:text-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700",
    primary: "dark:bg-gradient-to-br dark:from-blue-600 dark:to-blue-700 dark:text-white bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700",
    success: "dark:bg-gradient-to-br dark:from-green-600 dark:to-emerald-700 dark:text-white bg-gradient-to-br from-green-100 to-green-200 text-green-700",
    warning: "dark:bg-gradient-to-br dark:from-amber-600 dark:to-yellow-700 dark:text-white bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700",
    destructive: "dark:bg-gradient-to-br dark:from-red-600 dark:to-rose-700 dark:text-white bg-gradient-to-br from-red-100 to-red-200 text-red-700",
  }

  const borderColors = {
    default: "dark:border-slate-700/50 border-slate-200",
    primary: "dark:border-blue-600/30 border-blue-200",
    success: "dark:border-green-600/30 border-green-200",
    warning: "dark:border-amber-600/30 border-amber-200",
    destructive: "dark:border-red-600/30 border-red-200",
  }

  return (
    <Card className={cn(`border-2 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900/40 bg-white dark:backdrop-blur-xl dark:hover:bg-slate-900/60 hover:shadow-lg hover:-translate-y-1`, borderColors[variant])}>
      <CardContent className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={cn("text-sm font-semibold uppercase tracking-wide dark:text-slate-400 text-slate-600")}>{title}</p>
            <p className={cn("mt-3 text-4xl font-bold dark:text-white text-gray-900")}>{value}</p>
            {description && <p className={cn("mt-2 text-sm dark:text-slate-400 text-gray-600")}>{description}</p>}
            {trend && (
              <p className={cn("mt-3 text-sm font-semibold flex items-center gap-1", trend.value >= 0 ? "dark:text-green-400 text-green-600" : "dark:text-red-400 text-red-600")}>
                <span className={cn("inline-block transition-transform", trend.value >= 0 ? "" : "rotate-180")}>↑</span>
                {Math.abs(trend.value)}% {trend.label}
              </p>
            )}
          </div>
          <div className={cn("flex h-16 w-16 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-3", iconColors[variant])}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
