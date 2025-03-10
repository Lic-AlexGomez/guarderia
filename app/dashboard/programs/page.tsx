"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { useFirebaseData } from "@/components/firebase-data-provider"
import type { Program } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addProgram, updateProgram, deleteProgram } from "@/lib/firebase-service"
import { useToast } from "@/hooks/use-toast"

export default function ProgramsPage() {
  const { programs, isLoading, refreshData } = useFirebaseData()
  const [programsList, setProgramsList] = useState<Program[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const { toast } = useToast()

  // Update local state when Firebase data changes
  useEffect(() => {
    if (programs) {
      setProgramsList(programs)
    }
  }, [programs])

  const handleAddProgram = async (data: any) => {
    try {
      const newProgram: Omit<Program, "id"> = {
        name: data.name,
        ageRange: data.ageRange,
        description: data.description,
        capacity: Number.parseInt(data.capacity),
        schedule: data.schedule,
        tuition: data.tuition || "$300/week",
        features: data.activities.split(",").map((activity: string) => activity.trim()),
        image: data.image || "/placeholder.svg?height=300&width=400",
      }

      await addProgram(newProgram)
      await refreshData()

      toast({
        title: "Program added",
        description: "The program has been added successfully",
      })
    } catch (error) {
      console.error("Error adding program:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add program. Please try again.",
      })
    }
  }

  const handleEditProgram = async (data: any) => {
    if (!selectedProgram) return

    try {
      const updatedProgram: Partial<Program> = {
        name: data.name,
        ageRange: data.ageRange,
        description: data.description,
        capacity: Number.parseInt(data.capacity),
        schedule: data.schedule,
        tuition: data.tuition || selectedProgram.tuition,
        features: data.activities.split(",").map((activity: string) => activity.trim()),
      }

      await updateProgram(selectedProgram.id, updatedProgram)
      await refreshData()

      toast({
        title: "Program updated",
        description: "The program has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating program:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update program. Please try again.",
      })
    }
  }

  const handleDeleteProgram = async (id: string) => {
    try {
      await deleteProgram(id)
      await refreshData()

      toast({
        title: "Program deleted",
        description: "The program has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting program:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete program. Please try again.",
      })
    }
  }

  const columns: ColumnDef<Program>[] = [
    {
      accessorKey: "name",
      header: "Program Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "ageRange",
      header: "Age Range",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-50">
          {row.getValue("ageRange")}
        </Badge>
      ),
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
    },
    {
      accessorKey: "schedule",
      header: "Schedule",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const program = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProgram(program)
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
                handleDeleteProgram(program.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleRowClick = (program: Program) => {
    setSelectedProgram(program)
    setIsEditDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <DashboardHeader />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading programs...</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Program
          </Button>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <DataTable columns={columns} data={programsList} searchColumn="name" onRowClick={handleRowClick} />
          </TabsContent>

          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programsList.map((program) => (
                <Card
                  key={program.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedProgram(program)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{program.name}</CardTitle>
                      <Badge>{program.capacity} children</Badge>
                    </div>
                    <CardDescription>{program.ageRange}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Schedule:</span> {program.schedule}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Tuition:</span> {program.tuition}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {program.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-50">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Program Dialog */}
        <DialogForm
          title="Add Program"
          description="Add a new program to the daycare"
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddProgram}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageRange">Age Range</Label>
                <Input id="ageRange" name="ageRange" placeholder="e.g. 6 weeks - 17 months" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" name="capacity" type="number" min="1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input id="schedule" name="schedule" placeholder="e.g. Full-time / Part-time" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tuition">Tuition</Label>
              <Input id="tuition" name="tuition" placeholder="e.g. $300/week" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activities">Features (comma separated)</Label>
              <Textarea
                id="activities"
                name="activities"
                placeholder="e.g. Tummy time, Sensory play, Music and movement"
                rows={2}
                required
              />
            </div>
          </div>
        </DialogForm>

        {/* Edit Program Dialog */}
        {selectedProgram && (
          <DialogForm
            title="Edit Program"
            description="Update program details"
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditProgram}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Program Name</Label>
                  <Input id="name" name="name" defaultValue={selectedProgram.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ageRange">Age Range</Label>
                  <Input id="ageRange" name="ageRange" defaultValue={selectedProgram.ageRange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={selectedProgram.description}
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    defaultValue={selectedProgram.capacity}
                    min="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input id="schedule" name="schedule" defaultValue={selectedProgram.schedule} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tuition">Tuition</Label>
                <Input id="tuition" name="tuition" defaultValue={selectedProgram.tuition} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activities">Features (comma separated)</Label>
                <Textarea
                  id="activities"
                  name="activities"
                  defaultValue={selectedProgram.features.join(", ")}
                  rows={2}
                  required
                />
              </div>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  )
}

