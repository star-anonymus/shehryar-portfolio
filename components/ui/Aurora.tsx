/**
 * The page's ambient background: drifting aurora blobs, a masked grid,
 * and a film-grain layer. Server component — no interactivity.
 */
export default function Aurora({ variant = "page" }: { variant?: "page" | "hero" }) {
  const isHero = variant === "hero";

  return (
    <div aria-hidden className="glow-layer pointer-events-none absolute inset-0 overflow-hidden">
      {/* Aurora blobs */}
      <div
        className="drift-a absolute -top-[28rem] left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(63,216,240,0.30) 0%, rgba(63,216,240,0) 68%)",
        }}
      />
      <div
        className="drift-b absolute -left-56 top-24 h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(182,242,58,0.08) 0%, rgba(182,242,58,0) 70%)",
        }}
      />
      <div
        className="drift-a absolute -right-52 top-64 h-[32rem] w-[32rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0) 70%)",
        }}
      />

      {isHero && (
        <div
          className="drift-b absolute bottom-[-18rem] left-1/3 h-[30rem] w-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244,114,182,0.12) 0%, rgba(244,114,182,0) 70%)",
          }}
        />
      )}

      {/* Grid */}
      <div className="grid-lines absolute inset-0" />

      {/* Grain */}
      <div className="noise absolute inset-0" />

      {/* Bottom fade into the page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05060d] to-transparent" />
    </div>
  );
}
