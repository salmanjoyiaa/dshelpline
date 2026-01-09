"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how you want to be notified</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="newRequests" className="flex-1">
                <span className="font-normal">New service requests</span>
                <p className="text-sm text-muted-foreground">Get notified when a new request is created</p>
              </Label>
              <Switch id="newRequests" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="statusChanges" className="flex-1">
                <span className="font-normal">Status changes</span>
                <p className="text-sm text-muted-foreground">Get notified when request status changes</p>
              </Label>
              <Switch id="statusChanges" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="providerUpdates" className="flex-1">
                <span className="font-normal">Provider updates</span>
                <p className="text-sm text-muted-foreground">Get notified about provider availability changes</p>
              </Label>
              <Switch id="providerUpdates" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dailyDigest" className="flex-1">
                <span className="font-normal">Daily digest</span>
                <p className="text-sm text-muted-foreground">Receive a daily summary of activity</p>
              </Label>
              <Switch id="dailyDigest" defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Push Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="urgentRequests" className="flex-1">
                <span className="font-normal">Urgent requests</span>
                <p className="text-sm text-muted-foreground">Push notification for urgent priority requests</p>
              </Label>
              <Switch id="urgentRequests" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="slaAlerts" className="flex-1">
                <span className="font-normal">SLA alerts</span>
                <p className="text-sm text-muted-foreground">Get alerted before SLA deadlines</p>
              </Label>
              <Switch id="slaAlerts" defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
