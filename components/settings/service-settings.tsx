"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, Loader2 } from "lucide-react"
import type { ServiceType } from "@/lib/types"

interface ServiceSettingsProps {
  serviceTypes: ServiceType[]
}

export function ServiceSettings({ serviceTypes }: ServiceSettingsProps) {
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newServiceName, setNewServiceName] = useState("")

  const handleAddService = async () => {
    if (!newServiceName.trim()) return
    setIsAdding(true)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single()

    await supabase.from("service_types").insert({
      name: newServiceName,
      organization_id: profile?.organization_id,
    })

    setNewServiceName("")
    setIsDialogOpen(false)
    setIsAdding(false)
    router.refresh()
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service type?")) return

    const supabase = createClient()
    await supabase.from("service_types").update({ is_active: false }).eq("id", id)
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Service Types</CardTitle>
            <CardDescription>Manage the types of services your organization offers</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Service Type</DialogTitle>
                <DialogDescription>Create a new service type for your organization</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="e.g., HVAC Repair"
                  />
                </div>
                <Button onClick={handleAddService} disabled={isAdding || !newServiceName.trim()} className="w-full">
                  {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Service Type
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {serviceTypes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No service types defined yet. Add your first service type to get started.
          </p>
        ) : (
          <div className="space-y-2">
            {serviceTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{type.name}</Badge>
                  {type.estimated_duration && (
                    <span className="text-sm text-muted-foreground">{type.estimated_duration} min</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteService(type.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
