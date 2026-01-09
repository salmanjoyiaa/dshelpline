"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ServiceRequest, ServiceType } from "@/lib/types"

interface ServiceTypeBreakdownProps {
  requests: ServiceRequest[]
  serviceTypes: ServiceType[]
}

export function ServiceTypeBreakdown({ requests, serviceTypes }: ServiceTypeBreakdownProps) {
  // Calculate requests per service type
  const typeCounts = requests.reduce(
    (acc, request) => {
      if (request.service_type_id) {
        acc[request.service_type_id] = (acc[request.service_type_id] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const data = serviceTypes
    .map((type) => ({
      name: type.name,
      requests: typeCounts[type.id] || 0,
    }))
    .sort((a, b) => b.requests - a.requests)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests by Service Type</CardTitle>
        <CardDescription>Distribution of requests across service categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="requests" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
