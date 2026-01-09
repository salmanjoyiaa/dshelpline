"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
import { MoreHorizontal, Phone, Mail, Star, MapPin, Edit, Trash2, Power } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Provider } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProviderCardProps {
  provider: Provider
}

const statusStyles = {
  active: {
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    dot: "bg-green-500",
    label: "Active",
  },
  inactive: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dot: "bg-amber-500",
    label: "Inactive",
  },
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const status = statusStyles[provider.status] || statusStyles.inactive
  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const toggleStatus = async (newStatus: "active" | "inactive") => {
    setIsUpdating(true)
    const supabase = createClient()
    await supabase.from("providers").update({ status: newStatus }).eq("id", provider.id)
    setIsUpdating(false)
    router.refresh()
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this provider?")) return

    const supabase = createClient()
    await supabase.from("providers").update({ is_active: false }).eq("id", provider.id)
    router.refresh()
  }

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={provider.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
              </Avatar>
              <span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card", status.dot)} />
            </div>
            <div>
              <h3 className="font-semibold leading-tight">{provider.name}</h3>
              <Badge variant="secondary" className={cn("mt-1 text-xs", status.badge)}>
                {status.label}
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/dashboard/providers/${provider.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleStatus("active")} disabled={isUpdating}>
                <Power className="mr-2 h-4 w-4 text-green-500" />
                Set Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleStatus("inactive")} disabled={isUpdating}>
                <Power className="mr-2 h-4 w-4 text-amber-500" />
                Set Inactive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          {provider.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{provider.phone}</span>
            </div>
          )}
          {provider.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="truncate">{provider.email}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{provider.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{provider.total_jobs} jobs</span>
          </div>
        </div>

        {/* Skills */}
        {provider.skills && provider.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {(typeof provider.skills[0] === 'string' 
              ? provider.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))
              : provider.skills.slice(0, 3).map((skill: any) => (
                  <Badge key={skill.id} variant="outline" className="text-xs">
                    {skill.service_type?.name}
                  </Badge>
                ))
            )}
            {provider.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{provider.skills.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
