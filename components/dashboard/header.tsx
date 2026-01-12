"use client"

import { Bell, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Profile } from "@/lib/types"
import Link from "next/link"

interface HeaderProps {
  user: Profile | null
}

export function DashboardHeader({ user }: HeaderProps) {
  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U"

  return (
    <header className="flex h-20 items-center justify-between border-b border-yellow-500/20 bg-slate-900/50 backdrop-blur px-8 shadow-lg z-10">
      {/* Search */}
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input 
          placeholder="Search requests, providers..." 
          className="pl-12 border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:bg-slate-750 focus:border-yellow-400 focus:ring-yellow-400 rounded-lg" 
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Quick Add */}
        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px] touch-manipulation" asChild>
          <Link href="/dashboard/requests/new" aria-label="Create new request">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">New Request</span>
            <span className="sm:hidden">New</span>
          </Link>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-w-[44px] min-h-[44px] touch-manipulation" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="text-slate-900">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-4 text-center text-sm text-slate-500">No new notifications</div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-slate-50 min-h-[44px] touch-manipulation" aria-label="User menu">
              <Avatar className="h-9 w-9 ai-gradient">
                <AvatarImage src={user?.avatar_url || undefined} alt={user?.full_name || "User"} />
                <AvatarFallback className="text-white text-sm font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-slate-900">{user?.full_name || "User"}</p>
                <p className="text-xs text-slate-500">{user?.role || "Member"}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-slate-900">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings/account" className="cursor-pointer">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/help" className="cursor-pointer">Help & Support</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
