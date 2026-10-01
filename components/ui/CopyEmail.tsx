"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

/** Copies the address and confirms in place — recruiters often paste it into an ATS. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="glass inline-flex h-14 items-center gap-2.5 rounded-2xl px-6 font-semibold text-mist transition-colors hover:text-chalk"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "ok" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={copied ? "text-emerald-300" : ""}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? "Copied to clipboard" : "Copy email"}</span>
    </button>
  );
}
