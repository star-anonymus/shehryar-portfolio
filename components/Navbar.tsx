"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map((l) => document.querySelector(l.href));
      const scrollY = window.scrollY + 120;
      sections.forEach((section, i) => {
        if (!section) return;
        const el = section as HTMLElement;
        if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActive(links[i].href);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-extrabold gradient-text tracking-tight">
          SA.
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === l.href
                    ? "text-white bg-white/8"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
        >
          Hire Me
        </a>

        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-5 flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active === l.href ? "text-white bg-white/8" : "text-gray-400 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold text-center"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
