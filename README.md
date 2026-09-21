# shehryar-portfolio

Personal portfolio for Shehryar Ahmed — Next.js 16 (App Router), Tailwind CSS v4, Framer Motion.

Fully static: every route is prerendered at build time, so there is no server runtime and nothing to configure to deploy it.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's in it

**"Aurora Noir" design system.** Dark theme built on Tailwind v4 theme tokens in `app/globals.css`: aurora accents, glass surfaces, an animated conic border, film grain. Colours, fonts and easing curves all live there rather than being scattered through components.

**Motion as reusable primitives**, in `components/ui/`:

| | |
| --- | --- |
| `Reveal` | scroll-triggered blur/translate entrance |
| `SpotlightCard` | pointer-tracked radial highlight, driven by CSS variables (no re-renders) |
| `Magnetic` | buttons that lean toward the cursor |
| `CursorGlow` | aurora glow trailing the pointer, mouse-only |
| `ScrollProgress` | aurora bar filling as the page scrolls |
| `WordReveal` / `TypeLine` / `Marquee` / `Counter` | headline, role ticker, tech strip, stat count-up |
| `PageAtmosphere` / `SectionGlow` | background texture, and per-section ambient light |
| `ProjectCover` | generated CSS cover art per project, in the project's accent |

Every decorative animation is disabled under `prefers-reduced-motion` — globally in `globals.css`, and per-component via `useReducedMotion`.

**Shareable project pages.** Each project gets `/projects/<slug>` with its own `generateMetadata` and its own generated Open Graph card. Sharing one to LinkedIn produces a real preview for *that* project, not a generic site card. This uses LinkedIn's public share intent, which needs no OAuth and no app review — the intent takes only a URL and scrapes the page's OG tags, which is exactly why the per-page image matters.

## Editing your content

Everything readable lives in three files, and the pages, OG images and sitemap all read from them:

- `lib/site.ts` — name, role, contact details, social links
- `lib/projects.ts` — projects and live tools
- `lib/resume.ts` — experience, skills, certifications, stats, about copy

## Deploying

Push to `master`; Vercel builds and deploys from GitHub.

Two things worth knowing:

- **Deployment Protection.** Vercel turns this on for new projects, which makes every visitor hit a login wall — and stops LinkedIn scraping your OG images, so shares render blank. Settings → Deployment Protection → Vercel Authentication → Disabled.
- **Site URL.** `NEXT_PUBLIC_SITE_URL` drives `metadataBase`, the sitemap and every share link. On Vercel you can leave it unset — it falls back to the project's production URL. Set it once a custom domain is live.

## Structure

```
app/
  page.tsx                 home
  projects/[slug]/         project detail + per-project OG image
  opengraph-image.tsx      home OG card
  icon.tsx                 generated favicon
  not-found.tsx            404
components/
  Navbar About Skills Projects Experience Certifications Contact Footer Hero
  ui/                      the motion and surface primitives listed above
lib/
  site.ts  projects.ts  resume.ts  linkedin.ts  useMediaQuery.ts
```
