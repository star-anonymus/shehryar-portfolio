import { site } from "./site";

export interface ActivityItem {
  kind: "commits" | "new-repo" | "pull-request" | "release" | "issue";
  repo: string;
  /** ISO date of the event. */
  at: string;
  detail: string[];
}

export interface ActivitySummary {
  user: string;
  since: string;
  items: ActivityItem[];
  repos: string[];
  languages: string[];
  /** Human-readable digest fed to the model. */
  digest: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    ref_type?: string;
    ref?: string | null;
    action?: string;
    pull_request?: { title: string; merged?: boolean };
    release?: { name: string | null; tag_name: string };
    issue?: { title: string };
  };
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  private: boolean;
  html_url: string;
}

function headers() {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "shehryar-portfolio-studio",
  };
  // Optional: raises the rate limit from 60/hr to 5000/hr.
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

/** Commit messages that carry no signal for a post. */
const NOISE = /^(merge|initial commit|update readme|wip|typo|fix typo|bump|chore\(deps\))/i;

function isInteresting(message: string) {
  const first = message.split("\n")[0].trim();
  return first.length > 8 && !NOISE.test(first);
}

/**
 * Pulls the last `days` of public GitHub activity and folds it into something
 * compact enough to hand a model as context.
 */
export async function getActivity(days = 7): Promise<ActivitySummary> {
  const user = site.socials.githubUser;
  const since = new Date(Date.now() - days * 86_400_000);

  const [eventsRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${user}/events/public?per_page=100`, {
      headers: headers(),
      next: { revalidate: 900 },
    }),
    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=30`, {
      headers: headers(),
      next: { revalidate: 900 },
    }),
  ]);

  if (!eventsRes.ok) {
    throw new Error(`GitHub events request failed: ${eventsRes.status} ${eventsRes.statusText}`);
  }

  const events: GitHubEvent[] = await eventsRes.json();
  const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

  const items: ActivityItem[] = [];

  for (const e of events) {
    const at = new Date(e.created_at);
    if (at < since) continue;
    const repo = e.repo.name;

    switch (e.type) {
      case "PushEvent": {
        const messages = (e.payload.commits ?? [])
          .map((c) => c.message.split("\n")[0].trim())
          .filter(isInteresting);
        if (messages.length) {
          items.push({ kind: "commits", repo, at: e.created_at, detail: messages });
        }
        break;
      }
      case "CreateEvent":
        if (e.payload.ref_type === "repository") {
          items.push({ kind: "new-repo", repo, at: e.created_at, detail: ["Created repository"] });
        }
        break;
      case "PullRequestEvent":
        if (e.payload.pull_request && (e.payload.action === "opened" || e.payload.pull_request.merged)) {
          items.push({
            kind: "pull-request",
            repo,
            at: e.created_at,
            detail: [`${e.payload.pull_request.merged ? "Merged" : "Opened"}: ${e.payload.pull_request.title}`],
          });
        }
        break;
      case "ReleaseEvent":
        if (e.payload.release) {
          items.push({
            kind: "release",
            repo,
            at: e.created_at,
            detail: [`Released ${e.payload.release.name ?? e.payload.release.tag_name}`],
          });
        }
        break;
      case "IssuesEvent":
        if (e.payload.action === "opened" && e.payload.issue) {
          items.push({ kind: "issue", repo, at: e.created_at, detail: [e.payload.issue.title] });
        }
        break;
    }
  }

  const activeRepos = [...new Set(items.map((i) => i.repo))];
  const languages = [
    ...new Set(
      repos
        .filter((r) => !r.fork && r.language)
        .map((r) => r.language as string),
    ),
  ].slice(0, 12);

  // Repos touched recently, even if their commits were filtered out as noise.
  const recentRepos = repos
    .filter((r) => !r.fork && new Date(r.pushed_at) >= since)
    .map((r) => `${r.full_name}${r.description ? ` — ${r.description}` : ""}`);

  const lines: string[] = [];
  lines.push(`GitHub activity for @${user}, last ${days} days (as of ${new Date().toISOString().slice(0, 10)}):`);

  if (items.length === 0) {
    lines.push("No notable public events in this window.");
  } else {
    for (const repo of activeRepos) {
      const forRepo = items.filter((i) => i.repo === repo);
      lines.push(`\n## ${repo}`);
      for (const item of forRepo) {
        const day = item.at.slice(0, 10);
        for (const d of item.detail) {
          lines.push(`- [${day}] ${d}`);
        }
      }
    }
  }

  if (recentRepos.length) {
    lines.push(`\n## Repositories pushed in this window`);
    recentRepos.forEach((r) => lines.push(`- ${r}`));
  }

  if (languages.length) {
    lines.push(`\n## Primary languages across public repos\n${languages.join(", ")}`);
  }

  return {
    user,
    since: since.toISOString(),
    items,
    repos: activeRepos,
    languages,
    digest: lines.join("\n"),
  };
}
