import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/ThemeProvider";
import BackgroundFX from "../components/BackgroundFX";
import { AosInit } from "../components/AosInit";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0416" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prakashsingh.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prakash Singh | Full Stack Developer",
    template: "%s | Prakash Singh",
  },
  description:
    "Explore the portfolio of Prakash Singh, a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, and modern scalable web applications.",
  keywords: [
    "Prakash Singh",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Prakash Singh", url: siteUrl }],
  creator: "Prakash Singh",
  publisher: "Prakash Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Prakash Singh | Full Stack Developer Portfolio",
    description:
      "Explore high-performance web applications, open-source projects, technical blogs, and certifications by Prakash Singh.",
    siteName: "Prakash Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakash Singh | Full Stack Developer",
    description:
      "Full Stack Developer passionate about building fast, accessible, and beautiful web applications.",
    creator: "@Prakash89795230",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Prakash Singh",
      url: siteUrl,
      jobTitle: "Full Stack Developer",
      sameAs: [
        "https://github.com/PrakashSingh65",
        "https://www.linkedin.com/in/prakash-singh-rajput-a89a15243/",
        "https://x.com/Prakash89795230",
      ],
      description:
        "Full Stack Developer specializing in building high-performance modern web applications with Next.js, React, Node.js, and TypeScript.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Prakash Singh Portfolio",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0416] dark:text-white transition-colors duration-300 relative z-0"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AosInit />
          <BackgroundFX />
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
