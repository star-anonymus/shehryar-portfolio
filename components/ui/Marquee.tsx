/**
 * Infinite horizontal ticker. The children are rendered twice and the track
 * translates by exactly -50%, so the loop is seamless.
 */
export default function Marquee({
  items,
  duration = 34,
  reverse = false,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className="edge-fade marquee-paused relative flex overflow-hidden">
      <div
        className="marquee-track flex w-max shrink-0 items-center gap-3 pr-3"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-3 font-mono text-sm text-mist/70"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-indigo-400/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
