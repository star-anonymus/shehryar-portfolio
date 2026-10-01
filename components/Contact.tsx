import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import CopyEmail from "./ui/CopyEmail";
import Magnetic from "./ui/Magnetic";
import Reveal from "./ui/Reveal";
import SectionGlow from "./ui/SectionGlow";
import { site } from "@/lib/site";

const items = [
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: FiLinkedin, label: "LinkedIn", value: "Shehryar Ahmed", href: site.socials.linkedin },
  { icon: FiGithub, label: "GitHub", value: site.socials.githubUser, href: site.socials.github },
  { icon: MapPin, label: "Location", value: site.location, href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 sm:py-36">
      <SectionGlow accent="iris" position="bottom" size={40} intensity={0.2} />

      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="kicker">06 — Get in touch</span>
          <span className="h-px flex-1 bg-gradient-to-r from-indigo-400/40 to-transparent" />
        </Reveal>

        <div className="glass glass-sheen relative overflow-hidden rounded-[2rem] p-6 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)" }}
          />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
            <div className="min-w-0">
              <Reveal>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Replies within one day
                </p>
                <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.04em] text-chalk">
                  Let&apos;s build <span className="text-aurora">something</span> great together.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist/75">
                  Open to full-time roles — remote or in Islamabad / Rawalpindi — plus freelance
                  work and collaborations.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Magnetic strength={8} className="w-full sm:w-auto">
                  <a
                    href={`mailto:${site.email}`}
                    className="glow-iris group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 px-7 font-semibold text-white transition-colors hover:bg-indigo-500 sm:w-auto"
                  >
                    <Mail size={18} />
                    {/* The full address is too wide for a phone and would widen the whole column */}
                    <span className="sm:hidden">Email me</span>
                    <span className="hidden sm:inline">{site.email}</span>
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Magnetic>
                <CopyEmail email={site.email} />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <ul className="divide-y divide-white/8 rounded-2xl border border-white/8 bg-ink-900/40">
                {items.map((item) => {
                  const Icon = item.icon;
                  const body = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-indigo-300">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-semibold text-mist">
                          {item.value}
                        </span>
                      </span>
                      {item.href && (
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-fog transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk"
                        />
                      )}
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 px-5 py-4">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
