import Counter from "./ui/Counter";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import { about, stats } from "@/lib/resume";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="About me" title="Who I am" />

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Narrative */}
          <div>
            <Reveal direction="left">
              <p className="font-display text-2xl font-semibold leading-snug text-chalk sm:text-3xl">
                {about.headline}, studying{" "}
                <span className="text-aurora">{about.education.split(" — ")[0]}</span> at
                Riphah International University.
              </p>
            </Reveal>

            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} direction="left" delay={0.08 * (i + 1)} blur={false}>
                  <p className="leading-relaxed text-mist/80">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35} className="mt-9">
              <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] sm:grid-cols-2">
                {about.facts.map((f) => (
                  <div key={f.label} className="bg-ink-900/60 p-4">
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fog">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium leading-snug text-mist">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} direction="right" delay={i * 0.09}>
                <SpotlightCard className="h-full rounded-2xl p-6 text-center">
                  <div className="text-aurora font-display text-4xl font-bold sm:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-fog">{s.label}</div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
