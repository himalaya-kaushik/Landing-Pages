"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * @description Creates a Supabase client for use in browser/client components.
 * Returns null if Supabase environment variables are not configured,
 * enabling the fallback data mode.
 *
 * @returns {ReturnType<typeof createBrowserClient> | null} Supabase client or null.
 *
 * @example
 * const supabase = createClient();
 * if (supabase) {
 *   const { data } = await supabase.from('announcements').select('*');
 * }
 */
export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return null;
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
