# shehryar-portfolio

Personal portfolio for Shehryar Ahmed — Next.js 16 (App Router), Tailwind CSS v4, Framer Motion.

Three things live here:

1. **The portfolio** — an "Aurora Noir" dark site with scroll-linked motion, spotlight cards, magnetic buttons and a cursor glow. Every decorative animation is disabled under `prefers-reduced-motion`.
2. **Shareable project pages** — each project gets `/projects/<slug>` with its own generated Open Graph card, so a LinkedIn share renders a real preview instead of a bare link.
3. **The Content Studio** (`/studio`) — an agent that reads recent public GitHub activity, searches what the developer world is discussing, and drafts LinkedIn posts grounded in work that actually happened, each with a downloadable branded image card.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and fill it in:

| Variable | Needed for | Notes |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Content Studio | From https://console.anthropic.com |
| `STUDIO_TOKEN` | Content Studio | Any long random string. Gates `/api/studio/generate`; if unset, that route refuses every request. |
| `GITHUB_TOKEN` | Optional | Raises the GitHub API rate limit from 60/hr to 5000/hr. Public read scope is enough. |

The portfolio itself needs none of these — without them everything except `/studio` works normally.

## Content Studio

### How it works

```
GitHub public events ─┐
                      ├─> Claude (web_search) ──> trend brief ─┐
                      │                                        ├─> Claude (structured output) ──> post drafts
                      └────────── activity digest ─────────────┘
                                                                     │
                                                                     └─> /api/post-image ──> branded PNG
```

- `lib/github.ts` folds the last N days of public events into a digest, filtering out noise commits (`wip`, `typo`, dependency bumps).
- `lib/agent.ts` runs two Claude calls: one with the `web_search` server tool for trends, one with a Zod-validated structured output for the drafts. The system prompt forbids any claim the activity digest doesn't support.
- `app/api/post-image/route.tsx` renders the image card from the draft's `visual` fields — square (1200×1200) or wide (1200×627).

Each generation costs a few cents of Claude API usage. That's why the route is token-gated.

### Daily automation

`.github/workflows/daily-posts.yml` runs at 03:00 UTC (08:00 PKT), calls the deployed endpoint, and commits the result to `content/`. Set these on the repository:

- Secret `STUDIO_TOKEN` — same value as the deployment's
- Variable `SITE_URL` — e.g. `https://shehryarahmed.dev`

You can also trigger it by hand from the Actions tab with a custom window, draft count and steer.

`content/latest-drafts.json` is what `/studio` shows on load; `content/drafts/YYYY-MM-DD.json` keeps the archive.

## LinkedIn sharing

Project pages use LinkedIn's public share intent (`/sharing/share-offsite/?url=…`) — no OAuth, no app review. LinkedIn scrapes the target page's Open Graph tags, which is why every shareable page ships its own `opengraph-image`.

Studio drafts use the composer link (`/feed/?shareActive=true&text=…`), which opens LinkedIn with the post text already in the box. LinkedIn accepts no image through a URL, so the flow is: download the card, then attach it in the composer.

Posting straight to LinkedIn from the site would need a LinkedIn Developer app with the "Share on LinkedIn" product approved and the `w_member_social` scope. Not wired up here.

## Structure

```
app/
  page.tsx                        home
  projects/[slug]/                project detail + per-project OG image
  studio/                         content studio (noindex)
  api/studio/generate             the agent (token-gated)
  api/studio/activity             read-only GitHub digest
  api/post-image                  branded post card PNG
  opengraph-image.tsx             home OG card
components/
  ui/                             Reveal, SpotlightCard, Magnetic, Aurora,
                                  CursorGlow, ScrollProgress, Marquee,
                                  WordReveal, TypeLine, Counter, ShareOnLinkedIn
lib/
  site.ts  projects.ts  resume.ts  github.ts  agent.ts  linkedin.ts
content/
  latest-drafts.json              what /studio shows
  drafts/YYYY-MM-DD.json          archive
```

Editing your own content means editing `lib/site.ts`, `lib/projects.ts` and `lib/resume.ts` — the pages, OG images and the agent all read from there.
