"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, MapPin, Bus, Clock, User } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for transportation routes
const mockRoutes = [
  {
    id: "1",
    name: "Morning Pickup - North Route",
    areas: ["Bronx North", "Fordham"],
    schedule: "7:00 AM - 8:00 AM",
    driver: "Michael Johnson",
    capacity: 8,
    currentChildren: 6,
    stops: [
      { location: "2145 Bronx Park East", time: "7:15 AM" },
      { location: "1823 Morris Avenue", time: "7:30 AM" },
      { location: "2560 Decatur Avenue", time: "7:45 AM" },
    ],
  },
  {
    id: "2",
    name: "Morning Pickup - South Route",
    areas: ["Bronx South", "Hunts Point"],
    schedule: "7:15 AM - 8:15 AM",
    driver: "Sarah Williams",
    capacity: 8,
    currentChildren: 5,
    stops: [
      { location: "985 Southern Boulevard", time: "7:20 AM" },
      { location: "1240 Lafayette Avenue", time: "7:35 AM" },
      { location: "875 Longwood Avenue", time: "7:50 AM" },
    ],
  },
  {
    id: "3",
    name: "Afternoon Dropoff - North Route",
    areas: ["Bronx North", "Fordham"],
    schedule: "5:00 PM - 6:00 PM",
    driver: "Michael Johnson",
    capacity: 8,
    currentChildren: 6,
    stops: [
      { location: "2145 Bronx Park East", time: "5:15 PM" },
      { location: "1823 Morris Avenue", time: "5:30 PM" },
      { location: "2560 Decatur Avenue", time: "5:45 PM" },
    ],
  },
]

