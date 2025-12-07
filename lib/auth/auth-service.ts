import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '../supabase/client';

export type AuthCredentials = {
    email: string;
    password: string;
};

export type RegisterPayload = AuthCredentials & {
    companyName?: string;
    redirectTo?: string;
};

export type AuthResult =
    | { ok: true; message?: string; needsEmailConfirmation?: boolean }
    | { ok: false; message: string };

export interface AuthService {
    login(credentials: AuthCredentials): Promise<AuthResult>;
    register(payload: RegisterPayload): Promise<AuthResult>;
    loginDemo(): Promise<AuthResult>;
    ensureDemoAccount(): Promise<AuthResult>;
}

export type DemoAccount = {
    email: string;
    password: string;
    profile?: Record<string, string>;
    redirectTo?: string;
};

export const DEMO_ACCOUNT: DemoAccount = {
    email: process.env.NEXT_PUBLIC_DEMO_EMAIL || '',
    password: 'Demo123456!',
    profile: {
        full_name: 'Usuario Demo',
        company: 'SalesPro Demo',
    },
};

const mapErrorMessage = (error: unknown, fallback: string) => {
    if (typeof error === 'string') return error;
    if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
    ) {
        return (error as { message: string }).message;
    }
    return fallback;
};

export const createAuthService = (
    client?: SupabaseClient,
    demoAccount: DemoAccount = DEMO_ACCOUNT
): AuthService => {
    const supabase = client ?? getSupabaseBrowserClient();

    const login = async ({
        email,
        password,
    }: AuthCredentials): Promise<AuthResult> => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            return {
                ok: false,
                message: mapErrorMessage(error, 'No se pudo iniciar sesion'),
            };
        }
        return { ok: true };
    };

    const register = async ({
        email,
        password,
        companyName,
        redirectTo,
    }: RegisterPayload): Promise<AuthResult> => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectTo,
                data: companyName ? { company_name: companyName } : undefined,
            },
        });

        if (error) {
            return {
                ok: false,
                message: mapErrorMessage(error, 'No se pudo crear la cuenta'),
            };
        }

        return { ok: true };
    };

    const loginDemo = async (): Promise<AuthResult> => {
        const result = await login({
            email: demoAccount.email,
            password: demoAccount.password,
        });
        if (
            !result.ok &&
            result.message.toLowerCase().includes('invalid login credentials')
        ) {
            return {
                ok: false,
                message:
                    'La cuenta demo no existe todavia. Crea la cuenta demo primero.',
            };
        }
        return result;
    };

    const ensureDemoAccount = async (): Promise<AuthResult> => {
        const alreadyExists = await loginDemo();
        if (alreadyExists.ok) return alreadyExists;

        const { data, error } = await supabase.auth.signUp({
            email: demoAccount.email,
            password: demoAccount.password,
            options: {
                emailRedirectTo: demoAccount.redirectTo,
                data: demoAccount.profile,
            },
        });

        if (error) {
            return {
                ok: false,
                message: mapErrorMessage(
                    error,
                    'No se pudo crear la cuenta demo'
                ),
            };
        }

        if (data.user) {
            const signIn = await loginDemo();
            if (signIn.ok)
                return { ok: true, message: 'Cuenta demo creada y conectada.' };
        }

        return {
            ok: true,
            needsEmailConfirmation: true,
            message:
                'Cuenta demo creada. Si tu proyecto exige confirmar correo, revisa tu bandeja de entrada.',
        };
    };

    return {
        login,
        register,
        loginDemo,
        ensureDemoAccount,
    };
};
