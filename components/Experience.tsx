import AnimatedSection from "./AnimatedSection";

const experiences = [
  {
    role: "Software Engineer",
    company: "Quantum Synergy Solutions",
    period: "Jul 2026 – Present",
    type: "Contract · Hybrid",
    location: "Rawalpindi, Punjab, Pakistan",
    color: "teal",
    current: true,
    description: "Contributing to the design, development, and maintenance of software applications, APIs, and databases that support core business operations. Involved in system architecture and technical documentation to ensure scalable and maintainable solutions.",
    highlights: [
      "Building Quantum Framer — AI video-to-clips SaaS platform (live at quantumframer.com)",
      "System architecture design for scalable, maintainable software solutions",
      "Cross-functional collaboration to deliver projects on time and to company coding standards",
      "Applied Generative AI for web application development workflows",
      "Maintaining strict confidentiality and security across client data and proprietary systems",
    ],
  },
  {
    role: "Quality Assurance Developer",
    company: "Authox",
    period: "June 2025 – Present",
    type: "Full-time · Hybrid",
    location: "Rawalpindi, Pakistan",
    color: "indigo",
    current: true,
    description: "Design, develop, and test software applications using ASP.NET MVC & .NET Framework. Collaborate with cross-functional teams in the full SDLC.",
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
    description: "Joined as QA Specialist Intern, promoted to QA Project Manager within a month. Managed QA activities, sprint coordination, timelines, and stakeholder reporting.",
    highlights: [
      "Promoted from QA Intern → QA Project Manager within 1 month",
      "Managed QA lifecycle across multiple concurrent projects",
      "Coordinated cross-team sprints and stakeholder reports",
      "Developed and maintained WordPress sites using Elementor",
    ],
  },
];

const colorMap = {
  teal:   { dot: "bg-teal-500",   ring: "border-teal-200",   badge: "bg-teal-50 text-teal-700 border-teal-200",     bullet: "bg-teal-400",   card: "hover:border-teal-200 hover:shadow-teal-100/60" },
  indigo: { dot: "bg-indigo-500", ring: "border-indigo-200", badge: "bg-indigo-50 text-indigo-700 border-indigo-200", bullet: "bg-indigo-400", card: "hover:border-indigo-200 hover:shadow-indigo-100/60" },
  purple: { dot: "bg-purple-500", ring: "border-purple-200", badge: "bg-purple-50 text-purple-700 border-purple-200", bullet: "bg-purple-400", card: "hover:border-purple-200 hover:shadow-purple-100/60" },
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">Work History</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Experience</h2>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200" />
          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const c = colorMap[exp.color as keyof typeof colorMap];
              return (
                <AnimatedSection key={exp.company} delay={i * 0.15} direction="left">
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-10 h-10 rounded-full border-2 ${c.ring} bg-white flex items-center justify-center z-10 shadow-sm`}>
                        <div className={`w-3 h-3 rounded-full ${c.dot} ${exp.current ? "animate-pulse" : ""}`} />
                      </div>
                    </div>
                    <div className={`flex-1 mb-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 card-shadow ${c.card}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                        <div>
                          <h3 className="text-slate-900 font-bold text-lg">{exp.role}</h3>
                          <p className="text-slate-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>{exp.type}</span>
                          {exp.current && (
                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Current
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
                        <span>{exp.period}</span><span>·</span><span>{exp.location}</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-slate-500">
                            <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${c.bullet}`} />{h}
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
