"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared "the intro loader has lifted" signal, so the hero can hold its
 * entrance until the curtain is out of the way instead of animating unseen
 * underneath it.
 *
 * The loader sets `window.__saIntroReady` and fires `sa:intro-done`. Returning
 * visitors never see the loader — the inline script in the root layout adds
 * `.intro-skip` to <html> before paint — so that class counts as ready too.
 */

declare global {
  interface Window {
    __saIntroReady?: boolean;
  }
}

export const INTRO_EVENT = "sa:intro-done";

/** Ceiling on how long the hero waits, in case the loader never reports. */
const SAFETY_MS = 3500;

function subscribe(onChange: () => void) {
  window.addEventListener(INTRO_EVENT, onChange);
  const safety = window.setTimeout(() => {
    window.__saIntroReady = true;
    onChange();
  }, SAFETY_MS);
  return () => {
    window.removeEventListener(INTRO_EVENT, onChange);
    window.clearTimeout(safety);
  };
}

function getSnapshot() {
  return (
    window.__saIntroReady === true ||
    document.documentElement.classList.contains("intro-skip")
  );
}

export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function markIntroReady() {
  window.__saIntroReady = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}
