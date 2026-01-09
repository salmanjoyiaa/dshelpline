"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import type { ServiceType, Provider } from "@/lib/types"

export default function NewRequestPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [providers, setProviders] = useState<Provider[]>([])

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    address: "",
    service_type_id: "",
    assigned_provider_id: "",
    priority: "normal",
    description: "",
    scheduled_at: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const [{ data: types }, { data: providerData }] = await Promise.all([
        supabase.from("service_types").select("*").eq("is_active", true),
        supabase.from("providers").select("*").eq("is_active", true),
      ])

      setServiceTypes(types || [])
      setProviders(providerData || [])
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    // Get user's organization
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/login")
      return
    }

    const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single()

    // Create request
    const { error } = await supabase.from("service_requests").insert({
      ...formData,
      organization_id: profile?.organization_id,
      service_type_id: formData.service_type_id || null,
      assigned_provider_id: formData.assigned_provider_id || null,
      scheduled_at: formData.scheduled_at || null,
      status: formData.assigned_provider_id ? "assigned" : "pending",
    })

    if (error) {
      console.error("Error creating request:", error)
      setIsLoading(false)
      return
    }

    router.push("/dashboard/requests")
    router.refresh()
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/requests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Service Request</h1>
          <p className="text-muted-foreground">Create a new service request</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Customer Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Enter the customer&apos;s contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Customer Name *</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => updateField("customer_name", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customer_email">Email</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => updateField("customer_email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_phone">Phone</Label>
                <Input
                  id="customer_phone"
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => updateField("customer_phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Service Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="123 Main St, City, State ZIP"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Service Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>Specify the type of service needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="service_type">Service Type</Label>
                <Select value={formData.service_type_id} onValueChange={(v) => updateField("service_type_id", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(v) => updateField("priority", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe the service needed..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled_at">Scheduled Date/Time</Label>
              <Input
                id="scheduled_at"
                type="datetime-local"
                value={formData.scheduled_at}
                onChange={(e) => updateField("scheduled_at", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Assignment */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Assignment</CardTitle>
            <CardDescription>Optionally assign a provider now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="provider">Assign Provider</Label>
              <Select
                value={formData.assigned_provider_id}
                onValueChange={(v) => updateField("assigned_provider_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name} ({provider.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Leave empty to use AI-powered auto-assignment based on location and skills
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/requests">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Request
          </Button>
        </div>
      </form>
    </div>
  )
}
