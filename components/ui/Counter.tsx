"use client";

import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/** Counts up from zero the first time it scrolls into view. */
export default function Counter({ value, suffix = "", duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    motionVal.set(value);
  }, [inView, reduced, motionVal, value, suffix]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      0{suffix}
    </span>
  );
}
