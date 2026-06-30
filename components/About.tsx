import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Projects Built", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Who I Am</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <AnimatedSection direction="left" className="space-y-5">
            <p className="text-gray-400 text-lg leading-relaxed">
              I&apos;m a <span className="text-white font-semibold">Software Engineer</span> currently in
              my 7th semester at{" "}
              <span className="text-indigo-400 font-medium">Riphah International University, Islamabad</span>.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              I specialize in full-stack development — building healthcare backends, Flutter mobile
              apps, React dashboards, and RESTful APIs. I&apos;ve worked as a{" "}
              <span className="text-white font-semibold">QA Developer at Authox</span> and a{" "}
              <span className="text-white font-semibold">QA Project Manager at Corammers</span>.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              I care deeply about clean architecture, secure system design, and delivering reliable
              software that actually works in production.
            </p>

            <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
              {[
                { icon: MapPin, text: "Islamabad, Pakistan" },
                { icon: GraduationCap, text: "BS Software Engineering — Riphah International University (2022–2027)" },
                { icon: Briefcase, text: "QA Developer @ Authox · Full-time" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-gray-400 pt-3">
                  <Icon size={16} className="text-indigo-400 shrink-0 mt-0.5" />
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
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-center hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 group">
                    <div className="text-4xl font-extrabold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-gray-500 text-sm">{s.label}</div>
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
