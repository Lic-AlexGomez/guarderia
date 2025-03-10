"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { useFirebaseData } from "@/components/firebase-data-provider"
import type { MenuItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Utensils, Apple, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateMenuItem } from "@/lib/firebase-service"
import { useToast } from "@/hooks/use-toast"

export default function MenuPage() {
  const { menu, isLoading, refreshData } = useFirebaseData()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<MenuItem | null>(null)
  const { toast } = useToast()

  // Update local state when Firebase data changes
  useEffect(() => {
    if (menu && menu.length > 0) {
      setMenuItems(menu)
    }
  }, [menu])

  const handleEditMenu = async (data: any) => {
    if (!selectedDay) return

    try {
      const updatedMenu: Partial<MenuItem> = {
        breakfast: data.breakfast,
        lunch: data.lunch,
        snack: data.snack,
      }

      await updateMenuItem(selectedDay.id, updatedMenu)
      await refreshData()

      toast({
        title: "Menu updated",
        description: `The menu for ${selectedDay.day} has been updated successfully.`,
      })
    } catch (error) {
      console.error("Error updating menu:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update menu. Please try again.",
      })
    }
  }

  const handleEditClick = (day: MenuItem) => {
    setSelectedDay(day)
    setIsEditDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <DashboardHeader />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Weekly Menu</h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Weekly Menu</h2>
          <Button onClick={() => window.print()} variant="outline">
            Print Menu
          </Button>
        </div>

        <p className="text-muted-foreground">
          Plan and manage nutritious meals and snacks for the children. Click on any day to edit the menu.
        </p>

        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {menuItems.map((day) => (
                <Card
                  key={day.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleEditClick(day)}
                >
                  <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-transparent">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">{day.day}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Coffee className="h-4 w-4 text-pink-500" />
                          <p className="text-sm font-medium">Breakfast</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{day.breakfast}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-green-500" />
                          <p className="text-sm font-medium">Lunch</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{day.lunch}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Apple className="h-4 w-4 text-blue-500" />
                          <p className="text-sm font-medium">Snack</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{day.snack}</p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditClick(day)
                      }}
                    >
                      <Pencil className="mr-2 h-3 w-3" /> Edit
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Day</th>
                      <th className="text-left p-4">Breakfast</th>
                      <th className="text-left p-4">Lunch</th>
                      <th className="text-left p-4">Snack</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((day) => (
                      <tr key={day.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{day.day}</td>
                        <td className="p-4">{day.breakfast}</td>
                        <td className="p-4">{day.lunch}</td>
                        <td className="p-4">{day.snack}</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEditClick(day)}>
                            <Pencil className="mr-2 h-3 w-3" /> Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Menu Dialog */}
        {selectedDay && (
          <DialogForm
            title={`Edit Menu for ${selectedDay.day}`}
            description="Update the meals and snacks for this day"
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditMenu}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="breakfast" className="flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-pink-500" /> Breakfast
                </Label>
                <Textarea id="breakfast" name="breakfast" defaultValue={selectedDay.breakfast} rows={2} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lunch" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-green-500" /> Lunch
                </Label>
                <Textarea id="lunch" name="lunch" defaultValue={selectedDay.lunch} rows={2} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="snack" className="flex items-center gap-2">
                  <Apple className="h-4 w-4 text-blue-500" /> Snack
                </Label>
                <Textarea id="snack" name="snack" defaultValue={selectedDay.snack} rows={2} required />
              </div>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  )
}

