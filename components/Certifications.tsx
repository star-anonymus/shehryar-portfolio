import { Award } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import { certifications } from "@/lib/resume";
import { accentClasses } from "@/lib/projects";

export default function Certifications() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Credentials" title="Certifications" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => {
            const a = accentClasses[c.accent];
            return (
              <Reveal key={c.name} delay={i * 0.08} blur={false}>
                <SpotlightCard className="flex h-full flex-col gap-4 rounded-2xl p-5">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${a.bg} ${a.border} ${a.text}`}
                  >
                    <Award size={19} />
                  </div>

                  <div className="flex-1">
                    <p className="font-display text-sm font-semibold leading-snug text-chalk">
                      {c.name}
                    </p>
                    <p className="mt-1 font-mono text-xs text-fog">{c.issuer}</p>
                  </div>

                  <span
                    className={`self-start rounded-full border px-2.5 py-1 font-mono text-[0.65rem] ${a.bg} ${a.border} ${a.text}`}
                  >
                    {c.date}
                  </span>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
