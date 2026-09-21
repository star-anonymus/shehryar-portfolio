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
  /** Blur-in adds the expensive-looking softness; turn it off in dense grids. */
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
  blur = true,
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

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: o.x * distance,
        y: o.y * distance,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, x: o.x * distance, y: o.y * distance, filter: blur ? "blur(10px)" : "blur(0px)" }
      }
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
