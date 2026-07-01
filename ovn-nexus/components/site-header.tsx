"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthNavButtons } from "@/components/auth-nav-buttons";
import { cn } from "@/lib/utils/cn";

interface SiteHeaderProps {
  /**
   * The current section to highlight in the nav (e.g. "blog", "about").
   * Optional — if omitted, no link is highlighted.
   */
  active?: "education" | "blog" | "showcase" | "music" | "community" | "about" | null;
}

/**
 * Apple-style sticky nav:
 * - Solid at top of page, translucent + backdrop-blur on scroll
 * - Hairline bottom border appears on scroll
 * - Tight, low-weight nav links
 */
export function SiteHeader({ active = null }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (href: string, label: string, key: SiteHeaderProps["active"]) => (
    <Link
      key={href}
      href={href}
      className={cn(
        "transition-colors",
        active === key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border/60"
          : "bg-background/0 border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm">
            OVN
          </div>
          <span className="leading-none">
            <span className="block text-[17px] font-semibold tracking-tight">Nexus</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-primary">by Gengyve</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium tracking-tight">
          {link("/education", "Education", "education")}
          {link("/blog", "Bulletin", "blog")}
          {link("/showcase", "Showcase", "showcase")}
          {link("/music", "Music Studio", "music")}
          {link("/#community", "Community", "community")}
          {link("/about", "About", "about")}
          <a href="https://gengyveusa.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">Shop&nbsp;Gengyve&nbsp;↗</a>
        </nav>
        <AuthNavButtons />
      </div>
    </header>
  );
}
