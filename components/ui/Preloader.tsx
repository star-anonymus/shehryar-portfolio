"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { markIntroReady } from "@/lib/intro";

/** Hard ceiling on the intro, even if animation frames are throttled. */
const MAX_MS = 1500;

/**
 * A short first-visit intro: a counter to 100 and the name, then the curtain
 * lifts and the hero plays. Once per browser session.
 *
 * Nothing important waits on an animation finishing: the session flag and the
 * hero's go-signal are set the moment the counter ends (or MAX_MS passes), the
 * curtain lifts with a CSS transition, and a timer removes it even if
 * `transitionend` never fires (background tabs, throttled frames).
 *
 * Returning visitors and reduced-motion users never see it — the inline script
 * in the root layout adds `.intro-skip` to <html> before first paint — and a
 * <noscript> rule hides it when JavaScript is off.
 */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el || root.classList.contains("intro-skip")) {
      markIntroReady();
      return;
    }

    let finished = false;
    let cancelled = false;
    const timers: number[] = [];

    const counter = animate(0, 100, {
      duration: 1.1,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
    });

    const finish = () => {
      if (finished || cancelled) return;
      finished = true;
      counter.stop();
      if (countRef.current) countRef.current.textContent = "100";
      try {
        sessionStorage.setItem("sa-intro", "1");
      } catch {
        /* private mode — the intro simply plays again next time */
      }
      // The hero starts while the curtain is still moving; the overlap is
      // what makes the hand-off read as one motion.
      markIntroReady();
      el.classList.add("is-leaving");
      const hide = () => root.classList.add("intro-skip");
      el.addEventListener("transitionend", hide, { once: true });
      timers.push(window.setTimeout(hide, 1000));
    };

    counter.then(finish);
    timers.push(window.setTimeout(finish, MAX_MS));

    return () => {
      cancelled = true;
      counter.stop();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-ink-950 px-6 py-8 sm:px-10 sm:py-10"
    >
      <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.25em] text-fog">
        <span>Portfolio</span>
        <span>© 2026</span>
      </div>

      <div className="text-center">
        <p className="font-display text-[clamp(2.4rem,8vw,5.5rem)] font-bold leading-none tracking-[-0.04em] text-chalk">
          Shehryar <span className="text-aurora">Ahmed</span>
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-mist/70">
          Full-Stack Software Engineer
        </p>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-fog">Loading</span>
        <span
          ref={countRef}
          className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-tight text-chalk/90 tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
