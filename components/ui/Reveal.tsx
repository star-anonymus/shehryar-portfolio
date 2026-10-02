"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Distance travelled in px. */
  distance?: number;
  /** Blur-in animates a filter, which repaints every frame — opt in only for a few hero-level elements. */
  blur?: boolean;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "header";
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 28,
  blur = false,
  once = true,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -8% 0px" });
  const reduced = useReducedMotion();

  const MotionTag = motion[as] as typeof motion.div;
  const o = offsets[direction];

  if (reduced) {
    return (
      <MotionTag ref={ref} className={className}>
        {children}
      </MotionTag>
    );
  }

  // Without blur, leave `filter` out entirely — even "blur(0px)" keeps the
  // element on the filter path.
  const hidden = { opacity: 0, x: o.x * distance, y: o.y * distance, ...(blur && { filter: "blur(10px)" }) };
  const shown = { opacity: 1, x: 0, y: 0, ...(blur && { filter: "blur(0px)" }) };

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
