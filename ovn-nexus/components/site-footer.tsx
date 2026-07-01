import Link from "next/link";

/**
 * Shared Apple-esque footer used across public pages.
 * Tall, multi-column, hairline borders, quiet legal microcopy at bottom.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm">
                OVN
              </div>
              <span className="text-base font-semibold tracking-tight">Nexus</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              The research and education arm of <span className="font-medium text-foreground">Gengyve</span> — the
              oral–systemic connection, studied deeper than anyone, and built by working clinicians.
            </p>
            <a href="https://gengyveusa.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Shop Gengyve ↗
            </a>
            <p className="mt-6 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">S. Thaddeus Connelly, DDS, MD, PhD, FACS</span>
              <span className="mx-2">·</span>UCSF / SFVAMC / Gengyve USA
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-4">
              Explore
            </p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/science" className="text-muted-foreground hover:text-foreground">Science</Link></li>
              <li><Link href="/education" className="text-muted-foreground hover:text-foreground">Education</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">The Bulletin</Link></li>
              <li><Link href="/for-hygienists" className="text-muted-foreground hover:text-foreground">For Hygienists</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-4">
              Account
            </p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/signup" className="text-muted-foreground hover:text-foreground">Sign up</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-foreground">Sign in</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} OVN Nexus. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            Content on this platform is for professional education. It does not constitute medical
            advice and does not establish a causal relationship between periodontal disease and any
            systemic condition.
          </p>
        </div>
      </div>
    </footer>
  );
}
