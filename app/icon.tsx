import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Aurora monogram favicon, generated at build time. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #22d3ee 100%)",
          borderRadius: 14,
          color: "#fff",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -1.5,
        }}
      >
        SA
      </div>
    ),
    { ...size },
  );
}
