"use client";

import { MapPin, CalendarCheck } from "lucide-react";

/** Google Maps directions URL for the CTA. */
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=30.6942,76.8606";

/**
 * @description Sticky bottom CTA bar visible only on mobile screens.
 * Shows "Book Table" and "Get Directions" buttons side-by-side
 * with a frosted-glass background. Hidden on md+ breakpoints.
 *
 * @returns {JSX.Element} The mobile sticky CTA bar.
 */
export default function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden
        bg-falcon-dark/95 backdrop-blur-xl
        border-t border-falcon-border
        px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <div className="flex gap-3">
        {/* Book Table Button */}
        <a
          href="#reserve"
          className="flex-1 flex items-center justify-center gap-2
            px-4 py-3 bg-falcon-gold text-falcon-black
            font-semibold rounded-lg text-sm
            active:scale-95 transition-transform duration-150"
        >
          <CalendarCheck size={16} />
          Book Table
        </a>

        {/* Get Directions Button */}
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2
            px-4 py-3 border border-falcon-gold/40
            text-falcon-gold font-semibold rounded-lg text-sm
            active:scale-95 transition-transform duration-150"
        >
          <MapPin size={16} />
          Directions
        </a>
      </div>
    </div>
  );
}
