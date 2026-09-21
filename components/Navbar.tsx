"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import Magnetic from "./ui/Magnetic";

const links = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Scroll state for the nav chrome.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver — no scroll-position math.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.4, 0.8] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "glass-strong h-14 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)]"
            : "h-16 border border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-chalk transition-opacity hover:opacity-80"
        >
          <span className="text-aurora">SA</span>
          <span className="text-indigo-400">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? "text-chalk" : "text-fog hover:text-mist"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg border border-white/10 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-fog transition-colors hover:text-mist"
          >
            <Sparkles size={14} />
            Studio
          </Link>
          <Magnetic strength={8}>
            <Link
              href="/#contact"
              className="glow-iris inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Hire me
            </Link>
          </Magnetic>
        </div>

        <button
          className="rounded-lg p-2 text-mist transition-colors hover:text-chalk md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl p-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active === l.id
                        ? "bg-white/[0.07] text-chalk"
                        : "text-fog hover:bg-white/[0.04] hover:text-mist"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/studio"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-fog transition-colors hover:bg-white/[0.04] hover:text-mist"
                >
                  <Sparkles size={14} />
                  Content Studio
                </Link>
              </li>
            </ul>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Hire me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
