"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useEffect, useRef } from "react";
import Aurora from "./ui/Aurora";
import Magnetic from "./ui/Magnetic";
import Marquee from "./ui/Marquee";
import Portrait from "./ui/Portrait";
import TypeLine from "./ui/TypeLine";
import { site } from "@/lib/site";
import { techMarquee } from "@/lib/resume";
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
  { value: "2", label: "Current engineering roles" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const ready = useIntroReady();
  const play = ready || !!reduced;

  // Copy drifts up and fades as you scroll past; the portrait moves slower,
  // so the two read as separate planes.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pause every looping animation in here once the hero leaves the screen
  // (see .is-offscreen in globals.css).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle("is-offscreen", !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // One entrance clock for the whole column, gated on the intro loader.
  const item = (delay: number, y = 18) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE },
  });

  const nameLine = (text: string, delay: number, accent = false) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${accent ? "text-aurora" : ""}`}
        initial={reduced ? false : { y: "105%" }}
        animate={play ? { y: "0%" } : undefined}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--nav-h)+2.5rem)] sm:px-6 sm:pb-14"
    >
      <Aurora variant="hero" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-10">
        {/* ── Copy ── */}
        <motion.div style={reduced ? undefined : { y: copyY, opacity: fade }} className="order-2 will-change-transform lg:order-1">
          <motion.div
            {...item(0.05, 12)}
            className="glass mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-mist"
          >
            <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for full-time &amp; remote roles
          </motion.div>

          <motion.p {...item(0.1, 10)} className="kicker mb-3">
            Hi, I&apos;m
          </motion.p>

          <h1 className="font-display text-[clamp(3rem,8.5vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.045em] text-chalk">
            {nameLine("Shehryar", 0.15)}{" "}
            {/* ↑ the lines are blocks, but the text still needs the space: "Shehryar Ahmed", not "ShehryarAhmed" */}
            {nameLine("Ahmed.", 0.27, true)}
          </h1>

          <motion.div
            {...item(0.5, 10)}
            className="mt-6 flex h-8 items-center font-mono text-sm text-mist sm:text-lg"
          >
            <span className="mr-2 text-indigo-400">&gt;</span>
            <TypeLine
              phrases={[
                "Full-Stack Software Engineer",
                "Java & Spring Boot Engineer",
                ".NET & NestJS Developer",
                "Flutter & React Developer",
                "AI SaaS Builder",
              ]}
            />
          </motion.div>

          <motion.p
            {...item(0.6)}
            className="mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-mist/80 sm:text-lg"
          >
            I design scalable APIs and secure systems with{" "}
            <span className="font-medium text-indigo-300">Java / Spring Boot</span>,{" "}
            <span className="font-medium text-violet-300">.NET / NestJS</span> and{" "}
            <span className="font-medium text-cyan-300">React / Next.js</span>{" "}
            — and I&apos;m
            currently shipping AI-powered SaaS end to end.
          </motion.p>

          <motion.div
            {...item(0.7)}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a
                href="#work"
                className="glow-iris group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-indigo-500 sm:w-auto"
              >
                View my work
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a
                href={site.resume}
                download
                className="glass inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-mist transition-colors hover:text-chalk sm:w-auto"
              >
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

          <motion.dl
            {...item(0.85)}
            className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6"
          >
            {proof.map((p) => (
              <div key={p.label} className="px-4 first:pl-0">
                <dt className="sr-only">{p.label}</dt>
                <dd className="font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                  {p.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-fog sm:text-sm">{p.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Portrait ── */}
        <motion.div style={reduced ? undefined : { y: portraitY }} className="order-1 px-6 will-change-transform sm:px-10 lg:order-2 lg:px-0">
          <Portrait />
        </motion.div>
      </div>

      {/* Tech ticker */}
      <motion.div {...item(1.2, 0)} className="relative z-10 mx-auto mt-16 w-full max-w-6xl sm:mt-20">
        <Marquee items={techMarquee} duration={40} />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        {...item(1.4, 0)}
        aria-label="Scroll to about"
        className="relative z-10 mx-auto mt-6 hidden flex-col items-center gap-1.5 text-fog transition-colors hover:text-mist sm:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
