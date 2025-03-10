"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, Activity, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-transparent">
          <CardTitle className="text-sm font-medium">Total Children</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">45</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500 font-medium">+4.5%</span>
            <span className="ml-1">from last month</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Capacity</span>
              <span>90%</span>
            </div>
            <Progress value={90} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-l-4 border-l-pink-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-pink-50 to-transparent">
          <CardTitle className="text-sm font-medium">Programs</CardTitle>
          <Calendar className="h-4 w-4 text-pink-500" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">4</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>Infant to School Age</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1">
            <div className="h-1.5 bg-blue-500 rounded"></div>
            <div className="h-1.5 bg-pink-500 rounded"></div>
            <div className="h-1.5 bg-green-500 rounded"></div>
            <div className="h-1.5 bg-yellow-500 rounded"></div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-transparent">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">$15,231</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500 font-medium">+20.1%</span>
            <span className="ml-1">from last month</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Monthly Target</span>
              <span>76%</span>
            </div>
            <Progress value={76} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-l-4 border-l-yellow-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-yellow-50 to-transparent">
          <CardTitle className="text-sm font-medium">Active Activities</CardTitle>
          <Activity className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">12</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500 font-medium">+3</span>
            <span className="ml-1">new this week</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Engagement</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

