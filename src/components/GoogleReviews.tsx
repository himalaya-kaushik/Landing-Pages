"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import type { Review } from "@/lib/supabase/types";

/** Stagger delay between review card animations. */
const REVIEW_STAGGER_SECONDS = 0.1;

/**
 * @description Renders a row of star icons for a given rating.
 * Filled stars use the gold accent color, empty stars are muted.
 *
 * @param {Object} props
 * @param {number} props.rating - Number of stars (1–5).
 * @returns {JSX.Element} A row of star icons.
 */
function StarRating({ rating }: Readonly<{ rating: number }>) {
  const MAX_STARS = 5;

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: MAX_STARS }).map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < rating
              ? "fill-falcon-gold text-falcon-gold"
              : "text-falcon-text-muted"
          }
        />
      ))}
    </div>
  );
}

/**
 * @description Generates initials from a full name for avatar fallback.
 *
 * @param {string} name - The author's full name.
 * @returns {string} First letter(s) of the name, uppercased.
 *
 * @example
 * getInitials("Rajesh Sharma"); // "RS"
 */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * @description "Verified Voices" section displaying Google reviews
 * in a horizontally scrollable carousel. Each review card shows the
 * author's avatar/initials, name, star rating, review text, and
 * relative time. Matches the "Verified Voices: Google Reviews" Stitch screen.
 *
 * @param {Object} props
 * @param {Review[]} props.reviews - Array of Google reviews to display.
 * @returns {JSX.Element} The reviews section.
 */
export default function GoogleReviews({
  reviews,
}: Readonly<{
  reviews: Review[];
}>) {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-falcon-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14">
          <span
            className="text-sm font-semibold tracking-[0.2em]
              uppercase text-falcon-gold mb-4 block"
          >
            Google Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Verified Voices
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <StarRating rating={5} />
            <span className="text-falcon-text-secondary text-sm ml-1">
              4.8 out of 5
            </span>
          </div>
          <p className="text-falcon-text-secondary max-w-md mx-auto">
            Real experiences from our guests, straight from Google.
          </p>
        </AnimatedSection>

        {/* Review Cards — Horizontal Scroll on Mobile, Grid on Desktop */}
        <div
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory
            md:grid md:grid-cols-3 md:overflow-visible
            scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * REVIEW_STAGGER_SECONDS,
                ease: "easeOut",
              }}
              className="min-w-[300px] md:min-w-0 snap-start"
            >
              <div
                className="h-full p-6 rounded-xl bg-falcon-surface
                  border border-falcon-border hover:border-falcon-gold/20
                  transition-all duration-300"
              >
                {/* Author Row */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full bg-falcon-gold-muted
                      border border-falcon-gold/20 flex items-center
                      justify-center text-falcon-gold text-sm font-semibold
                      shrink-0"
                  >
                    {getInitials(review.author_name)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {review.author_name}
                    </p>
                    {review.relative_time && (
                      <p className="text-falcon-text-muted text-xs">
                        {review.relative_time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-3">
                  <StarRating rating={review.rating} />
                </div>

                {/* Review Text */}
                {review.text && (
                  <p
                    className="text-falcon-text-secondary text-sm
                      leading-relaxed line-clamp-4"
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Attribution */}
        <AnimatedSection delay={0.4} className="text-center mt-10">
          <a
            href="https://g.page/thefalconcafe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm
              text-falcon-text-secondary hover:text-falcon-gold
              transition-colors duration-300"
          >
            See all reviews on Google
            <span className="text-lg">→</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
