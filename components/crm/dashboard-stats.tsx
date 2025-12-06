"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Target, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface Stats {
  totalRevenue: number
  openDeals: number
  conversionRate: number
  totalContacts: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    openDeals: 0,
    conversionRate: 0,
    totalContacts: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const supabase = getSupabaseBrowserClient()

      const [{ data: deals }, { data: contacts }] = await Promise.all([
        supabase.from("deals").select("value, stage"),
        supabase.from("contacts").select("id", { count: "exact" }),
      ])

      if (deals) {
        const totalRevenue = deals.filter((d) => d.stage === "closed_won").reduce((sum, d) => sum + Number(d.value), 0)
        const openDeals = deals.filter((d) => d.stage !== "closed_won" && d.stage !== "closed_lost").length
        const closedWon = deals.filter((d) => d.stage === "closed_won").length
        const conversionRate = deals.length > 0 ? (closedWon / deals.length) * 100 : 0

        setStats({
          totalRevenue,
          openDeals,
          conversionRate: Math.round(conversionRate),
          totalContacts: contacts?.length || 0,
        })
      }

      setIsLoading(false)
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Ingresos Totales",
      value: isLoading ? "..." : `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Deals Abiertos",
      value: isLoading ? "..." : stats.openDeals.toString(),
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Tasa de Conversión",
      value: isLoading ? "..." : `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Contactos",
      value: isLoading ? "..." : stats.totalContacts.toString(),
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
