import Reveal from "./ui/Reveal";
import SectionGlow from "./ui/SectionGlow";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import { skillGroups } from "@/lib/resume";
import { accentClasses } from "@/lib/projects";

/** Backend is the headline skill, so it gets the big tile and goes first. */
const CORE = "Backend";

export default function Skills() {
  const ordered = [
    ...skillGroups.filter((g) => g.category === CORE),
    ...skillGroups.filter((g) => g.category !== CORE),
  ];

  return (
    <section id="skills" className="relative px-6 py-28 sm:py-32">
      <SectionGlow accent="cyan" position="right" size={32} intensity={0.13} />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          kicker="Technical stack"
          title="What I work with"
          description="Grouped by where each tool sits in the stack. Backend is home; the rest is how I ship the whole product."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((group, i) => {
            const a = accentClasses[group.accent];
            const core = group.category === CORE;
            // The core tile takes 2×2; four small tiles fill the rest of that
            // block, so the last group runs the full width instead of sitting alone.
            const last = i === ordered.length - 1 && ordered.length > 5;
            return (
              <Reveal
                key={group.category}
                delay={i * 0.06}
                className={core ? "sm:col-span-2 lg:row-span-2" : last ? "sm:col-span-2 lg:col-span-4" : ""}
              >
                <SpotlightCard className={`flex h-full flex-col rounded-3xl ${core ? "p-8" : "p-6"}`}>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full bg-current ${a.text}`} />
                      <h3 className={`kicker ${a.text}`}>{group.category}</h3>
                    </div>
                    <span className="font-mono text-[0.68rem] text-fog">
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </div>

                  {core && (
                    <p className="mb-7 max-w-sm font-display text-2xl font-semibold leading-snug text-chalk sm:text-3xl">
                      APIs, auth and services that stay up under real traffic.
                    </p>
                  )}

                  <div className={`flex flex-wrap gap-2 ${core ? "mt-auto" : ""}`}>
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-xl border font-medium text-mist transition-all duration-200 hover:-translate-y-0.5 hover:text-chalk ${a.bg} ${a.border} ${
                          core ? "px-4 py-2.5 text-sm" : "px-2.5 py-1.5 text-xs"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
