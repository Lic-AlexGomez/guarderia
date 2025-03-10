"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { useFirebaseData } from "@/components/firebase-data-provider"
import type { Activity } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, Clock, Users, BookOpen } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addActivity, updateActivity, deleteActivity } from "@/lib/firebase-service"
import { useToast } from "@/hooks/use-toast"

export default function ActivitiesPage() {
  const { activities, isLoading, refreshData } = useFirebaseData()
  const [activitiesList, setActivitiesList] = useState<Activity[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const { toast } = useToast()

  // Update local state when Firebase data changes
  useEffect(() => {
    if (activities) {
      setActivitiesList(activities)
    }
  }, [activities])

  const handleAddActivity = async (data: any) => {
    try {
      const newActivity: Omit<Activity, "id"> = {
        name: data.name,
        description: data.description,
        ageGroup: data.ageGroup,
        duration: data.duration,
        materials: data.materials.split(",").map((material: string) => material.trim()),
        image: data.image || "/placeholder.svg?height=300&width=400",
      }

      await addActivity(newActivity)
      await refreshData()

      toast({
        title: "Activity added",
        description: "The activity has been added successfully",
      })
    } catch (error) {
      console.error("Error adding activity:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add activity. Please try again.",
      })
    }
  }

  const handleEditActivity = async (data: any) => {
    if (!selectedActivity) return

    try {
      const updatedActivity: Partial<Activity> = {
        name: data.name,
        description: data.description,
        ageGroup: data.ageGroup,
        duration: data.duration,
        materials: data.materials.split(",").map((material: string) => material.trim()),
      }

      await updateActivity(selectedActivity.id, updatedActivity)
      await refreshData()

      toast({
        title: "Activity updated",
        description: "The activity has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating activity:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update activity. Please try again.",
      })
    }
  }

  const handleDeleteActivity = async (id: string) => {
    try {
      await deleteActivity(id)
      await refreshData()

      toast({
        title: "Activity deleted",
        description: "The activity has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting activity:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete activity. Please try again.",
      })
    }
  }

  const columns: ColumnDef<Activity>[] = [
    {
      accessorKey: "name",
      header: "Activity Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "ageGroup",
      header: "Age Group",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-50">
          {row.getValue("ageGroup")}
        </Badge>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          {row.getValue("duration")}
        </div>
      ),
    },
    {
      accessorKey: "materials",
      header: "Materials",
      cell: ({ row }) => {
        const materials = row.original.materials
        return (
          <div className="flex flex-wrap gap-1">
            {materials.slice(0, 2).map((material, index) => (
              <Badge key={index} variant="outline" className="bg-green-50">
                {material}
              </Badge>
            ))}
            {materials.length > 2 && <Badge variant="outline">+{materials.length - 2} more</Badge>}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const activity = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedActivity(activity)
                setIsEditDialogOpen(true)
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteActivity(activity.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleRowClick = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsEditDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <DashboardHeader />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Activities</h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading activities...</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Activities</h2>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Activity
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {activitiesList.map((activity) => (
            <Card
              key={activity.id}
              className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              onClick={() => {
                setSelectedActivity(activity)
                setIsEditDialogOpen(true)
              }}
            >
              <div className="h-40 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-300" />
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{activity.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{activity.description}</p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{activity.ageGroup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-pink-500" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activity.materials.slice(0, 3).map((material, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50">
                        {material}
                      </Badge>
                    ))}
                    {activity.materials.length > 3 && (
                      <Badge variant="outline">+{activity.materials.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DataTable columns={columns} data={activitiesList} searchColumn="name" onRowClick={handleRowClick} />

        {/* Add Activity Dialog */}
        <DialogForm
          title="Add Activity"
          description="Add a new activity for the children"
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddActivity}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Activity Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageGroup">Age Group</Label>
                <Input id="ageGroup" name="ageGroup" placeholder="e.g. 2+ years" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" placeholder="e.g. 30 minutes" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materials">Materials (comma separated)</Label>
                <Input id="materials" name="materials" placeholder="e.g. Paper, Paint, Brushes" required />
              </div>
            </div>
          </div>
        </DialogForm>

        {/* Edit Activity Dialog */}
        {selectedActivity && (
          <DialogForm
            title="Edit Activity"
            description="Update activity details"
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditActivity}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Activity Name</Label>
                  <Input id="name" name="name" defaultValue={selectedActivity.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Age Group</Label>
                  <Input id="ageGroup" name="ageGroup" defaultValue={selectedActivity.ageGroup} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={selectedActivity.description}
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" defaultValue={selectedActivity.duration} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materials">Materials (comma separated)</Label>
                  <Input
                    id="materials"
                    name="materials"
                    defaultValue={selectedActivity.materials.join(", ")}
                    required
                  />
                </div>
              </div>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  )
}

