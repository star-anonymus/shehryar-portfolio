import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Aurora from "@/components/ui/Aurora";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/lib/site";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Aurora variant="hero" />

      <div className="relative z-10">
        <p className="kicker">Error 404</p>

        <h1 className="mt-5 font-display text-[clamp(4rem,18vw,9rem)] font-bold leading-none tracking-[-0.04em]">
          <span className="text-aurora">404</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-mist/75">
          This page doesn&apos;t exist — or it moved. Nothing is broken on your end.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={12}>
            <Link
              href="/"
              className="glow-iris inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              <ArrowLeft size={16} />
              Back home
            </Link>
          </Magnetic>
          <Magnetic strength={12}>
            <Link
              href="/#work"
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-mist transition-colors hover:text-chalk"
            >
              See my work
            </Link>
          </Magnetic>
        </div>

        <p className="mt-10 font-mono text-xs text-fog">
          {site.name} · {site.role}
        </p>
      </div>
    </main>
  );
}
