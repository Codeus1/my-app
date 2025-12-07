"use client"

import { useEffect, useState } from "react"
import { DollarSign, Target, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchDashboardStats, type DashboardStatsData } from "@/lib/dashboard/dashboard-service"

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsData>({
    totalRevenue: 0,
    openDeals: 0,
    conversionRate: 0,
    totalContacts: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const nextStats = await fetchDashboardStats()
      setStats(nextStats)
      setIsLoading(false)
    }
    load()
  }, [])

  const statCards = [
    { title: "Ingresos Totales", value: isLoading ? "..." : `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Deals Abiertos", value: isLoading ? "..." : stats.openDeals.toString(), icon: Target, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Tasa de Conversion", value: isLoading ? "..." : `${stats.conversionRate}%`, icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Total Contactos", value: isLoading ? "..." : stats.totalContacts.toString(), icon: Users, color: "text-orange-600", bgColor: "bg-orange-100" },
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
