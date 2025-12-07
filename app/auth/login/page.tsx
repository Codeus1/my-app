"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { useMemo, useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { LoginForm } from "@/components/auth/login-form"
import type { Feedback } from "@/components/auth/auth-feedback"
import { DEMO_ACCOUNT } from "@/lib/auth/auth-service"
import { useAuthService } from "@/lib/auth/use-auth-service"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [isLoading, setIsLoading] = useState(false)

  const redirectTo = useMemo(() => {
    const envRedirect = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
    if (envRedirect) return envRedirect
    if (typeof window !== "undefined") return `${window.location.origin}/dashboard`
    return undefined
  }, [])
  const authService = useAuthService({ demoAccount: { ...DEMO_ACCOUNT, redirectTo } })

  const redirectToDashboard = () => {
    router.push("/dashboard")
    router.refresh()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFeedback(null)

    try {
      const result = await authService.login({ email, password })
      if (!result.ok) {
        setFeedback({ type: "error", message: result.message })
        return
      }
      redirectToDashboard()
    } catch (err: unknown) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Error al iniciar sesion" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setEmail(DEMO_ACCOUNT.email)
    setPassword(DEMO_ACCOUNT.password)
    setIsLoading(true)
    setFeedback(null)

    try {
      const result = await authService.loginDemo()
      if (!result.ok) {
        setFeedback({ type: "error", message: result.message })
        return
      }
      redirectToDashboard()
    } catch (err: unknown) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Error al iniciar sesion" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateDemoAccount = async () => {
    setIsLoading(true)
    setFeedback(null)

    try {
      const result = await authService.ensureDemoAccount()
      if (!result.ok) {
        setFeedback({ type: "error", message: result.message })
        return
      }

      if (result.needsEmailConfirmation) {
        setEmail(DEMO_ACCOUNT.email)
        setPassword(DEMO_ACCOUNT.password)
        setFeedback({
          type: "success",
          message:
            result.message ||
            "Cuenta demo creada. Si tu proyecto requiere confirmar correo, revisa tu bandeja de entrada.",
        })
        return
      }

      redirectToDashboard()
    } catch (err: unknown) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Error al crear cuenta demo" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="SalesPro CRM"
      subtitle="Gestion de ventas con inteligencia artificial"
      footer={<p className="mt-4 text-center text-xs text-muted-foreground">Demo: {DEMO_ACCOUNT.email}</p>}
    >
      <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-2 text-sm text-blue-900">
          <AlertCircle className="mt-0.5 h-4 w-4 text-blue-600" />
          <div>
            <p>
              <strong>Primera vez?</strong> Haz clic en &quot;Crear Cuenta Demo&quot; para empezar.
            </p>
            <p>
              <strong>Ya tienes cuenta?</strong> Usa &quot;Acceso Demo Rapido&quot;.
            </p>
          </div>
        </div>
      </div>

      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        feedback={feedback}
        isLoading={isLoading}
        onCreateDemo={handleCreateDemoAccount}
        onAccessDemo={handleDemoLogin}
      />

      <div className="mt-4 text-center text-sm">
        No tienes cuenta?{" "}
        <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
          Registrate aqui
        </Link>
      </div>
    </AuthLayout>
  )
}
