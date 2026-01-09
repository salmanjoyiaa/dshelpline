import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, FileText, Settings } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      label: "New Request",
      href: "/dashboard/requests/new",
      icon: Plus,
      variant: "default" as const,
    },
    {
      label: "Add Provider",
      href: "/dashboard/providers/new",
      icon: UserPlus,
      variant: "outline" as const,
    },
    {
      label: "View Reports",
      href: "/dashboard/analytics",
      icon: FileText,
      variant: "outline" as const,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      variant: "outline" as const,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button key={action.label} variant={action.variant} className="h-auto flex-col gap-2 py-4" asChild>
              <Link href={action.href}>
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
