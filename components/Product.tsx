"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Briefcase, Inbox, MapPinned, Play, Radar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Counter from "./ui/Counter";
import Magnetic from "./ui/Magnetic";
import Reveal from "./ui/Reveal";
import { leadGenerator as p } from "@/lib/product";

const featureIcons = [Radar, MapPinned, Briefcase, Inbox];
const STEP_MS = 4200;
// Server and browser can disagree in the last float digit; round so hydration matches
const round = (n: number) => Math.round(n * 100) / 100;

/** The HUD reactor behind the app window — three rings turning at different speeds. */
function Reactor() {
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2;
    const r1 = 196;
    const r2 = i % 4 ? 190 : 182;
    return (
      <line
        key={i}
        x1={round(200 + r1 * Math.cos(a))}
        y1={round(200 + r1 * Math.sin(a))}
        x2={round(200 + r2 * Math.cos(a))}
        y2={round(200 + r2 * Math.sin(a))}
      />
    );
  });
  return (
    <svg viewBox="0 0 400 400" aria-hidden className="absolute inset-0 h-full w-full">
      <g className="spin-a" stroke="#3fd8f0" strokeWidth="1" opacity="0.45">
        {ticks}
      </g>
      <circle className="spin-b" cx="200" cy="200" r="168" fill="none" stroke="#3fd8f0" strokeWidth="1.5" strokeDasharray="90 14 4 14" opacity="0.5" />
      <circle className="spin-c" cx="200" cy="200" r="138" fill="none" stroke="#b6f23a" strokeWidth="1" strokeDasharray="2 9" opacity="0.55" />
      <circle cx="200" cy="200" r="110" fill="none" stroke="#3fd8f0" strokeWidth="0.75" opacity="0.25" />
    </svg>
  );
}

/** The app window: screens cross-fade on a timer while visible; tabs jump to one. Tilts toward the pointer. */
function Showcase() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { margin: "-15% 0px -15% 0px" });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const t = setTimeout(() => setI((n) => (n + 1) % p.screens.length), STEP_MS);
    return () => clearTimeout(t);
  }, [i, inView, paused, reduced]);

  // Pointer tilt — two motion values through a spring, applied as a transform only
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const screen = p.screens[i];

  return (
    <div ref={wrap} className="relative">
      {/* Reactor sits behind the window, centred on it */}
      <div className="pointer-events-none absolute left-1/2 top-[44%] aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2">
        <Reactor />
      </div>

      <div className="relative [perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
        <motion.div
          style={reduced ? undefined : { rotateX: rx, rotateY: ry }}
          className="edge-signal relative overflow-hidden rounded-2xl bg-ink-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(63,216,240,0.45)] will-change-transform"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/8 bg-ink-850 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 truncate font-mono text-[0.68rem] tracking-wide text-fog">
              ClientoraHQ — <span className="text-iris-400">{screen.label}</span>
            </span>
          </div>

          <div className="relative aspect-[16/10]">
            {p.screens.map((s, n) => (
              <Image
                key={s.src}
                src={s.src}
                alt={`${p.name} — ${s.label} screen: ${s.caption}`}
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                priority={false}
                className="object-cover object-top transition-opacity duration-700 ease-out"
                style={{ opacity: n === i ? 1 : 0 }}
              />
            ))}
            {/* Light sweep over the screen */}
            {!reduced && (
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="sweep h-1/3 w-full bg-gradient-to-b from-transparent via-cyan-300/[0.07] to-transparent" />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Caption */}
      <div className="relative mt-5 min-h-[3rem] text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={screen.label}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-mist"
          >
            {screen.caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Tabs with a progress bar on the active one */}
      <div
        role="tablist"
        aria-label="App screens"
        className="relative mt-3 flex flex-wrap justify-center gap-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {p.screens.map((s, n) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`relative min-h-11 overflow-hidden rounded-full border px-4 text-xs font-semibold transition-colors ${
              n === i
                ? "border-iris-400/60 bg-iris-400/10 text-chalk"
                : "border-white/10 text-fog hover:border-white/20 hover:text-mist"
            }`}
          >
            {s.label}
            {n === i && !reduced && inView && !paused && (
              <motion.span
                key={`bar-${i}`}
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-iris-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: STEP_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Product() {
  return (
    <section id="clientorahq" className="relative overflow-hidden px-5 py-28 sm:px-6 sm:py-36">
      {/* Static atmosphere: a dot grid and one cyan wash */}
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(63,216,240,0.16), transparent 65%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        {/* ── Copy ── */}
        <div className="min-w-0">
          <Reveal className="flex flex-wrap items-end gap-4">
            <span aria-hidden className="text-outline font-display text-[clamp(3.2rem,7vw,5.2rem)] font-bold leading-[0.8] tracking-[-0.04em]">01</span>
            <span className="kicker pb-1.5">My product</span>
            <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-lime/35 bg-lime/10 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-lime">
              <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-lime" />
              Now shipping
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-chalk">
              Clientora<span className="text-aurora">HQ</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist">
              {p.tagline} I designed, built and sell it — Electron, a Chrome extension and Claude
              under the hood.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {p.features.map((f, n) => {
              const Icon = featureIcons[n];
              return (
                <Reveal as="li" key={f.title} delay={0.12 + n * 0.06}>
                  <div className="hud-corners group h-full rounded-xl bg-white/[0.02] p-4 transition-colors duration-300 [--hud:rgba(63,216,240,0.55)] hover:bg-iris-400/[0.05]">
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className="text-iris-400" />
                      <h3 className="font-display text-[0.98rem] font-semibold text-chalk">{f.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-mist/85">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.2}>
            <dl className="mt-9 grid grid-cols-3 gap-4 border-y border-white/8 py-6">
              {p.numbers.map((n) => (
                <div key={n.label}>
                  <dd className="font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                    <Counter value={n.value} suffix={n.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs leading-snug text-fog">{n.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 font-semibold sm:w-auto"
              >
                Visit the website
                <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <a
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 font-semibold"
            >
              <Play size={15} className="text-iris-400" /> Watch the 2-min demo
            </a>
            <Link
              href={`/projects/${p.slug}`}
              className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-mist transition-colors hover:text-chalk"
            >
              How it&apos;s built <ArrowUpRight size={15} />
            </Link>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-5 font-mono text-xs text-fog">
              {p.price} <span className="text-fog/50">·</span> {p.trial}{" "}
              <span className="text-fog/50">·</span> Windows 10 / 11
            </p>
          </Reveal>
        </div>

        {/* ── Showcase ── */}
        <Reveal delay={0.1} distance={40}>
          <Showcase />
        </Reveal>
      </div>
    </section>
  );
}
