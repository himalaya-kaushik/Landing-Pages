import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import SignatureThree from "@/components/SignatureThree";
import GoogleReviews from "@/components/GoogleReviews";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  FALLBACK_ANNOUNCEMENTS,
  FALLBACK_DISHES,
  FALLBACK_REVIEWS,
} from "@/lib/fallback-data";

import type {
  Announcement,
  FeaturedDish,
  Review,
} from "@/lib/supabase/types";

/**
 * @description Fetches all landing page data from Supabase, falling
 * back to mock data if Supabase is not configured. This enables the
 * site to work in demo mode without a database.
 *
 * @returns {Promise<{ announcements: Announcement[], dishes: FeaturedDish[], reviews: Review[] }>}
 */
async function fetchPageData(): Promise<{
  announcements: Announcement[];
  dishes: FeaturedDish[];
  reviews: Review[];
}> {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      announcements: FALLBACK_ANNOUNCEMENTS,
      dishes: FALLBACK_DISHES,
      reviews: FALLBACK_REVIEWS,
    };
  }

  try {
    const [announcementsResult, dishesResult, reviewsResult] =
      await Promise.all([
        supabase
          .from("announcements")
          .select("*")
          .eq("is_active", true)
          .order("sort_order"),
        supabase
          .from("featured_dishes")
          .select("*")
          .eq("is_featured", true)
          .order("sort_order"),
        supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

    return {
      announcements: announcementsResult.data || FALLBACK_ANNOUNCEMENTS,
      dishes: dishesResult.data || FALLBACK_DISHES,
      reviews: reviewsResult.data || FALLBACK_REVIEWS,
    };
  } catch (error) {
    // Supabase fetch failed — use fallback data to keep the site running
    console.error("Failed to fetch data from Supabase:", error);
    return {
      announcements: FALLBACK_ANNOUNCEMENTS,
      dishes: FALLBACK_DISHES,
      reviews: FALLBACK_REVIEWS,
    };
  }
}

/**
 * @description The main landing page for The Falcon Cafe & Lounge.
 * Server component that fetches all content from Supabase (with
 * fallback) and renders each section in order. Optimized for SSG.
 *
 * @returns {Promise<JSX.Element>} The complete landing page.
 */
export default async function HomePage() {
  const { announcements, dishes, reviews } = await fetchPageData();

  return (
    <main>
      <Navbar />
      <HeroSection />
      <BentoGrid announcements={announcements} />
      <SignatureThree dishes={dishes} />
      <GoogleReviews reviews={reviews} />
      <LocationSection />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
