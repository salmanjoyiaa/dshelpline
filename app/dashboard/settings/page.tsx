import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "@/components/settings/account-settings"
import { ServiceSettings } from "@/components/settings/service-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { TeamSettings } from "@/components/settings/team-settings"

export const metadata: Metadata = {
  title: "Settings",
}

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, organization:organizations(*)")
    .eq("id", user.id)
    .single()

  const { data: serviceTypes } = await supabase.from("service_types").select("*").order("name")

  const { data: teamMembers } = await supabase
    .from("profiles")
    .select("*")
    .eq("organization_id", profile?.organization_id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and organization settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountSettings profile={profile} />
        </TabsContent>

        <TabsContent value="services">
          <ServiceSettings serviceTypes={serviceTypes || []} />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="team">
          <TeamSettings members={teamMembers || []} currentUserRole={profile?.role} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
