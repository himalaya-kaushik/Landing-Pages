"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * @description Full-viewport splash hero that covers the screen on
 * initial load. As the user scrolls down, the image fades out and
 * scales slightly, then disappears entirely once fully scrolled past.
 * A small scroll-down indicator animates at the bottom to invite
 * interaction.
 *
 * @returns {JSX.Element} The splash hero section.
 *
 * @example
 * <SplashHero />
 */
export function SplashHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /**
     * Calculate how far the user has scrolled through the splash
     * section. A value of 0 means "at top, fully visible" and 1
     * means "scrolled past, fully hidden".
     */
    const handleScroll = () => {
      if (!sectionRef.current) {
        return;
      }

      const sectionHeight = sectionRef.current.offsetHeight;
      const currentScroll = window.scrollY;

      /* Clamp between 0 and 1 */
      const progress = Math.min(Math.max(currentScroll / sectionHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFullyScrolledPast = scrollProgress >= 1;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full"
      aria-label="Welcome splash"
    >
      {/* Fixed overlay that fades and scales on scroll */}
      <div
        className="fixed inset-0 z-40"
        style={{
          opacity: 1 - scrollProgress,
          transform: `scale(${1 + scrollProgress * 0.08})`,
          pointerEvents: isFullyScrolledPast ? "none" : "auto",
          willChange: "opacity, transform",
          visibility: isFullyScrolledPast ? "hidden" : "visible",
        }}
      >
        <Image
          src="/images/main_image.jpg"
          alt="Falcon Cafe & Lounge — warm ambient dining"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Dark gradient for the scroll indicator and branding legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Logo + restaurant name centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image
            src="/logo/logo.png"
            alt="Falcon Cafe & Lounge logo"
            width={120}
            height={120}
            className="object-contain drop-shadow-lg"
            priority
          />
          <h1 className="mt-4 text-center text-4xl font-bold tracking-wide text-white drop-shadow-lg sm:text-5xl">
            Falcon Cafe & Lounge
          </h1>
          <p className="mt-3 text-center text-lg text-white/80 drop-shadow-md">
            The Perfect Landing for Good Times
          </p>
        </div>

        {/* Scroll indicator — bouncing arrow at the bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex animate-bounce flex-col items-center gap-1 text-white/70">
            <p className="text-xs font-medium uppercase tracking-[0.2em]">
              Scroll down
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
