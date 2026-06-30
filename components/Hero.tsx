"use client";
import { Mail, ArrowDown, Download } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-pink-600/6 rounded-full blur-[100px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Shehryar Ahmed</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6 h-9"
        >
          <TypeAnimation
            sequence={[
              "Software Engineer",
              2000,
              "Full-Stack Developer",
              2000,
              "Flutter & React Developer",
              2000,
              "QA Specialist",
              2000,
              ".NET & NestJS Developer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            deletionSpeed={70}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building scalable web &amp; mobile applications with{" "}
          <span className="text-indigo-400 font-medium">React</span>,{" "}
          <span className="text-purple-400 font-medium">Next.js</span>,{" "}
          <span className="text-pink-400 font-medium">Flutter</span>, and{" "}
          <span className="text-indigo-400 font-medium">.NET / NestJS</span> — from pixel-perfect
          UIs to production-grade APIs.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="group px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="/Shehryar_Ahmed_Resume.pdf"
            download
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download size={16} className="group-hover:animate-bounce" />
            Download CV
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com/star-anonymus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-all duration-200 hover:-translate-y-0.5 text-sm"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <div className="w-px h-4 bg-white/10" />
          <a
            href="https://linkedin.com/in/shehryar-ahmed-93834026b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <div className="w-px h-4 bg-white/10" />
          <a
            href="mailto:ahmedshehryar645@gmail.com"
            className="flex items-center gap-2 text-gray-500 hover:text-pink-400 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            aria-label="Email"
          >
            <Mail size={20} />
            <span className="hidden sm:inline">Email</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
