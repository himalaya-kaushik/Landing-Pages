"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/** Stagger delay between child element animations. */
const STAGGER_DELAY_SECONDS = 0.15;

/**
 * @description Full-viewport hero section with a background image,
 * animated headline ("Culinary Elevation"), subtitle, and dual CTA
 * buttons. Matches the "Hero: Culinary Elevation" Stitch screen.
 *
 * @returns {JSX.Element} The hero section.
 */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80"
          alt="The Falcon Cafe & Lounge — premium dining interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-falcon-black/70 via-falcon-black/50 to-falcon-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Pre-headline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span
            className="inline-block px-4 py-1.5 text-xs font-semibold
              tracking-[0.2em] uppercase text-falcon-gold
              border border-falcon-gold/30 rounded-full
              bg-falcon-gold-muted"
          >
            Est. Panchkula
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: STAGGER_DELAY_SECONDS * 2,
          }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-bold tracking-tight leading-none mb-6"
        >
          <span
            className="bg-gradient-to-r from-falcon-gold via-white to-falcon-gold
              bg-clip-text text-transparent"
          >
            Culinary
          </span>
          <br />
          <span className="text-white">Elevation</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: STAGGER_DELAY_SECONDS * 4,
          }}
          className="text-lg md:text-xl text-falcon-text-secondary
            max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Panchkula&apos;s Finest Lounge &amp; Kitchen
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: STAGGER_DELAY_SECONDS * 5,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#reserve"
            className="px-8 py-3.5 bg-falcon-gold text-falcon-black
              font-semibold rounded-lg hover:bg-falcon-gold-hover
              transition-all duration-300 hover:shadow-lg
              hover:shadow-falcon-gold/20 text-base w-full sm:w-auto
              text-center"
          >
            Book a Table
          </a>
          <a
            href="#menu"
            className="px-8 py-3.5 border border-falcon-gold/40
              text-falcon-gold font-semibold rounded-lg
              hover:bg-falcon-gold-muted transition-all duration-300
              text-base w-full sm:w-auto text-center"
          >
            Explore Menu
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-falcon-text-secondary/30
            rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-falcon-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
