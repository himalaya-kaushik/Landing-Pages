"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Review } from "@/lib/supabase/types";
import { FALLBACK_REVIEWS } from "@/lib/fallback-data";

/**
 * @description Admin page for managing Google reviews displayed
 * on the homepage. Allows adding and deleting reviews manually.
 *
 * @returns {JSX.Element} The reviews management page.
 */
export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [newRelativeTime, setNewRelativeTime] = useState("");

  const supabase = createClient();

  /** Fetches reviews from Supabase or uses fallback data. */
  const fetchReviews = useCallback(async () => {
    if (!supabase) {
      setReviews(FALLBACK_REVIEWS);
      return;
    }

    try {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews(FALLBACK_REVIEWS);
    }
  }, [supabase]);

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description Adds a new review.
   * @param {React.FormEvent} event - Form submit event.
   */
  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!supabase) {
      const fakeReview: Review = {
        id: crypto.randomUUID(),
        author_name: newAuthor,
        rating: newRating,
        text: newText,
        relative_time: newRelativeTime || null,
        profile_photo_url: null,
        created_at: new Date().toISOString(),
      };

      setReviews([fakeReview, ...reviews]);
      resetForm();
      return;
    }

    try {
      const { error } = await supabase.from("reviews").insert({
        author_name: newAuthor,
        rating: newRating,
        text: newText,
        relative_time: newRelativeTime || null,
      });

      if (!error) {
        resetForm();
        fetchReviews();
      }
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  /** Deletes a review by ID. */
  const handleDelete = async (reviewId: string) => {
    if (!supabase) {
      setReviews(reviews.filter((item) => item.id !== reviewId));
      return;
    }

    try {
      await supabase.from("reviews").delete().eq("id", reviewId);
      fetchReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  /** Resets the form fields. */
  const resetForm = () => {
    setNewAuthor("");
    setNewRating(5);
    setNewText("");
    setNewRelativeTime("");
    setIsAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-sm text-falcon-text-secondary mt-1">
            Manage Google reviews shown on your homepage.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2.5 bg-falcon-gold
            text-falcon-black font-semibold rounded-lg text-sm
            hover:bg-falcon-gold-hover transition-colors"
        >
          <Plus size={16} />
          Add Review
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
                Author Name *
              </label>
              <input
                type="text"
                value={newAuthor}
                onChange={(event) => setNewAuthor(event.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
                placeholder="e.g. Rajesh Sharma"
              />
            </div>
            <div>
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Rating (1–5)
              </label>
              <select
                value={newRating}
                onChange={(event) =>
                  setNewRating(Number(event.target.value))
                }
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {"★".repeat(rating)} ({rating})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-falcon-text-secondary mb-1.5">
              Review Text
            </label>
            <textarea
              value={newText}
              onChange={(event) => setNewText(event.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                border border-falcon-border text-white text-sm
                focus:border-falcon-gold outline-none resize-none"
              placeholder="What did the reviewer say?"
            />
          </div>

          <div>
            <label className="block text-sm text-falcon-text-secondary mb-1.5">
              Relative Time
            </label>
            <input
              type="text"
              value={newRelativeTime}
              onChange={(event) =>
                setNewRelativeTime(event.target.value)
              }
              className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                border border-falcon-border text-white text-sm
                focus:border-falcon-gold outline-none"
              placeholder="e.g. 2 weeks ago"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-falcon-gold text-falcon-black
                font-semibold rounded-lg text-sm hover:bg-falcon-gold-hover
                transition-colors"
            >
              Add Review
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

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-5 rounded-xl bg-falcon-surface border
              border-falcon-border"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-white">
                    {review.author_name}
                  </h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={14}
                          className="fill-falcon-gold text-falcon-gold"
                        />
                      )
                    )}
                  </div>
                  {review.relative_time && (
                    <span className="text-xs text-falcon-text-muted">
                      {review.relative_time}
                    </span>
                  )}
                </div>
                {review.text && (
                  <p className="text-sm text-falcon-text-secondary line-clamp-2">
                    &ldquo;{review.text}&rdquo;
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDelete(review.id)}
                className="p-2 rounded-lg text-falcon-text-muted
                  hover:text-red-400 hover:bg-red-500/10
                  transition-colors shrink-0"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div
            className="p-12 rounded-xl bg-falcon-surface border
              border-falcon-border text-center"
          >
            <p className="text-falcon-text-secondary">
              No reviews yet. Click &quot;Add Review&quot; to add one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
