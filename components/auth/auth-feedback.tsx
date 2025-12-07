"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export type Feedback = { type: "error" | "success"; message: string } | null

type Props = {
  feedback: Feedback
}

export function AuthFeedback({ feedback }: Props) {
  if (!feedback) return null
  const isSuccess = feedback.type === "success"
  const variant = isSuccess ? "default" : "destructive"
  const extraClasses = isSuccess ? "border-green-200 bg-green-50 text-green-900" : ""
  const iconClasses = isSuccess ? "text-green-600" : ""

  return (
    <Alert variant={variant} className={extraClasses}>
      <AlertCircle className={`h-4 w-4 ${iconClasses}`} />
      <AlertDescription>{feedback.message}</AlertDescription>
    </Alert>
  )
}
