"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

// Mock data - in production, aggregate from database
const data = [
  { date: "Jan", requests: 120, completed: 110 },
  { date: "Feb", requests: 145, completed: 138 },
  { date: "Mar", requests: 168, completed: 155 },
  { date: "Apr", requests: 190, completed: 178 },
  { date: "May", requests: 210, completed: 195 },
  { date: "Jun", requests: 235, completed: 220 },
  { date: "Jul", requests: 248, completed: 235 },
]

export function RequestsOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests Over Time</CardTitle>
        <CardDescription>Monthly request volume and completion trend</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
                name="Total Requests"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))" }}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
