import type { SupabaseClient } from "@supabase/supabase-js"
import { getSupabaseBrowserClient } from "../supabase/client"

export type DashboardStatsData = {
  totalRevenue: number
  openDeals: number
  conversionRate: number
  totalContacts: number
}

type DealsRow = { value: number | null; stage: string | null }

export async function fetchDashboardStats(client?: SupabaseClient): Promise<DashboardStatsData> {
  const supabase = client ?? getSupabaseBrowserClient()

  const [{ data: deals }, { count: contactsCount }] = await Promise.all([
    supabase.from("deals").select("value, stage"),
    supabase.from("contacts").select("id", { count: "exact", head: true }),
  ])

  if (!deals || !Array.isArray(deals)) {
    return { totalRevenue: 0, openDeals: 0, conversionRate: 0, totalContacts: contactsCount || 0 }
  }

  const totalRevenue = deals.filter((d) => d.stage === "closed_won").reduce((sum, d: DealsRow) => sum + Number(d.value || 0), 0)
  const openDeals = deals.filter((d) => d.stage !== "closed_won" && d.stage !== "closed_lost").length
  const closedWon = deals.filter((d) => d.stage === "closed_won").length
  const conversionRate = deals.length > 0 ? Math.round((closedWon / deals.length) * 100) : 0

  return {
    totalRevenue,
    openDeals,
    conversionRate,
    totalContacts: contactsCount || 0,
  }
}
