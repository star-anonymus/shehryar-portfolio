import Reveal from "./Reveal";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <Reveal className={`mb-14 ${isCenter ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400/60" />
        <span className="kicker">{kicker}</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-indigo-400/60" />
      </div>

      <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.025em] text-chalk">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 max-w-2xl text-pretty leading-relaxed text-mist/75 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
