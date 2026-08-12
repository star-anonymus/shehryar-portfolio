import { ExternalLink, Zap } from "lucide-react";
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
    title: "Vytal Health — AI Healthcare SaaS",
    description:
      "AI-powered healthcare SaaS platform with a full product dashboard and real AI chatbot integration. Built as a multi-page app with React, TypeScript, Vite, and Tailwind CSS v4.",
    tags: ["React", "TypeScript", "Vite", "Tailwind v4", "AI Chatbot"],
    github: "https://github.com/star-anonymus/vytal-health",
    demo: "https://vytal-health.vercel.app",
    featured: false,
    category: "Full-Stack",
    accent: "from-teal-500 to-cyan-500",
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

// Live utility websites — updated as each site is deployed
const liveTools = [
  {
    title: "FileConvert",
    description: "Free online file converter — image format conversion, compression, images to PDF, and PDF merger. Runs 100% in your browser, no uploads.",
    tags: ["Next.js", "pdf-lib", "browser-image-compression", "TypeScript"],
    github: "https://github.com/star-anonymus/file-converter",
    demo: "https://file-converter-inky.vercel.app",
    icon: "⚡",
    color: "blue",
    status: "live",
  },
  {
    title: "TextCraft",
    description: "All-in-one text utility — word & character counter, case converter, duplicate remover, Lorem ipsum generator, and whitespace cleaner. 100% browser-based.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/star-anonymus/text-tools",
    demo: "https://textcraft-tools.vercel.app",
    icon: "📝",
    color: "violet",
    status: "live",
  },
  {
    title: "SecurePass",
    description: "Generate strong, customizable passwords with real-time strength analysis, passphrase & PIN generator. Uses Web Crypto API — nothing leaves your browser.",
    tags: ["Next.js", "TypeScript", "Web Crypto API"],
    github: "https://github.com/star-anonymus/password-generator",
    demo: "https://securepass-tools.vercel.app",
    icon: "🔐",
    color: "emerald",
    status: "live",
  },
  {
    title: "UnitConvert",
    description: "Convert length, weight, temperature, area, volume, and speed — instantly. Bidirectional swap, full conversion table, metric & imperial. All in-browser.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/star-anonymus/unit-converter",
    demo: "https://unitconvert-tools.vercel.app",
    icon: "📐",
    color: "orange",
    status: "live",
  },
  {
    title: "DateCalc",
    description: "Calculate age from date of birth, days between two dates, add/subtract days, and countdown to any event.",
    tags: ["Next.js", "TypeScript", "date-fns"],
    github: null,
    demo: null,
    icon: "📅",
    color: "pink",
    status: "coming",
  },
  {
    title: "AI Resume Builder",
    description: "Fill in your details, get a polished PDF resume — AI-enhanced bullet points and professional formatting.",
    tags: ["Next.js", "Claude AI", "PDF", "TypeScript"],
    github: null,
    demo: null,
    icon: "🤖",
    color: "indigo",
    status: "coming",
  },
  {
    title: "AI Grammar Checker",
    description: "Paste any text and get instant grammar corrections with explanations — powered by Claude AI.",
    tags: ["Next.js", "Claude AI", "TypeScript"],
    github: null,
    demo: null,
    icon: "✅",
    color: "teal",
    status: "coming",
  },
  {
    title: "Cover Letter Generator",
    description: "Enter job title and your skills — get a personalized, professional cover letter in seconds using AI.",
    tags: ["Next.js", "Claude AI", "TypeScript"],
    github: null,
    demo: null,
    icon: "📄",
    color: "purple",
    status: "coming",
  },
  {
    title: "QR Generator",
    description: "Generate QR codes for URLs, text, contact cards, and WiFi credentials. Download as PNG or SVG.",
    tags: ["Next.js", "qrcode.js", "TypeScript"],
    github: null,
    demo: null,
    icon: "◼",
    color: "gray",
    status: "coming",
  },
  {
    title: "Invoice Generator",
    description: "Fill in client and item details — download a clean, professional PDF invoice. Free for freelancers.",
    tags: ["Next.js", "pdf-lib", "TypeScript"],
    github: null,
    demo: null,
    icon: "🧾",
    color: "amber",
    status: "coming",
  },
  {
    title: "Color Palette",
    description: "Pick colors, generate palettes, and export hex codes, CSS variables, and Tailwind config instantly.",
    tags: ["Next.js", "TypeScript", "Canvas API"],
    github: null,
    demo: null,
    icon: "🎨",
    color: "rose",
    status: "coming",
  },
  {
    title: "Markdown Editor",
    description: "Live markdown editor with side-by-side HTML preview. Copy formatted HTML or download as .md file.",
    tags: ["Next.js", "marked.js", "TypeScript"],
    github: null,
    demo: null,
    icon: "⌨",
    color: "slate",
    status: "coming",
  },
  {
    title: "BMI & Health Calculator",
    description: "Calculate BMI, daily calorie needs, water intake, and ideal weight — with visual health range indicators.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: null,
    demo: null,
    icon: "💪",
    color: "green",
    status: "coming",
  },
  {
    title: "Pomodoro Timer",
    description: "Focus timer with customizable work/break intervals, task list, session history, and sound notifications.",
    tags: ["Next.js", "TypeScript", "Web Audio API"],
    github: null,
    demo: null,
    icon: "⏱",
    color: "red",
    status: "coming",
  },
  {
    title: "Background Remover",
    description: "Upload a photo and remove the background instantly using AI. Download as transparent PNG.",
    tags: ["Next.js", "AI", "Canvas API", "TypeScript"],
    github: null,
    demo: null,
    icon: "🖼",
    color: "cyan",
    status: "coming",
  },
];

