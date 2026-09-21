export type Accent = "iris" | "violet" | "cyan" | "rose" | "amber" | "emerald";

export interface Project {
  slug: string;
  title: string;
  /** One line used in cards, OG images and LinkedIn previews. */
  summary: string;
  description: string;
  /** Extra paragraphs shown only on the detail page. */
  details?: string[];
  highlights?: string[];
  tags: string[];
  github: string | null;
  demo: string | null;
  featured: boolean;
  category: string;
  /** Two letters drawn behind the generated cover art. */
  monogram: string;
  accent: Accent;
  year: string;
}

export const projects: Project[] = [
  {
    slug: "medifind",
    title: "MediFind — Healthcare Emergency System",
    summary:
      "Flutter + NestJS emergency dispatch platform with live ambulance tracking and AI triage.",
    description:
      "Full-stack final year project: a Flutter mobile app backed by a Node.js/NestJS API for real-time emergency dispatch, GPS tracking, AI-powered triage, and a React admin portal. Live ambulance maps, role-based access control, and push notifications.",
    details: [
      "The dispatch core runs on Socket.io: an ambulance's location streams to every subscribed patient and to the admin map at once, so the ETA on a patient's screen and the marker in the control room never disagree.",
      "Prisma over PostgreSQL models patients, responders, hospitals and dispatch events. Role-based guards in NestJS keep the three audiences — patient, responder, admin — on strictly separate slices of the same data.",
    ],
    highlights: [
      "Real-time ambulance tracking over WebSockets with map replay",
      "AI-assisted triage that ranks incoming emergencies by severity",
      "React admin portal: dispatch, audit logs, subscriptions, notifications",
      "Role-based access control across patient, responder and admin apps",
      "Accessibility mode for deaf users, switchable after registration",
    ],
    tags: ["Flutter", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "Socket.io", "React"],
    github: "https://github.com/shehryar-ahmed44172/MediFind_FYP_Project",
    demo: null,
    featured: true,
    category: "Full-Stack",
    monogram: "MF",
    accent: "iris",
    year: "2026",
  },
  {
    slug: "di-ayezals",
    title: "DI AYEZAL'S — E-Commerce Store",
    summary:
      "Production storefront for a Pakistani retail brand — COD checkout, per-size stock, live order alerts.",
    description:
      "Custom online store built for a Pakistani retail brand selling perfumes, khussay, artificial jewelry, wallets and watches. Cash-on-delivery checkout, per-size stock and pricing, a coupon engine, order tracking by ID, and real-time order alerts over server-sent events.",
    details: [
      "Ships with a full admin panel, so the owner manages products, categories, discounts and delivery settings without a developer in the loop.",
      "Stock and price are tracked per size rather than per product, which is what the brand actually sells — a khussa in 38 and the same khussa in 42 are independent inventory lines.",
    ],
    highlights: [
      "Cash-on-delivery checkout tuned for the Pakistani market",
      "Per-size stock and pricing, not per-product",
      "Coupon engine with order tracking by ID",
      "Real-time new-order alerts to the admin over server-sent events",
      "Self-serve admin panel for products, categories and delivery rules",
    ],
    tags: ["React 19", "Vite", "Express 5", "Prisma", "MariaDB", "SSE", "Vercel"],
    github: "https://github.com/star-anonymus/di-ayezals",
    demo: null,
    featured: true,
    category: "E-Commerce",
    monogram: "DA",
    accent: "rose",
    year: "2026",
  },
  {
    slug: "quantum-framer",
    title: "Quantum Framer — AI Video SaaS",
    summary:
      "AI platform that pulls viral short clips out of long-form video. Live at quantumframer.com.",
    description:
      "AI-powered video-to-clips SaaS platform built at Quantum Synergy Solutions. It automatically extracts viral short clips from long-form videos, scores them, and renders them for vertical platforms.",
    highlights: [
      "Automated long-form to short-form clip extraction",
      "Shipped as a live commercial product at quantumframer.com",
    ],
    tags: ["React", "TypeScript", "Node.js", "AI", "SaaS"],
    github: "https://github.com/quantumsynergysols-web/Quantum-Framers",
    demo: "https://quantumframer.com",
    featured: true,
    category: "AI SaaS",
    monogram: "QF",
    accent: "cyan",
    year: "2026",
  },
  {
    slug: "vytal-health",
    title: "Vytal Health — AI Healthcare SaaS",
    summary: "Healthcare SaaS with a full product dashboard and a real AI chatbot integration.",
    description:
      "AI-powered healthcare SaaS platform with a full product dashboard and real AI chatbot integration. Built as a multi-page application with React, TypeScript, Vite, and Tailwind CSS v4.",
    tags: ["React", "TypeScript", "Vite", "Tailwind v4", "AI Chatbot"],
    github: "https://github.com/star-anonymus/vytal-health",
    demo: "https://vytal-health.vercel.app",
    featured: false,
    category: "AI SaaS",
    monogram: "VH",
    accent: "emerald",
    year: "2025",
  },
  {
    slug: "nestjs-rest-apis",
    title: "NestJS RESTful APIs",
    summary: "Production-ready REST services: modular architecture, JWT auth, guards, interceptors.",
    description:
      "Production-ready RESTful API services with NestJS and TypeScript. Modular architecture, JWT authentication, guards, interceptors, and clean code patterns for backends meant to scale.",
    tags: ["NestJS", "TypeScript", "Node.js", "REST API"],
    github: "https://github.com/star-anonymus/NestJS_RestAPIs",
    demo: null,
    featured: false,
    category: "Backend",
    monogram: "NJ",
    accent: "violet",
    year: "2025",
  },
  {
    slug: "otp-totp-verification",
    title: "OTP & TOTP Verification System",
    summary: "Email and SMS one-time codes plus Google Authenticator TOTP across .NET and Spring Boot.",
    description:
      "Secure OTP delivery over email and SMS using ASP.NET Core, Twilio, and SMTP — plus TOTP enrolment and verification with Google Authenticator via Java Spring Boot.",
    tags: ["ASP.NET Core", "C#", "Twilio", "SMTP", "Spring Boot", "Java"],
    github: "https://github.com/star-anonymus",
    demo: null,
    featured: false,
    category: "Security",
    monogram: "OT",
    accent: "rose",
    year: "2025",
  },
  {
    slug: "qr-authentication",
    title: "QR-Based Authentication System",
    summary: "Passwordless QR login across a desktop app, a mobile client and a shared backend.",
    description:
      "Cross-platform passwordless QR login — desktop app, mobile client, and backend. A short-lived token is encoded into a QR code, scanned by the authenticated phone, and exchanged for a desktop session.",
    tags: ["C#", "HTML", "QR Code", "Auth"],
    github: null,
    demo: null,
    featured: false,
    category: "Security",
    monogram: "QR",
    accent: "violet",
    year: "2025",
  },
  {
    slug: "mauth-authenticator",
    title: "MAUTH Authenticator",
    summary: "Multi-platform authenticator supporting several auth strategies for enterprise use.",
    description:
      "Multi-platform authentication app supporting multiple auth strategies for enterprise use cases, from one-time codes through to device-bound approvals.",
    tags: ["HTML", "JavaScript", "Authentication"],
    github: "https://github.com/star-anonymus/MAUTH_AUTHENTICATOR",
    demo: null,
    featured: false,
    category: "Security",
    monogram: "MA",
    accent: "iris",
    year: "2025",
  },
  {
    slug: "accounting-marketplace",
    title: "Accounting Marketplace Platform",
    summary: "Enterprise accounting and marketplace platform handling transactions and multi-role access.",
    description:
      "Enterprise accounting and marketplace platform built in TypeScript at Authox. Handles financial transactions, listings, and multi-role user management.",
    tags: ["TypeScript", "Full-Stack", "Enterprise"],
    github: null,
    demo: null,
    featured: false,
    category: "Enterprise",
    monogram: "AM",
    accent: "amber",
    year: "2025",
  },
  {
    slug: "mousemover-helper",
    title: "MouseMover Helper",
    summary: "A C# Windows micro-service that keeps a session alive by scheduling mouse movement.",
    description:
      "Windows micro-service in C# that prevents system idle and sleep — it keeps sessions alive through scheduled, minimal mouse movement.",
    tags: ["C#", ".NET", "Windows", "Desktop"],
    github: "https://github.com/star-anonymus/MouseMoverHelper",
    demo: null,
    featured: false,
    category: "Desktop",
    monogram: "MM",
    accent: "cyan",
    year: "2024",
  },
  {
    slug: "userform-system",
    title: "UserForm — Full-Stack System",
    summary: "End-to-end user form system with a JavaScript frontend and a C# backend.",
    description:
      "End-to-end user form system with a JavaScript frontend and a C# backend: CRUD, form validation, and client-server communication.",
    tags: ["JavaScript", "C#", "Full-Stack"],
    github: "https://github.com/star-anonymus/UserForm-Frontend",
    demo: null,
    featured: false,
    category: "Full-Stack",
    monogram: "UF",
    accent: "iris",
    year: "2024",
  },
];

