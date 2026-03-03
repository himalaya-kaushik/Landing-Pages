"use client";

import { Eye, CalendarCheck, MousePointerClick, FileDown } from "lucide-react";

/**
 * @description Dashboard stats displayed on the admin overview page.
 * Placeholder values — can be hooked to analytics later.
 */
const DASHBOARD_STATS = [
  {
    label: "Total Page Views",
    value: "12,450",
    icon: Eye,
    trend: "+14%",
  },
  {
    label: "Reservations",
    value: "48",
    icon: CalendarCheck,
    trend: "+8%",
  },
  {
    label: "Button Clicks",
    value: "856",
    icon: MousePointerClick,
    trend: "+22%",
  },
  {
    label: "Menu Downloads",
    value: "142",
    icon: FileDown,
    trend: "+5%",
  },
];

/**
 * @description Admin dashboard overview page matching the
 * "Falcon Control Center Dashboard" Stitch screen. Shows stats
 * cards and a welcome message.
 *
 * @returns {JSX.Element} The admin dashboard page.
 */
export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Welcome, Falcon Team
        </h1>
        <p className="text-falcon-text-secondary">
          Here&apos;s what&apos;s happening at The Falcon today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {DASHBOARD_STATS.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-xl bg-falcon-surface
                border border-falcon-border hover:border-falcon-gold/20
                transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg bg-falcon-gold-muted
                    flex items-center justify-center"
                >
                  <IconComponent size={20} className="text-falcon-gold" />
                </div>
                <span className="text-xs font-medium text-green-400">
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-falcon-text-secondary">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-6 rounded-xl bg-falcon-surface border
            border-falcon-border"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/announcements"
              className="block px-4 py-3 rounded-lg bg-falcon-dark
                border border-falcon-border text-sm text-falcon-text-secondary
                hover:text-falcon-gold hover:border-falcon-gold/20
                transition-all duration-200"
            >
              📢 Manage Bento Grid Tiles
            </a>
            <a
              href="/admin/dishes"
              className="block px-4 py-3 rounded-lg bg-falcon-dark
                border border-falcon-border text-sm text-falcon-text-secondary
                hover:text-falcon-gold hover:border-falcon-gold/20
                transition-all duration-200"
            >
              🍽️ Update Featured Dishes
            </a>
            <a
              href="/admin/reviews"
              className="block px-4 py-3 rounded-lg bg-falcon-dark
                border border-falcon-border text-sm text-falcon-text-secondary
                hover:text-falcon-gold hover:border-falcon-gold/20
                transition-all duration-200"
            >
              ⭐ Manage Google Reviews
            </a>
            <a
              href="/admin/settings"
              className="block px-4 py-3 rounded-lg bg-falcon-dark
                border border-falcon-border text-sm text-falcon-text-secondary
                hover:text-falcon-gold hover:border-falcon-gold/20
                transition-all duration-200"
            >
              ⚙️ Site Settings & Toggles
            </a>
          </div>
        </div>

        <div
          className="p-6 rounded-xl bg-falcon-surface border
            border-falcon-border"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Live Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-falcon-text-secondary">
                Website
              </span>
              <span
                className="flex items-center gap-2 text-sm text-green-400"
              >
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-falcon-text-secondary">
                Live Match Mode
              </span>
              <span className="text-sm text-falcon-text-muted">
                Inactive
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-falcon-text-secondary">
                Active Announcements
              </span>
              <span className="text-sm text-falcon-gold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-falcon-text-secondary">
                Featured Dishes
              </span>
              <span className="text-sm text-falcon-gold">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
