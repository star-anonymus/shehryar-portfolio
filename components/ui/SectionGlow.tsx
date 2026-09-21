import type { Accent } from "@/lib/projects";

const glowHex: Record<Accent, string> = {
  iris: "99,102,241",
  violet: "168,85,247",
  cyan: "34,211,238",
  rose: "244,114,182",
  amber: "251,191,36",
  emerald: "52,211,153",
};

const positions = {
  top: "-top-32 left-1/2 -translate-x-1/2",
  left: "top-1/4 -left-40",
  right: "top-1/4 -right-40",
  bottom: "-bottom-40 left-1/2 -translate-x-1/2",
} as const;

/**
 * One ambient glow, scoped to the section that renders it. Sections own their
 * own light rather than inheriting it from a page-height layer — that keeps
 * the colour changing as you scroll instead of fading out after the fold.
 */
export default function SectionGlow({
  accent = "iris",
  position = "top",
  size = 34,
  intensity = 0.16,
}: {
  accent?: Accent;
  position?: keyof typeof positions;
  /** Diameter in rem. */
  size?: number;
  intensity?: number;
}) {
  const rgb = glowHex[accent];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-[130px] ${positions[position]}`}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        background: `radial-gradient(circle, rgba(${rgb},${intensity}) 0%, rgba(${rgb},0) 70%)`,
      }}
    />
  );
}