export interface Tool {
  title: string;
  description: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  icon: string;
  status: "live" | "coming";
}

export const tools: Tool[] = [
  {
    title: "FileConvert",
    description:
      "Image format conversion, compression, images to PDF, and a PDF merger. Runs 100% in your browser — no uploads.",
    tags: ["Next.js", "pdf-lib", "TypeScript"],
    github: "https://github.com/star-anonymus/file-converter",
    demo: "https://file-converter-inky.vercel.app",
    icon: "⚡",
    status: "live",
  },
  {
    title: "TextCraft",
    description:
      "Word and character counter, case converter, duplicate remover, Lorem ipsum generator, whitespace cleaner.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/star-anonymus/text-tools",
    demo: "https://textcraft-tools.vercel.app",
    icon: "📝",
    status: "live",
  },
  {
    title: "SecurePass",
    description:
      "Strong customizable passwords with live strength analysis, passphrases and PINs. Uses the Web Crypto API.",
    tags: ["Next.js", "TypeScript", "Web Crypto API"],
    github: "https://github.com/star-anonymus/password-generator",
    demo: "https://securepass-tools.vercel.app",
    icon: "🔐",
    status: "live",
  },
  {
    title: "UnitConvert",
    description:
      "Length, weight, temperature, area, volume and speed — bidirectional swap and a full conversion table.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/star-anonymus/unit-converter",
    demo: "https://unitconvert-tools.vercel.app",
    icon: "📐",
    status: "live",
  },
  {
    title: "DateCalc",
    description: "Age from date of birth, days between dates, add/subtract days, countdown to any event.",
    tags: ["Next.js", "TypeScript", "date-fns"],
    github: null,
    demo: null,
    icon: "📅",
    status: "coming",
  },
  {
    title: "AI Resume Builder",
    description: "Fill in your details, get a polished PDF resume with AI-enhanced bullet points.",
    tags: ["Next.js", "Claude AI", "PDF"],
    github: null,
    demo: null,
    icon: "🤖",
    status: "coming",
  },
  {
    title: "AI Grammar Checker",
    description: "Paste any text and get instant grammar corrections with explanations.",
    tags: ["Next.js", "Claude AI", "TypeScript"],
    github: null,
    demo: null,
    icon: "✅",
    status: "coming",
  },
  {
    title: "Cover Letter Generator",
    description: "Enter a job title and your skills — get a personalized cover letter in seconds.",
    tags: ["Next.js", "Claude AI", "TypeScript"],
    github: null,
    demo: null,
    icon: "📄",
    status: "coming",
  },
  {
    title: "QR Generator",
    description: "QR codes for URLs, text, contact cards and WiFi credentials. Download as PNG or SVG.",
    tags: ["Next.js", "qrcode.js", "TypeScript"],
    github: null,
    demo: null,
    icon: "◼",
    status: "coming",
  },
  {
    title: "Invoice Generator",
    description: "Client and item details in, a clean professional PDF invoice out. Free for freelancers.",
    tags: ["Next.js", "pdf-lib", "TypeScript"],
    github: null,
    demo: null,
    icon: "🧾",
    status: "coming",
  },
  {
    title: "Color Palette",
    description: "Pick colors, generate palettes, export hex codes, CSS variables and Tailwind config.",
    tags: ["Next.js", "TypeScript", "Canvas API"],
    github: null,
    demo: null,
    icon: "🎨",
    status: "coming",
  },
  {
    title: "Markdown Editor",
    description: "Live markdown editor with side-by-side HTML preview. Copy HTML or download as .md.",
    tags: ["Next.js", "marked.js", "TypeScript"],
    github: null,
    demo: null,
    icon: "⌨",
    status: "coming",
  },
  {
    title: "BMI & Health Calculator",
    description: "BMI, daily calorie needs, water intake and ideal weight, with visual range indicators.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: null,
    demo: null,
    icon: "💪",
    status: "coming",
  },
  {
    title: "Pomodoro Timer",
    description: "Focus timer with custom intervals, a task list, session history and sound notifications.",
    tags: ["Next.js", "TypeScript", "Web Audio API"],
    github: null,
    demo: null,
    icon: "⏱",
    status: "coming",
  },
  {
    title: "Background Remover",
    description: "Upload a photo, remove the background with AI, download a transparent PNG.",
    tags: ["Next.js", "AI", "Canvas API"],
    github: null,
    demo: null,
    icon: "🖼",
    status: "coming",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const liveToolCount = tools.filter((t) => t.status === "live").length;

/** Tailwind class fragments per accent — kept as whole strings so the scanner sees them. */
export const accentClasses: Record<Accent, { text: string; bg: string; border: string; glow: string }> = {
  iris: {
    text: "text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-400/25",
    glow: "from-indigo-500 to-violet-500",
  },
  violet: {
    text: "text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-400/25",
    glow: "from-violet-500 to-fuchsia-500",
  },
  cyan: {
    text: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-400/25",
    glow: "from-cyan-400 to-sky-500",
  },
  rose: {
    text: "text-rose-300",
    bg: "bg-rose-500/10",
    border: "border-rose-400/25",
    glow: "from-rose-500 to-orange-400",
  },
  amber: {
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-400/25",
    glow: "from-amber-400 to-orange-500",
  },
  emerald: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/25",
    glow: "from-emerald-400 to-teal-500",
  },
};

/** Hex values for the same accents — ImageResponse can't use Tailwind classes. */
export const accentHex: Record<Accent, [string, string]> = {
  iris: ["#6366f1", "#a855f7"],
  violet: ["#8b5cf6", "#d946ef"],
  cyan: ["#22d3ee", "#0ea5e9"],
  rose: ["#f43f5e", "#fb923c"],
  amber: ["#fbbf24", "#f97316"],
  emerald: ["#34d399", "#14b8a6"],
};
