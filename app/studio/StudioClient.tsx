"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  Image as ImageIcon,
  KeyRound,
  Loader2,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { linkedInComposeUrl, SHARE_WINDOW_FEATURES } from "@/lib/linkedin";

/* ── types mirroring lib/agent.ts ── */
interface Visual {
  kicker: string;
  headline: string;
  subline: string;
  accent: string;
  stat: string;
}
interface PostDraft {
  angle: string;
  hook: string;
  body: string;
  hashtags: string[];
  trendTieIn: string;
  whyThisWorks: string;
  visual: Visual;
}
interface TrendBrief {
  brief: string;
  sources: { title: string; url: string }[];
}
export interface StudioResult {
  generatedAt: string | null;
  repos: string[];
  trends: TrendBrief;
  posts: PostDraft[];
}

interface ActivityResponse {
  repos: string[];
  languages: string[];
  digest: string;
  items: { kind: string; repo: string; at: string; detail: string[] }[];
}

const TOKEN_KEY = "studio-token";

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    // Private mode or blocked storage — behave as if nothing was saved.
    return "";
  }
}

/**
 * Reads the saved token without an effect, so there is no setState during
 * mount and no hydration mismatch: the server snapshot is always "".
 */
function useStoredToken() {
  return useSyncExternalStore(subscribeToStorage, readStoredToken, () => "");
}

function imageUrl(visual: Visual, ratio: "square" | "wide") {
  const params = new URLSearchParams({
    kicker: visual.kicker,
    headline: visual.headline,
    subline: visual.subline,
    stat: visual.stat ?? "",
    accent: visual.accent,
    ratio,
  });
  return `/api/post-image?${params.toString()}`;
}

