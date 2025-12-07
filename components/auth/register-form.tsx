"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthFeedback, type Feedback } from "./auth-feedback"

type RegisterFormState = {
  email: string
  password: string
  confirmPassword: string
  companyName: string
}

type RegisterFormProps = {
  form: RegisterFormState
  onChange: (field: keyof RegisterFormState, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  feedback: Feedback
  isLoading: boolean
}

export function RegisterForm({ form, onChange, onSubmit, feedback, isLoading }: RegisterFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>Registrate para acceder al CRM empresarial</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Nombre de la empresa</Label>
            <Input
              id="company"
              type="text"
              placeholder="Tu Empresa S.A."
              value={form.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email corporativo</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@empresa.com"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => onChange("password", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar contrasena</Label>
            <Input
              id="confirm-password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => onChange("confirmPassword", e.target.value)}
              required
            />
          </div>

          <AuthFeedback feedback={feedback} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
