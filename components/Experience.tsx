import AnimatedSection from "./AnimatedSection";

const experiences = [
  {
    role: "Quality Assurance Developer",
    company: "Authox",
    period: "June 2025 – Present",
    type: "Full-time · Hybrid",
    location: "Islamabad, Pakistan",
    color: "indigo",
    current: true,
    description:
      "Design, develop, and test software applications using ASP.NET MVC & .NET Framework. Collaborate with cross-functional teams in the full SDLC.",
    highlights: [
      "Built MediFind Admin Web Portal — healthcare admin dashboard (JavaScript)",
      "Developed NestJS RESTful API services for production backend systems",
      "Implemented QR-based & TOTP authentication systems across platforms",
      "OTP verification via Twilio, SMTP, ASP.NET Core & MySQL",
      "Built accounting-marketplace platform (TypeScript)",
      "Created MouseMoverHelper Windows micro-service (C#)",
    ],
  },
  {
    role: "QA Project Manager & WordPress Developer",
    company: "Corammers",
    period: "Oct 2025 – Feb 2026",
    type: "Contract · Remote",
    location: "Rawalpindi, Pakistan",
    color: "purple",
    current: false,
    description:
      "Joined as QA Specialist Intern, promoted to QA Project Manager within a month. Managed QA activities, sprint coordination, timelines, and stakeholder reporting.",
    highlights: [
      "Promoted from QA Intern → QA Project Manager within 1 month",
      "Managed QA lifecycle across multiple concurrent projects",
      "Coordinated cross-team sprints and stakeholder reports",
      "Developed and maintained WordPress sites using Elementor",
    ],
  },
];

const colorMap = {
  indigo: {
    dot: "bg-indigo-500",
    line: "border-indigo-500/40",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25",
    bullet: "bg-indigo-500",
    card: "border-indigo-500/20 hover:border-indigo-500/40",
    glow: "hover:shadow-indigo-500/10",
  },
  purple: {
    dot: "bg-purple-500",
    line: "border-purple-500/40",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/25",
    bullet: "bg-purple-500",
    card: "border-purple-500/20 hover:border-purple-500/40",
    glow: "hover:shadow-purple-500/10",
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-white/[0.015]">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Work History</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Experience</h2>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-white/8" />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const c = colorMap[exp.color as keyof typeof colorMap];
              return (
                <AnimatedSection key={exp.company} delay={i * 0.15} direction="left">
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-10 h-10 rounded-full border-2 ${c.line} bg-[#0a0a0f] flex items-center justify-center z-10`}>
                        <div className={`w-3 h-3 rounded-full ${c.dot} ${exp.current ? "animate-pulse" : ""}`} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 mb-4 rounded-2xl border bg-white/[0.02] p-6 transition-all duration-300 hover:shadow-lg ${c.card} ${c.glow}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                        <div>
                          <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                          <p className="text-gray-400 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>
                            {exp.type}
                          </span>
                          {exp.current && (
                            <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                        <span>{exp.period}</span>
                        <span>·</span>
                        <span>{exp.location}</span>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                      <ul className="space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-gray-500">
                            <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${c.bullet}`} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
