const experiences = [
  {
    role: "Quality Assurance Developer",
    company: "Authox",
    period: "June 2025 – Present",
    type: "Full-time · Hybrid",
    location: "Islamabad, Pakistan",
    color: "indigo",
    description:
      "Design, develop, and test software applications using ASP.NET MVC & .NET Framework. Collaborate with cross-functional teams, write clean maintainable code, and participate in the full SDLC.",
    highlights: [
      "Built MediFind Admin Web Portal — healthcare admin dashboard (JavaScript)",
      "Developed NestJS RESTful API services for production backend systems",
      "Implemented QR-based & TOTP authentication systems across platforms",
      "Developed OTP verification via Twilio, SMTP, ASP.NET Core & MySQL",
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
    description:
      "Joined as QA Specialist Intern, promoted to QA Project Manager within a month. Oversaw QA activities, coordinated development teams, managed project timelines, and ensured quality standards.",
    highlights: [
      "Promoted from QA Intern to QA Project Manager within 1 month",
      "Managed QA lifecycle across multiple concurrent projects",
      "Coordinated cross-team sprints and prepared progress reports for stakeholders",
      "Developed and maintained WordPress sites using Elementor",
    ],
  },
];

const colorMap: Record<string, { dot: string; border: string; badge: string }> = {
  indigo: {
    dot: "bg-indigo-500",
    border: "border-indigo-500/30",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  },
  purple: {
    dot: "bg-purple-500",
    border: "border-purple-500/30",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Work History
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/8 -translate-x-1/2 hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const c = colorMap[exp.color];
              return (
                <div key={exp.company} className={`relative md:flex gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                    <div className={`w-3 h-3 rounded-full ${c.dot} ring-4 ring-[#0a0a0f]`} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className={`md:w-1/2 rounded-2xl border ${c.border} bg-white/3 p-6 card-hover`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                        <p className="text-gray-400 font-medium">{exp.company}</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border ${c.badge}`}>
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span>{exp.period}</span>
                      <span>· {exp.location}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-500">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
