import { ImageResponse } from "next/og";
import { accentHex, type Accent } from "@/lib/projects";
import { site, siteHost } from "@/lib/site";

export const dynamic = "force-dynamic";

const ACCENTS: Accent[] = ["iris", "violet", "cyan", "rose", "amber", "emerald"];

function clamp(value: string | null, max: number, fallback = "") {
  const v = (value ?? fallback).trim();
  return v.length > max ? `${v.slice(0, max - 1).trimEnd()}…` : v;
}

/**
 * Renders the branded image card that goes with a generated post.
 *
 * GET /api/post-image?headline=...&subline=...&kicker=...&stat=...&accent=iris&ratio=square
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const kicker = clamp(searchParams.get("kicker"), 28, "Shipping log").toUpperCase();
  const headline = clamp(searchParams.get("headline"), 90, "Built something this week");
  const subline = clamp(searchParams.get("subline"), 130);
  const stat = clamp(searchParams.get("stat"), 44);

  const accentParam = searchParams.get("accent") as Accent | null;
  const accent: Accent = accentParam && ACCENTS.includes(accentParam) ? accentParam : "iris";
  const [from, to] = accentHex[accent];

  const square = searchParams.get("ratio") !== "wide";
  const size = square ? { width: 1200, height: 1200 } : { width: 1200, height: 627 };

  const headlineSize = square
    ? headline.length > 58
      ? 78
      : headline.length > 38
        ? 92
        : 108
    : headline.length > 58
      ? 56
      : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: square ? "88px" : "64px 72px",
          background: "#05060d",
          position: "relative",
        }}
      >
        {/* Aurora */}
        <div
          style={{
            position: "absolute",
            top: square ? -300 : -240,
            right: -180,
            width: 860,
            height: 860,
            borderRadius: 999,
            background: `radial-gradient(circle, ${from}70 0%, ${from}00 66%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -380,
            left: -240,
            width: 820,
            height: 820,
            borderRadius: 999,
            background: `radial-gradient(circle, ${to}55 0%, ${to}00 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(90deg, ${from}, ${to})`,
          }}
        />

        {/* Kicker */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <div style={{ width: 52, height: 3, background: from }} />
          <div
            style={{
              display: "flex",
              fontSize: square ? 28 : 24,
              letterSpacing: 7,
              color: from,
              fontWeight: 700,
            }}
          >
            {kicker}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            flex: 1,
            justifyContent: "center",
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: headlineSize,
              fontWeight: 800,
              color: "#eef1f8",
              letterSpacing: -2.5,
              lineHeight: 1.08,
            }}
          >
            {headline}
          </div>

          {subline && (
            <div
              style={{
                display: "flex",
                fontSize: square ? 36 : 28,
                color: "#a7b0c6",
                marginTop: 32,
                lineHeight: 1.42,
              }}
            >
              {subline}
            </div>
          )}

          {stat && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: 40,
                padding: "14px 26px",
                borderRadius: 999,
                border: `1px solid ${from}55`,
                background: `${from}1f`,
                color: from,
                fontSize: square ? 28 : 24,
                fontWeight: 600,
              }}
            >
              {stat}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 62,
                height: 62,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${from}, ${to})`,
                color: "#fff",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              SA
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 30, color: "#eef1f8", fontWeight: 700 }}>
                {site.name}
              </div>
              <div style={{ display: "flex", fontSize: 24, color: "#6e7894", marginTop: 4 }}>
                {site.role}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#6e7894" }}>{siteHost}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
