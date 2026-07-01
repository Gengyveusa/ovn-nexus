import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Clock, Boxes, Atom, LineChart } from "lucide-react";
import { getSeriesGroups, tierClass, tierLabel } from "@/lib/education/loader";

export const metadata: Metadata = {
  title: "Oral–Systemic Education — OVN Nexus by Gengyve",
  description:
    "The deepest, most honest education on the oral–systemic connection — from why your mouth is your body's early-warning system to the frontier science. Written for clinicians and the curious alike.",
};

const TOOLS = [
  { icon: Boxes, name: "The OVN Atlas", desc: "A 3-D body-map of how oral signals reach the artery, brain, and liver.", href: "https://ovnnexus.org/ovn_atlas.html" },
  { icon: Atom, name: "Quantum → Box", desc: "Zoom from a tissue voxel to the electron tunnel inside a mitochondrion.", href: "https://ovnnexus.org/quantum_to_box.html" },
  { icon: LineChart, name: "Cancer ↔ Aging", desc: "20 mitochondrial genes that split in opposite directions.", href: "https://ovnnexus.org/divergence.html" },
];

export default function EducationPage() {
  const groups = getSeriesGroups();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="education" />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-aurora">
          <div className="container py-20 sm:py-28 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
              The research arm of Gengyve
            </p>
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl leading-[1.08] text-balance">
              The oral–systemic connection,{" "}
              <span className="text-primary">explained deeper than anyone.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Curated from Dr. Stephen Thaddeus Connelly&apos;s <em>Oral Health Bulletin</em> — written for
              clinicians <em>and</em> the curious. Every claim is tagged by how strong the evidence
              actually is. That honesty is the point.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Stephen Thaddeus Connelly, DDS, MD, PhD, FACS</p>
              <p>Professor of Oral &amp; Maxillofacial Surgery, UCSF</p>
            </div>
          </div>
        </section>

        {/* ── Evidence-tier promise ────────────────────────────── */}
        <section className="container -mt-6 mb-4">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-4 text-center">
              We separate what is proven from what is promising
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-start gap-2">
                <span className="tier-badge tier-established shrink-0 mt-0.5">Established</span>
                <span className="text-xs text-muted-foreground">Well-supported by current evidence.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="tier-badge tier-supported shrink-0 mt-0.5">Supported</span>
                <span className="text-xs text-muted-foreground">Preclinical / associative; not definitive.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="tier-badge tier-hypothesis shrink-0 mt-0.5">Hypothesis</span>
                <span className="text-xs text-muted-foreground">A model under active test — not a claim.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Module Series ────────────────────────────────────── */}
        {groups.length === 0 ? (
          <section className="container py-16 text-center text-muted-foreground">
            <p>Modules are being published. Check back shortly.</p>
          </section>
        ) : (
          groups.map((group, gi) => (
            <section key={group.series} className={`py-12 sm:py-16 ${gi % 2 === 1 ? "bg-secondary/40" : ""}`}>
              <div className="container">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold tracking-tight">{group.series}</h2>
                  <div className="mt-2 h-1 w-16 rounded-full bg-primary" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {group.modules.map((mod) => (
                    <Link
                      key={mod.slug}
                      href={`/education/${mod.slug}`}
                      className="group flex flex-col rounded-2xl border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-muted-foreground">Module {mod.module}</span>
                        {mod.readingTime && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" /> {mod.readingTime}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
                        {mod.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{mod.summary}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {mod.tiers.map((t) => (
                            <span key={t} className={`tier-badge ${tierClass(t)}`}>{tierLabel(t)}</span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))
        )}

        {/* ── Show, don't tell — the tools ─────────────────────── */}
        <section className="container py-16 sm:py-20">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">See it, don&apos;t just read it</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              No other oral-care brand can show you this. Explore the mechanism in three interactive models.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TOOLS.map((t) => (
              <a
                key={t.name}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <t.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold tracking-tight group-hover:text-primary transition-colors">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="border-t bg-primary/5 py-14 text-center">
          <div className="container max-w-2xl">
            <h2 className="text-xl font-semibold mb-3">Go deeper — or bring it to your chair</h2>
            <p className="text-sm text-muted-foreground mb-6">
              These modules are grounded in a growing body of oral-systemic research. Explore the full
              science, or join the professional network.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/science">
                <Button variant="outline" size="lg">Explore the Science</Button>
              </Link>
              <Link href="/signup">
                <Button size="lg">Join the Network</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
