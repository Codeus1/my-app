import { useMemo } from "react"
import type { DemoAccount } from "./auth-service"
import { createAuthService } from "./auth-service"
import { getSupabaseBrowserClient } from "../supabase/client"

type UseAuthServiceOptions = {
  demoAccount?: DemoAccount
}

export function useAuthService(options?: UseAuthServiceOptions) {
  const demoAccount = options?.demoAccount

  return useMemo(
    () => createAuthService(getSupabaseBrowserClient(), demoAccount),
    [demoAccount?.email, demoAccount?.password, demoAccount?.redirectTo],
  )
}
