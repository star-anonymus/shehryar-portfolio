import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Built", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Who I Am</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <AnimatedSection direction="left" className="space-y-5">
            <p className="text-slate-600 text-lg leading-relaxed">
              I&apos;m a <span className="text-slate-900 font-semibold">Software Engineer</span> studying
              BS Software Engineering at{" "}
              <span className="text-indigo-600 font-semibold">Riphah International University, Islamabad</span>.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              I specialize in full-stack development — building healthcare backends, Flutter mobile
              apps, React dashboards, and RESTful APIs. I&apos;ve worked as a{" "}
              <span className="text-slate-900 font-semibold">QA Developer at Authox</span> and a{" "}
              <span className="text-slate-900 font-semibold">QA Project Manager at Corammers</span>.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              I care deeply about clean architecture, secure system design, and delivering reliable
              software that actually works in production.
            </p>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              {[
                { icon: MapPin, text: "Islamabad, Pakistan" },
                { icon: GraduationCap, text: "BS Software Engineering — Riphah International University" },
                { icon: Briefcase, text: "QA Developer @ Authox · Full-time" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-slate-500 pt-2">
                  <Icon size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: stat cards */}
          <AnimatedSection direction="right">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <AnimatedSection key={s.label} delay={i * 0.1}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center card-shadow">
                    <div className="text-4xl font-extrabold gradient-text mb-2">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-slate-500 text-sm font-medium">{s.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
