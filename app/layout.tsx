import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/lib/auth-context"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AnalyticsProvider } from "@/components/analytics-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Laly's Family Group Daycare",
  description: "A safe and fun place for your child's development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full min-h-screen`}>
        <AuthProvider>
          <SidebarProvider>
            <AnalyticsProvider>
              <div className="w-full min-h-screen">{children}</div>
              <Toaster />
            </AnalyticsProvider>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'