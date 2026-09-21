import { ImageResponse } from "next/og";
import { accentHex, getProject, projects } from "@/lib/projects";
import { site, siteHost } from "@/lib/site";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  const [from, to] = project ? accentHex[project.accent] : ["#6366f1", "#a855f7"];
  const title = project?.title ?? site.name;
  const summary = project?.summary ?? site.tagline;
  const tags = project?.tags.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#05060d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            right: -120,
            width: 780,
            height: 780,
            borderRadius: 999,
            background: `radial-gradient(circle, ${from}66 0%, ${from}00 68%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -340,
            left: -200,
            width: 700,
            height: 700,
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
            height: 6,
            background: `linear-gradient(90deg, ${from}, ${to})`,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 22px",
              borderRadius: 999,
              border: `1px solid ${from}55`,
              background: `${from}1a`,
              color: from,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {project?.category ?? "Project"}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6e7894" }}>
            {project?.year ?? ""}
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 34 ? 66 : 80,
              fontWeight: 800,
              color: "#eef1f8",
              letterSpacing: -2,
              lineHeight: 1.08,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a7b0c6",
              marginTop: 26,
              maxWidth: 960,
              lineHeight: 1.42,
            }}
          >
            {summary}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "9px 18px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.045)",
                  color: "#a7b0c6",
                  fontSize: 21,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${from}, ${to})`,
                color: "#fff",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              SA
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#eef1f8", fontWeight: 600 }}>
              {site.name}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6e7894" }}>
            {siteHost}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
