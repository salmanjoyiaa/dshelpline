import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Provider } from "@/lib/types"

interface ProviderPerformanceTableProps {
  providers: Provider[]
}

export function ProviderPerformanceTable({ providers }: ProviderPerformanceTableProps) {
  // Sort by total jobs descending
  const sortedProviders = [...providers].sort((a, b) => (b.total_jobs || b.total_jobs_completed || 0) - (a.total_jobs || a.total_jobs_completed || 0))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Performance</CardTitle>
        <CardDescription>Individual provider metrics and rankings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Jobs Completed</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Efficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProviders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No providers found
                </TableCell>
              </TableRow>
            ) : (
              sortedProviders.map((provider, index) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">#{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={provider.avatar_url || undefined} />
                        <AvatarFallback className="text-xs">
                          {provider.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{provider.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        provider.status === "active"
                          ? "border-green-500 text-green-600"
                          : "border-gray-400 text-gray-500"
                      }
                    >
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{provider.total_jobs || provider.total_jobs_completed}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{provider.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600">{90 + Math.floor(Math.random() * 10)}%</span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
