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

  // Performance: this used to move with left/top (a layout every mouse move),
  // carry a 90px blur filter and blend over the whole page with
  // mix-blend-screen — together they re-composited every element under it on
  // every scroll frame. It now moves on the GPU with a transform, sits behind
  // the content instead of over it, and gets its softness from the gradient
  // alone, so no filter or blend is needed.
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 -z-[5] -ml-[280px] -mt-[280px] h-[560px] w-[560px] rounded-full will-change-transform"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(63,216,240,0.13) 0%, rgba(182,242,58,0.03) 35%, rgba(7,8,12,0) 68%)",
        }}
      />
    </motion.div>
  );
}
