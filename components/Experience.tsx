import { Check } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionGlow from "./ui/SectionGlow";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import TimelineRail from "./ui/TimelineRail";
import { experiences } from "@/lib/resume";
import { accentClasses } from "@/lib/projects";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 sm:py-32">
      <SectionGlow accent="emerald" position="left" size={30} intensity={0.11} />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          kicker="Work history"
          title="Experience"
          description="Two engineering roles running in parallel, and a promotion inside a month at the one before."
        />

        <TimelineRail>
          <ol className="space-y-8">
            {experiences.map((exp, i) => {
              const a = accentClasses[exp.accent];
              return (
                <Reveal as="li" key={`${exp.company}-${exp.role}`} delay={i * 0.08} direction="left">
                  <div className="flex gap-0 sm:gap-7">
                    {/* Node */}
                    <div className="relative z-10 hidden shrink-0 pt-7 sm:block">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border bg-ink-900 ${a.border}`}
                      >
                        <span
                          className={`h-3 w-3 rounded-full bg-current ${a.text} ${exp.current ? "pulse-ring" : ""}`}
                        />
                      </div>
                    </div>

                    <SpotlightCard className="flex-1 rounded-3xl p-6 sm:p-8">
                      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
                        {/* Left: who, where, when */}
                        <div>
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${a.bg} ${a.border} ${a.text}`}
                            >
                              {exp.type}
                            </span>
                            {exp.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[0.68rem] font-semibold text-emerald-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Current
                              </span>
                            )}
                          </div>

                          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-chalk">
                            {exp.role}
                          </h3>
                          <p className={`mt-1 text-lg font-medium ${a.text}`}>{exp.company}</p>

                          <p className="mt-3 font-mono text-[0.72rem] text-fog">
                            {exp.period} <span className="text-fog/50">·</span> {exp.location}
                          </p>

                          <p className="mt-5 text-sm leading-relaxed text-mist/75">{exp.description}</p>
                        </div>

                        {/* Right: what got done */}
                        <ul className="space-y-3 border-t border-white/8 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                          {exp.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-mist/80">
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${a.bg} ${a.text}`}
                              >
                                <Check size={12} strokeWidth={3} />
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightCard>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </TimelineRail>
      </div>
    </section>
  );
}
