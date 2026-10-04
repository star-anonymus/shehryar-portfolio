"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * Text that rises out of a mask. The wrapper is what gets observed: the moving
 * line starts clipped out of sight, and a fully clipped element never reports
 * as "in view", so watching it directly would leave the text hidden for good.
 */
export default function MaskReveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const Tag = as as "div";

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`overflow-hidden pb-[0.08em] ${className}`}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: "105%" }}
        animate={reduced || inView ? { y: "0%" } : undefined}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
