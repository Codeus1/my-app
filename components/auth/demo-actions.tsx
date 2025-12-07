"use client"

import { Button } from "@/components/ui/button"

type DemoActionsProps = {
  isLoading: boolean
  onCreateDemo: () => Promise<void>
  onAccessDemo: () => Promise<void>
}

export function DemoActions({ isLoading, onCreateDemo, onAccessDemo }: DemoActionsProps) {
  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="default"
        className="w-full bg-green-600 hover:bg-green-700"
        onClick={onCreateDemo}
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Crear Cuenta Demo"}
      </Button>
      <Button type="button" variant="outline" className="w-full bg-transparent" onClick={onAccessDemo} disabled={isLoading}>
        Acceso Demo Rapido
      </Button>
    </div>
  )
}
