import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FlaskConical, ArrowRight, ExternalLink } from "lucide-react";
import { OvnAxisDiagram } from "@/components/diagrams/ovn-axis-diagram";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="bg-aurora">
          <div className="container py-24 sm:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl text-balance">
                  The mouth-body connection is the next frontier of{" "}
                  <span className="text-primary">medicine</span>.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
                  Oral microbes release inflammatory signals that travel through the
                  bloodstream and nervous system to influence the heart, brain, and
                  immune system.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  The <strong className="text-foreground">OVN Axis</strong>{" "}
                  (Oral-Vascular-Neural) is a scientific framework for studying it.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2">
                      Join the OVN Research Network <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/science">
                    <Button variant="outline" size="lg">Explore the Science</Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="mt-20 sm:mt-24">
                <OvnAxisDiagram />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Why This Matters — rounded panel ──────────────────── */}
        <section className="container py-16 sm:py-20">
          <Reveal>
            <div className="rounded-3xl bg-secondary/60 p-10 sm:p-16 shadow-soft">
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Why periodontal health is a systemic issue
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  The global burden of diseases now linked to chronic systemic inflammation is
                  staggering. Even a modest, measurable, upstream risk signal — one that is
                  modifiable in the dental chair — could matter clinically at population scale.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3 text-center">
                {[
                  { stat: "32%", label: "of global deaths", context: "attributed to cardiovascular disease — the leading cause of mortality worldwide" },
                  { stat: "1 in 6", label: "cancer deaths", context: "involve pathways now under investigation for oral microbial contributions" },
                  { stat: "~1 Billion", label: "dementia burden", context: "individuals projected to be affected globally by 2050, with neuroinflammatory drivers under active study" },
                ].map((item, i) => (
                  <Reveal key={item.stat} delay={i * 0.08}>
                    <div className="rounded-2xl border bg-card p-8 shadow-soft transition-shadow hover:shadow-lift h-full">
                      <div className="text-5xl sm:text-6xl font-semibold tracking-tight text-primary">{item.stat}</div>
                      <div className="mt-3 text-base font-medium">{item.label}</div>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.context}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto italic">
                These statistics do not imply that periodontitis is a proven causal driver of any
                systemic disease. They frame the scale of the problem and the potential significance
                of upstream modifiable risk signals.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Evidence Tiers ─────────────────────────────────────── */}
        <section id="education" className="container py-16 sm:py-20">
          <Reveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">The science — evidence tiers</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Not all science is created equal. Here is how the current evidence stacks up,
                presented with the same epistemic honesty you would apply to any clinical literature.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: CheckCircle,
                tier: "Established",
                title: "Systemic Inflammatory Exposure",
                body: "Periodontitis generates measurable systemic inflammatory exposure. Multiple meta-analyses show significant association between periodontal disease and atherosclerotic cardiovascular disease (ASCVD), with periodontal intervention linked to improvement in surrogate cardiometabolic markers.",
                tone: "bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900",
                ic: "text-emerald-600 dark:text-emerald-400",
                bd: "border-emerald-400 text-emerald-700 dark:text-emerald-300",
              },
              {
                icon: AlertTriangle,
                tier: "Supported",
                title: "OMV Virulence Cargo",
                body: "P. gingivalis outer membrane vesicles (OMVs) carry concentrated virulence factors — gingipains, LPS, and fimbriae — that can translocate across epithelial and endothelial barriers, promoting endothelial activation and local inflammatory responses in preclinical models.",
                tone: "bg-amber-50/60 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900",
                ic: "text-amber-600 dark:text-amber-400",
                bd: "border-amber-400 text-amber-700 dark:text-amber-300",
              },
              {
                icon: FlaskConical,
                tier: "Hypothesis Under Test",
                title: "A Conserved OMV-Driven Program",
                body: "A working hypothesis proposes that oral bacterial OMVs trigger a conserved cellular reprogramming program — mitochondrial dysfunction, phenotypic plasticity, and secondary EV signaling — that may contribute to vascular, neurodegenerative, and oncological tissue endpoints. Under active investigation.",
                tone: "bg-sky-50/60 border-sky-200 dark:bg-sky-950/20 dark:border-sky-900",
                ic: "text-sky-600 dark:text-sky-400",
                bd: "border-sky-400 text-sky-700 dark:text-sky-300",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className={`rounded-2xl border p-7 h-full shadow-soft transition-shadow hover:shadow-lift ${card.tone}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <card.icon className={`h-5 w-5 shrink-0 ${card.ic}`} />
                    <Badge variant="outline" className={`text-xs ${card.bd}`}>{card.tier}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg tracking-tight">{card.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* OMV explainer */}
          <Reveal>
            <div className="mt-12 rounded-3xl border bg-card p-8 sm:p-12 shadow-soft">
              <h3 className="text-2xl font-semibold tracking-tight mb-4">What are outer membrane vesicles (OMVs)?</h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                OMVs are nanoscale particles (20–250 nm) constitutively shed from the outer
                membrane of gram-negative bacteria like <em>P. gingivalis</em> and{" "}
                <em>Fusobacterium nucleatum</em>. Unlike planktonic bacteria, OMVs can cross
                epithelial barriers, evade immune clearance, and deliver concentrated virulence
                cargo — including proteases, lipopolysaccharide, and nucleic acids — directly to
                host cells at distant sites.
              </p>

              <div className="mt-10">
                <h4 className="font-medium mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  The proposed 5-step cascade
                </h4>
                <div className="grid gap-3 md:grid-cols-5">
                  {[
                    { step: "1", title: "Barrier Disruption", desc: "OMVs breach periodontal epithelium and enter systemic circulation" },
                    { step: "2", title: "Mitochondrial Dysfunction", desc: "Virulence cargo impairs mitochondrial respiration in target cells" },
                    { step: "3", title: "Phenotypic Reprogramming", desc: "Host cells shift toward a pro-inflammatory, pro-remodeling phenotype" },
                    { step: "4", title: "Secondary EV Signals", desc: "Reprogrammed cells shed their own EVs, amplifying the signal" },
                    { step: "5", title: "Tissue Endpoints", desc: "Cumulative effects manifest as vascular, neural, or oncological pathology" },
                  ].map((item) => (
                    <div key={item.step} className="rounded-2xl border bg-muted/40 p-5">
                      <div className="text-xs font-semibold text-primary mb-2">Step {item.step}</div>
                      <div className="font-medium text-sm tracking-tight">{item.title}</div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Link
                  href="/science"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Full presentation at Explore the Science <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── What You Can Do Today — rounded panel ──────────────── */}
        <section className="container py-16 sm:py-20">
          <Reveal>
            <div className="rounded-3xl bg-secondary/60 p-10 sm:p-16 shadow-soft">
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">What you can do today</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  The evidence does not yet support claiming periodontal disease as a validated
                  causal driver of ASCVD, cancer, or Alzheimer&apos;s disease. But there is
                  plenty of justified clinical action right now.
                </p>
              </div>
              <div className="mx-auto max-w-2xl space-y-3">
                {[
                  { icon: "✅", text: "Treat periodontitis as a systemic health issue — not just a local dental problem", positive: true },
                  { icon: "✅", text: "Capture periodontal status in cardiometabolic and neurological histories", positive: true },
                  { icon: "✅", text: "Anticipate and communicate biomarker improvement (hsCRP, IL-6) after periodontal therapy", positive: true },
                  { icon: "❌", text: 'Do NOT claim periodontal disease is a proven causal driver of ASCVD, cancer, or Alzheimer\'s disease — the causal evidence is not yet there', positive: false },
                ].map((item) => (
                  <div
                    key={item.text}
                    className={`flex gap-4 rounded-2xl border p-5 ${
                      item.positive
                        ? "border-emerald-200/70 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                        : "border-red-200/70 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
                    }`}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Community ──────────────────────────────────────────── */}
        <section id="community" className="container py-16 sm:py-20 scroll-mt-20">
          <Reveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Join dental professionals building the evidence base
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                OVN Nexus is a professional community and research platform for clinicians who
                want to stay current on the oral-systemic connection and contribute to the science.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              { title: "Education Modules", desc: "Curated, evidence-tiered content on the oral-vascular-neural axis — written for clinicians, not just researchers.", badge: "Available Now" },
              { title: "Case Discussions", desc: "Share and discuss cases where periodontal findings intersected with systemic disease presentations.", badge: "Coming Soon" },
              { title: "Biomarker Tracking", desc: "Contribute to and access aggregated, de-identified data linking periodontal therapy to systemic biomarker changes.", badge: "Coming Soon" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift h-full">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h3 className="font-semibold tracking-tight">{item.title}</h3>
                    <Badge
                      variant={item.badge === "Available Now" ? "default" : "secondary"}
                      className="text-[10px] shrink-0"
                    >
                      {item.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 flex justify-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Create your account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">Sign in</Button>
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ── Living Document banner ───────────────────────────────── */}
      <section className="container pb-16">
        <Reveal>
          <div className="rounded-3xl bg-primary/5 border border-primary/10 px-8 py-10 text-center max-w-3xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
              This platform is a living document
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              OVN Nexus is continuously evolving, shaped by the clinicians and researchers who use it.
              We welcome your feedback and suggestions as we build new features to strengthen your
              educational experience — so you can deliver the highest standard of care to your patients.
            </p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
