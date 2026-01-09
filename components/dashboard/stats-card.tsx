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
  isDarkMode?: boolean
}

export function StatsCard({ title, value, description, icon: Icon, trend, variant = "default", isDarkMode = true }: StatsCardProps) {
  const iconColors = {
    default: isDarkMode ? "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-300" : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700",
    primary: isDarkMode ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white" : "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700",
    success: isDarkMode ? "bg-gradient-to-br from-green-600 to-emerald-700 text-white" : "bg-gradient-to-br from-green-100 to-green-200 text-green-700",
    warning: isDarkMode ? "bg-gradient-to-br from-amber-600 to-yellow-700 text-white" : "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700",
    destructive: isDarkMode ? "bg-gradient-to-br from-red-600 to-rose-700 text-white" : "bg-gradient-to-br from-red-100 to-red-200 text-red-700",
  }

  const borderColors = {
    default: isDarkMode ? "border-slate-700/50" : "border-slate-300",
    primary: isDarkMode ? "border-blue-600/30" : "border-blue-200",
    success: isDarkMode ? "border-green-600/30" : "border-green-200",
    warning: isDarkMode ? "border-amber-600/30" : "border-amber-200",
    destructive: isDarkMode ? "border-red-600/30" : "border-red-200",
  }

  const bgClasses = isDarkMode ? "bg-slate-900/40 backdrop-blur-xl hover:bg-slate-900/60" : "bg-white hover:shadow-lg"
  const textClasses = isDarkMode ? "text-white" : "text-gray-900"
  const descClasses = isDarkMode ? "text-slate-400" : "text-gray-600"

  return (
    <Card className={cn(`border-2 shadow-md hover:shadow-xl transition-all duration-300 ${bgClasses} hover:-translate-y-1`, borderColors[variant])}>
      <CardContent className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={cn("text-sm font-semibold uppercase tracking-wide", isDarkMode ? "text-slate-400" : "text-slate-600")}>{title}</p>
            <p className={cn("mt-3 text-4xl font-bold", textClasses)}>{value}</p>
            {description && <p className={cn("mt-2 text-sm", descClasses)}>{description}</p>}
            {trend && (
              <p className={cn("mt-3 text-sm font-semibold flex items-center gap-1", trend.value >= 0 ? isDarkMode ? "text-green-400" : "text-green-600" : isDarkMode ? "text-red-400" : "text-red-600")}>
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
