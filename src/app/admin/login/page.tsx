"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * @description Admin login page with email/password form.
 * Uses Supabase Auth signInWithPassword. Styled to match the
 * Falcon dark-mode aesthetic.
 *
 * @returns {JSX.Element} The login page.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @description Handles form submission — authenticates with Supabase
   * or bypasses if Supabase is not configured (dev mode).
   *
   * @param {React.FormEvent} event - Form submit event.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const supabase = createClient();

    /* Dev mode — skip auth when Supabase is not configured */
    if (!supabase) {
      router.push("/admin");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/admin");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-falcon-black flex items-center
        justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <span className="text-3xl font-bold tracking-widest text-falcon-gold">
            THE FALCON
          </span>
          <p className="mt-2 text-falcon-text-secondary text-sm">
            Staff Portal Access
          </p>
        </div>

        {/* Login Card */}
        <div
          className="p-8 rounded-xl bg-falcon-surface
            border border-falcon-border"
        >
          <h1 className="text-xl font-semibold text-white mb-6">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-falcon-text-secondary mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  placeholder:text-falcon-text-muted
                  focus:border-falcon-gold focus:ring-1
                  focus:ring-falcon-gold outline-none transition-all"
                placeholder="admin@thefalconcafe.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-falcon-text-secondary mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  placeholder:text-falcon-text-muted
                  focus:border-falcon-gold focus:ring-1
                  focus:ring-falcon-gold outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                className="px-4 py-3 rounded-lg bg-red-500/10
                  border border-red-500/20 text-red-400 text-sm"
              >
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-falcon-gold text-falcon-black
                font-semibold rounded-lg hover:bg-falcon-gold-hover
                transition-colors duration-300 disabled:opacity-50
                disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <p className="text-center mt-6 text-xs text-falcon-text-muted">
          <a
            href="/"
            className="hover:text-falcon-gold transition-colors"
          >
            ← Back to The Falcon
          </a>
        </p>
      </div>
    </div>
  );
}