export default function TransportationPage() {
  const [routes, setRoutes] = useState(mockRoutes)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("routes")

  const handleAddRoute = async (data: any) => {
    const newRoute = {
      id: Date.now().toString(),
      name: data.name,
      areas: data.areas.split(",").map((area: string) => area.trim()),
      schedule: data.schedule,
      driver: data.driver,
      capacity: Number.parseInt(data.capacity),
      currentChildren: Number.parseInt(data.currentChildren || 0),
      stops: [
        { location: data.stop1Location, time: data.stop1Time },
        ...(data.stop2Location ? [{ location: data.stop2Location, time: data.stop2Time }] : []),
        ...(data.stop3Location ? [{ location: data.stop3Location, time: data.stop3Time }] : []),
      ].filter((stop) => stop.location && stop.time),
    }

    setRoutes([...routes, newRoute])
  }

  const handleEditRoute = async (data: any) => {
    if (!selectedRoute) return

    const updatedRoute = {
      ...selectedRoute,
      name: data.name,
      areas: data.areas.split(",").map((area: string) => area.trim()),
      schedule: data.schedule,
      driver: data.driver,
      capacity: Number.parseInt(data.capacity),
      currentChildren: Number.parseInt(data.currentChildren || 0),
    }

    setRoutes(routes.map((route) => (route.id === selectedRoute.id ? updatedRoute : route)))
  }

  const handleDeleteRoute = (id: string) => {
    setRoutes(routes.filter((route) => route.id !== id))
  }

  const routeColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Route Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "areas",
      header: "Areas",
      cell: ({ row }) => {
        const areas = row.getValue<string[]>("areas")
        return (
          <div className="flex flex-wrap gap-1">
            {areas.map((area, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50">
                {area}
              </Badge>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "schedule",
      header: "Schedule",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground mr-1" />
          <span>{row.getValue("schedule")}</span>
        </div>
      ),
    },
    {
      accessorKey: "driver",
      header: "Driver",
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: ({ row }) => {
        const capacity = row.getValue<number>("capacity")
        const currentChildren = row.original.currentChildren
        const percentage = Math.round((currentChildren / capacity) * 100)

        return (
          <div className="flex items-center gap-2">
            <span>
              {currentChildren}/{capacity}
            </span>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-yellow-500" : "bg-green-500"}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const route = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedRoute(route)
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
                handleDeleteRoute(route.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleRowClick = (route: any) => {
    setSelectedRoute(route)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Transportation</h2>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Route
          </Button>
        </div>

        <Tabs defaultValue="routes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {routes.map((route) => (
                <Card
                  key={route.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedRoute(route)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <Badge variant={route.name.includes("Pickup") ? "default" : "secondary"}>
                        {route.name.includes("Pickup") ? "Pickup" : "Dropoff"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {route.areas.map((area: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{route.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{route.driver}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bus className="h-4 w-4 text-pink-500" />
                        <span className="text-sm">
                          {route.currentChildren}/{route.capacity} children
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Stops:</p>
                        <div className="space-y-1">
                          {route.stops.map((stop: any, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm">{stop.location}</p>
                                <p className="text-xs text-muted-foreground">{stop.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DataTable columns={routeColumns} data={routes} searchColumn="name" onRowClick={handleRowClick} />
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video w-full rounded-md overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48285.82323339416!2d-73.92984620043218!3d40.852854017818856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f4c11708e5a7%3A0x68b5a6f4cd6e5e3!2sBronx%2C%20NY!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Transportation Routes Map"
                  ></iframe>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Route Legend</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {routes.map((route) => (
                      <div key={route.id} className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full ${route.name.includes("North") ? "bg-blue-500" : "bg-pink-500"}`}
                        ></div>
                        <span>{route.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Route Dialog */}
        <DialogForm
          title="Add Transportation Route"
          description="Add a new transportation route"
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddRoute}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Route Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input id="schedule" name="schedule" placeholder="e.g. 7:00 AM - 8:00 AM" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="areas">Areas Covered (comma separated)</Label>
              <Input id="areas" name="areas" placeholder="e.g. Bronx North, Fordham" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driver">Driver</Label>
                <Input id="driver" name="driver" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Vehicle Capacity</Label>
                <Input id="capacity" name="capacity" type="number" min="1" max="20" defaultValue="8" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentChildren">Current Children</Label>
              <Input id="currentChildren" name="currentChildren" type="number" min="0" defaultValue="0" required />
            </div>
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">Stops</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stop1Location">Stop 1 Location</Label>
                    <Input id="stop1Location" name="stop1Location" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stop1Time">Stop 1 Time</Label>
                    <Input id="stop1Time" name="stop1Time" placeholder="e.g. 7:15 AM" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stop2Location">Stop 2 Location (optional)</Label>
                    <Input id="stop2Location" name="stop2Location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stop2Time">Stop 2 Time</Label>
                    <Input id="stop2Time" name="stop2Time" placeholder="e.g. 7:30 AM" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stop3Location">Stop 3 Location (optional)</Label>
                    <Input id="stop3Location" name="stop3Location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stop3Time">Stop 3 Time</Label>
                    <Input id="stop3Time" name="stop3Time" placeholder="e.g. 7:45 AM" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogForm>

        {/* Edit Route Dialog */}
        {selectedRoute && (
          <DialogForm
            title="Edit Transportation Route"
            description="Update route information"
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditRoute}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Route Name</Label>
                  <Input id="name" name="name" defaultValue={selectedRoute.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input id="schedule" name="schedule" defaultValue={selectedRoute.schedule} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="areas">Areas Covered (comma separated)</Label>
                <Input id="areas" name="areas" defaultValue={selectedRoute.areas.join(", ")} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driver">Driver</Label>
                  <Input id="driver" name="driver" defaultValue={selectedRoute.driver} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Vehicle Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    max="20"
                    defaultValue={selectedRoute.capacity}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentChildren">Current Children</Label>
                <Input
                  id="currentChildren"
                  name="currentChildren"
                  type="number"
                  min="0"
                  defaultValue={selectedRoute.currentChildren}
                  required
                />
              </div>
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Stops</h3>
                <div className="space-y-3">
                  {selectedRoute.stops.map((stop: any, index: number) => (
                    <div key={index} className="p-3 border rounded-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{stop.location}</h4>
                          <p className="text-sm text-muted-foreground">{stop.time}</p>
                        </div>
                        <Badge variant="outline">{`Stop ${index + 1}`}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  To edit stops, please use the dedicated route management section.
                </p>
              </div>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  )
}

