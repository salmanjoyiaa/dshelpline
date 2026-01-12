"use client"

import type React from "react"
import { useState } from "react"
import { DashboardSidebar } from "./sidebar"
import { DashboardHeader } from "./header"
import type { Profile } from "@/lib/types"

interface DashboardShellProps {
  children: React.ReactNode
  user: Profile | null
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-slate-800">
      <DashboardSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
