import Link from "next/link";
import { Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { site } from "@/lib/site";

const socials = [
  { href: site.socials.github, icon: FiGithub, label: "GitHub" },
  { href: site.socials.linkedin, icon: FiLinkedin, label: "LinkedIn" },
  { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Link href="/" className="-ml-2 inline-flex h-10 items-center rounded-lg px-2 font-display text-lg font-bold">
            <span className="text-aurora">SA</span>
            <span className="text-indigo-400">.</span>
          </Link>
          <p className="text-xs text-fog">
            © {new Date().getFullYear()} {site.name}. Built with Next.js &amp; Tailwind.
          </p>
        </div>

        <div className="-mx-2 flex items-center">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-fog transition-colors duration-200 hover:text-chalk"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
