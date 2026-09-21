/**
 * Where this site actually lives.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — set this once a custom domain is live.
 *  2. Vercel's production URL, which Vercel injects for every Next.js project.
 *  3. localhost, for `npm run dev`.
 *
 * This matters more than it looks: metadataBase, the sitemap, every Open Graph
 * image and every LinkedIn share link are built from it. Pointing it at a
 * domain that doesn't resolve breaks link previews everywhere.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const site = {
  name: "Shehryar Ahmed",
  initials: "SA",
  role: "Full-Stack Software Engineer",
  url: resolveSiteUrl(),
  location: "Rawalpindi, Pakistan",
  email: "ahmedshehryar645@gmail.com",
  phone: "+92 335 7089076",
  resume: "/Shehryar_Ahmed_Resume.pdf",
  socials: {
    github: "https://github.com/star-anonymus",
    githubUser: "star-anonymus",
    linkedin: "https://www.linkedin.com/in/shehryar-ahmed-93834026b/",
    linkedinHandle: "shehryar-ahmed-93834026b",
  },
  tagline:
    "Designing scalable APIs and secure systems with Java/Spring Boot, .NET/NestJS, and React/Next.js — currently building AI-powered SaaS products end to end.",
} as const;

/** Absolute URL for a path — used by OG images and LinkedIn share links. */
export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

/** The bare host, for display ("shehryarahmed.dev"). */
export const siteHost = new URL(site.url).host;
