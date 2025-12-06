"use client"

import { Building2, Bell, Settings, LogOut, LayoutDashboard, Users, Briefcase, ListChecks } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface DashboardHeaderProps {
  user: {
    email?: string
    user_metadata?: {
      company_name?: string
    }
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const initials =
    user.email
      ?.split("@")[0]
      .split(".")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "US"

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">SalesPro</span>
        </Link>

        <nav className="ml-8 hidden gap-6 md:flex">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/pipeline"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <Briefcase className="h-4 w-4" />
            Pipeline
          </Link>
          <Link
            href="/dashboard/contacts"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <Users className="h-4 w-4" />
            Contactos
          </Link>
          <Link
            href="/dashboard/tasks"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <ListChecks className="h-4 w-4" />
            Tareas
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.user_metadata?.company_name || "Mi Empresa"}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
