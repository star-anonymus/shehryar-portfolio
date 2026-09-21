import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aurora from "@/components/ui/Aurora";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StudioClient, { type StudioResult } from "./StudioClient";
import daily from "@/content/latest-drafts.json";

export const metadata: Metadata = {
  title: "Content Studio",
  description: "Generate LinkedIn drafts from recent GitHub activity and current trends.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-[calc(var(--nav-h)+2rem)]">
        <Aurora />
        <div className="relative z-10">
          <StudioClient daily={daily as StudioResult} />
        </div>
      </main>

      <Footer />
    </>
  );
}
