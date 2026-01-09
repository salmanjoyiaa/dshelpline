"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Calendar, User, FileText, MessageSquare } from "lucide-react"
import type { ServiceRequest } from "@/lib/types"
import { format } from "date-fns"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface RequestDetailModalProps {
  request: ServiceRequest | null
  onClose: () => void
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

export function RequestDetailModal({ request, onClose }: RequestDetailModalProps) {
  const [status, setStatus] = useState<ServiceRequest['status']>(request?.status || "pending")
  const [notes, setNotes] = useState(request?.notes || "")
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  if (!request) return null

  const handleUpdateStatus = async (newStatus: ServiceRequest['status']) => {
    setStatus(newStatus)
    setIsSaving(true)

    const supabase = createClient()
    await supabase.from("service_requests").update({ status: newStatus }).eq("id", request.id)

    // Add timeline entry
    await supabase.from("request_timeline").insert({
      request_id: request.id,
      event_type: "status_change",
      description: `Status changed to ${newStatus}`,
    })

    setIsSaving(false)
    router.refresh()
  }

  const handleSaveNotes = async () => {
    setIsSaving(true)
    const supabase = createClient()
    await supabase.from("service_requests").update({ notes }).eq("id", request.id)
    setIsSaving(false)
    router.refresh()
  }

  return (
    <Dialog open={!!request} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{request.customer_name}</DialogTitle>
              <p className="mt-1 text-sm text-muted-foreground">{request.address}</p>
            </div>
            <Badge
              variant={
                request.status === "completed"
                  ? "default"
                  : request.status === "cancelled"
                    ? "destructive"
                    : "secondary"
              }
            >
              {request.status.replace("_", " ")}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 pt-4">
            {/* Customer Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Customer</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{request.customer_name}</span>
                </div>
                {request.customer_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{request.customer_phone}</span>
                  </div>
                )}
                {request.customer_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{request.customer_email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{request.address}</span>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Service</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {request.service_type && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{request.service_type.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Priority: {request.priority}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Created: {format(new Date(request.created_at), "PPp")}</span>
                </div>
                {request.scheduled_at && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Scheduled: {format(new Date(request.scheduled_at), "PPp")}</span>
                  </div>
                )}
              </div>

              {request.description && (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                </div>
              )}
            </div>

            {/* Provider Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Assigned Provider</h3>
              {request.assigned_provider ? (
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Avatar>
                    <AvatarImage src={request.assigned_provider.avatar_url || undefined} />
                    <AvatarFallback>
                      {request.assigned_provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{request.assigned_provider.name}</p>
                    <p className="text-sm text-muted-foreground">Provider</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-4 text-center">
                  <p className="text-muted-foreground">No provider assigned yet</p>
                  <Button size="sm" className="mt-2">
                    Assign Provider
                  </Button>
                </div>
              )}
            </div>

            {/* Status Update */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Update Status</h3>
              <Select value={status} onValueChange={handleUpdateStatus} disabled={isSaving}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="pt-4">
            <div className="space-y-4">
              {/* Mock timeline - in real app, fetch from request_timeline */}
              {[
                { type: "created", desc: "Request created", time: request.created_at },
                ...(request.assigned_provider
                  ? [
                      {
                        type: "assigned",
                        desc: `Assigned to ${request.assigned_provider.name}`,
                        time: request.created_at,
                      },
                    ]
                  : []),
              ].map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {i < 1 && <div className="h-full w-0.5 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">{event.desc}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(event.time), "PPp")}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Internal Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this request..."
                  rows={6}
                />
              </div>
              <Button onClick={handleSaveNotes} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
