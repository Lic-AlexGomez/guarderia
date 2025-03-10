"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    daycareTitle: "Laly's Family Group Daycare",
    daycareDescription: "A safe and fun place for your child's development",
    phone: "(123) 456-7890",
    email: "info@lalysdaycare.com",
    address: "Bronx, New York",
    hours: "7:30 am - 6:00 pm",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    newEnrollmentAlerts: true,
    paymentReminders: true,
    eventReminders: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle general settings change
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value,
    })
  }

  // Handle notification settings change
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    })
  }

  // Handle security settings change
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecuritySettings({
      ...securitySettings,
      [e.target.name]: e.target.value,
    })
  }

  // Handle save general settings
  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    })

    setIsLoading(false)
  }

  // Handle save notification settings
  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    })

    setIsLoading(false)
  }

  // Handle save security settings
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate passwords
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your new password and confirmation match.",
      })
      setIsLoading(false)
      return
    }

    if (securitySettings.newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Your password must be at least 8 characters long.",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })

    // Reset form
    setSecuritySettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <form onSubmit={handleSaveGeneral}>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Update your daycare's basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="daycareTitle">Daycare Name</Label>
                      <Input
                        id="daycareTitle"
                        name="daycareTitle"
                        value={generalSettings.daycareTitle}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={generalSettings.email}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daycareDescription">Description</Label>
                    <Textarea
                      id="daycareDescription"
                      name="daycareDescription"
                      value={generalSettings.daycareDescription}
                      onChange={handleGeneralChange}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={generalSettings.phone} onChange={handleGeneralChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hours">Business Hours</Label>
                      <Input id="hours" name="hours" value={generalSettings.hours} onChange={handleGeneralChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={generalSettings.address} onChange={handleGeneralChange} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <form onSubmit={handleSaveNotifications}>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive promotional emails and newsletters</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">Alert Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newEnrollmentAlerts">New Enrollment Alerts</Label>
                        <Switch
                          id="newEnrollmentAlerts"
                          checked={notificationSettings.newEnrollmentAlerts}
                          onCheckedChange={(checked) => handleNotificationChange("newEnrollmentAlerts", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="paymentReminders">Payment Reminders</Label>
                        <Switch
                          id="paymentReminders"
                          checked={notificationSettings.paymentReminders}
                          onCheckedChange={(checked) => handleNotificationChange("paymentReminders", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="eventReminders">Event Reminders</Label>
                        <Switch
                          id="eventReminders"
                          checked={notificationSettings.eventReminders}
                          onCheckedChange={(checked) => handleNotificationChange("eventReminders", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Preferences"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <form onSubmit={handleSavePassword}>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Update your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={securitySettings.currentPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={securitySettings.newPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={securitySettings.confirmPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Password must be at least 8 characters long and include:</p>
                    <ul className="list-disc list-inside pl-4 mt-1">
                      <li>At least one uppercase letter</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one number</li>
                      <li>At least one special character</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

