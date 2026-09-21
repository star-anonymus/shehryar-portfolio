/**
 * Viewport-fixed background texture for everything below the hero.
 *
 * A page-height aurora layer doesn't work: its blobs sit at the top of a very
 * tall container, so four fifths of the page ends up flat black. This stays
 * pinned to the viewport instead, and each section adds its own glow on top
 * via <SectionGlow />.
 */
export default function PageAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Base wash so the near-black never reads as dead flat */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(99,102,241,0.07) 0%, rgba(5,6,13,0) 60%)",
        }}
      />

      {/* Fine grid, faded at the edges rather than at the top */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 20%, transparent 85%)",
        }}
      />

      {/* Corner vignette — keeps the eye in the middle column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 50%, rgba(5,6,13,0) 40%, rgba(5,6,13,0.65) 100%)",
        }}
      />

      <div className="noise absolute inset-0" />
    </div>
  );
}