export default function StudioClient({ daily }: { daily: StudioResult }) {
  const storedToken = useStoredToken();
  const [typedToken, setTypedToken] = useState<string | null>(null);
  const token = typedToken ?? storedToken;

  const [days, setDays] = useState(7);
  const [count, setCount] = useState(3);
  const [steer, setSteer] = useState("");

  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [activityError, setActivityError] = useState<string | null>(null);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const [result, setResult] = useState<StudioResult | null>(
    daily.posts.length > 0 ? daily : null,
  );
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Activity load. Nothing is set synchronously here — the first statement
  // inside the async body is the fetch itself.
  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`/api/studio/activity?days=${days}`, {
          signal: controller.signal,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
        if (!alive) return;
        setActivity(json);
        setActivityError(null);
      } catch (e) {
        if (controller.signal.aborted || !alive) return;
        setActivityError(e instanceof Error ? e.message : "Could not read GitHub activity.");
        setActivity(null);
      } finally {
        if (alive) setLoadingActivity(false);
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, [days, reloadKey]);

  const refreshActivity = useCallback(() => {
    setLoadingActivity(true);
    setReloadKey((k) => k + 1);
  }, []);

  const changeDays = useCallback((next: number) => {
    setLoadingActivity(true);
    setDays(next);
  }, []);

  async function generate() {
    if (!token) {
      setError("Enter your studio token first.");
      return;
    }
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // Not fatal.
    }

    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-studio-token": token },
        body: JSON.stringify({ days, count, steer: steer.trim() || undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
      setResult(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  const commitCount = useMemo(
    () =>
      activity?.items
        .filter((i) => i.kind === "commits")
        .reduce((sum, i) => sum + i.detail.length, 0) ?? 0,
    [activity],
  );

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-10">
      {/* Header */}
      <Reveal>
        <div className="flex items-center gap-2.5">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400/60" />
          <span className="kicker">Content studio</span>
        </div>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-chalk">
          Today&apos;s LinkedIn drafts
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-mist/75">
          The agent reads your public GitHub activity, searches what the developer world is
          talking about this week, and writes post drafts grounded in work you actually did —
          each with a branded image card you can download and attach.
        </p>
      </Reveal>

      {/* Controls */}
      <Reveal delay={0.08} className="mt-10">
        <SpotlightCard className="rounded-2xl p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="kicker flex items-center gap-2">
                <KeyRound size={12} /> Studio token
              </span>
              <input
                type="password"
                value={token}
                onChange={(e) => setTypedToken(e.target.value)}
                placeholder="STUDIO_TOKEN"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 font-mono text-sm text-chalk outline-none transition-colors placeholder:text-fog/60 focus:border-indigo-400/50"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-2">
                <span className="kicker">Window</span>
                <select
                  value={days}
                  onChange={(e) => changeDays(Number(e.target.value))}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-chalk outline-none focus:border-indigo-400/50"
                >
                  {[1, 3, 7, 14, 30].map((d) => (
                    <option key={d} value={d} className="bg-ink-850">
                      {d} day{d > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="kicker">Drafts</span>
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-chalk outline-none focus:border-indigo-400/50"
                >
                  {[1, 2, 3, 4, 5].map((c) => (
                    <option key={c} value={c} className="bg-ink-850">
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <label className="mt-5 flex flex-col gap-2">
            <span className="kicker">Steer (optional)</span>
            <input
              value={steer}
              onChange={(e) => setSteer(e.target.value)}
              placeholder="e.g. focus on the MediFind socket work, keep it technical"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-chalk outline-none transition-colors placeholder:text-fog/60 focus:border-indigo-400/50"
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={generate}
              disabled={generating}
              className="glow-iris inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              {generating ? "Researching & writing…" : "Generate drafts"}
            </button>

            <button
              onClick={refreshActivity}
              disabled={loadingActivity}
              className="glass inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-mist transition-colors hover:text-chalk disabled:opacity-60"
            >
              <RefreshCw size={15} className={loadingActivity ? "animate-spin" : ""} />
              Refresh activity
            </button>

            {generating && (
              <span className="text-xs text-fog">
                Two model calls plus web search — this takes 30–90 seconds.
              </span>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
        </SpotlightCard>
      </Reveal>

      {/* Activity */}
      <Reveal delay={0.12} className="mt-6">
        <SpotlightCard className="rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="kicker flex items-center gap-2">
              <FiGithub size={12} /> What the agent sees
            </h2>
            {activity && (
              <span className="font-mono text-xs text-fog">
                {activity.repos.length} repos · {commitCount} commits
              </span>
            )}
          </div>

          {activityError ? (
            <p className="text-sm text-rose-200">{activityError}</p>
          ) : loadingActivity ? (
            <p className="text-sm text-fog">Reading GitHub…</p>
          ) : activity && activity.items.length > 0 ? (
            <div className="max-h-72 space-y-4 overflow-y-auto pr-2">
              {activity.repos.map((repo) => (
                <div key={repo}>
                  <p className="font-mono text-xs text-indigo-300">{repo}</p>
                  <ul className="mt-1.5 space-y-1">
                    {activity.items
                      .filter((i) => i.repo === repo)
                      .flatMap((i) => i.detail.map((d) => ({ d, at: i.at })))
                      .slice(0, 8)
                      .map(({ d, at }, idx) => (
                        <li key={idx} className="flex gap-2.5 text-sm text-mist/70">
                          <span className="shrink-0 font-mono text-xs text-fog">
                            {at.slice(5, 10)}
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-fog">
              No notable public activity in the last {days} days. Widen the window, or write
              from a project page instead.
            </p>
          )}
        </SpotlightCard>
      </Reveal>

      {/* Trends */}
      {result?.trends?.brief && (
        <Reveal delay={0.16} className="mt-6">
          <SpotlightCard className="rounded-2xl p-6">
            <h2 className="kicker mb-4 flex items-center gap-2">
              <TrendingUp size={12} /> Trend brief
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-mist/75">
              {result.trends.brief}
            </p>
            {result.trends.sources.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 border-t border-white/8 pt-4">
                {result.trends.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-xs text-fog transition-colors hover:text-chalk"
                  >
                    {s.title.length > 46 ? `${s.title.slice(0, 45)}…` : s.title}
                  </a>
                ))}
              </div>
            )}
          </SpotlightCard>
        </Reveal>
      )}

      {/* Drafts */}
      {result && result.posts.length > 0 && (
        <div className="mt-10 space-y-5">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-xl font-bold text-chalk">
                {result.posts.length} draft{result.posts.length > 1 ? "s" : ""}
              </h2>
              {result.generatedAt && (
                <span className="font-mono text-xs text-fog">
                  generated {new Date(result.generatedAt).toLocaleString()}
                </span>
              )}
            </div>
          </Reveal>

          {result.posts.map((post, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <DraftCard post={post} index={i} />
            </Reveal>
          ))}
        </div>
      )}

      {!result && (
        <Reveal delay={0.2} className="mt-10">
          <SpotlightCard className="rounded-2xl p-10 text-center">
            <Sparkles size={26} className="mx-auto text-indigo-400" />
            <p className="mt-4 text-sm text-mist/70">
              No drafts yet. Enter your token and hit <strong>Generate drafts</strong>, or wait
              for the daily run to commit today&apos;s batch.
            </p>
          </SpotlightCard>
        </Reveal>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */

function DraftCard({ post, index }: { post: PostDraft; index: number }) {
  const [text, setText] = useState(post.body);
  const [copied, setCopied] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const hashtagLine = post.hashtags.map((h) => `#${h.replace(/^#/, "")}`).join(" ");
  const fullText = `${text}\n\n${hashtagLine}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — the textarea is still selectable by hand.
    }
  }

  function openComposer() {
    window.open(linkedInComposeUrl(fullText), "_blank", SHARE_WINDOW_FEATURES);
  }

  return (
    <SpotlightCard className="overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-fog">#{index + 1}</span>
          <span className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-indigo-300">
            {post.angle}
          </span>
        </div>
        <span className="font-mono text-xs text-fog">{text.split(/\s+/).length} words</span>
      </div>

      <div className="p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={Math.min(Math.max(text.split("\n").length + 2, 8), 22)}
          className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[0.95rem] leading-relaxed text-mist outline-none transition-colors focus:border-indigo-400/40"
        />

        <p className="mt-3 font-mono text-xs text-indigo-300/80">{hashtagLine}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3.5">
            <p className="kicker mb-1.5">Trend tie-in</p>
            <p className="text-xs leading-relaxed text-mist/70">{post.trendTieIn}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3.5">
            <p className="kicker mb-1.5">Why this works</p>
            <p className="text-xs leading-relaxed text-mist/70">{post.whyThisWorks}</p>
          </div>
        </div>

        {/* Image card */}
        <div className="mt-5">
          <button
            onClick={() => setShowImage((v) => !v)}
            className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-mist transition-colors hover:text-chalk"
          >
            <ImageIcon size={15} />
            {showImage ? "Hide image card" : "Show image card"}
          </button>

          {showImage && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl(post.visual, "square")}
                alt={post.visual.headline}
                className="w-full max-w-sm rounded-2xl border border-white/10"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={imageUrl(post.visual, "square")}
                  download={`post-${index + 1}-square.png`}
                  className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-mist transition-colors hover:text-chalk"
                >
                  <Download size={14} /> Square 1200×1200
                </a>
                <a
                  href={imageUrl(post.visual, "wide")}
                  download={`post-${index + 1}-wide.png`}
                  className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-mist transition-colors hover:text-chalk"
                >
                  <Download size={14} /> Wide 1200×627
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Publish */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/8 pt-5">
          <button
            onClick={openComposer}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a66c2] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0a66c2]/25 transition-colors hover:bg-[#0b5cab]"
          >
            <FiLinkedin size={15} /> Open in LinkedIn
          </button>
          <button
            onClick={copy}
            className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-mist transition-colors hover:text-chalk"
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy post"}
          </button>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-fog">
          LinkedIn can&apos;t accept an image through a link — download the card above, then
          attach it in the composer before you post.
        </p>
      </div>
    </SpotlightCard>
  );
}
