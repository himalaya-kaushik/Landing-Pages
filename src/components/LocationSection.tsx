"use client";

import { Wifi, Car, Plug } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

/**
 * @description Amenity features displayed alongside the location info.
 * Each has an icon, title, and short description.
 */
const AMENITIES = [
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Gigabit connectivity for seamless work.",
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Complimentary valet service for diners.",
  },
  {
    icon: Plug,
    title: "Work-Friendly",
    description: "Quiet zones and power outlets available.",
  },
];

/** Google Maps embed URL for Sector 16, Panchkula. */
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.5!2d76.8606!3d30.6942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQxJzM5LjEiTiA3NsKwNTEnMzguMiJF!5e0!3m2!1sen!2sin!4v1234567890";

/** Google Maps directions URL. */
const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=30.6942,76.8606&destination_place_id=TheFlacon+Cafe+Panchkula";

/**
 * @description "Visit The Falcon" section showing location details,
 * operating hours, an embedded Google Map, and amenity badges.
 * Matches the "Visit Us: Location & Hours" Stitch screen.
 *
 * @returns {JSX.Element} The location section.
 */
export default function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14">
          <span
            className="text-sm font-semibold tracking-[0.2em]
              uppercase text-falcon-gold mb-4 block"
          >
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Visit The Falcon
          </h2>
          <p className="text-falcon-text-secondary max-w-lg mx-auto">
            Experience luxury dining in the heart of the city. We are open
            every day to serve you the finest culinary experiences.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Embed */}
          <AnimatedSection direction="left" delay={0.1}>
            <div
              className="relative rounded-xl overflow-hidden
                border border-falcon-border h-[350px] lg:h-full min-h-[350px]"
            >
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Falcon Cafe & Lounge location — Sector 16, Panchkula"
              />
            </div>
          </AnimatedSection>

          {/* Location Details */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="flex flex-col gap-8">
              {/* Address */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  The Falcon Cafe &amp; Lounge
                </h3>
                <p className="text-falcon-text-secondary">
                  SCO 45-46, Sector 16, Panchkula
                  <br />
                  Haryana 134109, India
                </p>
              </div>

              {/* Operating Hours */}
              <div
                className="p-6 rounded-xl bg-falcon-surface
                  border border-falcon-border"
              >
                <h4
                  className="text-sm font-semibold tracking-[0.15em]
                    uppercase text-falcon-gold mb-4"
                >
                  Operating Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-falcon-text-secondary">
                      Mon – Sun
                    </span>
                    <span className="text-white font-medium">
                      8:30 AM – 11:00 PM
                    </span>
                  </div>
                  <div
                    className="flex justify-between pt-2 border-t
                      border-falcon-border"
                  >
                    <span className="text-falcon-gold">Happy Hour</span>
                    <span className="text-falcon-gold font-medium">
                      4:00 PM – 7:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="grid grid-cols-3 gap-4">
                {AMENITIES.map((amenity) => {
                  const IconComponent = amenity.icon;
                  return (
                    <div
                      key={amenity.title}
                      className="text-center p-4 rounded-xl bg-falcon-surface
                        border border-falcon-border"
                    >
                      <IconComponent
                        size={24}
                        className="mx-auto mb-2 text-falcon-gold"
                      />
                      <p className="text-xs font-medium text-white mb-1">
                        {amenity.title}
                      </p>
                      <p className="text-xs text-falcon-text-muted hidden md:block">
                        {amenity.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <a
                id="reserve"
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2
                  px-8 py-3.5 bg-falcon-gold text-falcon-black font-semibold
                  rounded-lg hover:bg-falcon-gold-hover transition-colors
                  duration-300 text-center"
              >
                Get Directions
                <span>→</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
