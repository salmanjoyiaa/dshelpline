"use client"

import { ProviderCard } from "./provider-card"
import type { Provider } from "@/lib/types"

interface ProvidersGridProps {
  providers: Provider[]
}

export function ProvidersGrid({ providers }: ProvidersGridProps) {
  if (providers.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border">
        <p className="text-muted-foreground">No providers found</p>
        <p className="text-sm text-muted-foreground">Add your first provider to get started</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  )
}
