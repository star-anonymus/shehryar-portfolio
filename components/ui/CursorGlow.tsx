"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * A soft aurora glow that trails the cursor. Mouse-only: it never renders on
 * touch devices or when the visitor asked for reduced motion.
 */
export default function CursorGlow() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-[55] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen"
    >
      <div
        className="h-full w-full rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.20) 0%, rgba(168,85,247,0.10) 40%, rgba(0,0,0,0) 70%)",
        }}
      />
    </motion.div>
  );
}
