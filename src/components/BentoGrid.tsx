"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import type { Announcement } from "@/lib/supabase/types";

/** Stagger delay between bento tile animations. */
const TILE_STAGGER_SECONDS = 0.1;

/**
 * @description Maps grid_size values to CSS grid classes for the bento layout.
 * 'wide' tiles span two columns, 'tall' tiles span two rows.
 *
 * @param {string} gridSize - The grid_size value from the announcement.
 * @returns {string} Tailwind grid span classes.
 */
function getGridClasses(gridSize: string): string {
  switch (gridSize) {
    case "wide":
      return "md:col-span-2";
    case "tall":
      return "md:row-span-2";
    default:
      return "";
  }
}

/**
 * @description Returns badge styling based on the badge text.
 * Live badges get a pulsing animation, others get static gold styling.
 *
 * @param {string} badge - The badge text.
 * @returns {string} Tailwind classes for the badge.
 */
function getBadgeClasses(badge: string): string {
  const lowerBadge = badge.toLowerCase();
  const isLive = lowerBadge.includes("live");

  if (isLive) {
    return "bg-red-500/90 text-white animate-pulse-gold";
  }

  if (lowerBadge.includes("sold out")) {
    return "bg-falcon-text-muted text-white";
  }

  return "bg-falcon-gold/90 text-falcon-black";
}

/**
 * @description "Falcon Live" bento grid section showing dynamic
 * announcements fetched from Supabase. Each tile has an image,
 * optional badge overlay, title, and description. Layout matches
 * the "Falcon Live: Bento Updates" Stitch screen.
 *
 * @param {Object} props
 * @param {Announcement[]} props.announcements - Array of active announcements.
 * @returns {JSX.Element} The bento grid section.
 */
export default function BentoGrid({
  announcements,
}: Readonly<{
  announcements: Announcement[];
}>) {
  return (
    <section id="live" className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Live pulse indicator */}
            <span className="relative flex h-3 w-3">
              <span
                className="absolute inline-flex h-full w-full rounded-full
                  bg-red-400 opacity-75 animate-ping"
              />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span
              className="text-sm font-semibold tracking-[0.2em]
                uppercase text-falcon-gold"
            >
              Falcon Live
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What&apos;s Happening Now
          </h2>
          <p className="text-falcon-text-secondary max-w-xl mx-auto">
            Stay updated with events, specials, and live entertainment
            at The Falcon.
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5
            auto-rows-[280px] md:auto-rows-[260px]"
        >
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * TILE_STAGGER_SECONDS,
                ease: "easeOut",
              }}
              className={`group relative overflow-hidden rounded-xl
                bg-falcon-surface border border-falcon-border
                hover:border-falcon-gold/30 transition-all duration-500
                cursor-pointer ${getGridClasses(announcement.grid_size)}`}
            >
              {/* Tile Background Image */}
              {announcement.image_url && (
                <Image
                  src={announcement.image_url}
                  alt={announcement.title}
                  fill
                  className="object-cover transition-transform duration-700
                    group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t
                  from-falcon-black/90 via-falcon-black/40 to-transparent"
              />

              {/* Badge */}
              {announcement.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-3 py-1 text-xs font-bold tracking-wider
                      uppercase rounded-full ${getBadgeClasses(announcement.badge)}`}
                  >
                    {announcement.badge}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-lg font-semibold text-white mb-1.5">
                  {announcement.title}
                </h3>
                {announcement.description && (
                  <p
                    className="text-sm text-falcon-text-secondary
                      line-clamp-2 leading-relaxed"
                  >
                    {announcement.description}
                  </p>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  bg-gradient-to-t from-falcon-gold/5 to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
