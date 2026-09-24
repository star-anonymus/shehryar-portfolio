import Link from "next/link";
import { ArrowUpRight, ExternalLink, Zap } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import SectionGlow from "./ui/SectionGlow";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import ProjectCover from "./ui/ProjectCover";
import ShareOnLinkedIn from "./ui/ShareOnLinkedIn";
import { projects, tools } from "@/lib/projects";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const liveTools = tools.filter((t) => t.status === "live");
  const comingTools = tools.filter((t) => t.status !== "live");

  return (
    <section id="work" className="relative px-6 py-28 sm:py-32">
      <SectionGlow accent="iris" position="top" size={40} intensity={0.14} />
      <SectionGlow accent="rose" position="right" size={30} intensity={0.1} />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Selected work"
          title="Things I've built"
          description="Personal projects, university work, and production systems shipped at companies. Every card opens a page you can share straight to LinkedIn."
        />

        {/* ── Featured ── */}
        <div className="mb-20 space-y-6">
          {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <SpotlightCard className="group overflow-hidden rounded-3xl">
                  <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                    <ProjectCover
                      accent={p.accent}
                      monogram={p.monogram}
                      category={p.category}
                      size="lg"
                      className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[19rem]"
                    />

                    <div className="p-7 sm:p-9">
                      <div className="mb-3 flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[0.68rem] tracking-widest text-fog">
                          {p.year}
                        </span>
                        {p.demo && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Live
                          </span>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <Link href={`/projects/${p.slug}`} className="min-w-0">
                          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-chalk transition-colors group-hover:text-indigo-200 sm:text-[1.75rem]">
                            {p.title}
                          </h3>
                        </Link>

                        <Link
                          href={`/projects/${p.slug}`}
                          aria-label={`Read more about ${p.title}`}
                          className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-mist transition-colors group-hover:text-chalk"
                        >
                          <ArrowUpRight
                            size={17}
                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      </div>

                      <p className="mt-4 leading-relaxed text-mist/75">{p.description}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.68rem] text-fog"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/8 pt-5">
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
                        <ShareOnLinkedIn path={`/projects/${p.slug}`} label="Share" />
                      </div>

                      {/* The cover art carries the category visually, but it is
                          aria-hidden, so name it once for screen readers. */}
                      <span className="sr-only">{p.category}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
          ))}
        </div>

        {/* ── Everything else ── */}
        <Reveal className="mb-8">
          <h3 className="font-display text-xl font-bold text-chalk">More projects</h3>
        </Reveal>

        <div className="mb-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} blur={false}>
              <SpotlightCard as="article" className="group h-full overflow-hidden rounded-2xl">
                <Link href={`/projects/${p.slug}`} className="block">
                  <ProjectCover
                    accent={p.accent}
                    monogram={p.monogram}
                    category={p.category}
                    className="aspect-[16/9]"
                  />
                </Link>

                <div className="flex h-full flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <Link href={`/projects/${p.slug}`} className="group/title -my-1 min-w-0 py-1">
                      <h4 className="font-display text-base font-semibold leading-snug text-chalk transition-colors group-hover/title:text-indigo-200">
                        {p.title}
                      </h4>
                    </Link>
                    <div className="-mr-2 -mt-1 flex shrink-0 text-fog">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} source on GitHub`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-chalk"
                        >
                          <FiGithub size={16} />
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} live site`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-indigo-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <span className="sr-only">{p.category}</span>
                  <p className="flex-1 text-sm leading-relaxed text-mist/65">{p.summary}</p>

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
          ))}
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
            Browser-based utilities — no signup, no watermarks, no limits, nothing leaves
            your machine.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {liveTools.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 0.06} blur={false}>
              <SpotlightCard className="flex h-full flex-col gap-4 rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div className="glass flex h-11 w-11 items-center justify-center rounded-xl text-lg">
                    {tool.icon}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="font-display text-base font-semibold text-chalk">
                    {tool.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist/65">
                    {tool.description}
                  </p>
                </div>

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
                      aria-label={`${tool.title} source`}
                      className="flex h-10 w-11 items-center justify-center rounded-lg border border-white/8 bg-white/[0.04] text-xs font-semibold text-fog transition-colors hover:text-chalk"
                    >
                      <FiGithub size={13} />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Coming soon reads as a roadmap line, not eleven greyed-out cards */}
        {comingTools.length > 0 && (
          <Reveal delay={0.1} className="mt-8">
            <div className="glass rounded-2xl px-6 py-5">
              <p className="kicker mb-3">In the pipeline</p>
              <div className="flex flex-wrap gap-2">
                {comingTools.map((tool) => (
                  <span
                    key={tool.title}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-fog"
                  >
                    <span aria-hidden>{tool.icon}</span>
                    {tool.title}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
