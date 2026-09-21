"use client";

import { useCallback, useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Adds the animated conic border on hover. */
  ring?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Card that tracks the pointer and feeds --mx/--my to the `.spotlight`
 * radial gradient in globals.css. Pure CSS variables — no re-renders.
 */
export default function SpotlightCard({
  children,
  className = "",
  ring = true,
  as = "div",
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  // Polymorphic `as` plus a typed ref is more trouble than it's worth in TSX;
  // the element is always a block container, so widen it here.
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight glass glass-sheen ${ring ? "ring-aurora" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
