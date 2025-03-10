"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { staffMembers } from "@/lib/data"
import type { Staff } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>(staffMembers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)

  const handleAddStaff = async (data: any) => {
    const newStaff: Staff = {
      id: Date.now().toString(),
      name: data.name,
      position: data.position,
      bio: data.bio,
      certifications: data.certifications.split(",").map((cert: string) => cert.trim()),
      image: data.image || "/placeholder.svg",
    }

    setStaffList([...staffList, newStaff])
  }

  const handleEditStaff = async (data: any) => {
    if (!selectedStaff) return

    const updatedStaff: Staff = {
      ...selectedStaff,
      name: data.name,
      position: data.position,
      bio: data.bio,
      certifications: data.certifications.split(",").map((cert: string) => cert.trim()),
      image: data.image || selectedStaff.image,
    }

    setStaffList(staffList.map((staff) => (staff.id === selectedStaff.id ? updatedStaff : staff)))
  }

  const handleDeleteStaff = (id: string) => {
    setStaffList(staffList.filter((staff) => staff.id !== id))
  }

  const columns: ColumnDef<Staff>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.image} alt={row.getValue("name")} />
            <AvatarFallback>{row.getValue<string>("name").charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{row.getValue("name")}</div>
        </div>
      ),
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "certifications",
      header: "Certifications",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.certifications.slice(0, 2).map((cert, index) => (
            <Badge key={index} variant="outline" className="bg-green-50">
              {cert}
            </Badge>
          ))}
          {row.original.certifications.length > 2 && (
            <Badge variant="outline">+{row.original.certifications.length - 2} more</Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const staffMember = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedStaff(staffMember)
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
                handleDeleteStaff(staffMember.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleRowClick = (staffMember: Staff) => {
    setSelectedStaff(staffMember)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Staff Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {staffList.map((staffMember) => (
            <Card
              key={staffMember.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedStaff(staffMember)
                setIsEditDialogOpen(true)
              }}
            >
              <CardHeader className="pb-2 flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={staffMember.image} alt={staffMember.name} />
                  <AvatarFallback className="text-lg">{staffMember.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{staffMember.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{staffMember.position}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{staffMember.bio}</p>
                <div>
                  <p className="text-sm font-medium mb-2">Certifications:</p>
                  <div className="flex flex-wrap gap-1">
                    {staffMember.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DataTable columns={columns} data={staffList} searchColumn="name" onRowClick={handleRowClick} />

        {/* Add Staff Dialog */}
        <DialogForm
          title="Add Staff Member"
          description="Add a new staff member to the daycare"
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddStaff}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" name="position" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" rows={3} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications (comma separated)</Label>
              <Textarea
                id="certifications"
                name="certifications"
                placeholder="e.g. CPR & First Aid, Early Childhood Education Degree"
                rows={2}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Profile Image URL (optional)</Label>
              <Input id="image" name="image" placeholder="/placeholder.svg" />
            </div>
          </div>
        </DialogForm>

        {/* Edit Staff Dialog */}
        {selectedStaff && (
          <DialogForm
            title="Edit Staff Member"
            description="Update staff member details"
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditStaff}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={selectedStaff.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" name="position" defaultValue={selectedStaff.position} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" defaultValue={selectedStaff.bio} rows={3} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications (comma separated)</Label>
                <Textarea
                  id="certifications"
                  name="certifications"
                  defaultValue={selectedStaff.certifications.join(", ")}
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input id="image" name="image" defaultValue={selectedStaff.image} />
              </div>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  )
}

