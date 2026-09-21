import Link from "next/link";
import { ArrowUpRight, ExternalLink, Zap } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import ShareOnLinkedIn from "./ui/ShareOnLinkedIn";
import { accentClasses, liveToolCount, projects, tools } from "@/lib/projects";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Selected work"
          title="Things I've built"
          description="Personal projects, university work, and production systems shipped at companies. Every card opens a page you can share straight to LinkedIn."
        />

        {/* ── Featured ── */}
        <div className="mb-20 space-y-5">
          {featured.map((p, i) => {
            const a = accentClasses[p.accent];
            return (
              <Reveal key={p.slug} delay={i * 0.1}>
                <SpotlightCard className="group overflow-hidden rounded-3xl">
                  <div className={`h-[3px] w-full bg-gradient-to-r ${a.glow}`} />

                  <div className="p-7 sm:p-9">
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-2.5 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] ${a.bg} ${a.border} ${a.text}`}
                          >
                            {p.category}
                          </span>
                          <span className="font-mono text-[0.65rem] tracking-widest text-fog">
                            {p.year}
                          </span>
                          {p.demo && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              Live
                            </span>
                          )}
                        </div>

                        <Link href={`/projects/${p.slug}`} className="block">
                          <h3 className="font-display text-2xl font-bold tracking-tight text-chalk transition-colors group-hover:text-indigo-200 sm:text-3xl">
                            {p.title}
                          </h3>
                        </Link>
                      </div>

                      <Link
                        href={`/projects/${p.slug}`}
                        aria-label={`Read more about ${p.title}`}
                        className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-mist transition-all duration-200 group-hover:text-chalk"
                      >
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </div>

                    <p className="max-w-3xl leading-relaxed text-mist/75">{p.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.7rem] text-fog"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-white/8 pt-6">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-mist transition-all duration-200 hover:-translate-y-0.5 hover:text-chalk"
                        >
                          <FiGithub size={15} /> Code
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500"
                        >
                          <ExternalLink size={15} /> Live site
                        </a>
                      )}
                      <ShareOnLinkedIn path={`/projects/${p.slug}`} label="Share" />
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        {/* ── Everything else ── */}
        <Reveal className="mb-8">
          <h3 className="font-display text-xl font-bold text-chalk">More projects</h3>
        </Reveal>

        <div className="mb-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => {
            const a = accentClasses[p.accent];
            return (
              <Reveal key={p.slug} delay={i * 0.05} blur={false}>
                <SpotlightCard as="article" className="group h-full overflow-hidden rounded-2xl">
                  <div
                    className={`h-[2px] w-full bg-gradient-to-r ${a.glow} opacity-60 transition-opacity group-hover:opacity-100`}
                  />
                  <div className="flex h-full flex-col p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${a.bg} ${a.border} ${a.text}`}
                      >
                        {p.category}
                      </span>
                      <div className="flex shrink-0 gap-2 text-fog">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${p.title} source on GitHub`}
                            className="transition-colors hover:text-chalk"
                          >
                            <FiGithub size={15} />
                          </a>
                        )}
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${p.title} live site`}
                            className="transition-colors hover:text-indigo-300"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>

                    <Link href={`/projects/${p.slug}`} className="group/title">
                      <h4 className="font-display text-base font-semibold leading-snug text-chalk transition-colors group-hover/title:text-indigo-200">
                        {p.title}
                      </h4>
                    </Link>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-mist/65">
                      {p.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[0.65rem] text-fog"
                        >
                          {tag}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="px-1 py-0.5 font-mono text-[0.65rem] text-fog/70">
                          +{p.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        {/* ── Live tools ── */}
        <Reveal className="mb-12 text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <Zap size={12} /> Free utility websites
          </div>
          <h3 className="mt-5 font-display text-[clamp(1.6rem,4vw,2.5rem)] font-bold tracking-tight text-chalk">
            Live tools I&apos;ve shipped
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-mist/70">
            A growing collection of browser-based utilities — no signup, no watermarks, no limits.
            <span className="ml-2 inline-flex items-center gap-1.5 font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {liveToolCount} live · {tools.length - liveToolCount} coming
            </span>
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const isLive = tool.status === "live";
            return (
              <Reveal key={tool.title} delay={i * 0.035} blur={false}>
                <SpotlightCard
                  ring={isLive}
                  className={`flex h-full flex-col gap-4 rounded-2xl p-5 ${
                    isLive ? "" : "opacity-55"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="glass flex h-11 w-11 items-center justify-center rounded-xl text-lg">
                      {tool.icon}
                    </div>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[0.65rem] font-semibold text-fog">
                        Coming soon
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-display text-base font-semibold text-chalk">
                      {tool.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist/65">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[0.65rem] text-fog"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isLive && (
                    <div className="flex gap-2 border-t border-white/8 pt-4">
                      {tool.demo && (
                        <a
                          href={tool.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-500/15 py-2 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/25"
                        >
                          <ExternalLink size={12} /> Visit
                        </a>
                      )}
                      {tool.github && (
                        <a
                          href={tool.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-fog transition-colors hover:text-chalk"
                        >
                          <FiGithub size={12} /> Code
                        </a>
                      )}
                    </div>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
