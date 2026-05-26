import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Share2 } from "lucide-react";
import { AuthNavButtons } from "@/components/auth-nav-buttons";
import {
  getAllEditions,
  getEdition,
  getRelatedEditions,
  formatDate,
} from "@/lib/bulletin";

export async function generateStaticParams() {
  return getAllEditions().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const edition = getEdition(params.slug);
  if (!edition) return { title: "Not found — OVN Nexus" };
  return {
    title: `${edition.title} — The Oral Health Bulletin`,
    description: edition.excerpt.slice(0, 200),
    openGraph: {
      title: edition.title,
      description: edition.excerpt.slice(0, 200),
      type: "article",
      publishedTime: edition.published_at,
      authors: ["S. Thaddeus Connelly, DDS, MD, PhD, FACS"],
      tags: edition.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: edition.title,
      description: edition.excerpt.slice(0, 200),
    },
    alternates: {
      // Canonical points to LinkedIn since that's the full article
      canonical: edition.url,
    },
  };
}

export default function BulletinDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const edition = getEdition(params.slug);
  if (!edition) notFound();

  const related = getRelatedEditions(edition.slug, 3);

  // Split excerpt into paragraphs on double-newlines or sentence groups
  const paragraphs = edition.excerpt
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

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
        <article className="container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Bulletin
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge>{edition.series}</Badge>
              {edition.tags.slice(0, 4).map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {edition.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(edition.published_at)}
              </div>
              <span>·</span>
              <span>S. Thaddeus Connelly, DDS, MD, PhD, FACS</span>
            </div>

            {/* Summary content */}
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/90">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* CTA: read full article on LinkedIn */}
            <div className="mt-12 rounded-2xl border bg-muted/40 p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                Continue reading
              </p>
              <h3 className="text-xl font-bold mb-3">
                This is a summary of the full edition
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                The complete article — figures, references, and clinical commentary — is
                published in The Oral Health Bulletin on LinkedIn.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={edition.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Read full article <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/newsletters/the-oral-health-bulletin-7281832641058095104/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                    Subscribe to the Bulletin
                  </Button>
                </a>
              </div>
            </div>

            {/* Share */}
            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              Share this edition:
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(edition.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(edition.title)}&url=${encodeURIComponent(edition.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                X / Twitter
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(edition.title)}&body=${encodeURIComponent(edition.url)}`}
                className="text-primary hover:underline"
              >
                Email
              </a>
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t bg-muted/30 py-16">
            <div className="container">
              <h2 className="text-2xl font-bold mb-8">Related editions</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {formatDate(r.published_at)}
                    </div>
                    <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                      {r.excerpt}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                      Read summary <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
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
