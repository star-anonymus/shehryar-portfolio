"use client";

import { FiLinkedin } from "react-icons/fi";
import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { SHARE_WINDOW_FEATURES, linkedInShareUrl } from "@/lib/linkedin";
import { absoluteUrl } from "@/lib/site";

interface ShareOnLinkedInProps {
  /** Path on this site to share, e.g. "/projects/medifind". */
  path: string;
  label?: string;
  variant?: "solid" | "ghost";
  /** Also render a copy-link button next to it. */
  withCopy?: boolean;
}

export default function ShareOnLinkedIn({
  path,
  label = "Share on LinkedIn",
  variant = "ghost",
  withCopy = false,
}: ShareOnLinkedInProps) {
  const [copied, setCopied] = useState(false);

  function share() {
    window.open(linkedInShareUrl(path), "_blank", SHARE_WINDOW_FEATURES);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(absoluteUrl(path));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context, denied permission) —
      // the LinkedIn button still works, so fail quietly.
    }
  }

  const base =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5";
  const styles =
    variant === "solid"
      ? "bg-[#0a66c2] text-white shadow-lg shadow-[#0a66c2]/25 hover:bg-[#0b5cab]"
      : "glass text-mist hover:text-chalk hover:border-[#0a66c2]/50";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={share} className={`${base} ${styles}`}>
        <FiLinkedin size={16} />
        {label}
      </button>

      {withCopy && (
        <button
          type="button"
          onClick={copy}
          className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-mist transition-all duration-200 hover:-translate-y-0.5 hover:text-chalk"
          aria-label="Copy link"
        >
          {copied ? <Check size={16} className="text-emerald-400" /> : <Link2 size={16} />}
          {copied ? "Copied" : "Copy link"}
        </button>
      )}
    </div>
  );
}
