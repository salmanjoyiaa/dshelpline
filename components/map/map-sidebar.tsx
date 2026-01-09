"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, User, Clock, AlertTriangle } from "lucide-react"
import type { ServiceRequest, Provider } from "@/lib/types"
import { cn } from "@/lib/utils"

interface MapSidebarProps {
  requests: ServiceRequest[]
  providers: Provider[]
}

export function MapSidebar({ requests, providers }: MapSidebarProps) {
  const [selectedTab, setSelectedTab] = useState("requests")

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const activeRequests = requests.filter((r) => r.status === "in_progress" || r.status === "assigned")
  const availableProviders = providers.filter((p) => p.status === "active")
  const busyProviders = providers.filter((p) => p.status === "inactive")

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Live Overview</CardTitle>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="rounded-lg bg-muted p-2 text-center">
            <p className="text-2xl font-bold text-primary">{activeRequests.length}</p>
            <p className="text-xs text-muted-foreground">Active Jobs</p>
          </div>
          <div className="rounded-lg bg-muted p-2 text-center">
            <p className="text-2xl font-bold text-green-600">{availableProviders.length}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
        </div>
      </CardHeader>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4">
          <TabsTrigger value="requests" className="relative">
            Requests
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="space-y-2 p-4">
              {/* Urgent/Pending first */}
              {pendingRequests.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                    Pending Assignment
                  </p>
                  {pendingRequests.map((request) => (
                    <RequestItem key={request.id} request={request} />
                  ))}
                </div>
              )}

              {/* Active requests */}
              {activeRequests.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">In Progress</p>
                  {activeRequests.map((request) => (
                    <RequestItem key={request.id} request={request} />
                  ))}
                </div>
              )}

              {requests.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">No active requests</p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="providers" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="space-y-2 p-4">
              {/* Available first */}
              {availableProviders.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">Available</p>
                  {availableProviders.map((provider) => (
                    <ProviderItem key={provider.id} provider={provider} />
                  ))}
                </div>
              )}

              {/* Busy providers */}
              {busyProviders.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">On Job</p>
                  {busyProviders.map((provider) => (
                    <ProviderItem key={provider.id} provider={provider} />
                  ))}
                </div>
              )}

              {providers.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No providers</p>}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

function RequestItem({ request }: { request: ServiceRequest }) {
  return (
    <div className="rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors cursor-pointer mb-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <MapPin
            className={cn(
              "h-4 w-4 mt-0.5 shrink-0",
              request.priority === "urgent"
                ? "text-red-500"
                : request.priority === "high"
                  ? "text-amber-500"
                  : "text-primary",
            )}
          />
          <div>
            <p className="text-sm font-medium">{request.customer_name}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[180px]">{request.address}</p>
          </div>
        </div>
        <Badge variant={request.status === "pending" ? "secondary" : "outline"} className="text-xs shrink-0">
          {request.status.replace("_", " ")}
        </Badge>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>{request.service_type?.name || "General"}</span>
        {request.assigned_provider && (
          <>
            <span>•</span>
            <span>{request.assigned_provider.name}</span>
          </>
        )}
      </div>
    </div>
  )
}

function ProviderItem({ provider }: { provider: Provider }) {
  return (
    <div className="rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors cursor-pointer mb-2">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            provider.status === "active" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600",
          )}
        >
          <User className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{provider.name}</p>
          <p className="text-xs text-muted-foreground">{provider.total_jobs} jobs completed</p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-xs",
            provider.status === "active" ? "border-green-500 text-green-600" : "border-amber-500 text-amber-600",
          )}
        >
          {provider.status}
        </Badge>
      </div>
    </div>
  )
}
