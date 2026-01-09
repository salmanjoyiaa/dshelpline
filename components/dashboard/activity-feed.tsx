import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  type: "request_created" | "request_assigned" | "request_completed" | "provider_added"
  title: string
  description: string
  time: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

const activityStyles = {
  request_created: { color: "bg-blue-500", label: "New" },
  request_assigned: { color: "bg-amber-500", label: "Assigned" },
  request_completed: { color: "bg-green-500", label: "Completed" },
  provider_added: { color: "bg-purple-500", label: "Provider" },
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", activityStyles[activity.type].color)} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <Badge variant="secondary" className="text-xs">
                      {activityStyles[activity.type].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
