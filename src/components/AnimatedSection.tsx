"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * @description Reusable wrapper that applies Framer Motion scroll-triggered
 * fade-in + slide animations to its children. Uses `whileInView` with
 * configurable direction, delay, and threshold.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate.
 * @param {"up" | "down" | "left" | "right"} [props.direction="up"] - Slide direction.
 * @param {number} [props.delay=0] - Animation delay in seconds.
 * @param {number} [props.duration=0.6] - Animation duration in seconds.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} Animated wrapper div.
 *
 * @example
 * <AnimatedSection direction="up" delay={0.2}>
 *   <h2>Hello World</h2>
 * </AnimatedSection>
 */
export default function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  /** Maps direction prop to initial x/y offset values. */
  const directionOffset = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
