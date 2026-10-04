"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Children, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Featured projects as a pinned horizontal gallery on large screens: the
 * section is as tall as the track is wide, the track sticks to the viewport,
 * and vertical scroll slides it sideways. Only `transform` changes, so the
 * compositor does all the work. Phones, tablets and reduced motion get a
 * plain vertical stack.
 */
export default function FeaturedRail({ children, label }: { children: React.ReactNode; label: string }) {
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  if (!wide || reduced) {
    return <div className="mx-auto max-w-6xl space-y-6 px-5 sm:px-6">{items}</div>;
  }
  return <Rail items={items} label={label} />;
}

function Rail({ items, label }: { items: React.ReactNode[]; label: string }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // How far the track has to travel: its full width minus what the viewport shows
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative" aria-label={label}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max gap-8 pl-[max(1.5rem,calc((100vw-72rem)/2))] pr-[12vw] will-change-transform">
          {items.map((item, n) => (
            <div key={n} className="w-[min(74vw,62rem)] shrink-0">
              {item}
            </div>
          ))}
        </motion.div>

        {/* Progress through the gallery */}
        <div className="mx-auto mt-10 flex w-full max-w-6xl items-center gap-4 px-6">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fog">Scroll</span>
          <div className="h-px flex-1 overflow-hidden bg-white/10">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-iris-400" />
          </div>
          <span className="font-mono text-[0.68rem] text-fog">{String(items.length).padStart(2, "0")} projects</span>
        </div>
      </div>
    </div>
  );
}
