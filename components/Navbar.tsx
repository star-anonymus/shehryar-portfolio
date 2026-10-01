"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "./ui/Magnetic";
import { site } from "@/lib/site";

const links = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#skills", id: "skills", label: "Skills" },
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

    // The root margin leaves a thin band 25–40% down the viewport; whichever
    // section crosses it is active. Threshold 0, not a ratio: a section taller
    // than the screen can never show 10% of itself inside a band that thin,
    // so a ratio threshold left the pill stuck on the first section.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
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
          aria-label="Shehryar Ahmed — home"
          className="group -ml-2 flex h-11 items-center gap-2.5 rounded-xl px-2 transition-opacity hover:opacity-90"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105">
            <Image src="/shehryar-square.jpg" alt="" fill sizes="32px" className="object-cover" />
          </span>
          <span className="font-display text-[0.95rem] font-bold tracking-tight text-chalk">
            Shehryar<span className="text-indigo-400">.</span>
          </span>
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
          <a
            href={site.resume}
            download
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-fog transition-colors hover:text-mist"
          >
            <Download size={14} />
            Résumé
          </a>
          <Magnetic strength={6}>
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
                <a
                  href={site.resume}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-fog transition-colors hover:bg-white/[0.04] hover:text-mist"
                >
                  <Download size={14} />
                  Download résumé
                </a>
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
