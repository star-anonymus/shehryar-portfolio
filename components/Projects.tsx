import Link from "next/link";
import { ArrowUpRight, ExternalLink, Zap } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import FeaturedRail from "./ui/FeaturedRail";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import ProjectCover from "./ui/ProjectCover";
import ShareOnLinkedIn from "./ui/ShareOnLinkedIn";
import { projects, tools, type Project } from "@/lib/projects";
import { leadGenerator } from "@/lib/product";

function FeaturedCard({ p, n }: { p: Project; n: number }) {
  return (
    <SpotlightCard className="group h-full overflow-hidden rounded-3xl">
      <div className="grid h-full md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden className="overflow-hidden">
          <ProjectCover
            accent={p.accent}
            monogram={p.monogram}
            category={p.category}
            size="lg"
            className="aspect-[16/10] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] md:aspect-auto md:h-full md:min-h-[24rem]"
          />
        </Link>

        <div className="flex flex-col p-7 sm:p-9">
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <span className="font-display text-sm font-bold text-iris-400">{String(n + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-white/15" />
            <span className="font-mono text-[0.68rem] tracking-widest text-fog">
              {p.category} · {p.year}
            </span>
            {p.demo && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                Live
              </span>
            )}
          </div>

          <Link href={`/projects/${p.slug}`} className="min-w-0">
            <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-chalk transition-colors group-hover:text-iris-400 sm:text-[1.9rem]">
              {p.title}
            </h3>
          </Link>

          <p className="mt-4 leading-relaxed text-mist">{p.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <span key={tag} className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.68rem] text-fog">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-7">
          <div className="flex flex-wrap items-center gap-2 border-t border-white/8 pt-5">
            <Link
              href={`/projects/${p.slug}`}
              className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold"
            >
              Case study <ArrowUpRight size={15} />
            </Link>
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold"
              >
                <ExternalLink size={15} /> Live site
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} source on GitHub`}
                className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold"
              >
                <FiGithub size={15} /> Code
              </a>
            )}
            <ShareOnLinkedIn path={`/projects/${p.slug}`} label="Share" />
          </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function Projects() {
  // The product has its own section higher up, so it isn't repeated here
  const work = projects.filter((p) => p.slug !== leadGenerator.slug);
  const featured = work.filter((p) => p.featured);
  const rest = work.filter((p) => !p.featured);
  const liveTools = tools.filter((t) => t.status === "live");
  const comingTools = tools.filter((t) => t.status !== "live");

  return (
    <section id="work" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="04"
          kicker="Selected work"
          title="Things I've built"
          description="Production systems, client work and university projects. Every card opens a case study you can share straight to LinkedIn."
        />
      </div>

      {/* ── Featured: a horizontal gallery on desktop ── */}
      <FeaturedRail label="Featured projects">
        {featured.map((p, n) => (
          <FeaturedCard key={p.slug} p={p} n={n} />
        ))}
      </FeaturedRail>

      <div className="mx-auto mt-24 max-w-6xl px-5 sm:px-6">
        {/* ── Everything else ── */}
        <Reveal className="mb-8 flex items-end justify-between gap-6">
          <h3 className="font-display text-2xl font-bold tracking-tight text-chalk">More projects</h3>
          <span className="font-mono text-xs text-fog">{String(rest.length).padStart(2, "0")} more</span>
        </Reveal>

        <div className="mb-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <SpotlightCard as="article" className="group h-full overflow-hidden rounded-2xl">
                <Link href={`/projects/${p.slug}`} className="block" tabIndex={-1} aria-hidden>
                  <ProjectCover accent={p.accent} monogram={p.monogram} category={p.category} className="aspect-[16/9]" />
                </Link>

                <div className="flex flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <Link href={`/projects/${p.slug}`} className="group/title -my-1 min-w-0 py-1">
                      <h4 className="font-display text-base font-semibold leading-snug text-chalk transition-colors group-hover/title:text-iris-400">
                        {p.title}
                      </h4>
                    </Link>
                    <div className="-mr-2 -mt-1 flex shrink-0 text-fog">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source on GitHub`} className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-chalk">
                          <FiGithub size={16} />
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`} className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-iris-400">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <span className="sr-only">{p.category}</span>
                  <p className="text-sm leading-relaxed text-mist/85">{p.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[0.65rem] text-fog">
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 3 && <span className="px-1 py-0.5 font-mono text-[0.65rem] text-fog">+{p.tags.length - 3}</span>}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* ── Live tools ── */}
        <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-iris-400">
              <Zap size={12} /> Free utility websites
            </div>
            <h3 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-tight text-chalk">Live tools I&apos;ve shipped</h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            Browser-based utilities — no signup, no watermarks, nothing leaves your machine.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {liveTools.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 0.06}>
              <SpotlightCard className="flex h-full flex-col gap-4 rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-mono text-sm font-bold text-iris-400">
                    {tool.title.slice(0, 2)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 text-[0.65rem] font-semibold text-lime">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Live
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="font-display text-base font-semibold text-chalk">{tool.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist/85">{tool.description}</p>
                </div>

                <div className="flex gap-2 border-t border-white/8 pt-4">
                  {tool.demo && (
                    <a href={tool.demo} target="_blank" rel="noopener noreferrer" className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-iris-400/12 text-xs font-semibold text-iris-400 transition-colors hover:bg-iris-400/20">
                      <ExternalLink size={12} /> Visit
                    </a>
                  )}
                  {tool.github && (
                    <a href={tool.github} target="_blank" rel="noopener noreferrer" aria-label={`${tool.title} source`} className="flex h-10 w-11 items-center justify-center rounded-lg border border-white/8 bg-white/[0.04] text-fog transition-colors hover:text-chalk">
                      <FiGithub size={13} />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Coming soon reads as a roadmap line, not a wall of greyed-out cards */}
        {comingTools.length > 0 && (
          <Reveal delay={0.1} className="mt-8">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5">
              <p className="kicker mb-3">In the pipeline</p>
              <div className="flex flex-wrap gap-2">
                {comingTools.map((tool) => (
                  <span key={tool.title} className="inline-flex items-center rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-mist">
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
