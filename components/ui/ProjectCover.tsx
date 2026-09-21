import { accentHex, type Accent } from "@/lib/projects";

interface ProjectCoverProps {
  accent: Accent;
  /** Drawn large and ghosted behind the mesh. */
  monogram: string;
  category: string;
  className?: string;
  /** Larger type and more breathing room, for featured cards and detail pages. */
  size?: "sm" | "lg";
}

/**
 * A generated cover for a project that has no screenshot.
 *
 * Text-only cards read as a list of links; a real screenshot would be better,
 * but a consistent generated mesh in the project's own accent gives the grid
 * rhythm and colour without pretending to show a product that isn't there.
 * Pure CSS — no images to load, no layout shift.
 */
export default function ProjectCover({
  accent,
  monogram,
  category,
  className = "",
  size = "sm",
}: ProjectCoverProps) {
  const [from, to] = accentHex[accent];
  const lg = size === "lg";

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{ background: "#070913" }}
    >
      {/* Mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 22%, ${from}4d 0%, ${from}00 55%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 82% 78%, ${to}40 0%, ${to}00 58%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 60% 10%, ${to}26 0%, ${to}00 45%)`,
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: lg ? "40px 40px" : "26px 26px",
        }}
      />

      {/* Diagonal sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 38%)",
        }}
      />

      {/* Ghosted monogram */}
      <div
        className={`absolute font-display font-bold leading-none tracking-tighter text-white/[0.07] ${
          lg ? "-bottom-6 -right-2 text-[10rem]" : "-bottom-3 -right-1 text-[5.5rem]"
        }`}
      >
        {monogram}
      </div>

      {/* Category chip */}
      <div
        className={`absolute left-0 top-0 font-mono uppercase tracking-[0.18em] ${
          lg ? "m-5 text-[0.7rem]" : "m-3.5 text-[0.6rem]"
        }`}
        style={{ color: from }}
      >
        {category}
      </div>

      {/* Top hairline in the accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, ${from}, ${to}, transparent)` }}
      />

      {/* Fade into the card body */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#080a14] to-transparent" />
    </div>
  );
}
