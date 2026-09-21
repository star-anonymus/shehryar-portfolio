import { ImageResponse } from "next/og";
import { site, siteHost } from "@/lib/site";

export const alt = `${site.name} — Full-Stack Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#05060d",
          position: "relative",
        }}
      >
        {/* Aurora wash */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 280,
            width: 760,
            height: 760,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.55) 0%, rgba(99,102,241,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            left: -180,
            width: 640,
            height: 640,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.40) 0%, rgba(168,85,247,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 120,
            right: -220,
            width: 560,
            height: 560,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.30) 0%, rgba(34,211,238,0) 70%)",
          }}
        />

        {/* Top rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #6366f1, #a855f7, #22d3ee)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#818cf8",
              fontWeight: 600,
            }}
          >
            <div style={{ width: 44, height: 2, background: "#818cf8" }} />
            Software Engineer
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              color: "#eef1f8",
              letterSpacing: -3,
              marginTop: 26,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 31,
              color: "#a7b0c6",
              marginTop: 24,
              maxWidth: 940,
              lineHeight: 1.4,
            }}
          >
            Scalable APIs and secure systems — Java / Spring Boot, .NET / NestJS, React /
            Next.js. Building AI-powered SaaS end to end.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 44, flexWrap: "wrap" }}>
            {["NestJS", "Next.js", "Flutter", "Spring Boot", "PostgreSQL"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#a7b0c6",
                  fontSize: 22,
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 52,
              fontSize: 24,
              color: "#6e7894",
            }}
          >
            {siteHost}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
