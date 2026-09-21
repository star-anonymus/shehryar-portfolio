import { NextResponse } from "next/server";
import { generateStudioResult } from "@/lib/agent";
import { getActivity } from "@/lib/github";

// Web search plus two model turns — well past the default serverless budget.
export const maxDuration = 300;
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/**
 * Generates today's LinkedIn drafts.
 *
 * Gated behind STUDIO_TOKEN because every call spends money on the Claude API.
 * If STUDIO_TOKEN is unset the route refuses outright rather than running open
 * to the internet.
 */
export async function POST(request: Request) {
  const expected = process.env.STUDIO_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: "STUDIO_TOKEN is not configured on the server." },
      { status: 503 },
    );
  }

  const provided =
    request.headers.get("x-studio-token") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (provided !== expected) return unauthorized();

  let body: { days?: number; count?: number; steer?: string } = {};
  try {
    body = await request.json();
  } catch {
    // An empty body is fine — everything has a default.
  }

  const days = Math.min(Math.max(body.days ?? 7, 1), 30);
  const count = Math.min(Math.max(body.count ?? 3, 1), 5);

  try {
    const activity = await getActivity(days);
    const result = await generateStudioResult(activity, { count, steer: body.steer });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";
    console.error("[studio] generate failed:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
