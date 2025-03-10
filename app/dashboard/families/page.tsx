"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, User, Users, Calendar, AlertCircle } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for families
const mockFamilies = [
  {
    id: "1",
    parentName: "Maria Rodriguez",
    email: "maria@example.com",
    phone: "(123) 456-7890",
    children: [
      {
        id: "c1",
        name: "Sofia Rodriguez",
        age: 3,
        program: "Preschool",
        allergies: ["Peanuts"],
      },
    ],
  },
  {
    id: "2",
    parentName: "John Smith",
    email: "john@example.com",
    phone: "(234) 567-8901",
    children: [
      {
        id: "c2",
        name: "Emma Smith",
        age: 4,
        program: "Preschool",
        allergies: [],
      },
      {
        id: "c3",
        name: "Noah Smith",
        age: 1,
        program: "Infant Care",
        allergies: ["Dairy"],
      },
    ],
  },
  {
    id: "3",
    parentName: "David Johnson",
    email: "david@example.com",
    phone: "(345) 678-9012",
    children: [
      {
        id: "c4",
        name: "Liam Johnson",
        age: 6,
        program: "School Age",
        allergies: [],
      },
    ],
  },
]

export default function FamiliesPage() {
  const [families, setFamilies] = useState(mockFamilies)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedFamily, setSelectedFamily] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("families")

  // Get all children from all families
  const allChildren = families.flatMap((family) =>
    family.children.map((child) => ({
      ...child,
      parentName: family.parentName,
      parentPhone: family.phone,
    })),
  )

  const handleAddFamily = async (data: any) => {
    const newFamily = {
      id: Date.now().toString(),
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      children: [
        {
          id: `c${Date.now()}`,
          name: data.childName,
          age: Number.parseInt(data.childAge),
          program: data.program,
          allergies: data.allergies ? data.allergies.split(",").map((a: string) => a.trim()) : [],
        },
      ],
    }

    setFamilies([...families, newFamily])
  }

  const handleEditFamily = async (data: any) => {
    if (!selectedFamily) return

    const updatedFamily = {
      ...selectedFamily,
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      children: selectedFamily.children,
    }

    setFamilies(families.map((family) => (family.id === selectedFamily.id ? updatedFamily : family)))
  }

  const handleDeleteFamily = (id: string) => {
    setFamilies(families.filter((family) => family.id !== id))
  }

  const familyColumns: ColumnDef<any>[] = [
    {
      accessorKey: "parentName",
      header: "Parent Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{row.getValue<string>("parentName").charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{row.getValue("parentName")}</div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "children",
      header: "Children",
      cell: ({ row }) => {
        const children = row.getValue<any[]>("children")
        return (
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground mr-1" />
            <span>{children.length}</span>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const family = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedFamily(family)
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
                handleDeleteFamily(family.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const childrenColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Child Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
          <span>{row.getValue<number>("age")} years</span>
        </div>
      ),
    },
    {
      accessorKey: "program",
      header: "Program",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-50">
          {row.getValue("program")}
        </Badge>
      ),
    },
    {
      accessorKey: "allergies",
      header: "Allergies",
      cell: ({ row }) => {
        const allergies = row.getValue<string[]>("allergies")
        return allergies.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {allergies.map((allergy, index) => (
              <Badge key={index} variant="outline" className="bg-red-50 text-red-600">
                <AlertCircle className="h-3 w-3 mr-1" />
                {allergy}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">None</span>
        )
      },
    },
    {
      accessorKey: "parentName",
      header: "Parent",
    },
  ]

  const handleRowClick = (family: any) => {
    setSelectedFamily(family)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Families & Children</h2>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Family
          </Button>
        </div>

        <Tabs defaultValue="families" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="families">Families</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
          </TabsList>

          <TabsContent value="families" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {families.map((family) => (
                <Card
                  key={family.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedFamily(family)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{family.parentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{family.parentName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{family.email}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{family.phone}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Children:</p>
                        <div className="space-y-1">
                          {family.children.map((child: any) => (
                            <div key={child.id} className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-blue-50">
                                {child.name}, {child.age} yrs
                              </Badge>
                              <span className="text-xs text-muted-foreground">{child.program}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DataTable columns={familyColumns} data={families} searchColumn="parentName" onRowClick={handleRowClick} />
          </TabsContent>

          <TabsContent value="children" className="space-y-4">
            <DataTable columns={childrenColumns} data={allChildren} searchColumn="name" />
          </TabsContent>
        </Tabs>

        {/* Add Family Dialog */}
        <DialogForm
          title="Add Family"
          description="Add a new family to the daycare"
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddFamily}
        >
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="parentName">Parent Name</Label>
              <Input id="parentName" name="parentName" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" required />
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">Child Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childName">Child Name</Label>
                  <Input id="childName" name="childName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childAge">Age</Label>
                  <Input id="childAge" name="childAge" type="number" min="0" max="12" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Input id="program" name="program" placeholder="e.g. Preschool" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies (comma separated)</Label>
                  <Input id="allergies" name="allergies" placeholder="e.g. Peanuts, Dairy" />
                </div>
              </div>
            </div>
          </div>
        </DialogForm>

        {/* Edit Family Dialog */}
        {selectedFamily && (
          <DialogForm
            title="Edit Family"
            description="Update family information"
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditFamily}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent Name</Label>
                <Input id="parentName" name="parentName" defaultValue={selectedFamily.parentName} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={selectedFamily.email} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={selectedFamily.phone} required />
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Children</h3>
                <div className="space-y-3">
                  {selectedFamily.children.map((child: any, index: number) => (
                    <div key={child.id} className="p-3 border rounded-md bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{child.name}</h4>
                        <Badge>{child.program}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Age: {child.age} years
                        {child.allergies.length > 0 && (
                          <div className="mt-1">
                            <span className="font-medium text-red-600">Allergies: </span>
                            {child.allergies.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  To add or edit children, please use the dedicated child management section.
                </p>
              </div>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  )
}

