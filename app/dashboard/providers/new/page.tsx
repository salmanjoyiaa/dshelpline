"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import type { ServiceType } from "@/lib/types"

export default function NewProviderPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "available",
  })

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("service_types").select("*").eq("is_active", true)
      setServiceTypes(data || [])
    }
    fetchServiceTypes()
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

    // Create provider
    const { data: provider, error } = await supabase
      .from("providers")
      .insert({
        ...formData,
        organization_id: profile?.organization_id,
      })
      .select()
      .single()

    if (error || !provider) {
      console.error("Error creating provider:", error)
      setIsLoading(false)
      return
    }

    // Add skills
    if (selectedSkills.length > 0) {
      const skillsToInsert = selectedSkills.map((serviceTypeId) => ({
        provider_id: provider.id,
        service_type_id: serviceTypeId,
        proficiency_level: 3,
      }))

      await supabase.from("provider_skills").insert(skillsToInsert)
    }

    router.push("/dashboard/providers")
    router.refresh()
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSkill = (serviceTypeId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(serviceTypeId) ? prev.filter((id) => id !== serviceTypeId) : [...prev, serviceTypeId],
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/providers">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Provider</h1>
          <p className="text-muted-foreground">Add a new service provider to your team</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the provider&apos;s contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Initial Status</Label>
              <Select value={formData.status} onValueChange={(v) => updateField("status", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Skills & Services</CardTitle>
            <CardDescription>Select the services this provider can perform</CardDescription>
          </CardHeader>
          <CardContent>
            {serviceTypes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No service types defined yet.{" "}
                <Link href="/dashboard/settings/services" className="text-primary hover:underline">
                  Add service types
                </Link>{" "}
                first.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceTypes.map((type) => (
                  <div key={type.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <Checkbox
                      id={type.id}
                      checked={selectedSkills.includes(type.id)}
                      onCheckedChange={() => toggleSkill(type.id)}
                    />
                    <label htmlFor={type.id} className="flex-1 cursor-pointer text-sm font-medium">
                      {type.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/providers">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Provider
          </Button>
        </div>
      </form>
    </div>
  )
}
