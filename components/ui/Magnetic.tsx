"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element is allowed to chase the cursor, in px. */
  strength?: number;
}

/**
 * Wraps an interactive element so it leans toward the cursor on hover.
 * Disabled entirely under prefers-reduced-motion and on coarse pointers.
 */
export default function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / (rect.width / 2)) * strength);
    y.set((dy / (rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
