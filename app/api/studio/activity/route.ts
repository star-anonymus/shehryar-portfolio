import { NextResponse } from "next/server";
import { getActivity } from "@/lib/github";

export const dynamic = "force-dynamic";

/**
 * Read-only view of the GitHub activity the generator would use.
 * Free to call — it spends no model tokens — so it is not token-gated,
 * but it only ever exposes data that is already public on GitHub.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Math.min(Math.max(Number(searchParams.get("days") ?? 7), 1), 30);

  try {
    const activity = await getActivity(days);
    return NextResponse.json({
      user: activity.user,
      since: activity.since,
      repos: activity.repos,
      languages: activity.languages,
      items: activity.items,
      digest: activity.digest,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not read GitHub activity.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
