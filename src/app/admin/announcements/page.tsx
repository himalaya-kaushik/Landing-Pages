"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Announcement } from "@/lib/supabase/types";
import { FALLBACK_ANNOUNCEMENTS } from "@/lib/fallback-data";

/** Available badge options for the dropdown. */
const BADGE_OPTIONS = [
  "",
  "LIVE MATCH",
  "LIVE MUSIC",
  "NEW",
  "SOLD OUT",
  "COMING SOON",
  "HAPPY HOUR",
];

/** Available grid size options. */
const GRID_SIZE_OPTIONS = [
  { value: "normal", label: "Normal (1×1)" },
  { value: "wide", label: "Wide (2×1)" },
  { value: "tall", label: "Tall (1×2)" },
];

/**
 * @description Admin CRUD page for managing bento grid announcements.
 * Lists all announcements with toggle, delete, and inline edit.
 * Includes an "Add New" form at the top.
 *
 * @returns {JSX.Element} The announcements management page.
 */
export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [newGridSize, setNewGridSize] = useState("normal");
  const [newImageUrl, setNewImageUrl] = useState("");

  const supabase = createClient();

  /** Fetches announcements from Supabase or uses fallback data. */
  const fetchAnnouncements = useCallback(async () => {
    if (!supabase) {
      setAnnouncements(FALLBACK_ANNOUNCEMENTS);
      return;
    }

    try {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("sort_order");

      if (data) {
        setAnnouncements(data);
      }
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      setAnnouncements(FALLBACK_ANNOUNCEMENTS);
    }
  }, [supabase]);

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description Adds a new announcement to Supabase.
   * @param {React.FormEvent} event - Form submit event.
   */
  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!supabase) {
      const fakeAnnouncement: Announcement = {
        id: crypto.randomUUID(),
        title: newTitle,
        description: newDescription,
        image_url: newImageUrl || null,
        badge: newBadge || null,
        is_active: true,
        sort_order: announcements.length,
        grid_size: newGridSize as Announcement["grid_size"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setAnnouncements([...announcements, fakeAnnouncement]);
      resetForm();
      return;
    }

    try {
      const { error } = await supabase.from("announcements").insert({
        title: newTitle,
        description: newDescription,
        image_url: newImageUrl || null,
        badge: newBadge || null,
        grid_size: newGridSize,
        sort_order: announcements.length,
      });

      if (!error) {
        resetForm();
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Failed to add announcement:", error);
    }
  };

  /** Toggles the is_active status of a single announcement. */
  const handleToggle = async (
    announcementId: string,
    currentStatus: boolean
  ) => {
    if (!supabase) {
      setAnnouncements(
        announcements.map((item) =>
          item.id === announcementId
            ? { ...item, is_active: !currentStatus }
            : item
        )
      );
      return;
    }

    try {
      await supabase
        .from("announcements")
        .update({ is_active: !currentStatus })
        .eq("id", announcementId);

      fetchAnnouncements();
    } catch (error) {
      console.error("Failed to toggle announcement:", error);
    }
  };

  /** Deletes an announcement by ID. */
  const handleDelete = async (announcementId: string) => {
    if (!supabase) {
      setAnnouncements(
        announcements.filter((item) => item.id !== announcementId)
      );
      return;
    }

    try {
      await supabase
        .from("announcements")
        .delete()
        .eq("id", announcementId);

      fetchAnnouncements();
    } catch (error) {
      console.error("Failed to delete announcement:", error);
    }
  };

  /** Resets the add-new form fields. */
  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewBadge("");
    setNewGridSize("normal");
    setNewImageUrl("");
    setIsAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Announcements</h1>
          <p className="text-sm text-falcon-text-secondary mt-1">
            Manage the bento grid tiles on your homepage.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2.5 bg-falcon-gold
            text-falcon-black font-semibold rounded-lg text-sm
            hover:bg-falcon-gold-hover transition-colors"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      {/* Add New Form */}
      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="mb-8 p-6 rounded-xl bg-falcon-surface
            border border-falcon-border space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Title *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
                placeholder="e.g. Live Jazz Tonight"
              />
            </div>
            <div>
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                value={newImageUrl}
                onChange={(event) => setNewImageUrl(event.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
                placeholder="https://res.cloudinary.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-falcon-text-secondary mb-1.5">
              Description
            </label>
            <textarea
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                border border-falcon-border text-white text-sm
                focus:border-falcon-gold outline-none resize-none"
              placeholder="Brief description of the announcement..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Badge
              </label>
              <select
                value={newBadge}
                onChange={(event) => setNewBadge(event.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
              >
                {BADGE_OPTIONS.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge || "None"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Grid Size
              </label>
              <select
                value={newGridSize}
                onChange={(event) => setNewGridSize(event.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
              >
                {GRID_SIZE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-falcon-gold text-falcon-black
                font-semibold rounded-lg text-sm hover:bg-falcon-gold-hover
                transition-colors"
            >
              Add Announcement
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 border border-falcon-border
                text-falcon-text-secondary rounded-lg text-sm
                hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`p-5 rounded-xl bg-falcon-surface border
              transition-all duration-200 ${
                announcement.is_active
                  ? "border-falcon-border"
                  : "border-falcon-border/50 opacity-60"
              }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white truncate">
                    {announcement.title}
                  </h3>
                  {announcement.badge && (
                    <span
                      className="px-2 py-0.5 text-xs font-bold
                        rounded-full bg-falcon-gold-muted text-falcon-gold
                        shrink-0"
                    >
                      {announcement.badge}
                    </span>
                  )}
                  <span
                    className="text-xs text-falcon-text-muted shrink-0"
                  >
                    {announcement.grid_size}
                  </span>
                </div>
                {announcement.description && (
                  <p className="text-sm text-falcon-text-secondary truncate">
                    {announcement.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Toggle Active */}
                <button
                  onClick={() =>
                    handleToggle(announcement.id, announcement.is_active)
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    announcement.is_active
                      ? "text-green-400 hover:bg-green-500/10"
                      : "text-falcon-text-muted hover:bg-falcon-dark"
                  }`}
                  title={
                    announcement.is_active ? "Deactivate" : "Activate"
                  }
                >
                  {announcement.is_active ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="p-2 rounded-lg text-falcon-text-muted
                    hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div
            className="p-12 rounded-xl bg-falcon-surface border
              border-falcon-border text-center"
          >
            <p className="text-falcon-text-secondary">
              No announcements yet. Click &quot;Add New&quot; to create your
              first bento tile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
