import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Calendar, BookOpen } from "lucide-react";
import { AuthNavButtons } from "@/components/auth-nav-buttons";
import { getAllEditions, getSeriesList, formatDate } from "@/lib/bulletin";

export const metadata: Metadata = {
  title: "The Oral Health Bulletin — OVN Nexus",
  description:
    "Weekly clinical-science writing on the oral-vascular-neural axis by S. Thaddeus Connelly, DDS, MD, PhD, FACS. Biofilm ecology, OMV biology, systemic immune signaling, and the next epoch of periodontal medicine.",
  openGraph: {
    title: "The Oral Health Bulletin — OVN Nexus",
    description:
      "Weekly clinical-science writing on the oral-vascular-neural axis.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const editions = getAllEditions();
  const series = getSeriesList();
  const [featured, ...rest] = editions;

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              OVN
            </div>
            <span className="text-xl font-bold">Nexus</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/education" className="text-muted-foreground hover:text-foreground transition-colors">Education</Link>
            <Link href="/blog" className="text-foreground transition-colors">Bulletin</Link>
            <Link href="/showcase" className="text-muted-foreground hover:text-foreground transition-colors">Showcase</Link>
            <Link href="/music" className="text-muted-foreground hover:text-foreground transition-colors">Music Studio</Link>
            <Link href="/#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link>
          </nav>
          <AuthNavButtons />
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="mb-4">Weekly • {editions.length} editions • 2,800+ subscribers</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              The Oral Health Bulletin
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Clinical-science writing on the oral-vascular-neural axis — biofilm ecology,
              outer-membrane vesicle biology, systemic immune signaling, and the next epoch of
              periodontal medicine. Written for clinicians and researchers by{" "}
              <strong className="text-foreground">S. Thaddeus Connelly, DDS, MD, PhD, FACS</strong>.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.linkedin.com/newsletters/the-oral-health-bulletin-7281832641058095104/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Subscribe on LinkedIn <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Join OVN Nexus <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Featured (most recent) ────────────────────────────── */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Latest edition</p>
                <h2 className="text-2xl font-bold">{featured.title}</h2>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(featured.published_at)}
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-8 sm:p-10">
              <div className="flex flex-wrap gap-2 mb-5">
                <Badge>{featured.series}</Badge>
                {featured.tags.slice(0, 3).map((t) => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))}
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href={`/blog/${featured.slug}`}>
                  <Button className="gap-2 w-full sm:w-auto">
                    Read the summary <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href={featured.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    Full article on LinkedIn <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── All editions ──────────────────────────────────────── */}
        <section className="container py-16">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">All editions</h2>
            <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              {editions.length} published
            </div>
          </div>

          {series.map((s) => {
            const items = rest.filter((e) => e.series === s);
            if (items.length === 0) return null;
            return (
              <div key={s} className="mb-12">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                  {s}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((edition) => (
                    <Link
                      key={edition.slug}
                      href={`/blog/${edition.slug}`}
                      className="group rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        {formatDate(edition.published_at)}
                      </div>
                      <h4 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                        {edition.title}
                      </h4>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                        {edition.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {edition.tags.slice(0, 3).map((t) => (
                          <Badge key={t} variant="outline" className="text-xs font-normal">{t}</Badge>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t bg-muted/50 py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                OVN
              </div>
              <div>
                <div className="font-bold text-sm">OVN Nexus</div>
                <div className="text-xs text-muted-foreground">Oral-Vascular-Neural Research Network</div>
              </div>
            </Link>
            <div className="text-center text-sm text-muted-foreground">
              <p className="font-medium">S. Thaddeus Connelly, DDS, MD, PhD, FACS</p>
              <p>UCSF / SFVAMC / GengyeUSA</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/science" className="inline-flex items-center gap-1 text-primary hover:underline">
                Explore the Science <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="/education" className="text-muted-foreground hover:text-foreground">Education</Link>
              <Link href="/signup" className="text-muted-foreground hover:text-foreground">Sign Up</Link>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
            Content on this platform is for professional education. It does not constitute
            medical advice and does not establish a causal relationship between periodontal
            disease and any systemic condition.
          </div>
        </div>
      </footer>
    </div>
  );
}
