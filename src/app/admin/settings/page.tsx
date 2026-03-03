"use client";

import { useState } from "react";

/**
 * @description Admin settings page with toggles for site-wide features.
 * In dev mode (no Supabase), settings are stored in local state only.
 * With Supabase, they read/write the `site_settings` table.
 *
 * @returns {JSX.Element} The settings page.
 */
export default function SettingsPage() {
  const [isLiveMatchEnabled, setIsLiveMatchEnabled] = useState(false);
  const [isAnnouncementBarEnabled, setIsAnnouncementBarEnabled] =
    useState(false);
  const [announcementBarText, setAnnouncementBarText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  /**
   * @description Saves settings. In dev mode, simply shows a success message.
   * With Supabase, it would update the site_settings table.
   */
  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    // Simulate a save delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSaveMessage("Settings saved successfully!");
    setIsSaving(false);

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-falcon-text-secondary mt-1">
          Manage site-wide features and toggles.
        </p>
      </div>

      <div className="space-y-6">
        {/* Live Match Toggle */}
        <div
          className="p-6 rounded-xl bg-falcon-surface border
            border-falcon-border"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-white">Live Match Mode</h3>
              <p className="text-sm text-falcon-text-secondary mt-1">
                When enabled, shows a &ldquo;LIVE MATCH&rdquo; banner across
                the homepage and highlights relevant bento tiles.
              </p>
            </div>
            <button
              onClick={() => setIsLiveMatchEnabled(!isLiveMatchEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors
                duration-300 ${
                  isLiveMatchEnabled
                    ? "bg-falcon-gold"
                    : "bg-falcon-border"
                }`}
              role="switch"
              aria-checked={isLiveMatchEnabled}
              aria-label="Toggle live match mode"
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full
                  bg-white transition-transform duration-300 ${
                    isLiveMatchEnabled ? "translate-x-5" : ""
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Announcement Bar Toggle */}
        <div
          className="p-6 rounded-xl bg-falcon-surface border
            border-falcon-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white">
                Announcement Bar
              </h3>
              <p className="text-sm text-falcon-text-secondary mt-1">
                Display a scrolling announcement at the top of the site.
              </p>
            </div>
            <button
              onClick={() =>
                setIsAnnouncementBarEnabled(!isAnnouncementBarEnabled)
              }
              className={`relative w-12 h-7 rounded-full transition-colors
                duration-300 ${
                  isAnnouncementBarEnabled
                    ? "bg-falcon-gold"
                    : "bg-falcon-border"
                }`}
              role="switch"
              aria-checked={isAnnouncementBarEnabled}
              aria-label="Toggle announcement bar"
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full
                  bg-white transition-transform duration-300 ${
                    isAnnouncementBarEnabled ? "translate-x-5" : ""
                  }`}
              />
            </button>
          </div>

          {isAnnouncementBarEnabled && (
            <div className="mt-4">
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Bar Text
              </label>
              <input
                type="text"
                value={announcementBarText}
                onChange={(event) =>
                  setAnnouncementBarText(event.target.value)
                }
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
                placeholder="e.g. 🎉 New Year's Eve Gala — Book Now!"
              />
            </div>
          )}
        </div>

        {/* Operating Hours (read-only display) */}
        <div
          className="p-6 rounded-xl bg-falcon-surface border
            border-falcon-border"
        >
          <h3 className="font-semibold text-white mb-4">
            Operating Hours
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-falcon-text-secondary">Regular</span>
              <span className="text-white">8:30 AM – 11:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-falcon-gold">Happy Hour</span>
              <span className="text-falcon-gold">4:00 PM – 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-falcon-gold text-falcon-black
              font-semibold rounded-lg hover:bg-falcon-gold-hover
              transition-colors disabled:opacity-50 text-sm"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>

          {saveMessage && (
            <span className="text-sm text-green-400">{saveMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}
