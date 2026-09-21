"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  /** Word index to start the aurora gradient from (inclusive). */
  accentFrom?: number;
  delay?: number;
  stagger?: number;
}

/**
 * Splits a headline into words and lifts each one out of a blur.
 * Words, not characters — characters break screen-reader pronunciation and
 * make long headlines feel twitchy.
 */
export default function WordReveal({
  text,
  className,
  accentFrom,
  delay = 0,
  stagger = 0.07,
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, i) => {
          const accent = accentFrom !== undefined && i >= accentFrom;
          return (
            <motion.span
              key={`${word}-${i}`}
              className={`inline-block will-change-transform ${accent ? "text-aurora" : ""}`}
              initial={reduced ? false : { opacity: 0, y: "0.45em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.85,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {i < words.length - 1 && " "}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
