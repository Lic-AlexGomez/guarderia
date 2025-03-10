"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, DollarSign, Activity, BookOpen, Clock, TrendingUp, BarChart4 } from "lucide-react"
import { programs, staffMembers, activities } from "@/lib/data"

export default function DashboardPage() {
  // Calculate some stats for the dashboard
  const totalChildren = 32 // This would come from your database in a real app
  const totalFamilies = 24
  const totalStaff = staffMembers.length
  const totalPrograms = programs.length
  const totalActivities = activities.length
  const occupancyRate = 85 // Percentage

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Children</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChildren}</div>
              <p className="text-xs text-muted-foreground">{totalFamilies} families enrolled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-green-500" style={{ width: `${occupancyRate}%` }}></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStaff}</div>
              <p className="text-xs text-muted-foreground">{staffMembers[0].name} (Director)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Programs</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPrograms}</div>
              <p className="text-xs text-muted-foreground">{totalActivities} activities planned</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Enrollment by Program</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="space-y-4">
                    {programs.map((program) => (
                      <div key={program.id} className="flex items-center">
                        <div className="w-1/3 font-medium">{program.name}</div>
                        <div className="w-2/3">
                          <div className="flex items-center gap-2">
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              {/* Random percentage for demo */}
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{
                                  width: `${Math.floor(Math.random() * 40) + 60}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {Math.floor(Math.random() * 5) + 5}/{program.capacity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Activities</CardTitle>
                  <CardDescription>Activities scheduled for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{activity.duration}</span>
                            <span>•</span>
                            <span>{activity.ageGroup}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Enrollments</CardTitle>
                  <CardDescription>New children enrolled in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Emma Garcia", age: 3, program: "Preschool", date: "2023-12-01" },
                      { name: "Noah Smith", age: 1, program: "Infant Care", date: "2023-11-28" },
                      { name: "Olivia Johnson", age: 4, program: "Preschool", date: "2023-11-15" },
                    ].map((child, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {child.age} years • {child.program}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">{new Date(child.date).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staff Schedule</CardTitle>
                  <CardDescription>Today's staff schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffMembers.map((staff) => (
                      <div key={staff.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {staff.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-muted-foreground">{staff.position}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                            {Math.random() > 0.5 ? "8AM-4PM" : "9AM-5PM"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>Monthly revenue and expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span>Monthly Revenue</span>
                      </div>
                      <span className="font-bold">$32,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-red-500" />
                        <span>Monthly Expenses</span>
                      </div>
                      <span className="font-bold">$24,800</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-500" />
                        <span>Net Profit</span>
                      </div>
                      <span className="font-bold text-green-600">$7,650</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Occupancy Target</span>
                        <span>90%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${occupancyRate}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View detailed analytics and trends</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <BarChart4 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                      Detailed analytics will be displayed here, showing enrollment trends, attendance patterns, and
                      financial metrics over time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and download reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Attendance Report", description: "Daily and monthly attendance records" },
                      { title: "Financial Report", description: "Revenue and expense breakdown" },
                      { title: "Staff Report", description: "Staff hours and performance" },
                      { title: "Enrollment Report", description: "Current and historical enrollment data" },
                      { title: "Incident Report", description: "Health and safety incidents" },
                      { title: "Parent Communication", description: "Communication logs with parents" },
                    ].map((report, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Last generated: 3 days ago</span>
                            <Activity className="h-4 w-4 text-blue-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

