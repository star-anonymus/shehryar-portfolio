"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypeLineProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  /** How long a finished phrase sits on screen before it deletes. */
  holdMs?: number;
  className?: string;
}

interface TypeState {
  index: number;
  length: number;
  deleting: boolean;
}

/**
 * Types each phrase out, holds it, deletes it, moves on. Replaces the
 * react-type-animation dependency so the cursor and timing match the design.
 *
 * The whole loop runs through a single scheduled transition — no state is set
 * synchronously inside the effect, which keeps the render cascade flat.
 *
 * Under prefers-reduced-motion it renders the first phrase statically; a
 * blinking, rewriting headline is exactly what that setting exists to stop.
 */
export default function TypeLine({
  phrases,
  typeSpeed = 55,
  deleteSpeed = 30,
  holdMs = 1900,
  className,
}: TypeLineProps) {
  const reduced = useReducedMotion();
  const [state, setState] = useState<TypeState>({ index: 0, length: 0, deleting: false });

  useEffect(() => {
    if (reduced || phrases.length === 0) return;

    const phrase = phrases[state.index % phrases.length];
    const { length, deleting } = state;

    let delay: number;
    let next: TypeState;

    if (!deleting && length === phrase.length) {
      // Fully typed — hold, then start deleting.
      delay = holdMs;
      next = { ...state, deleting: true };
    } else if (deleting && length === 0) {
      // Fully deleted — move to the next phrase.
      delay = typeSpeed;
      next = { index: (state.index + 1) % phrases.length, length: 0, deleting: false };
    } else {
      delay = deleting ? deleteSpeed : typeSpeed;
      next = { ...state, length: length + (deleting ? -1 : 1) };
    }

    const id = setTimeout(() => setState(next), delay);
    return () => clearTimeout(id);
  }, [state, phrases, typeSpeed, deleteSpeed, holdMs, reduced]);

  if (reduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  const text = phrases[state.index % phrases.length].slice(0, state.length);

  return (
    <span className={className} aria-live="off">
      {text}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-indigo-400 motion-safe:animate-pulse"
      />
    </span>
  );
}
