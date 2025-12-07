"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthFeedback, type Feedback } from "./auth-feedback"
import { DemoActions } from "./demo-actions"

type LoginFormProps = {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  feedback: Feedback
  isLoading: boolean
  onCreateDemo: () => Promise<void>
  onAccessDemo: () => Promise<void>
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  feedback,
  isLoading,
  onCreateDemo,
  onAccessDemo,
}: LoginFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar sesion</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder al CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
            />
          </div>

          <AuthFeedback feedback={feedback} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesion..." : "Iniciar sesion"}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Acceso rapido</span>
            </div>
          </div>

          <DemoActions isLoading={isLoading} onCreateDemo={onCreateDemo} onAccessDemo={onAccessDemo} />
        </form>
      </CardContent>
    </Card>
  )
}
