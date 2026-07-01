import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getAllModules, getModule, tierClass, tierLabel } from "@/lib/education/loader";

export function generateStaticParams() {
  return getAllModules().map((m) => ({ module: m.slug }));
}

export function generateMetadata({ params }: { params: { module: string } }): Metadata {
  const data = getModule(params.module);
  if (!data) return { title: "Not found — OVN Nexus" };
  return {
    title: `${data.meta.title} — OVN Nexus Education`,
    description: data.meta.summary,
    openGraph: { title: data.meta.title, description: data.meta.summary, type: "article" },
  };
}

const TIER_LEGEND = [
  { name: "Established", cls: "tier-established", desc: "Well-supported by the current evidence base." },
  { name: "Supported", cls: "tier-supported", desc: "Backed by preclinical or associative data; not yet definitive." },
  { name: "Hypothesis", cls: "tier-hypothesis", desc: "A working model under active investigation — not a claim." },
];

export default function ModulePage({ params }: { params: { module: string } }) {
  const data = getModule(params.module);
  if (!data) notFound();
  const { meta, html } = data;

  const all = getAllModules();
  const idx = all.findIndex((m) => m.slug === meta.slug);
  const next = idx >= 0 ? all[idx + 1] : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="education" />
      <main className="flex-1">
        <article className="container max-w-3xl py-14 sm:py-20">
          <Link
            href="/education"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All modules
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary mb-4">
            {meta.series} · Module {meta.module}
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-balance">
            {meta.title}
          </h1>
          {meta.subtitle && (
            <p className="mt-5 text-xl text-muted-foreground leading-relaxed text-balance">
              {meta.subtitle}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground border-b border-border pb-7">
            {meta.readingTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {meta.readingTime}
              </span>
            )}
            {meta.tiers.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs">Evidence:</span>
                {meta.tiers.map((t) => (
                  <span key={t} className={`tier-badge ${tierClass(t)}`}>{tierLabel(t)}</span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 prose-gengyve" dangerouslySetInnerHTML={{ __html: html }} />

          {/* Evidence-tier legend — the honesty made explicit */}
          <div className="mt-14 rounded-2xl border bg-secondary/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-4">
              How to read the evidence tags
            </p>
            <div className="space-y-3">
              {TIER_LEGEND.map((t) => (
                <div key={t.name} className="flex items-start gap-3">
                  <span className={`tier-badge ${t.cls} shrink-0 mt-0.5`}>{t.name}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{t.desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground italic">
              We separate what is proven from what is promising — on purpose. That honesty is the point.
            </p>
          </div>

          {/* Next module + CTA */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {next ? (
              <Link href={`/education/${next.slug}`} className="group">
                <span className="text-xs text-muted-foreground">Next module</span>
                <span className="mt-1 flex items-center gap-2 font-medium group-hover:text-primary transition-colors">
                  {next.title} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <span />
            )}
            <div className="flex gap-3">
              <a href="https://gengyveusa.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">Shop Gengyve</Button>
              </a>
              <Link href="/signup">
                <Button>Join the Network</Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
