import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/crm/dashboard-header"
import { PipelineBoard } from "@/components/crm/pipeline-board"

export default async function PipelinePage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: deals } = await supabase
    .from("deals")
    .select("*, companies(name), contacts(first_name, last_name)")
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline de Ventas</h1>
          <p className="text-muted-foreground">Visualiza y gestiona tus oportunidades de venta</p>
        </div>
        <PipelineBoard deals={deals || []} />
      </main>
    </div>
  )
}
