import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

interface Deal {
  id: string
  title: string
  value: number
  stage: string
  companies: { name: string } | null
}

interface RecentDealsProps {
  deals: Deal[]
}

const stageColors: Record<string, string> = {
  prospecting: "bg-gray-100 text-gray-800",
  qualification: "bg-blue-100 text-blue-800",
  proposal: "bg-yellow-100 text-yellow-800",
  negotiation: "bg-orange-100 text-orange-800",
  closed_won: "bg-green-100 text-green-800",
  closed_lost: "bg-red-100 text-red-800",
}

const stageLabels: Record<string, string> = {
  prospecting: "Prospección",
  qualification: "Calificación",
  proposal: "Propuesta",
  negotiation: "Negociación",
  closed_won: "Ganado",
  closed_lost: "Perdido",
}

export function RecentDeals({ deals }: RecentDealsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos Deals</CardTitle>
        <CardDescription>Actividad reciente en tu pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deals.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No hay deals recientes</p>
          ) : (
            deals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{deal.title}</p>
                    <p className="text-sm text-muted-foreground">{deal.companies?.name || "Sin empresa"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className={stageColors[deal.stage]}>
                    {stageLabels[deal.stage]}
                  </Badge>
                  <p className="font-semibold">${Number(deal.value).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
