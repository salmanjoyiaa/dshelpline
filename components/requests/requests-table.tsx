"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, UserPlus } from "lucide-react"
import { RequestDetailModal } from "./request-detail-modal"
import type { ServiceRequest } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface RequestsTableProps {
  requests: ServiceRequest[]
}

const statusStyles: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string; bg: string }> = {
  pending: { variant: "secondary", label: "Pending", bg: "bg-yellow-100 text-yellow-800" },
  assigned: { variant: "outline", label: "Assigned", bg: "bg-blue-100 text-blue-800" },
  in_progress: { variant: "default", label: "In Progress", bg: "bg-purple-100 text-purple-800" },
  completed: { variant: "default", label: "Completed", bg: "bg-green-100 text-green-800" },
  cancelled: { variant: "destructive", label: "Cancelled", bg: "bg-red-100 text-red-800" },
}

const priorityStyles: Record<string, { color: string; label: string }> = {
  low: { color: "text-muted-foreground", label: "Low" },
  normal: { color: "text-foreground", label: "Normal" },
  high: { color: "text-amber-600", label: "High" },
  urgent: { color: "text-red-600", label: "Urgent" },
}

export function RequestsTable({ requests }: RequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null)

  return (
    <>
      <div className="rounded-xl border-2 border-slate-200 bg-white shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
            <TableRow>
              <TableHead className="text-slate-700 font-semibold">Customer</TableHead>
              <TableHead className="text-slate-700 font-semibold">Service</TableHead>
              <TableHead className="text-slate-700 font-semibold">Status</TableHead>
              <TableHead className="text-slate-700 font-semibold">Priority</TableHead>
              <TableHead className="text-slate-700 font-semibold">Provider</TableHead>
              <TableHead className="text-slate-700 font-semibold">Created</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-4xl">📋</div>
                    <p>No requests found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow
                  key={request.id}
                  className="cursor-pointer hover:bg-blue-50 border-b border-slate-200 transition-colors duration-200"
                  onClick={() => setSelectedRequest(request)}
                >
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900">{request.customer_name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{request.address}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {request.service_type ? (
                      <Badge variant="outline" className="font-normal border-slate-300 bg-slate-50">
                        {request.service_type.name}
                      </Badge>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("font-semibold text-xs px-3 py-1", statusStyles[request.status]?.bg || "bg-slate-100 text-slate-800")}>
                      {statusStyles[request.status]?.label || request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={cn("font-semibold text-sm", priorityStyles[request.priority ?? 'normal']?.color || "text-slate-700")}>
                      ● {priorityStyles[request.priority ?? 'normal']?.label || request.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    {request.assigned_provider ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={request.assigned_provider.avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {request.assigned_provider.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{request.assigned_provider.name}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedRequest(request)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign Provider
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Request
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Modal */}
      <RequestDetailModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
    </>
  )
}
