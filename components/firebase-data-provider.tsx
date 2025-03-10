"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getActivities, getStaff, getPrograms, getMenu, getGallery } from "@/lib/firebase-service"
import type { Activity, StaffMember, Program, MenuItem, GalleryImage } from "@/lib/types"

interface FirebaseDataContextType {
  activities: Activity[]
  staff: StaffMember[]
  programs: Program[]
  menu: MenuItem[]
  gallery: GalleryImage[]
  isLoading: boolean
  error: Error | null
  refreshData: () => Promise<void>
}

const FirebaseDataContext = createContext<FirebaseDataContextType | undefined>(undefined)

export function FirebaseDataProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchAllData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [activitiesData, staffData, programsData, menuData, galleryData] = await Promise.all([
        getActivities(),
        getStaff(),
        getPrograms(),
        getMenu(),
        getGallery(),
      ])

      setActivities(activitiesData)
      setStaff(staffData)
      setPrograms(programsData)
      setMenu(menuData)
      setGallery(galleryData)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch data"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const refreshData = async () => {
    await fetchAllData()
  }

  return (
    <FirebaseDataContext.Provider
      value={{
        activities,
        staff,
        programs,
        menu,
        gallery,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </FirebaseDataContext.Provider>
  )
}

export function useFirebaseData() {
  const context = useContext(FirebaseDataContext)
  if (context === undefined) {
    throw new Error("useFirebaseData must be used within a FirebaseDataProvider")
  }
  return context
}

