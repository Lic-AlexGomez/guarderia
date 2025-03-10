import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { FirebaseDataProvider } from "@/components/firebase-data-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FirebaseDataProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <div className="flex-1 w-full">{children}</div>
        </div>
      </SidebarProvider>
    </FirebaseDataProvider>
  )
}

