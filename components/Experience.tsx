import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import { experiences } from "@/lib/resume";
import { accentClasses } from "@/lib/projects";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading kicker="Work history" title="Experience" />

        <div className="relative">
          {/* Timeline spine */}
          <div
            aria-hidden
            className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-indigo-400/40 via-violet-400/25 to-transparent"
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const a = accentClasses[exp.accent];
              return (
                <Reveal key={`${exp.company}-${exp.role}`} delay={i * 0.12} direction="left">
                  <div className="flex gap-5">
                    {/* Node */}
                    <div className="relative z-10 shrink-0 pt-6">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border bg-ink-900 ${a.border}`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full bg-current ${a.text} ${
                            exp.current ? "animate-pulse" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <SpotlightCard className="flex-1 rounded-2xl p-6">
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-bold text-chalk">
                            {exp.role}
                          </h3>
                          <p className={`mt-0.5 font-medium ${a.text}`}>{exp.company}</p>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${a.bg} ${a.border} ${a.text}`}
                          >
                            {exp.type}
                          </span>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-emerald-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] text-fog">
                        <span>{exp.period}</span>
                        <span className="text-fog/50">·</span>
                        <span>{exp.location}</span>
                      </div>

                      <p className="text-sm leading-relaxed text-mist/75">{exp.description}</p>

                      <ul className="mt-5 space-y-2.5">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-mist/70">
                            <span
                              className={`mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current ${a.text}`}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
