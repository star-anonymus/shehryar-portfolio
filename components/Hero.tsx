"use client";
import { Mail, ArrowDown, Download } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 overflow-hidden bg-white"
      style={{ minHeight: "calc(100vh - 64px)", marginTop: "64px" }}>
      {/* Soft gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-50 rounded-full blur-[140px] opacity-40" />
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.4]"
        style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Hero content — vertically centered in the space below navbar */}
      <div className="relative z-10 max-w-4xl mx-auto text-center py-16">
        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight text-slate-900">
          Hi, I&apos;m{" "}
          <span className="gradient-text">Shehryar Ahmed</span>
        </motion.h1>

        {/* Typing */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-slate-500 mb-5 h-9">
          <TypeAnimation
            sequence={["Full-Stack Developer", 2000, "Java & Spring Boot Engineer", 2000, ".NET & NestJS Developer", 2000, "Flutter & React Developer", 2000, "AI SaaS Builder", 2000]}
            wrapper="span" speed={50} deletionSpeed={70} repeat={Infinity}
          />
        </motion.div>

        {/* Available badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-200 bg-green-50 text-green-700 text-sm font-medium mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Designing scalable APIs and secure systems with{" "}
          <span className="text-indigo-600 font-semibold">Java / Spring Boot</span>,{" "}
          <span className="text-purple-600 font-semibold">.NET / NestJS</span>, and{" "}
          <span className="text-pink-600 font-semibold">React / Next.js</span> — currently building AI-powered SaaS products end-to-end.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a href="#projects"
            className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5">
            View Projects
          </a>
          <a href="/Shehryar_Ahmed_Resume.pdf" download
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 mb-8">
          {[
            { href: "https://github.com/star-anonymus", icon: <FiGithub size={20} />, label: "GitHub", hoverColor: "hover:text-slate-900" },
            { href: "https://linkedin.com/in/shehryar-ahmed-93834026b", icon: <FiLinkedin size={20} />, label: "LinkedIn", hoverColor: "hover:text-blue-600" },
            { href: "mailto:ahmedshehryar645@gmail.com", icon: <Mail size={20} />, label: "Email", hoverColor: "hover:text-indigo-600" },
          ].map((s, i) => (
            <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className={`flex items-center gap-2 text-slate-400 ${s.hoverColor} transition-all duration-200 hover:-translate-y-0.5 text-sm font-medium`} aria-label={s.label}>
              {s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Scroll cue — inside content flow, not absolute, so it never overlaps */}
        <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="inline-flex flex-col items-center gap-1 text-slate-300 hover:text-slate-500 transition-colors" aria-label="Scroll down">
          <ArrowDown size={18} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