const colorMap: Record<string, { border: string; badge: string; icon: string }> = {
  blue:    { border: "border-blue-200 hover:border-blue-300",    badge: "bg-blue-50 text-blue-700",    icon: "bg-blue-50 text-blue-500" },
  violet:  { border: "border-violet-200 hover:border-violet-300",  badge: "bg-violet-50 text-violet-700",  icon: "bg-violet-50 text-violet-500" },
  emerald: { border: "border-emerald-200 hover:border-emerald-300", badge: "bg-emerald-50 text-emerald-700", icon: "bg-emerald-50 text-emerald-500" },
  orange:  { border: "border-orange-200 hover:border-orange-300",  badge: "bg-orange-50 text-orange-700",  icon: "bg-orange-50 text-orange-500" },
  pink:    { border: "border-pink-200 hover:border-pink-300",    badge: "bg-pink-50 text-pink-700",    icon: "bg-pink-50 text-pink-500" },
  indigo:  { border: "border-indigo-200 hover:border-indigo-300",  badge: "bg-indigo-50 text-indigo-700",  icon: "bg-indigo-50 text-indigo-500" },
  teal:    { border: "border-teal-200 hover:border-teal-300",    badge: "bg-teal-50 text-teal-700",    icon: "bg-teal-50 text-teal-500" },
  purple:  { border: "border-purple-200 hover:border-purple-300",  badge: "bg-purple-50 text-purple-700",  icon: "bg-purple-50 text-purple-500" },
  amber:   { border: "border-amber-200 hover:border-amber-300",   badge: "bg-amber-50 text-amber-700",   icon: "bg-amber-50 text-amber-500" },
  rose:    { border: "border-rose-200 hover:border-rose-300",    badge: "bg-rose-50 text-rose-700",    icon: "bg-rose-50 text-rose-500" },
  green:   { border: "border-green-200 hover:border-green-300",   badge: "bg-green-50 text-green-700",   icon: "bg-green-50 text-green-500" },
  red:     { border: "border-red-200 hover:border-red-300",     badge: "bg-red-50 text-red-700",     icon: "bg-red-50 text-red-500" },
  cyan:    { border: "border-cyan-200 hover:border-cyan-300",    badge: "bg-cyan-50 text-cyan-700",    icon: "bg-cyan-50 text-cyan-500" },
  gray:    { border: "border-slate-200 hover:border-slate-300",    badge: "bg-slate-50 text-slate-700",    icon: "bg-slate-50 text-slate-500" },
  slate:   { border: "border-slate-200 hover:border-slate-300",   badge: "bg-slate-50 text-slate-700",   icon: "bg-slate-50 text-slate-500" },
};

