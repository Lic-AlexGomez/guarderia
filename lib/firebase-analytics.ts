"use client"

import { getAnalytics } from "firebase/analytics"
import { app } from "./firebase"

// Initialize Firebase Analytics only on the client side
export function initializeAnalytics() {
  if (typeof window !== "undefined" && app) {
    try {
      const analytics = getAnalytics(app)
      console.log("Firebase Analytics initialized")
      return analytics
    } catch (error) {
      console.error("Error initializing Firebase Analytics:", error)
      return null
    }
  }
  return null
}

