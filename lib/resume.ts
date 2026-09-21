import type { Accent } from "./projects";

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  accent: Accent;
  current: boolean;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Quantum Synergy Solutions",
    period: "Jul 2026 — Present",
    type: "Contract · Hybrid",
    location: "Rawalpindi, Pakistan",
    accent: "cyan",
    current: true,
    description:
      "Designing, building and maintaining the applications, APIs and databases behind core business operations — including the system architecture and technical documentation that keep them maintainable.",
    highlights: [
      "Building Quantum Framer — AI video-to-clips SaaS, live at quantumframer.com",
      "System architecture design for scalable, maintainable services",
      "Cross-functional delivery against company coding standards",
      "Applied generative AI inside the web development workflow",
      "Strict confidentiality across client data and proprietary systems",
    ],
  },
  {
    role: "Quality Assurance Developer",
    company: "Authox",
    period: "Jun 2025 — Present",
    type: "Full-time · Hybrid",
    location: "Rawalpindi, Pakistan",
    accent: "iris",
    current: true,
    description:
      "Design, develop and test software using ASP.NET MVC and the .NET Framework, working with cross-functional teams across the full SDLC.",
    highlights: [
      "Built the MediFind admin web portal — a healthcare operations dashboard",
      "Developed NestJS REST services for production backend systems",
      "Implemented QR-based and TOTP authentication across platforms",
      "OTP verification over Twilio, SMTP, ASP.NET Core and MySQL",
      "Built an accounting-marketplace platform in TypeScript",
      "Created the MouseMoverHelper Windows micro-service in C#",
    ],
  },
  {
    role: "QA Project Manager & WordPress Developer",
    company: "Corammers",
    period: "Oct 2025 — Feb 2026",
    type: "Contract · Remote",
    location: "Rawalpindi, Pakistan",
    accent: "violet",
    current: false,
    description:
      "Joined as a QA specialist intern and was promoted to QA Project Manager within a month, owning QA activities, sprint coordination, timelines and stakeholder reporting.",
    highlights: [
      "Promoted from QA intern to QA Project Manager in one month",
      "Managed the QA lifecycle across several concurrent projects",
      "Coordinated cross-team sprints and stakeholder reporting",
      "Developed and maintained WordPress sites with Elementor",
    ],
  },
];

export interface SkillGroup {
  category: string;
  accent: Accent;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    accent: "iris",
    skills: ["TypeScript", "JavaScript", "C#", "Java", "Python", "Dart"],
  },
  {
    category: "Frontend",
    accent: "violet",
    skills: ["React", "Next.js", "Tailwind CSS", "Vite", "WordPress"],
  },
  {
    category: "Backend",
    accent: "cyan",
    skills: ["NestJS", "Node.js", "ASP.NET", "Spring Boot", "Express"],
  },
  {
    category: "Mobile",
    accent: "rose",
    skills: ["Flutter", "Dart"],
  },
  {
    category: "Databases",
    accent: "emerald",
    skills: ["PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Firebase", "Prisma ORM"],
  },
  {
    category: "Tools & Practice",
    accent: "amber",
    skills: ["Git", "GitHub", "JIRA", "REST APIs", "Socket.io", "Vercel"],
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  accent: Accent;
}

export const certifications: Certification[] = [
  { name: "Networking Basics", issuer: "Cisco", date: "Apr 2025", accent: "iris" },
  { name: "Python Essentials 2", issuer: "Cisco", date: "Dec 2024", accent: "violet" },
  { name: "JavaScript Essentials 2", issuer: "Cisco", date: "Dec 2024", accent: "cyan" },
  { name: "Engaging Stakeholders for Success", issuer: "Cisco", date: "Oct 2024", accent: "rose" },
];

export const stats = [
  { label: "Years building", value: 3, suffix: "+" },
  { label: "Projects shipped", value: 20, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
];

export const about = {
  headline: "Backend-focused full-stack developer",
  education: "BS Software Engineering — Riphah International University, Islamabad",
  paragraphs: [
    "I build the parts of a product that have to stay up: APIs, auth, real-time pipelines, and the admin surfaces that keep them observable.",
    "Day to day that means Java/Spring Boot, .NET/C#, and Node.js/NestJS on the server, with React, Next.js and Tailwind on the front. On mobile it's Flutter.",
    "Right now I'm shipping AI-powered SaaS — healthcare, video generation, and automation — while working two engineering roles and finishing my degree.",
  ],
  facts: [
    { label: "Based in", value: "Rawalpindi, Pakistan" },
    { label: "Studying", value: "BS Software Engineering, Riphah International University" },
    { label: "Engineering at", value: "Quantum Synergy Solutions · Contract" },
    { label: "QA Developer at", value: "Authox · Full-time · Hybrid" },
  ],
};

/** Marquee strip under the hero. */
export const techMarquee = [
  "TypeScript", "NestJS", "Next.js", "React", "Flutter", "Spring Boot",
  "ASP.NET Core", "PostgreSQL", "Prisma", "Socket.io", "Tailwind CSS",
  "Node.js", "C#", "Java", "Dart", "MySQL", "Vercel", "Git",
];
