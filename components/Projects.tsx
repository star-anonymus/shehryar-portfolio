import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

const projects = [
  {
    title: "MediFind — Healthcare Emergency System",
    description:
      "Full-stack FYP: Flutter mobile app + Node.js/NestJS backend for real-time emergency dispatch, GPS tracking, AI-powered triage, and admin web portal. Features live ambulance maps, role-based access (patient, responder, admin), and push notifications.",
    tags: ["Flutter", "Dart", "Node.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
    github: "https://github.com/shehryar-ahmed44172/MediFind_FYP_Project",
    demo: null,
    featured: true,
    category: "Full-Stack",
  },
  {
    title: "NestJS RESTful APIs",
    description:
      "Production-ready RESTful API services built with NestJS and TypeScript. Includes authentication, authorization, modular architecture, and clean code patterns for scalable backend development.",
    tags: ["NestJS", "TypeScript", "REST API", "Node.js"],
    github: "https://github.com/star-anonymus/NestJS_RestAPIs",
    demo: null,
    featured: false,
    category: "Backend",
  },
  {
    title: "UserForm — Full-Stack System",
    description:
      "End-to-end user form management system with a JavaScript frontend and C# backend. Demonstrates CRUD operations, form validation, and client-server communication.",
    tags: ["JavaScript", "C#", "Full-Stack"],
    github: "https://github.com/star-anonymus/UserForm-Frontend",
    demo: null,
    featured: false,
    category: "Full-Stack",
  },
  {
    title: "MAUTH Authenticator",
    description:
      "Multi-platform authentication application supporting multiple auth strategies. Built as a multi-auth solution for enterprise use cases.",
    tags: ["HTML", "JavaScript", "Authentication"],
    github: "https://github.com/star-anonymus/MAUTH_AUTHENTICATOR",
    demo: null,
    featured: false,
    category: "Security",
  },
  {
    title: "OTP Verification System",
    description:
      "Secure OTP verification via email using ASP.NET Core Web API, Twilio, SMTP, and MySQL. Includes time-based OTP (TOTP) support with Google Authenticator integration via Java Spring Boot.",
    tags: ["ASP.NET Core", "C#", "Twilio", "SMTP", "MySQL", "Spring Boot", "Java"],
    github: "https://github.com/star-anonymus",
    demo: null,
    featured: false,
    category: "Security",
  },
  {
    title: "MouseMover Helper",
    description:
      "Windows micro-service utility in C# that prevents system idle/sleep state — useful for keeping sessions alive in corporate environments. Invoked via exe from a companion service.",
    tags: ["C#", ".NET", "Windows", "Desktop"],
    github: "https://github.com/star-anonymus/MouseMoverHelper",
    demo: null,
    featured: false,
    category: "Desktop",
  },
  {
    title: "Accounting Marketplace Platform",
    description:
      "Enterprise accounting and marketplace platform built with TypeScript at Authox. Handles financial transactions, marketplace listings, and multi-role user management.",
    tags: ["TypeScript", "Full-Stack", "Enterprise"],
    github: null,
    demo: null,
    featured: false,
    category: "Enterprise",
  },
  {
    title: "QR-Based Authentication System",
    description:
      "Cross-platform QR authentication system with a desktop app, mobile client, and backend. Enables secure, passwordless login via QR code scanning.",
    tags: ["C#", "HTML", "QR Code", "Authentication", "Cross-Platform"],
    github: null,
    demo: null,
    featured: false,
    category: "Security",
  },
];

const categoryColors: Record<string, string> = {
  "Full-Stack": "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  Backend: "text-purple-300 bg-purple-500/10 border-purple-500/20",
  Security: "text-pink-300 bg-pink-500/10 border-pink-500/20",
  Desktop: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  Enterprise: "text-amber-300 bg-amber-500/10 border-amber-500/20",
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Projects I've Built</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            A mix of personal projects, university work, and professional systems built at companies.
          </p>
        </div>

        {/* Featured project */}
        {featured.map((p) => (
          <div
            key={p.title}
            className="mb-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 p-8 card-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
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
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub size={20} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-5">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Other projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 flex flex-col card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full border ${categoryColors[p.category] ?? "text-gray-400 bg-gray-500/10 border-gray-500/20"}`}
                >
                  {p.category}
                </span>
                <div className="flex gap-2">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <FiGithub size={16} />
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs text-gray-400 bg-white/5 border border-white/8"
                  >
                    {tag}
                  </span>
                ))}
                {p.tags.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-xs text-gray-500">
                    +{p.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
