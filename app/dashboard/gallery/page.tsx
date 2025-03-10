"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { GalleryManager } from "@/components/dashboard/gallery-manager"

export default function GalleryPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Gallery Management</h2>
        </div>

        <p className="text-muted-foreground">
          Upload and manage images for the daycare website gallery. Images will be displayed in their respective
          categories.
        </p>

        <GalleryManager />
      </div>
    </div>
  )
}

