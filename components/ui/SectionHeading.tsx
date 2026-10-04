import MaskReveal from "./MaskReveal";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  /** Section number, drawn large in outline ("03"). */
  index?: string;
  align?: "center" | "left";
}

export default function SectionHeading({ kicker, title, description, index, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-14 ${isCenter ? "text-center" : ""}`}>
      <Reveal className={`flex items-end gap-4 ${isCenter ? "justify-center" : ""}`}>
        {index && (
          <span aria-hidden className="text-outline font-display text-[clamp(3.2rem,7vw,5.2rem)] font-bold leading-[0.8] tracking-[-0.04em]">
            {index}
          </span>
        )}
        <span className="kicker pb-1.5">{kicker}</span>
        {!isCenter && <span className="mb-3 h-px flex-1 bg-gradient-to-r from-iris-400/45 to-transparent" />}
      </Reveal>

      <div className={isCenter ? "" : "mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12"}>
        {/* The title rises out of a mask — a transform, so it costs nothing to run */}
        <MaskReveal
          as="h2"
          className={`font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-chalk ${isCenter ? "mt-4" : ""}`}
        >
          {title}
        </MaskReveal>

        {description && (
          <Reveal delay={0.1}>
            <p className={`max-w-md text-pretty leading-relaxed text-mist ${isCenter ? "mx-auto mt-4 max-w-2xl" : "lg:pb-2"}`}>{description}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
