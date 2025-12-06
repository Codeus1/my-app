import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Phone, Mail, UsersIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Activity {
  id: string
  type: string
  subject: string
  due_date: string | null
  deals: { title: string } | null
  contacts: { first_name: string; last_name: string } | null
}

interface UpcomingTasksProps {
  activities: Activity[]
}

const typeIcons: Record<string, any> = {
  call: Phone,
  email: Mail,
  meeting: UsersIcon,
  task: Calendar,
}

const typeColors: Record<string, string> = {
  call: "bg-blue-100 text-blue-800",
  email: "bg-purple-100 text-purple-800",
  meeting: "bg-green-100 text-green-800",
  task: "bg-orange-100 text-orange-800",
}

const typeLabels: Record<string, string> = {
  call: "Llamada",
  email: "Email",
  meeting: "Reunión",
  task: "Tarea",
  note: "Nota",
}

export function UpcomingTasks({ activities }: UpcomingTasksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Tareas</CardTitle>
        <CardDescription>Actividades pendientes para los próximos días</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No hay tareas pendientes</p>
          ) : (
            activities.map((activity) => {
              const Icon = typeIcons[activity.type] || Calendar
              return (
                <div key={activity.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.contacts
                          ? `${activity.contacts.first_name} ${activity.contacts.last_name}`
                          : activity.deals?.title || "Sin asignar"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={typeColors[activity.type]}>
                      {typeLabels[activity.type]}
                    </Badge>
                    {activity.due_date && (
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(activity.due_date), "dd MMM", { locale: es })}
                      </p>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
