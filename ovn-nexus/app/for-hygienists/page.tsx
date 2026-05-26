import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ExternalLink,
  Clock,
  HeartPulse,
  Microscope,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "For Hygienists — OVN Nexus",
  description:
    "Dental hygienists spend more face-to-face time with the average patient each year than that patient's primary care physician. OVN Nexus is the research, education, and certification pathway that turns that hour into the highest-leverage preventive-medicine encounter in healthcare.",
};

export default function ForHygienistsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active={null} />

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-aurora">
          <div className="container py-20 sm:py-28">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Badge variant="secondary" className="mb-5">For Hygienists</Badge>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl text-balance">
                  You see the patient more than their doctor does.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-balance">
                  Every hygienist in America spends more face-to-face time with the
                  average patient each year than that patient&rsquo;s primary care physician.
                  OVN Nexus is built to turn that hour into the highest-leverage
                  preventive-medicine encounter in the healthcare system.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="#interest">
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                      Join the early-interest list <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                      Read the Bulletin
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── The Premise ─────────────────────────────────────── */}
        <section className="container py-16 sm:py-20">
          <Reveal>
            <div className="rounded-3xl bg-secondary/60 p-10 sm:p-16 shadow-soft">
              <div className="mx-auto max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  The premise
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  The mouth is not a local organ. It is the body&rsquo;s most information-dense interface.
                </h2>
                <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
                  <p>
                    It is the only site in the body where the immune, microbial, vascular,
                    neural, and epithelial systems are simultaneously, non-invasively, and
                    repeatedly accessible &mdash; on a six-month clinical cadence, in a
                    thirty-thousand-chair distribution network, already fully licensed.
                  </p>
                  <p>
                    That hour is currently spent, in most operatories, as a mechanical
                    de-scaling procedure against a clock. The literature suggests it should
                    be spent as something larger: a structured systemic-health encounter
                    grounded in mechanism, framed in plain language, and documented in a way
                    that travels with the patient.
                  </p>
                  <p>
                    OVN Nexus exists to give hygienists the language, the evidence, and
                    eventually the credentials to do that work confidently &mdash; without
                    overclaiming, without stepping outside scope of practice, and without
                    waiting for the rest of medicine to catch up.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Why this hour matters — stats grid ──────────────── */}
        <section className="container py-16">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Why this hour matters</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                A short list of what we know &mdash; with evidence tiers we&rsquo;ll keep
                honest about as the science evolves.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Clock,
                  stat: "~1 hr / year",
                  label: "Face time vs. PCP",
                  body: "The average patient spends more minutes with their hygienist each year than with their primary care physician.",
                },
                {
                  icon: HeartPulse,
                  stat: "~47%",
                  label: "Adults 30+ with periodontitis",
                  body: "Roughly half of American adults have periodontal disease. Most do not know it.",
                },
                {
                  icon: Microscope,
                  stat: "Keystone pathogens",
                  label: "Traceable to systemic disease",
                  body: "P. gingivalis, F. nucleatum, and T. denticola are now traceable from the gingival crevice to atherosclerotic plaques, colorectal tumors, and the brains of Alzheimer\u2019s patients.",
                },
                {
                  icon: Stethoscope,
                  stat: "Cardiovascular",
                  label: "AHA-recognized association",
                  body: "Periodontal disease is independently associated with atherosclerotic cardiovascular disease in AHA scientific statements.",
                },
                {
                  icon: ShieldCheck,
                  stat: "HbA1c",
                  label: "Bidirectional with diabetes",
                  body: "Periodontal treatment can produce small but meaningful reductions in HbA1c in patients with Type 2 diabetes.",
                },
                {
                  icon: Sparkles,
                  stat: "Pregnancy",
                  label: "Preterm-birth signal",
                  body: "Untreated gingivitis is associated with preterm birth and low birth weight \u2014 a signal that is contested in its magnitude but consistent in its direction.",
                },
              ].map((c) => (
                <Reveal key={c.label}>
                  <div className="h-full rounded-2xl border bg-card p-6 shadow-soft">
                    <c.icon className="h-5 w-5 text-primary" />
                    <div className="mt-4 text-2xl font-semibold tracking-tight">
                      {c.stat}
                    </div>
                    <div className="mt-1 text-sm font-medium text-foreground">
                      {c.label}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Every claim above maps to a numbered citation in the{" "}
              <Link href="/science" className="underline">
                Science section
              </Link>
              , tagged as <em>Established</em>, <em>Supported but Not Settled</em>, or{" "}
              <em>Hypothesis Under Test</em>. Nothing on this page is intended as a
              diagnostic or therapeutic claim for any individual patient.
            </p>
          </div>
        </section>

        {/* ── What OVN Nexus gives you ────────────────────────── */}
        <section className="container py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">
                What OVN Nexus gives you today
              </h2>
            </Reveal>
            <div className="mt-8 space-y-4">
              {[
                {
                  title: "The Bulletin",
                  body: "A weekly clinical newsletter on the oral-vascular-neural axis. Concise, evidence-tiered, and written for clinicians who don\u2019t have time for handwaving.",
                  href: "/blog",
                  cta: "Read the latest issue",
                },
                {
                  title: "The Science section",
                  body: "An explicit evidence-tier framework \u2014 Established, Supported but Not Settled, Hypothesis Under Test \u2014 so you always know what footing a claim is on before you bring it to a patient.",
                  href: "/science",
                  cta: "Open the Science section",
                },
                {
                  title: "Education modules",
                  body: "Short, structured walk-throughs that turn the literature into something you can use on a Tuesday afternoon \u2014 the inflammatory cascade, the keystone-pathogen story, motivational interviewing for systemic risk, and more.",
                  href: "/education",
                  cta: "Browse Education",
                },
              ].map((c) => (
                <Reveal key={c.title}>
                  <div className="rounded-2xl border bg-card p-6 shadow-soft">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {c.body}
                        </p>
                      </div>
                      <Link href={c.href} className="shrink-0">
                        <Button variant="outline" size="sm" className="gap-2">
                          {c.cta} <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── OSCIH — coming ──────────────────────────────────── */}
        <section className="container py-16 sm:py-20">
          <Reveal>
            <div className="rounded-3xl bg-card border p-10 sm:p-16 shadow-soft">
              <div className="mx-auto max-w-3xl">
                <Badge variant="secondary" className="mb-4">
                  In development &middot; Early-interest list open
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight">
                  OSCIH &mdash; Oral-Systemic Certification in Integrative Hygiene
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  An academically-credentialed, research-generating certification pathway
                  built around the dental hygienist as a frontline systemic-health clinician.
                  Designed in partnership with university and clinical collaborators we&rsquo;ll
                  announce as the pilot opens.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      tier: "Tier 1",
                      name: "Foundations",
                      detail:
                        "~40 hours, asynchronous, ADA-CERP CE pathway. Fluency in oral-systemic mechanisms, risk-communication, and baseline diagnostic literacy.",
                      cred: "OSCIH-F",
                    },
                    {
                      tier: "Tier 2",
                      name: "Certified Oral-Systemic Hygienist",
                      detail:
                        "~120 hours, blended async + in-person intensives. Case-based, proctored assessment. Risk stratification, chair-side biosensor interpretation, co-management protocols.",
                      cred: "COSH",
                    },
                    {
                      tier: "Tier 3",
                      name: "Fellow, Integrative Oral Medicine",
                      detail:
                        "12\u201318 months. Mentored research project in your own practice, publication track, symposium presentation. The flagship tier.",
                      cred: "FIOM",
                    },
                  ].map((t) => (
                    <div
                      key={t.cred}
                      className="rounded-2xl border bg-background p-5 shadow-soft"
                    >
                      <div className="text-xs font-medium uppercase tracking-wide text-primary">
                        {t.tier}
                      </div>
                      <div className="mt-1 font-semibold tracking-tight">{t.name}</div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {t.detail}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                        <GraduationCap className="h-3 w-3" />
                        {t.cred}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-xs text-muted-foreground">
                  OSCIH is a working draft of a program in development. Tier names,
                  hours, and accreditation pathways are subject to change as partners are
                  formalized. Nothing here implies a credential yet exists.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── A pedagogy worth describing ─────────────────────── */}
        <section className="container py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">
                A pedagogy worth describing
              </h2>
              <p className="mt-3 text-muted-foreground">
                The curriculum is built on a deliberate inversion. We don&rsquo;t start
                with anatomy. We start with the collapse &mdash; and walk backward through
                successively smaller scales until we arrive at the mechanical act of the
                hygienist&rsquo;s hand on a curette. A learner who has watched a 58-year-old
                patient&rsquo;s carotid atheroma rupture cannot subsequently un-learn the
                seriousness of the sub-gingival biofilm she will scale on Monday morning.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {[
                {
                  n: "Layer 0",
                  t: "The Collapse",
                  d: "Four terminal events presented as case simulators \u2014 acute MI during a routine recall, refractory diabetes with severe periodontitis, preterm birth with untreated gingivitis, and a post-mortem Alzheimer\u2019s case with oral pathogens identified in the brain. You feel the stakes before meeting a single molecule.",
                },
                {
                  n: "Layer 1",
                  t: "The Systemic Cascade",
                  d: "How the collapse was built. Vascular endothelial dysfunction, insulin resistance, placental inflammation, blood-brain barrier compromise \u2014 each traced back to a mouth.",
                },
                {
                  n: "Layer 2",
                  t: "Immune Architecture",
                  d: "Neutrophil extracellular traps, Th17 skew, IL-6 and TNF-\u03B1 amplification loops. Why the oral environment is uniquely capable of producing systemic inflammatory tone.",
                },
                {
                  n: "Layer 3",
                  t: "Microbial Ecology",
                  d: "Keystone pathogens, polymicrobial synergy, dysbiosis as a network-state rather than a species problem. Why antibiotics alone lose, and why the ecological reset is the therapeutic target.",
                },
                {
                  n: "Layer 4",
                  t: "The Mucosal Barrier",
                  d: "Gingival epithelium, junctional epithelium integrity, mucin layers, salivary immunoglobulins. The last line before the blood.",
                },
                {
                  n: "Layer 5",
                  t: "The Hygienist\u2019s Hands",
                  d: "Instrumentation, biofilm disruption, sub-gingival chemotherapeutics, air-polishing, laser-assisted therapy. The mechanical act, now re-framed as systemic medicine.",
                },
                {
                  n: "Layer 6",
                  t: "Measurement and Feedback",
                  d: "Salivary diagnostics, chair-side biosensors, longitudinal tracking, AI-assisted risk stratification, closed-loop patient communication. You leave the program instrumented.",
                },
              ].map((l) => (
                <Reveal key={l.n}>
                  <div className="rounded-2xl border bg-card p-5 shadow-soft">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                      <div className="shrink-0 text-xs font-medium uppercase tracking-wide text-primary w-20">
                        {l.n}
                      </div>
                      <div>
                        <div className="font-semibold tracking-tight">{l.t}</div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {l.d}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Early-interest list (interest only, no fake form) ── */}
        <section id="interest" className="container py-16 sm:py-20 scroll-mt-20">
          <Reveal>
            <div className="rounded-3xl bg-primary/5 border border-primary/10 p-10 sm:p-16">
              <div className="mx-auto max-w-3xl">
                <Badge className="mb-4">Early-interest list</Badge>
                <h2 className="text-3xl font-bold tracking-tight">
                  Be one of the first hygienists in the pilot cohort.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We&rsquo;re building OSCIH and the surrounding hygienist toolkit with
                  real clinicians in real chairs. If you want first access to the
                  curriculum pilot, the chair-side checklists, the patient-handout
                  library, and the live cases &mdash; sign up for an OVN Nexus account.
                  We&rsquo;ll email you when the pilot opens and never spam you in the
                  meantime.
                </p>

                <ul className="mt-6 space-y-2 text-sm">
                  {[
                    "Early access to the Tier 1 Foundations curriculum",
                    "Chair-side risk-communication checklists",
                    "A growing patient-handout library you can hand to a patient before they leave the chair",
                    "Quarterly live case discussions with the Bulletin author and invited faculty",
                    "Notification when COSH (Tier 2) and FIOM (Tier 3) cohorts open",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/signup?audience=hygienist">
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                      Create a free OVN Nexus account <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="mailto:thad@gengyveusa.com?subject=OSCIH%20%E2%80%94%20Hygienist%20interest">
                    <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                      Email Thad directly
                    </Button>
                  </a>
                </div>

                <p className="mt-6 text-xs text-muted-foreground">
                  Free, no payment required. You can delete your account at any time.
                  See our <Link href="/privacy" className="underline">Privacy</Link> and{" "}
                  <Link href="/terms" className="underline">Terms</Link>.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Gengyve small ask ───────────────────────────────── */}
        <section className="container py-16">
          <Reveal>
            <div className="rounded-3xl bg-secondary/60 p-10 sm:p-14 shadow-soft">
              <div className="mx-auto max-w-3xl">
                <Badge variant="secondary" className="mb-3">A small ask</Badge>
                <h2 className="text-2xl font-bold tracking-tight">
                  Try the mouthwash that started all of this.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  OVN Nexus is free and will stay free. The work behind it is supported
                  in part by <strong>Gengyve USA</strong> &mdash; a small,
                  veteran-owned oral-health company building products in the same
                  scientific spirit as this platform. If something on this page has been
                  useful, the most direct way to keep it going is to try a bottle and,
                  if it works for your patients, tell them about it.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://gengyveusa.com/products/gengyve"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                      Try Gengyve Mouthwash <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href="https://gengyveusa.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                      Visit gengyveusa.com <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <p className="mt-5 text-xs text-muted-foreground">
                  Gengyve USA is a separate company from OVN Nexus. Nothing on this page
                  is a product endorsement for any specific therapy for any specific
                  systemic condition.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
