"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { FeaturedDish } from "@/lib/supabase/types";
import { FALLBACK_DISHES } from "@/lib/fallback-data";

/**
 * @description Admin CRUD page for managing featured dishes
 * displayed in the Signature Three section on the homepage.
 *
 * @returns {JSX.Element} The dishes management page.
 */
export default function DishesPage() {
  const [dishes, setDishes] = useState<FeaturedDish[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const supabase = createClient();

  /** Fetches featured dishes from Supabase or uses fallback. */
  const fetchDishes = useCallback(async () => {
    if (!supabase) {
      setDishes(FALLBACK_DISHES);
      return;
    }

    try {
      const { data } = await supabase
        .from("featured_dishes")
        .select("*")
        .order("sort_order");

      if (data) {
        setDishes(data);
      }
    } catch (error) {
      console.error("Failed to fetch dishes:", error);
      setDishes(FALLBACK_DISHES);
    }
  }, [supabase]);

  useEffect(() => {
    fetchDishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description Adds a new featured dish.
   * @param {React.FormEvent} event - Form submit event.
   */
  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!supabase) {
      const fakeDish: FeaturedDish = {
        id: crypto.randomUUID(),
        name: newName,
        description: newDescription,
        price: newPrice || null,
        image_url: newImageUrl || null,
        category: newCategory || null,
        is_featured: true,
        sort_order: dishes.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setDishes([...dishes, fakeDish]);
      resetForm();
      return;
    }

    try {
      const { error } = await supabase.from("featured_dishes").insert({
        name: newName,
        description: newDescription,
        price: newPrice || null,
        image_url: newImageUrl || null,
        category: newCategory || null,
        sort_order: dishes.length,
      });

      if (!error) {
        resetForm();
        fetchDishes();
      }
    } catch (error) {
      console.error("Failed to add dish:", error);
    }
  };

  /** Deletes a dish by ID. */
  const handleDelete = async (dishId: string) => {
    if (!supabase) {
      setDishes(dishes.filter((item) => item.id !== dishId));
      return;
    }

    try {
      await supabase.from("featured_dishes").delete().eq("id", dishId);
      fetchDishes();
    } catch (error) {
      console.error("Failed to delete dish:", error);
    }
  };

  /** Resets the form fields. */
  const resetForm = () => {
    setNewName("");
    setNewDescription("");
    setNewPrice("");
    setNewCategory("");
    setNewImageUrl("");
    setIsAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Featured Dishes</h1>
          <p className="text-sm text-falcon-text-secondary mt-1">
            Manage the Signature Three section on your homepage.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2.5 bg-falcon-gold
            text-falcon-black font-semibold rounded-lg text-sm
            hover:bg-falcon-gold-hover transition-colors"
        >
          <Plus size={16} />
          Add Dish
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
                Dish Name *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
                placeholder="e.g. Truffle Wagyu Steak"
              />
            </div>
            <div>
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Price
              </label>
              <input
                type="text"
                value={newPrice}
                onChange={(event) => setNewPrice(event.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
                placeholder="e.g. ₹2,450"
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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-falcon-text-secondary mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-falcon-dark
                  border border-falcon-border text-white text-sm
                  focus:border-falcon-gold outline-none"
                placeholder="e.g. Main Course"
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

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-falcon-gold text-falcon-black
                font-semibold rounded-lg text-sm hover:bg-falcon-gold-hover
                transition-colors"
            >
              Add Dish
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

      {/* Dishes List */}
      <div className="space-y-3">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="p-5 rounded-xl bg-falcon-surface border
              border-falcon-border"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-white">
                    {dish.name}
                  </h3>
                  {dish.price && (
                    <span className="text-falcon-gold font-bold text-sm">
                      {dish.price}
                    </span>
                  )}
                  {dish.category && (
                    <span
                      className="px-2 py-0.5 text-xs rounded-full
                        bg-falcon-gold-muted text-falcon-gold"
                    >
                      {dish.category}
                    </span>
                  )}
                </div>
                {dish.description && (
                  <p className="text-sm text-falcon-text-secondary truncate">
                    {dish.description}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDelete(dish.id)}
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

        {dishes.length === 0 && (
          <div
            className="p-12 rounded-xl bg-falcon-surface border
              border-falcon-border text-center"
          >
            <p className="text-falcon-text-secondary">
              No featured dishes yet. Click &quot;Add Dish&quot; to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
