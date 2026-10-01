"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * Wraps a vertical timeline and draws its spine as the reader scrolls through
 * it — a faint track, with a bright line filling it top to bottom.
 * `left` is the spine's x offset in px so it lines up with the node column.
 */
export default function TimelineRail({
  children,
  left = 23,
}: {
  children: React.ReactNode;
  left?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute bottom-4 top-4 hidden w-px bg-white/[0.07] sm:block"
        style={{ left }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-4 top-4 hidden w-px origin-top bg-gradient-to-b from-cyan-300 via-indigo-400 to-violet-400 shadow-[0_0_12px_rgba(129,140,248,0.7)] sm:block"
        style={{ left, scaleY: reduced ? 1 : scaleY }}
      />
      {children}
    </div>
  );
}
