import { createClient } from "@/lib/supabase/server"
import { MapView } from "@/components/map/map-view"
import { MapSidebar } from "@/components/map/map-sidebar"

export default async function MapPage() {
  const supabase = await createClient()

  // Fetch active requests
  const { data: requests } = await supabase
    .from("service_requests")
    .select(
      `
      *,
      service_type:service_types(id, name, color),
      assigned_provider:providers(id, name, status)
    `,
    )
    .in("status", ["pending", "assigned", "in_progress"])
    .order("created_at", { ascending: false })

  // Fetch available providers
  const { data: providers } = await supabase.from("providers").select("*").eq("is_active", true)

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Map */}
      <div className="flex-1 rounded-lg border border-border bg-card overflow-hidden">
        <MapView requests={requests || []} providers={providers || []} />
      </div>

      {/* Sidebar */}
      <div className="w-80 shrink-0">
        <MapSidebar requests={requests || []} providers={providers || []} />
      </div>
    </div>
  )
}
