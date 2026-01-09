import { Card, CardContent } from "@/components/ui/card"
import { FileText, CheckCircle2, Clock, Users, TrendingUp, Target } from "lucide-react"

interface AnalyticsKPIsProps {
  totalRequests: number
  completedRequests: number
  completionRate: number
  avgResponseTime: number
  activeProviders: number
  totalProviders: number
}

export function AnalyticsKPIs({
  totalRequests,
  completedRequests,
  completionRate,
  avgResponseTime,
  activeProviders,
  totalProviders,
}: AnalyticsKPIsProps) {
  const kpis = [
    {
      title: "Total Requests",
      value: totalRequests.toLocaleString(),
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Completed",
      value: completedRequests.toLocaleString(),
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Avg Response Time",
      value: `${avgResponseTime}m`,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "Active Providers",
      value: `${activeProviders}/${totalProviders}`,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Efficiency Score",
      value: "94%",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
