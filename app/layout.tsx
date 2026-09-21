import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Software Engineer`,
    template: `%s | ${site.name}`,
  },
  description:
    "Full-Stack Software Engineer specializing in React, Next.js, Flutter, .NET, and NestJS. Building scalable web and mobile applications.",
  keywords: [
    "Shehryar Ahmed",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Flutter",
    "NestJS",
    "ASP.NET",
    "Pakistan",
    "Islamabad",
    "Rawalpindi",
  ],
  authors: [{ name: site.name, url: site.socials.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} Portfolio`,
    title: `${site.name} | Software Engineer`,
    description:
      "Full-Stack Software Engineer specializing in React, Next.js, Flutter, .NET, and NestJS.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Software Engineer`,
    description: "Full-Stack Software Engineer — React, Next.js, Flutter, .NET, NestJS",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="bg-ink-950 text-chalk antialiased">{children}</body>
    </html>
  );
}
