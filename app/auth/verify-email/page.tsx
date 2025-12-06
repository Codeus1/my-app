import { Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle>Verifica tu email</CardTitle>
          <CardDescription>Hemos enviado un enlace de verificación a tu correo electrónico</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Por favor revisa tu bandeja de entrada y haz clic en el enlace de verificación para activar tu cuenta.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/login">Volver al login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
