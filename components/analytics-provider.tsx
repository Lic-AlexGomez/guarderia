"use client"

import type React from "react"

import { useEffect } from "react"
import { initializeAnalytics } from "@/lib/firebase-analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Firebase Analytics
    initializeAnalytics()
  }, [])

  return <>{children}</>
}

