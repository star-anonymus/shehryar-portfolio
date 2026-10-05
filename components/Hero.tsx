"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useEffect, useRef } from "react";
import Magnetic from "./ui/Magnetic";
import Marquee from "./ui/Marquee";
import Portrait from "./ui/Portrait";
import TypeLine from "./ui/TypeLine";
import { site } from "@/lib/site";
import { techMarquee } from "@/lib/resume";
import { leadGenerator } from "@/lib/product";
import { useIntroReady } from "@/lib/intro";

const EASE = [0.16, 1, 0.3, 1] as const;

const socials = [
  { href: site.socials.github, icon: FiGithub, label: "GitHub" },
  { href: site.socials.linkedin, icon: FiLinkedin, label: "LinkedIn" },
  { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
];

/** The three numbers a recruiter looks for before reading anything else. */
const proof = [
  { value: "3+", label: "Years building" },
  { value: "20+", label: "Projects shipped" },
  { value: "1", label: "Product on sale" },
];

/** Decorative orbit behind the portrait: one turning ring carrying three lights. Transform only. */
function Orbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 lg:block">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(63,216,240,0.16)" strokeWidth="0.4" strokeDasharray="1 3" />
      </svg>
      <div className="orbit absolute inset-0" style={{ "--orbit-dur": "36s" } as React.CSSProperties}>
        <span className="absolute left-1/2 top-[2%] h-2 w-2 -translate-x-1/2 rounded-full bg-iris-400 shadow-[0_0_14px_3px_rgba(63,216,240,0.7)]" />
        <span className="absolute bottom-[14%] left-[8%] h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_12px_2px_rgba(182,242,58,0.6)]" />
        <span className="absolute right-[6%] top-[38%] h-1 w-1 rounded-full bg-chalk/70" />
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const ready = useIntroReady();
  const play = ready || !!reduced;

  // Copy drifts up and fades as you scroll past; the portrait moves slower, so the two read as separate planes.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pause every looping animation in here once the hero leaves the screen (.is-offscreen in globals.css).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.classList.toggle("is-offscreen", !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // One entrance clock for the whole column, gated on the intro loader.
  const item = (delay: number, y = 18) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE },
  });

  // First name rises letter by letter out of a mask; the surname wipes up as one line in the accent.
  const letters = "Shehryar".split("");

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--nav-h)+2.5rem)] sm:px-6 sm:pb-14"
    >
      {/* Atmosphere: static dot grid, two washes, and one light band sweeping down (transform only) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0" />
        <div className="absolute -left-[20%] -top-[30%] h-[46rem] w-[46rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(63,216,240,0.13), transparent 62%)" }} />
        <div className="absolute -bottom-[30%] right-[-15%] h-[40rem] w-[40rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(182,242,58,0.06), transparent 62%)" }} />
        {!reduced && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="sweep h-40 w-full bg-gradient-to-b from-transparent via-cyan-300/[0.035] to-transparent" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-10">
        {/* ── Copy ── */}
        <motion.div style={reduced ? undefined : { y: copyY, opacity: fade }} className="order-2 will-change-transform lg:order-1">
          {/* The product, introduced before anything else */}
          <motion.a
            {...item(0.05, 12)}
            href="#lead-generator"
            className="group mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-xs text-mist transition-colors hover:border-iris-400/40"
          >
            <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-signal-ink">New</span>
            <span className="truncate">
              I built <span className="font-semibold text-chalk">{leadGenerator.name}</span>
            </span>
            <ArrowRight size={13} className="shrink-0 text-iris-400 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>

          <motion.p {...item(0.1, 10)} className="kicker mb-3">
            Hi, I&apos;m
          </motion.p>

          <h1 aria-label={site.name} className="font-display text-[clamp(3rem,8.6vw,6.6rem)] font-bold leading-[0.94] tracking-[-0.045em] text-chalk">
            <span aria-hidden className="block overflow-hidden pb-[0.06em]">
              {letters.map((ch, n) => (
                <motion.span
                  key={n}
                  className="inline-block"
                  initial={reduced ? false : { y: "110%", rotate: 8 }}
                  animate={play ? { y: "0%", rotate: 0 } : undefined}
                  transition={{ duration: 0.9, delay: 0.12 + n * 0.035, ease: EASE }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span aria-hidden className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="text-aurora block"
                initial={reduced ? false : { y: "105%" }}
                animate={play ? { y: "0%" } : undefined}
                transition={{ duration: 1.05, delay: 0.42, ease: EASE }}
              >
                Ahmed.
              </motion.span>
            </span>
          </h1>

          <motion.div {...item(0.55, 10)} className="mt-6 flex h-8 items-center font-mono text-sm text-mist sm:text-lg">
            <span className="mr-2 text-iris-400">&gt;</span>
            <TypeLine
              phrases={[
                "Full-Stack Software Engineer",
                "Backend: NestJS · Spring Boot · .NET",
                "Builder of ClientoraHQ",
                "Flutter & React Developer",
                "AI SaaS, end to end",
              ]}
            />
          </motion.div>

          <motion.p {...item(0.62)} className="mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-mist sm:text-lg">
            I design scalable APIs and secure systems with{" "}
            <span className="font-medium text-chalk">Java / Spring Boot</span>,{" "}
            <span className="font-medium text-chalk">.NET / NestJS</span> and{" "}
            <span className="font-medium text-chalk">React / Next.js</span> — and I ship AI products end to end,
            including one I sell myself.
          </motion.p>

          <motion.div {...item(0.72)} className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a href="#work" className="btn-signal group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 font-semibold sm:w-auto">
                View my work
                <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a href={site.resume} download className="btn-ghost inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 font-semibold sm:w-auto">
                <Download size={16} />
                Download CV
              </a>
            </Magnetic>
            <div className="flex items-center justify-center gap-1 sm:ml-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-fog transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-chalk"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.dl {...item(0.85)} className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
            {proof.map((pr) => (
              <div key={pr.label} className="px-4 first:pl-0">
                <dt className="sr-only">{pr.label}</dt>
                <dd className="font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">{pr.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-fog sm:text-sm">{pr.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Portrait ── */}
        <motion.div style={reduced ? undefined : { y: portraitY }} className="relative order-1 px-6 will-change-transform sm:px-10 lg:order-2 lg:px-0">
          {!reduced && <Orbit />}
          <Portrait />
        </motion.div>
      </div>

      {/* Tech ticker */}
      <motion.div {...item(1.2, 0)} className="relative z-10 mx-auto mt-16 w-full max-w-6xl sm:mt-20">
        <Marquee items={techMarquee} duration={40} />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#lead-generator"
        {...item(1.4, 0)}
        aria-label="Scroll to my product"
        className="relative z-10 mx-auto mt-6 hidden flex-col items-center gap-1.5 text-fog transition-colors hover:text-mist sm:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span animate={reduced ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
