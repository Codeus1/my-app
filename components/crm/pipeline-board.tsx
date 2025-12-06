"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp } from "lucide-react"

interface Deal {
  id: string
  title: string
  value: number
  stage: string
  ai_score: number
  companies: { name: string } | null
  contacts: { first_name: string; last_name: string } | null
}

interface PipelineBoardProps {
  deals: Deal[]
}

const stages = [
  { id: "prospecting", label: "Prospección", color: "bg-gray-100" },
  { id: "qualification", label: "Calificación", color: "bg-blue-100" },
  { id: "proposal", label: "Propuesta", color: "bg-yellow-100" },
  { id: "negotiation", label: "Negociación", color: "bg-orange-100" },
  { id: "closed_won", label: "Ganado", color: "bg-green-100" },
]

export function PipelineBoard({ deals }: PipelineBoardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {stages.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage.id)
        const totalValue = stageDeals.reduce((sum, d) => sum + Number(d.value), 0)

        return (
          <div key={stage.id} className="space-y-3">
            <Card className={stage.color}>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">
                  {stage.label} ({stageDeals.length})
                </CardTitle>
                <p className="text-xs text-muted-foreground">${totalValue.toLocaleString()}</p>
              </CardHeader>
            </Card>

            <div className="space-y-2">
              {stageDeals.map((deal) => (
                <Card key={deal.id} className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium leading-tight">{deal.title}</h4>
                        {deal.ai_score > 70 && (
                          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            {deal.ai_score}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="truncate">{deal.companies?.name || "Sin empresa"}</span>
                      </div>
                      {deal.contacts && (
                        <p className="text-xs text-muted-foreground">
                          {deal.contacts.first_name} {deal.contacts.last_name}
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary">${Number(deal.value).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
