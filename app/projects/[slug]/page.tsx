import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageAtmosphere from "@/components/ui/PageAtmosphere";
import ProjectCover from "@/components/ui/ProjectCover";
import SectionGlow from "@/components/ui/SectionGlow";
import CursorGlow from "@/components/ui/CursorGlow";
import Reveal from "@/components/ui/Reveal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ShareOnLinkedIn from "@/components/ui/ShareOnLinkedIn";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { accentClasses, getProject, projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const a = accentClasses[project.accent];
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <PageAtmosphere />

      <main className="relative pt-[calc(var(--nav-h)+2rem)]">
        <SectionGlow accent={project.accent} position="top" size={38} intensity={0.16} />

        <article className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-10">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-mist"
            >
              <ArrowLeft size={15} />
              All work
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] ${a.bg} ${a.border} ${a.text}`}
              >
                {project.category}
              </span>
              <span className="font-mono text-[0.68rem] tracking-widest text-fog">
                {project.year}
              </span>
              {project.demo && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[0.68rem] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.1rem,6vw,3.6rem)] font-bold leading-[1.07] tracking-[-0.03em] text-chalk">
              {project.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-mist/80">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <ProjectCover
              accent={project.accent}
              monogram={project.monogram}
              category={project.category}
              size="lg"
              className="aspect-[2/1] rounded-2xl border border-white/8"
            />
          </Reveal>

          {/* Actions */}
          <Reveal delay={0.1} className="mt-8">
            <div className="flex flex-wrap items-center gap-2.5 border-y border-white/8 py-5">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500"
                >
                  <ExternalLink size={15} /> Live site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-mist transition-all duration-200 hover:-translate-y-0.5 hover:text-chalk"
                >
                  <FiGithub size={15} /> Source
                </a>
              )}
              <ShareOnLinkedIn path={`/projects/${project.slug}`} variant="solid" withCopy />
            </div>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.15} className="mt-10">
            <div className="space-y-5 text-[1.05rem] leading-[1.75] text-mist/80">
              <p>{project.description}</p>
              {project.details?.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </div>
          </Reveal>

          {project.highlights && project.highlights.length > 0 && (
            <Reveal delay={0.2} className="mt-12">
              <h2 className="kicker mb-5">What it does</h2>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 leading-relaxed text-mist/80">
                    <span className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current ${a.text}`} />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.25} className="mt-12">
            <h2 className="kicker mb-5">Built with</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/8 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-mist"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Share again at the bottom, where people actually finish reading */}
          <Reveal delay={0.3} className="mt-14">
            <SpotlightCard className="rounded-2xl p-7 text-center">
              <h2 className="font-display text-xl font-bold text-chalk">
                Found this interesting?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist/70">
                Share it on LinkedIn — the preview card, title and description are generated
                from this page automatically.
              </p>
              <div className="mt-5 flex justify-center">
                <ShareOnLinkedIn
                  path={`/projects/${project.slug}`}
                  variant="solid"
                  withCopy
                />
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Next up */}
          <Reveal delay={0.35} className="mt-16">
            <h2 className="kicker mb-5">More work</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {others.map((o) => {
                const oa = accentClasses[o.accent];
                return (
                  <Link key={o.slug} href={`/projects/${o.slug}`} className="group block h-full">
                    <SpotlightCard className="h-full rounded-2xl p-4">
                      <span className={`font-mono text-[0.6rem] uppercase tracking-[0.14em] ${oa.text}`}>
                        {o.category}
                      </span>
                      <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-chalk transition-colors group-hover:text-indigo-200">
                        {o.title}
                      </h3>
                    </SpotlightCard>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </article>
      </main>

      <Footer />
    </>
  );
}
