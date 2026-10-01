import { Building2, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import Counter from "./ui/Counter";
import Reveal from "./ui/Reveal";
import ScrollWords from "./ui/ScrollWords";
import SectionGlow from "./ui/SectionGlow";
import SpotlightCard from "./ui/SpotlightCard";
import { about, stats } from "@/lib/resume";

const factIcons = [MapPin, GraduationCap, Building2, ShieldCheck];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <SectionGlow accent="violet" position="left" size={32} intensity={0.13} />

      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="kicker">01 — About me</span>
          <span className="h-px flex-1 bg-gradient-to-r from-indigo-400/40 to-transparent" />
        </Reveal>

        <h2 className="sr-only">About me</h2>
        <ScrollWords
          text="I'm a backend-focused full-stack engineer. I build the parts of a product that have to stay up — APIs, authentication, real-time pipelines — and the interfaces people actually enjoy using."
          highlight={["backend-focused", "stay", "up"]}
          className="max-w-5xl font-display text-[clamp(1.7rem,4.2vw,3.3rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-chalk"
        />

        <div className="mt-16 grid items-start gap-10 lg:mt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-5">
            {about.paragraphs.slice(1).map((p, i) => (
              <Reveal key={i} delay={0.06 * i} blur={false}>
                <p className="text-lg leading-relaxed text-mist/80">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.15} className="pt-4">
              <dl className="grid gap-3 sm:grid-cols-2">
                {about.facts.map((f, i) => {
                  const Icon = factIcons[i % factIcons.length];
                  return (
                    <div
                      key={f.label}
                      className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4 transition-colors hover:border-indigo-400/25 hover:bg-white/[0.04]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                        <Icon size={16} />
                      </span>
                      <div>
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog">
                          {f.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium leading-snug text-mist">{f.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <SpotlightCard className="h-full rounded-2xl p-6 sm:p-7">
                  <div className="text-aurora font-display text-5xl font-bold tracking-tight sm:text-6xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-sm font-medium text-fog">{s.label}</div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
