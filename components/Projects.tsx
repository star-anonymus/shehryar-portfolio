import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "MediFind — Healthcare Emergency System",
    description:
      "Full-stack FYP: Flutter mobile app + Node.js/NestJS backend for real-time emergency dispatch, GPS tracking, AI-powered triage, and React admin portal. Features live ambulance maps, role-based access, and push notifications.",
    tags: ["Flutter", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "Socket.io", "React"],
    github: "https://github.com/shehryar-ahmed44172/MediFind_FYP_Project",
    demo: null,
    featured: true,
    category: "Full-Stack",
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "NestJS RESTful APIs",
    description:
      "Production-ready RESTful API services with NestJS & TypeScript. Modular architecture, JWT auth, guards, interceptors, and clean code patterns for scalable backends.",
    tags: ["NestJS", "TypeScript", "Node.js", "REST API"],
    github: "https://github.com/star-anonymus/NestJS_RestAPIs",
    demo: null,
    featured: false,
    category: "Backend",
    accent: "from-purple-500 to-pink-500",
  },
  {
    title: "UserForm — Full-Stack System",
    description:
      "End-to-end user form system with JavaScript frontend and C# backend. CRUD, form validation, and client-server communication.",
    tags: ["JavaScript", "C#", "Full-Stack"],
    github: "https://github.com/star-anonymus/UserForm-Frontend",
    demo: null,
    featured: false,
    category: "Full-Stack",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    title: "OTP & TOTP Verification System",
    description:
      "Secure OTP via email using ASP.NET Core, Twilio, and SMTP. Includes TOTP with Google Authenticator via Java Spring Boot.",
    tags: ["ASP.NET Core", "C#", "Twilio", "SMTP", "Spring Boot", "Java"],
    github: "https://github.com/star-anonymus",
    demo: null,
    featured: false,
    category: "Security",
    accent: "from-pink-500 to-red-500",
  },
  {
    title: "QR-Based Authentication System",
    description:
      "Cross-platform passwordless QR login — desktop app, mobile client, and backend. Secure, token-based QR code scanning flow.",
    tags: ["C#", "HTML", "QR Code", "Auth"],
    github: null,
    demo: null,
    featured: false,
    category: "Security",
    accent: "from-rose-500 to-pink-500",
  },
  {
    title: "MAUTH Authenticator",
    description:
      "Multi-platform authentication app supporting multiple auth strategies for enterprise use cases.",
    tags: ["HTML", "JavaScript", "Authentication"],
    github: "https://github.com/star-anonymus/MAUTH_AUTHENTICATOR",
    demo: null,
    featured: false,
    category: "Security",
    accent: "from-violet-500 to-purple-500",
  },
  {
    title: "Accounting Marketplace Platform",
    description:
      "Enterprise accounting & marketplace platform built in TypeScript at Authox. Handles financial transactions, listings, and multi-role user management.",
    tags: ["TypeScript", "Full-Stack", "Enterprise"],
    github: null,
    demo: null,
    featured: false,
    category: "Enterprise",
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "MouseMover Helper",
    description:
      "Windows micro-service in C# that prevents system idle/sleep — keeps sessions alive via scheduled mouse movement.",
    tags: ["C#", ".NET", "Windows", "Desktop"],
    github: "https://github.com/star-anonymus/MouseMoverHelper",
    demo: null,
    featured: false,
    category: "Desktop",
    accent: "from-sky-500 to-blue-500",
  },
];

const categoryColors: Record<string, string> = {
  "Full-Stack": "text-indigo-300 bg-indigo-500/10 border-indigo-500/25",
  Backend: "text-purple-300 bg-purple-500/10 border-purple-500/25",
  Security: "text-pink-300 bg-pink-500/10 border-pink-500/25",
  Desktop: "text-sky-300 bg-sky-500/10 border-sky-500/25",
  Enterprise: "text-amber-300 bg-amber-500/10 border-amber-500/25",
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Projects I&apos;ve Built</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Personal projects, university work, and professional systems built at companies.
          </p>
        </AnimatedSection>

        {/* Featured */}
        {featured.map((p) => (
          <AnimatedSection key={p.title} className="mb-8">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
              {/* Top accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${p.accent}`} />
              <div className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      ⭐ Featured Project
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">{p.title}</h3>
                  </div>
                  <div className="flex gap-3">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
                      >
                        <FiGithub size={15} /> Code
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.06}>
              <div className="h-full relative rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden flex flex-col group hover:border-white/15 hover:-translate-y-1 transition-all duration-300">
                {/* Top accent bar */}
                <div className={`h-0.5 w-full bg-gradient-to-r ${p.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[p.category] ?? "text-gray-400 bg-white/5 border-white/10"}`}>
                      {p.category}
                    </span>
                    <div className="flex gap-2">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
                          <FiGithub size={16} />
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Demo">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2 group-hover:text-indigo-200 transition-colors">{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs text-gray-500 bg-white/5 border border-white/8">
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-xs text-gray-600">+{p.tags.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