const categoryColors: Record<string, string> = {
  "Full-Stack": "text-indigo-700 bg-indigo-50 border-indigo-200",
  Backend:      "text-purple-700 bg-purple-50 border-purple-200",
  Security:     "text-pink-700 bg-pink-50 border-pink-200",
  Desktop:      "text-sky-700 bg-sky-50 border-sky-200",
  Enterprise:   "text-amber-700 bg-amber-50 border-amber-200",
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const liveCount = liveTools.filter((t) => t.status === "live").length;

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Dev Projects */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Projects I&apos;ve Built</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Personal projects, university work, and professional systems built at companies.
          </p>
        </AnimatedSection>

        {/* Featured */}
        {featured.map((p) => (
          <AnimatedSection key={p.title} className="mb-8">
            <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden group card-shadow hover:border-indigo-200 transition-all duration-300">
              <div className={`h-1 w-full bg-gradient-to-r ${p.accent}`} />
              <div className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">⭐ Featured Project</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{p.title}</h3>
                  </div>
                  <div className="flex gap-3">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all text-sm font-medium">
                        <FiGithub size={15} /> Code
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed mb-6 max-w-3xl">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-slate-200 bg-slate-50 text-slate-600">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {rest.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.06}>
              <div className="h-full relative rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col group card-shadow hover:border-indigo-200 transition-all duration-300">
                <div className={`h-0.5 w-full bg-gradient-to-r ${p.accent} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[p.category] ?? "text-slate-600 bg-slate-50 border-slate-200"}`}>{p.category}</span>
                    <div className="flex gap-2">
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors"><FiGithub size={16} /></a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors"><ExternalLink size={16} /></a>}
                    </div>
                  </div>
                  <h3 className="text-slate-900 font-bold text-sm mb-2 group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs text-slate-500 bg-slate-50 border border-slate-200">{tag}</span>
                    ))}
                    {p.tags.length > 4 && <span className="px-2 py-0.5 rounded text-xs text-slate-400">+{p.tags.length - 4}</span>}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Live Tools Section ── */}
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold mb-4">
            <Zap size={12} /> Free Utility Websites
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Live Tools I&apos;ve Built</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
            A growing collection of free, browser-based utility tools — no signup, no watermarks, no limits.
            <span className="ml-2 inline-flex items-center gap-1 text-green-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              {liveCount} live · {liveTools.length - liveCount} coming soon
            </span>
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveTools.map((tool, i) => {
            const c = colorMap[tool.color] ?? colorMap.gray;
            const isLive = tool.status === "live";
            return (
              <AnimatedSection key={tool.title} delay={i * 0.04}>
                <div className={`h-full rounded-2xl border bg-white p-5 flex flex-col gap-4 card-shadow transition-all duration-300 hover:-translate-y-1 ${c.border} ${!isLive ? "opacity-60" : ""}`}>
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${c.icon}`}>
                      {tool.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      {isLive ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-slate-900 font-bold text-sm mb-1.5">{tool.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{tool.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs text-slate-500 bg-slate-50 border border-slate-200">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  {isLive && (
                    <div className="flex gap-2 pt-1 border-t border-slate-100">
                      {tool.demo && (
                        <a href={tool.demo} target="_blank" rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${c.badge} hover:opacity-80`}>
                          <ExternalLink size={12} /> Visit Site
                        </a>
                      )}
                      {tool.github && (
                        <a href={tool.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 transition-all duration-200">
                          <FiGithub size={12} /> Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}
