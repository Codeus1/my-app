"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { RegisterForm } from "@/components/auth/register-form"
import type { Feedback } from "@/components/auth/auth-feedback"
import { useAuthService } from "@/lib/auth/use-auth-service"

type RegisterFormState = {
  email: string
  password: string
  confirmPassword: string
  companyName: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState<RegisterFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  })
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [isLoading, setIsLoading] = useState(false)
  const redirectTo = useMemo(() => {
    const envRedirect = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
    if (envRedirect) return envRedirect
    if (typeof window !== "undefined") return `${window.location.origin}/dashboard`
    return undefined
  }, [])
  const authService = useAuthService()

  const handleChange = (field: keyof RegisterFormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFeedback(null)

    if (form.password !== form.confirmPassword) {
      setFeedback({ type: "error", message: "Las contrasenas no coinciden" })
      setIsLoading(false)
      return
    }

    try {
      const result = await authService.register({
        email: form.email,
        password: form.password,
        companyName: form.companyName,
        redirectTo,
      })

      if (!result.ok) {
        setFeedback({ type: "error", message: result.message })
      } else {
        router.push("/auth/verify-email")
      }
    } catch (err: unknown) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Error al registrarse" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="SalesPro CRM" subtitle="Comienza tu prueba gratuita de 14 dias">
      <RegisterForm form={form} onChange={handleChange} onSubmit={handleRegister} feedback={feedback} isLoading={isLoading} />
      <div className="mt-4 text-center text-sm">
        Ya tienes cuenta?{" "}
        <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
          Inicia sesion
        </Link>
      </div>
    </AuthLayout>
  )
}
