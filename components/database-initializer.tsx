"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { initializeDatabase } from "@/lib/firebase-service"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useFirebaseData } from "./firebase-data-provider"

export function DatabaseInitializer() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null)
  const { refreshData } = useFirebaseData()

  const handleInitialize = async () => {
    setIsInitializing(true)
    setResult(null)

    try {
      const result = await initializeDatabase()
      setResult(result)

      if (result.success) {
        // Refresh data after successful initialization
        await refreshData()
      }
    } catch (error) {
      console.error("Error initializing database:", error)
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Firebase Database Setup</CardTitle>
        <CardDescription>Initialize your Firebase database with sample data for the daycare website</CardDescription>
      </CardHeader>
      <CardContent>
        {result && (
          <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
            {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}
        <p className="text-sm text-muted-foreground mb-4">
          This will populate your Firebase database with sample data for activities, staff, programs, menu items, and
          gallery images. Only run this once to avoid duplicate data.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleInitialize} disabled={isInitializing} className="w-full">
          {isInitializing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initializing...
            </>
          ) : (
            "Initialize Database"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

