import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { site } from "./site";
import type { ActivitySummary } from "./github";

const MODEL = "claude-opus-5";

let cached: Anthropic | null = null;

function client() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (and to the deployment's environment) before generating posts.",
    );
  }
  cached ??= new Anthropic();
  return cached;
}

/* ──────────────────────────────────────────────────────────────
   Schema
   ────────────────────────────────────────────────────────────── */

export const AccentEnum = z.enum(["iris", "violet", "cyan", "rose", "amber", "emerald"]);

export const PostDraftSchema = z.object({
  angle: z
    .string()
    .describe("Short label for the approach, e.g. 'Shipping log', 'Lesson learned', 'Hot take'."),
  hook: z
    .string()
    .describe("The first line of the post. It must earn the 'see more' click on its own."),
  body: z
    .string()
    .describe(
      "The full LinkedIn post including the hook as its first line. Plain text with blank lines between paragraphs. No markdown syntax — LinkedIn renders none of it.",
    ),
  hashtags: z.array(z.string()).describe("3 to 5 hashtags, without the # character."),
  trendTieIn: z
    .string()
    .describe("One sentence naming which current trend this post connects to and why."),
  whyThisWorks: z
    .string()
    .describe("One sentence of reasoning about the hook and the audience it targets."),
  visual: z.object({
    kicker: z.string().describe("2-4 word label for the top of the image, e.g. 'Shipping log'."),
    headline: z.string().describe("6-10 words, the big text on the image."),
    subline: z.string().describe("A supporting line of at most 14 words."),
    accent: AccentEnum,
    stat: z
      .string()
      .describe("A short metric or detail to print on the image, e.g. '4 repos · 23 commits'. Empty string if there isn't a good one."),
  }),
});

export const DraftsSchema = z.object({
  posts: z.array(PostDraftSchema),
});

export type PostDraft = z.infer<typeof PostDraftSchema>;
export type Accent = z.infer<typeof AccentEnum>;

export interface TrendBrief {
  brief: string;
  sources: { title: string; url: string }[];
}

export interface StudioResult {
  generatedAt: string;
  activityDigest: string;
  repos: string[];
  trends: TrendBrief;
  posts: PostDraft[];
}

/* ──────────────────────────────────────────────────────────────
   Step 1 — what is the dev world talking about right now
   ────────────────────────────────────────────────────────────── */

const TREND_TOPICS = [
  "AI coding agents and developer tooling",
  "TypeScript, Next.js and React ecosystem releases",
  "backend architecture, NestJS, .NET and Spring Boot",
  "the software engineering job market for early-career developers",
];

export async function researchTrends(): Promise<TrendBrief> {
  const today = new Date().toISOString().slice(0, 10);

  const response = await client().messages.create({
    model: MODEL,
    max_tokens: 6000,
    output_config: { effort: "medium" },
    tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }],
    system:
      "You are a research assistant for a software engineer who posts on LinkedIn. You find what the developer community is actually discussing right now and report it plainly, with no hype and no invented facts.",
    messages: [
      {
        role: "user",
        content: `Today is ${today}. Search the web and tell me what is currently being discussed in these areas:

${TREND_TOPICS.map((t) => `- ${t}`).join("\n")}

Write a brief of at most 350 words. For each theme give: what happened or is being argued, and why a working engineer would care. Prefer things from the last two weeks. If a theme has nothing fresh, say so rather than padding it.`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("Trend research was declined by the safety system. Try again or adjust the topics.");
  }

  const brief = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  // Pull the citations out of the web_search result blocks.
  const sources: { title: string; url: string }[] = [];
  for (const block of response.content) {
    if (block.type !== "web_search_tool_result") continue;
    // A successful result is a list; an error result is a single object.
    if (!Array.isArray(block.content)) continue;
    for (const r of block.content) {
      if (r.type === "web_search_result" && !sources.some((s) => s.url === r.url)) {
        sources.push({ title: r.title, url: r.url });
      }
    }
  }

  return { brief, sources: sources.slice(0, 10) };
}

/* ──────────────────────────────────────────────────────────────
   Step 2 — turn the work + the trends into post drafts
   ────────────────────────────────────────────────────────────── */

const VOICE = `Voice rules — follow all of them:
- Write as ${site.name}, a ${site.role} based in ${site.location}. First person.
- Specific over impressive. Name the actual repo, the actual bug, the actual number.
- No "I'm thrilled to announce", no "game-changer", no "in today's fast-paced world", no emoji-bulleted listicles, no fake vulnerability.
- Short paragraphs, one idea each, blank line between them. LinkedIn renders no markdown, so never use *, #, backticks or bullet characters other than plain hyphens.
- 120-220 words. Ending should invite a reply, not beg for one.
- If the work this week is thin, say something honest and small rather than inflating it.`;

export interface WriteOptions {
  count?: number;
  /** Optional steer from the author, e.g. "focus on the MediFind socket work". */
  steer?: string;
}

export async function writeDrafts(
  activity: ActivitySummary,
  trends: TrendBrief,
  { count = 3, steer }: WriteOptions = {},
): Promise<PostDraft[]> {
  const today = new Date().toISOString().slice(0, 10);

  const response = await client().messages.parse({
    model: MODEL,
    max_tokens: 16000,
    output_config: {
      effort: "high",
      format: zodOutputFormat(DraftsSchema),
    },
    system: `You write LinkedIn posts for one specific software engineer, grounded in work they actually did.

${VOICE}

Hard rule: every factual claim in a post must be traceable to the GitHub activity digest you are given. If the digest does not support a claim, do not make it. Do not invent metrics, users, launches or outcomes.`,
    messages: [
      {
        role: "user",
        content: `Today is ${today}. Write ${count} distinct LinkedIn post drafts.

Each draft must take a different angle — do not write ${count} versions of the same post. Good angles include: a shipping log of what got built, a specific technical problem and how it was solved, a short opinion connected to a current trend, or a lesson that cost time.

At least one post must connect the work to something from the trend brief. At least one must be purely about the engineering, with no trend tie-in at all.

<github_activity>
${activity.digest}
</github_activity>

<trend_brief>
${trends.brief}
</trend_brief>
${steer ? `\n<author_steer>\n${steer}\n</author_steer>\n` : ""}
For each draft also design the image card: a kicker, a headline, a subline, an accent color, and a short stat line. The image repeats the post's single idea in fewer words — it is not a summary of the whole post.`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("The model declined this request. Adjust the steer and try again.");
  }

  if (!response.parsed_output) {
    throw new Error("The model's response did not match the expected schema. Try again.");
  }

  return response.parsed_output.posts;
}

/** Runs the whole pipeline. */
export async function generateStudioResult(
  activity: ActivitySummary,
  options: WriteOptions = {},
): Promise<StudioResult> {
  const trends = await researchTrends();
  const posts = await writeDrafts(activity, trends, options);

  return {
    generatedAt: new Date().toISOString(),
    activityDigest: activity.digest,
    repos: activity.repos,
    trends,
    posts,
  };
}
