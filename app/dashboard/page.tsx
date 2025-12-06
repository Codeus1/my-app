import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/crm/dashboard-header"
import { DashboardStats } from "@/components/crm/dashboard-stats"
import { RevenueChart } from "@/components/crm/revenue-chart"
import { RecentDeals } from "@/components/crm/recent-deals"
import { UpcomingTasks } from "@/components/crm/upcoming-tasks"

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch dashboard data
  const [{ data: deals }, { data: activities }] = await Promise.all([
    supabase
      .from("deals")
      .select("*, companies(name), contacts(first_name, last_name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("activities")
      .select("*, deals(title), contacts(first_name, last_name)")
      .eq("completed", false)
      .order("due_date", { ascending: true })
      .limit(5),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Resumen de tu actividad de ventas</p>
        </div>
        <DashboardStats />
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <RecentDeals deals={deals || []} />
        </div>
        <UpcomingTasks activities={activities || []} />
      </main>
    </div>
  )
}
