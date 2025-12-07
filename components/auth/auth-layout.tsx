"use client"

import type { ReactNode } from "react"
import { Building2 } from "lucide-react"

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
  gradientClassName?: string
}

export function AuthLayout({ title, subtitle, children, footer, gradientClassName }: AuthLayoutProps) {
  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 ${gradientClassName || ""}`}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        {children}
        {footer}
      </div>
    </div>
  )
}
