"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  FileText,
  Users,
  Map,
  BarChart3,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/requests", label: "Requests", icon: FileText },
  { href: "/dashboard/providers", label: "Providers", icon: Users },
  { href: "/dashboard/map", label: "Map", icon: Map },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
]

const bottomNavItems = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function DashboardSidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: typeof Home }) => {
    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))

    const linkContent = (
      <Link
        href={href}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 min-h-[44px] touch-manipulation",
          isActive
            ? "ai-gradient text-white shadow-lg shadow-blue-600/30"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          collapsed && "justify-center px-2",
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span>{label}</span>}
      </Link>
    )

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      )
    }

    return linkContent
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "flex h-screen flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {/* Logo */}
        <div className={cn("flex h-20 items-center border-b border-slate-200 px-4", collapsed && "justify-center px-2")}>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            {!collapsed && <span className="text-xl font-bold text-slate-900">Dream State AI</span>}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-2 px-3 py-4">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-slate-200 px-3 py-4">
          <div className="space-y-2 mb-3">
            {bottomNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}

            {/* Logout */}
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center justify-center rounded-lg px-2 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Sign out</TooltipContent>
              </Tooltip>
            ) : (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Sign out"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 min-h-[44px] touch-manipulation"
              >
                <LogOut className="h-5 w-5" />
                <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
              </button>
            )}
          </div>

          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn("w-full justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900", collapsed && "px-2")}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
