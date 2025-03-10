"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  ImageIcon,
  MessageSquare,
  Utensils,
  GraduationCap,
  Bus,
  ChevronRight,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      href: "/dashboard",
    },
    {
      title: "Programs",
      icon: <GraduationCap className="w-4 h-4" />,
      href: "/dashboard/programs",
    },
    {
      title: "Children & Parents",
      icon: <Users className="w-4 h-4" />,
      href: "/dashboard/families",
    },
    {
      title: "Staff",
      icon: <Users className="w-4 h-4" />,
      href: "/dashboard/staff",
    },
    {
      title: "Activities",
      icon: <Calendar className="w-4 h-4" />,
      href: "/dashboard/activities",
    },
    {
      title: "Menu Planning",
      icon: <Utensils className="w-4 h-4" />,
      href: "/dashboard/menu",
    },
    {
      title: "Transportation",
      icon: <Bus className="w-4 h-4" />,
      href: "/dashboard/transportation",
    },
    {
      title: "Documents",
      icon: <FileText className="w-4 h-4" />,
      href: "/dashboard/documents",
    },
    {
      title: "Gallery",
      icon: <ImageIcon className="w-4 h-4" />,
      href: "/dashboard/gallery",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="w-4 h-4" />,
      href: "/dashboard/messages",
    },
    {
      title: "Settings",
      icon: <Settings className="w-4 h-4" />,
      href: "/dashboard/settings",
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b py-4">
        <div className="flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lg2-XG1rQl7r3mifoMe0TwQ3Z6eivF9jFW.png"
            alt="Laly's Family Group Daycare Logo"
            width={150}
            height={67}
            className="h-12 w-auto"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.title}
                  className={
                    pathname === item.href ? "bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-green-500/20" : ""
                  }
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Logout">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

