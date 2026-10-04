"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Briefcase, Code2 } from "lucide-react";
import { useRef } from "react";
import { useIntroReady } from "@/lib/intro";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The hero portrait: the photo wipes up out of a mask, sits in a slowly
 * turning aurora frame, tilts a few degrees toward the cursor, and carries
 * three floating chips with the facts a hiring manager scans for first.
 */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const ready = useIntroReady();
  const play = ready || reduced;

  // Pointer tilt — mouse only, springy, capped at 6 degrees.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  const chip = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 16, scale: 0.94 },
    animate: play ? { opacity: 1, y: 0, scale: 1 } : undefined,
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[19rem] [perspective:1200px] sm:max-w-[22rem] lg:max-w-[25rem]"
    >
      {/* Soft halo behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(63,216,240,0.30), rgba(182,242,58,0.08) 50%, transparent 70%)",
        }}
      />

      <motion.div style={reduced ? undefined : { rotateX, rotateY }} className="[transform-style:preserve-3d]">
        {/* Frame */}
        <div className="portrait-ring rounded-[2rem] p-[1.5px] shadow-[0_40px_120px_-30px_rgba(14,116,144,0.6)]">
          {/* The frame's inside stays solid; only the photo layer wipes in, so the
              conic ring never shows through as a fill mid-reveal */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-1.5px)] bg-ink-850">
            <motion.div
              initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.25 }}
              animate={play ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : undefined}
              transition={{
                clipPath: { duration: 1.25, delay: 0.1, ease: EASE },
                scale: { duration: 1.6, delay: 0.1, ease: EASE },
              }}
              className="absolute inset-0"
            >
              <Image
                src="/shehryar.jpg"
                alt="Shehryar Ahmed"
                fill
                preload
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 352px, 304px"
                className="object-cover object-[50%_22%]"
              />
            </motion.div>

            {/* Grade: cool the warm office light toward the site palette, fade the suit into the page */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-cyan-500/10" />
            <div aria-hidden className="absolute inset-0 bg-cyan-950/15" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <p className="font-display text-lg font-semibold text-chalk">Shehryar Ahmed</p>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mist/80">
                  Rawalpindi · PK · UTC+5
                </p>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 pulse-ring" aria-hidden />
            </div>
          </div>
        </div>

        {/* Rotating availability badge */}
        <motion.a
          href="#contact"
          aria-label="Available for hire — get in touch"
          initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -40 }}
          animate={play ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="group absolute -left-8 -top-8 hidden h-28 w-28 items-center justify-center rounded-full sm:flex"
        >
          <span className="absolute inset-0 rounded-full border border-white/10 bg-ink-900/95" />
          <svg viewBox="0 0 100 100" className="spin-slow absolute inset-1.5 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)]" aria-hidden>
            <defs>
              <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            {/* textLength = the circle's circumference (2π·38), so the phrase closes exactly on itself */}
            <text className="fill-mist font-mono text-[8.5px] uppercase">
              <textPath href="#badge-circle" textLength="238" lengthAdjust="spacing">
                Available for hire • Open to remote •
              </textPath>
            </text>
          </svg>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-iris-400 text-signal-ink transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:scale-110">
            <ArrowDownRight size={18} />
          </span>
        </motion.a>
      </motion.div>

      {/* Floating chips */}
      <motion.div {...chip(1.0)} className="absolute -right-4 top-10 sm:-right-8 lg:-right-6">
        <div
          style={{ "--float": "-8px", "--float-dur": "5s" } as React.CSSProperties}
          className="float-y flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/95 px-3.5 py-2.5 shadow-xl will-change-transform"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
            <Briefcase size={16} />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.7rem] text-fog">Software Engineer</span>
            <span className="block text-sm font-semibold text-chalk">Quantum Synergy</span>
          </span>
        </div>
      </motion.div>

      <motion.div {...chip(1.15)} className="absolute -left-5 bottom-24 sm:-left-12 lg:-left-10">
        <div
          style={{ "--float": "8px", "--float-dur": "6s" } as React.CSSProperties}
          className="float-y flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/95 px-3.5 py-2.5 shadow-xl will-change-transform"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime/15 text-lime">
            <Code2 size={16} />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.7rem] text-fog">Backend-first</span>
            <span className="block font-mono text-[0.78rem] font-medium text-chalk">NestJS · Spring · .NET</span>
          </span>
        </div>
      </motion.div>

      <motion.div {...chip(1.3)} className="absolute -bottom-5 right-3 sm:-right-6">
        <div
          style={{ "--float": "-6px", "--float-dur": "4.5s" } as React.CSSProperties}
          className="float-y flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-900/95 px-4 py-2 shadow-xl will-change-transform"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-ring" aria-hidden />
          <span className="text-xs font-semibold text-chalk">Open to remote roles</span>
        </div>
      </motion.div>
    </div>
  );
}
