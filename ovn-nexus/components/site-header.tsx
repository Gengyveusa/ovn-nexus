import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SiteHeaderProps {
  active?: "dentists" | "science" | "education" | "blog" | "showcase" | "music" | "community" | "about" | null;
}
const primaryLinks = [
  { href: "/for-dentists", label: "For dentists", key: "dentists" },
  { href: "/science", label: "Science", key: "science" },
  { href: "/education", label: "Education", key: "education" },
  { href: "/blog", label: "Bulletin", key: "blog" },
  { href: "/about", label: "About", key: "about" },
];
const moreLinks = [
  { href: "/for-hygienists", label: "For hygienists" },
  { href: "/ce", label: "Continuing education" },
  { href: "/showcase", label: "Showcase" },
  { href: "/music", label: "Music Studio" },
  { href: "/#community", label: "Community" },
];

export function SiteHeader({ active = null }: SiteHeaderProps) {
  return <header className="public-header sticky top-0 z-50 border-b border-[#d4dcd5] bg-[#f6f4ed] text-[#172d30]">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:p-3">Skip to content</a>
    <div className="mx-auto flex h-[76px] w-[calc(100%-40px)] max-w-[1200px] items-center justify-between gap-6">
      <Link href="/" aria-label="OVN Nexus home" className="flex shrink-0 items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7d9386] text-[11px] font-bold tracking-tight">OVN</span><span><span className="block font-serif text-[23px] leading-none tracking-tight">Nexus</span><span className="mt-1 block text-[8px] font-semibold uppercase tracking-[.19em]">Research & education</span></span></Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-6 text-[12px] font-medium lg:flex">{primaryLinks.map(link => <Link key={link.href} href={link.href} aria-current={active === link.key ? "page" : undefined} className={active === link.key ? "text-[#b5442e]" : "hover:underline"}>{link.label}</Link>)}<details className="relative"><summary className="cursor-pointer">More</summary><div className="absolute right-0 top-8 w-56 rounded border border-[#d4dcd5] bg-[#f6f4ed] p-4 shadow-lg">{moreLinks.map(link => <Link className="block py-2 hover:underline" key={link.href} href={link.href}>{link.label}</Link>)}</div></details></nav>
      <Link href="/hub" className="hidden items-center gap-2 rounded border border-[#aabbb1] px-4 py-2 text-xs font-medium lg:inline-flex">Member hub <ArrowUpRight size={14} aria-hidden="true" /></Link>
      <details className="relative lg:hidden"><summary className="cursor-pointer rounded border border-[#aabbb1] px-4 py-2 text-sm">Menu</summary><nav aria-label="Mobile navigation" className="absolute right-0 top-12 max-h-[75vh] w-64 overflow-y-auto rounded border border-[#d4dcd5] bg-[#f6f4ed] p-5 shadow-lg">{[...primaryLinks, ...moreLinks, { href: "/hub", label: "Member hub / Sign in" }].map(link => <Link key={link.href} href={link.href} className="block py-2.5 text-sm hover:underline">{link.label}</Link>)}</nav></details>
    </div>
  </header>;
}
