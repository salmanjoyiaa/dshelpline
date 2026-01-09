"use client"

import { useState } from "react"
import { MapPin, Navigation, User } from "lucide-react"
import type { ServiceRequest, Provider } from "@/lib/types"
import { cn } from "@/lib/utils"

interface MapViewProps {
  requests: ServiceRequest[]
  providers: Provider[]
}

// Placeholder map - in production, integrate with Mapbox
export function MapView({ requests, providers }: MapViewProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // Mock positions for demonstration
  const mockPositions = {
    requests: requests.map((r, i) => ({
      ...r,
      x: 20 + ((i * 73) % 60),
      y: 20 + ((i * 47) % 60),
    })),
    providers: providers.map((p, i) => ({
      ...p,
      x: 15 + ((i * 89) % 70),
      y: 15 + ((i * 61) % 70),
    })),
  }

  return (
    <div className="relative h-full w-full bg-muted/50">
      {/* Map placeholder background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/placeholder.svg?height=800&width=1200&query=city street map grayscale minimal)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Grid overlay for placeholder */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="h-full w-full opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Provider markers */}
      {mockPositions.providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => setSelectedItem(provider.id)}
          className={cn(
            "absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background shadow-lg transition-transform hover:scale-110",
            provider.status === "active"
              ? "bg-green-500"
              : provider.status === "inactive"
                ? "bg-amber-500"
                : "bg-gray-400",
            selectedItem === provider.id && "ring-2 ring-primary ring-offset-2",
          )}
          style={{ left: `${provider.x}%`, top: `${provider.y}%` }}
          aria-label={`Provider: ${provider.name}`}
        >
          <User className="h-5 w-5 text-white" />
        </button>
      ))}

      {/* Request markers */}
      {mockPositions.requests.map((request) => (
        <button
          key={request.id}
          onClick={() => setSelectedItem(request.id)}
          className={cn(
            "absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background shadow-lg transition-transform hover:scale-110",
            request.priority === "urgent" ? "bg-red-500" : request.priority === "high" ? "bg-amber-500" : "bg-primary",
            selectedItem === request.id && "ring-2 ring-primary ring-offset-2",
          )}
          style={{ left: `${request.x}%`, top: `${request.y}%` }}
          aria-label={`Request: ${request.customer_name}`}
        >
          <MapPin className="h-4 w-4 text-white" />
        </button>
      ))}

      {/* Map controls placeholder */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background shadow-md hover:bg-accent">
          <span className="text-lg font-bold">+</span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background shadow-md hover:bg-accent">
          <span className="text-lg font-bold">−</span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background shadow-md hover:bg-accent">
          <Navigation className="h-5 w-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute left-4 top-4 rounded-lg border border-border bg-background/95 p-3 shadow-md backdrop-blur">
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">Legend</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-xs">Available Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-xs">Busy Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-xs">Service Request</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-xs">Urgent Request</span>
          </div>
        </div>
      </div>

      {/* Mapbox integration notice */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-background/90 px-3 py-2 text-xs text-muted-foreground backdrop-blur">
        Add NEXT_PUBLIC_MAPBOX_TOKEN for live map
      </div>
    </div>
  )
}
