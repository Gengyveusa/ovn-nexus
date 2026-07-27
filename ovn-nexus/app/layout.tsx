import type { Metadata } from "next";
import "./globals.css";
import { siteGraph, jsonLd, SITE_URL } from "@/lib/structured-data";

const TITLE = "OVN Nexus — the research arm of Gengyve";
const DESCRIPTION =
  "The oral–systemic connection, studied deeper than anyone. OVN Nexus is the research platform behind Gengyve — mapping how oral disease reaches the heart, brain, and body, and turning that science into products that make a difference.";
const SHORT_DESCRIPTION =
  "The oral–systemic connection, studied deeper than anyone. The research platform behind Gengyve.";

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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OVN Nexus — the oral–systemic connection, studied deeper than anyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "The oral–systemic connection, studied deeper than anyone.",
    images: ["/og-image.png"],
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
