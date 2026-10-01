"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollWordsProps {
  text: string;
  /** Words (by exact match, punctuation stripped) drawn in the aurora gradient once lit. */
  highlight?: string[];
  className?: string;
}

/**
 * A statement that lights up word by word as it scrolls through the viewport —
 * the reader's own scrolling paces the sentence. Static under reduced motion.
 */
export default function ScrollWords({ text, highlight = [], className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  const marked = new Set(highlight.map((w) => w.toLowerCase()));

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          const accent = marked.has(word.replace(/[^\w.-]/g, "").toLowerCase());
          return reduced ? (
            <span key={i} className={accent ? "text-aurora" : undefined}>
              {word}{" "}
            </span>
          ) : (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              accent={accent}
            >
              {word}
            </Word>
          );
        })}
      </span>
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={`inline-block ${accent ? "text-aurora" : ""}`}>
        {children}
      </motion.span>{" "}
    </>
  );
}
