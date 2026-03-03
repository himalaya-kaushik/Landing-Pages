import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * @description Creates a Supabase client for use in server components,
 * server actions, and route handlers. Reads cookies for auth session.
 * Returns null if Supabase environment variables are not configured.
 *
 * @returns {Promise<ReturnType<typeof createServerClient> | null>} Supabase server client or null.
 *
 * @example
 * const supabase = await createServerSupabaseClient();
 * if (supabase) {
 *   const { data } = await supabase.from('announcements').select('*');
 * }
 */
export async function createServerSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return null;
    }

    const cookieStore = await cookies();

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // setAll is called from Server Components where cookies
                    // can't be set — this is expected and safe to ignore.
                }
            },
        },
    });
}
