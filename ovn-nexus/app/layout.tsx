import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OVN Nexus — the research arm of Gengyve",
  description:
    "The oral–systemic connection, studied deeper than anyone. OVN Nexus is the research platform behind Gengyve — mapping how oral disease reaches the heart, brain, and body, and turning that science into products that make a difference.",
  metadataBase: new URL("https://ovnnexus.com"),
  openGraph: {
    title: "OVN Nexus — the research arm of Gengyve",
    description: "The oral–systemic connection, studied deeper than anyone. The research platform behind Gengyve.",
    url: "https://ovnnexus.com",
    siteName: "OVN Nexus",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "OVN Nexus — the research arm of Gengyve",
    description: "The oral–systemic connection, studied deeper than anyone.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
