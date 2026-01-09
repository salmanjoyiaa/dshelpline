"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
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
import type { ServiceType, Provider } from "@/lib/types"

export default function EditProviderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [provider, setProvider] = useState<Provider | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "available",
  })

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Fetch provider
      const { data: providerData } = await supabase
        .from("providers")
        .select(
          `
          *,
          skills:provider_skills(service_type_id)
        `,
        )
        .eq("id", id)
        .single()

      if (providerData) {
        setProvider(providerData)
        setFormData({
          name: providerData.name,
          email: providerData.email || "",
          phone: providerData.phone || "",
          status: providerData.status,
        })
        setSelectedSkills(providerData.skills?.map((s: { service_type_id: string }) => s.service_type_id) || [])
      }

      // Fetch service types
      const { data: types } = await supabase.from("service_types").select("*").eq("is_active", true)
      setServiceTypes(types || [])

      setIsFetching(false)
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    // Update provider
    const { error } = await supabase
      .from("providers")
      .update({
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        status: formData.status,
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating provider:", error)
      setIsLoading(false)
      return
    }

    // Update skills - delete existing and insert new
    await supabase.from("provider_skills").delete().eq("provider_id", id)

    if (selectedSkills.length > 0) {
      const skillsToInsert = selectedSkills.map((serviceTypeId) => ({
        provider_id: id,
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
      prev.includes(serviceTypeId) ? prev.filter((sid) => sid !== serviceTypeId) : [...prev, serviceTypeId],
    )
  }

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="flex h-64 flex-col items-center justify-center">
        <p className="text-muted-foreground">Provider not found</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/providers">Back to Providers</Link>
        </Button>
      </div>
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Provider</h1>
          <p className="text-muted-foreground">Update provider information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update the provider&apos;s contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
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
            <CardDescription>Update the services this provider can perform</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/providers">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
