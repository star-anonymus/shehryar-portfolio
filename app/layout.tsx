import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shehryarahmed.dev"),
  title: {
    default: "Shehryar Ahmed | Software Engineer",
    template: "%s | Shehryar Ahmed",
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
  ],
  authors: [{ name: "Shehryar Ahmed", url: "https://github.com/star-anonymus" }],
  creator: "Shehryar Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shehryarahmed.dev",
    siteName: "Shehryar Ahmed Portfolio",
    title: "Shehryar Ahmed | Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in React, Next.js, Flutter, .NET, and NestJS.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Shehryar Ahmed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shehryar Ahmed | Software Engineer",
    description: "Full-Stack Software Engineer — React, Next.js, Flutter, .NET, NestJS",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0a0f] text-white antialiased">{children}</body>
    </html>
  );
}
