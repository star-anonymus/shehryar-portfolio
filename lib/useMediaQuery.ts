"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a media query without an effect, so it survives the React Compiler's
 * set-state-in-effect rule and stays reactive if the condition changes
 * mid-session (a mouse gets plugged in, the window moves to another display).
 *
 * Returns `false` during SSR, which is the safe default for every
 * enhancement gated behind it.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
