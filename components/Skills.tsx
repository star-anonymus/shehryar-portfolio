import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import { skillGroups } from "@/lib/resume";
import { accentClasses } from "@/lib/projects";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:py-32">
      {/* Section-local glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[28rem] max-w-4xl rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Technical stack"
          title="What I work with"
          description="The tools I reach for daily — grouped by where they sit in the stack rather than by how much I like them."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const a = accentClasses[group.accent];
            return (
              <Reveal key={group.category} delay={i * 0.07}>
                <SpotlightCard className="h-full rounded-2xl p-6">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${a.text} bg-current`} />
                    <h3 className={`kicker ${a.text}`}>{group.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium text-mist transition-colors duration-200 hover:text-chalk ${a.bg} ${a.border}`}
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
