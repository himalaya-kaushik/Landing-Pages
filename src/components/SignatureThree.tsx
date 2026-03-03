"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import type { FeaturedDish } from "@/lib/supabase/types";

/** Stagger delay between dish card animations. */
const CARD_STAGGER_SECONDS = 0.15;

/**
 * @description "Signature Three" section showcasing three featured dishes
 * from the menu. Each dish card has a large image, name, description,
 * and price. Matches the "Signature Three: Menu Highlights" Stitch screen.
 *
 * @param {Object} props
 * @param {FeaturedDish[]} props.dishes - Array of featured dishes to display.
 * @returns {JSX.Element} The signature dishes section.
 */
export default function SignatureThree({
  dishes,
}: Readonly<{
  dishes: FeaturedDish[];
}>) {
  return (
    <section id="menu" className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <span
            className="text-sm font-semibold tracking-[0.2em]
              uppercase text-falcon-gold mb-4 block"
          >
            Chef&apos;s Selection
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Signature Three
          </h2>
          <div className="w-16 h-0.5 bg-falcon-gold mx-auto mb-6" />
          <p className="text-falcon-text-secondary max-w-xl mx-auto">
            Our most celebrated dishes, crafted with precision and
            the finest ingredients from around the world.
          </p>
        </AnimatedSection>

        {/* Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * CARD_STAGGER_SECONDS,
                ease: "easeOut",
              }}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-xl
                  bg-falcon-surface border border-falcon-border
                  hover:border-falcon-gold/40 transition-all duration-500"
              >
                {/* Dish Image */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                  {dish.image_url && (
                    <Image
                      src={dish.image_url}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform
                        duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t
                      from-falcon-surface via-transparent to-transparent"
                  />

                  {/* Category Badge */}
                  {dish.category && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 text-xs font-medium
                          tracking-wider uppercase rounded-full
                          bg-falcon-gold-muted text-falcon-gold
                          border border-falcon-gold/20"
                      >
                        {dish.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Dish Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-xl font-semibold text-white
                        group-hover:text-falcon-gold transition-colors
                        duration-300"
                    >
                      {dish.name}
                    </h3>
                    {dish.price && (
                      <span className="text-falcon-gold font-bold text-lg ml-4 shrink-0">
                        {dish.price}
                      </span>
                    )}
                  </div>
                  {dish.description && (
                    <p
                      className="text-falcon-text-secondary text-sm
                        leading-relaxed line-clamp-3"
                    >
                      {dish.description}
                    </p>
                  )}
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0
                    group-hover:opacity-100 transition-opacity duration-500
                    pointer-events-none bg-gradient-to-t
                    from-falcon-gold/5 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
