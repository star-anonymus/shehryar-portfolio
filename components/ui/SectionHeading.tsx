import Reveal from "./Reveal";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  /** Section number shown before the kicker ("02"). */
  index?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  kicker,
  title,
  description,
  index,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const label = index ? `${index} — ${kicker}` : kicker;

  return (
    <Reveal className={`mb-14 ${isCenter ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
        {isCenter && <span className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400/60" />}
        <span className="kicker">{label}</span>
        <span
          className={`h-px bg-gradient-to-r from-indigo-400/40 to-transparent ${
            isCenter ? "w-8 bg-gradient-to-l from-transparent to-indigo-400/60" : "flex-1"
          }`}
        />
      </div>

      <div
        className={
          isCenter ? "" : "mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        }
      >
        <h2
          className={`font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-chalk ${
            isCenter ? "mt-4" : ""
          }`}
        >
          {title}
        </h2>

        {description && (
          <p
            className={`max-w-md text-pretty leading-relaxed text-mist/75 ${
              isCenter ? "mx-auto mt-4 max-w-2xl" : "lg:pb-2"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
