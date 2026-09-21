"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useRef } from "react";
import Aurora from "./ui/Aurora";
import Magnetic from "./ui/Magnetic";
import Marquee from "./ui/Marquee";
import TypeLine from "./ui/TypeLine";
import WordReveal from "./ui/WordReveal";
import { site } from "@/lib/site";
import { techMarquee } from "@/lib/resume";

const socials = [
  { href: site.socials.github, icon: FiGithub, label: "GitHub" },
  { href: site.socials.linkedin, icon: FiLinkedin, label: "LinkedIn" },
  { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Content drifts up and fades as you scroll past — the parallax that makes
  // the aurora behind it feel like a separate plane.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-[var(--nav-h)]"
    >
      <Aurora variant="hero" />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-mist"
        >
          <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Available for opportunities
          <span className="text-fog">·</span>
          <span className="font-mono text-fog">{site.location}</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.6rem,8vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.03em]">
          <WordReveal text="Hi, I'm" delay={0.15} />
          <br />
          <WordReveal text="Shehryar Ahmed" accentFrom={0} delay={0.3} stagger={0.1} />
        </h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-5 flex h-8 items-center justify-center font-mono text-base text-mist sm:text-lg"
        >
          <span className="mr-2 text-indigo-400">&gt;</span>
          <TypeLine
            phrases={[
              "Full-Stack Developer",
              "Java & Spring Boot Engineer",
              ".NET & NestJS Developer",
              "Flutter & React Developer",
              "AI SaaS Builder",
            ]}
          />
        </motion.div>

        {/* Blurb */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-mist/80 sm:text-lg"
        >
          Designing scalable APIs and secure systems with{" "}
          <span className="font-medium text-indigo-300">Java / Spring Boot</span>,{" "}
          <span className="font-medium text-violet-300">.NET / NestJS</span>, and{" "}
          <span className="font-medium text-cyan-300">React / Next.js</span> — currently
          building AI-powered SaaS products end to end.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={12}>
            <a
              href="#work"
              className="glow-iris group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              View my work
              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
          <Magnetic strength={12}>
            <a
              href={site.resume}
              download
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-mist transition-colors hover:text-chalk"
            >
              <Download size={16} />
              Download CV
            </a>
          </Magnetic>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-9 flex items-center justify-center gap-5"
        >
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-chalk"
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Tech ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 mx-auto mt-14 w-full max-w-5xl"
      >
        <Marquee items={techMarquee} duration={40} />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to about"
        className="relative z-10 mx-auto mt-10 flex flex-col items-center gap-1.5 text-fog transition-colors hover:text-mist"
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
