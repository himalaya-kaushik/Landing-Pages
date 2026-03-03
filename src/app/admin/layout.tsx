"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Megaphone,
  UtensilsCrossed,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * @description Sidebar navigation items for the admin dashboard.
 * Each maps to a route under /admin.
 */
const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Dishes", href: "/admin/dishes", icon: UtensilsCrossed },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

/**
 * @description Admin dashboard layout with sidebar navigation and
 * authentication guard. Redirects to /admin/login if not authenticated.
 * Features a collapsible sidebar on mobile.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Admin page content.
 * @returns {JSX.Element} The admin layout with sidebar.
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* If we're on the login page, skip the auth check and render children directly */
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false);
      setIsAuthenticated(true);
      return;
    }

    /**
     * Checks if the user has an active Supabase session.
     * If Supabase is not configured, grants access by default (dev mode).
     */
    async function checkAuth() {
      const supabase = createClient();

      if (!supabase) {
        // No Supabase configured — allow access for dev/demo
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }

      setIsLoading(false);
    }

    checkAuth();
  }, [router, isLoginPage]);

  /** Signs out and redirects to the login page. */
  const handleSignOut = async () => {
    const supabase = createClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/admin/login");
  };

  /* Login page renders without the sidebar chrome */
  if (isLoginPage) {
    return <>{children}</>;
  }

  /* Loading state */
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-falcon-black flex items-center
          justify-center"
      >
        <div
          className="w-8 h-8 border-2 border-falcon-gold
            border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  /* Not authenticated — the redirect is already happening */
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-falcon-black flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-falcon-dark border-r border-falcon-border
          flex flex-col transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-falcon-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-widest text-falcon-gold">
              FALCON
            </span>
            <span className="text-xs text-falcon-text-muted font-medium">
              ADMIN
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-falcon-text-secondary"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg
                  text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-falcon-gold-muted text-falcon-gold border border-falcon-gold/20"
                      : "text-falcon-text-secondary hover:text-white hover:bg-falcon-surface"
                  }`}
              >
                <IconComponent size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-falcon-border">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg
              text-sm text-falcon-text-secondary hover:text-red-400
              hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 mt-1
              text-xs text-falcon-text-muted hover:text-falcon-gold
              transition-colors duration-200"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar (Mobile) */}
        <header
          className="lg:hidden sticky top-0 z-30 bg-falcon-dark/95
            backdrop-blur-xl border-b border-falcon-border
            px-4 py-3 flex items-center justify-between"
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-falcon-text-secondary hover:text-falcon-gold"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold tracking-widest text-falcon-gold">
            FALCON ADMIN
          </span>
          <div className="w-9" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
