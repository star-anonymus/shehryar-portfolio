"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin aurora bar pinned to the very top, filling as the page scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
    />
  );
}
