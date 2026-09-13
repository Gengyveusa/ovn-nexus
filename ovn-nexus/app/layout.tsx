import type { Metadata } from "next";
import "./globals.css";
import "./clinical.css";
import { siteGraph, jsonLd, SITE_URL } from "@/lib/structured-data";

const TITLE = "OVN Nexus | Oral-systemic science for the dental chair";
const DESCRIPTION = "Explore the oral-systemic connection with a free clinical brief, an interactive evidence map, and a discussion guide for dental teams. Sources and limitations included.";
const SHORT_DESCRIPTION = "Oral-systemic science, translated for the dental chair. A free clinical brief for dentists and their teams.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // The apex 307-redirects to www and the sitemap uses www, so www is the
  // serving host. metadataBase previously pointed at the apex, which made
  // og:url disagree with both — three signals, two answers.
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: SHORT_DESCRIPTION,
    url: SITE_URL,
    siteName: "OVN Nexus",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/clinical-brief-og.png",
        width: 1200,
        height: 630,
        alt: "OVN Nexus — Oral-systemic science for the dental chair",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Oral-systemic science, translated for the dental chair.",
    images: ["/clinical-brief-og.png"],
  },
  authors: [{ name: "S. Thaddeus Connelly, DDS, MD, PhD, FACS" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(siteGraph())}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
