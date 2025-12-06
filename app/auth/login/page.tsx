"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const DEMO_EMAIL = "salespro.demo.user@gmail.com"
const DEMO_PASSWORD = "Demo123456!"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleDemoLogin = async () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    const supabase = getSupabaseBrowserClient()

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("La cuenta demo no existe aún. Haz clic en 'Crear Cuenta Demo' primero.")
        } else {
          throw error
        }
        setIsLoading(false)
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al iniciar sesión")
      setIsLoading(false)
    }
  }

  const handleCreateDemoAccount = async () => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    const supabase = getSupabaseBrowserClient()

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      })

      if (!loginError) {
        // Login exitoso, la cuenta ya existía
        router.push("/dashboard")
        router.refresh()
        return
      }

      // Si no existe, crear la cuenta
      const { data, error } = await supabase.auth.signUp({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: "Usuario Demo",
            company: "SalesPro Demo",
          },
        },
      })

      if (error) throw error

      if (data.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        })

        if (!signInError) {
          router.push("/dashboard")
          router.refresh()
          return
        }

        // Si requiere confirmación de email
        setSuccessMessage(
          "Cuenta demo creada. Si tu Supabase requiere confirmación de email, revisa tu bandeja de entrada.",
        )
        setEmail(DEMO_EMAIL)
        setPassword(DEMO_PASSWORD)
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("already registered")) {
        setError("La cuenta demo ya existe. Usa 'Acceso Demo Rápido' para entrar.")
      } else {
        setError(error instanceof Error ? error.message : "Error al crear cuenta demo")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = getSupabaseBrowserClient()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/dashboard")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">SalesPro CRM</h1>
          <p className="mt-2 text-muted-foreground">Gestión de ventas con inteligencia artificial</p>
        </div>

        <Alert className="mb-4 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
            <strong>Primera vez?</strong> Haz clic en "Crear Cuenta Demo" para empezar.
            <br />
            <strong>Ya tienes cuenta?</strong> Usa "Acceso Demo Rápido".
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder al CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-900">{successMessage}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Acceso rápido</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  type="button"
                  variant="default"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleCreateDemoAccount}
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : "Crear Cuenta Demo"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  Acceso Demo Rápido
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              ¿No tienes cuenta?{" "}
              <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">Demo: {DEMO_EMAIL}</p>
      </div>
    </div>
  )
}
