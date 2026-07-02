import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Stethoscope, ArrowRight, Check, Activity, MessageSquareQuote, ClipboardList } from "lucide-react";

export const metadata: Metadata = {
  title: "Dentistry for Doctors — Medical CME · OVN Nexus by Gengyve",
  description:
    "The oral exam and oral–systemic essentials for physicians who were never taught them. An evidence-tiered medical CME course (in development) from a full UCSF professor.",
};

const OBJECTIVES = [
  "Read a periodontal chart as an inflammatory dosimeter — probing depth, bleeding on probing, and radiographic bone loss as a graded exposure variable.",
  "Map periodontal stage (I–IV) to a systemic-exposure reading and a defensible co-management action.",
  "Order and interpret hs-CRP (and IL-6) in co-management, and set an evidence-based expectation for post-therapy change.",
  "Add two intake questions that flag the patients worth pursuing in about ten seconds.",
  "Close the dental–medical loop with a ready consult-letter and a 3–6 month re-measurement.",
  "Speak in tier-matched language — state the associations you can defend, and never overclaim causation.",
];

const MODULES = [
  {
    n: 1,
    title: "The exam you were taught to skip",
    blurb:
      "Why “oropharynx clear” is the one part of the H&P medicine quietly dropped — and what a periodontal exam actually measures.",
  },
  {
    n: 2,
    title: "Reading the mouth as a dosimeter",
    blurb:
      "Probing depth (exposure size), bleeding on probing (active permeability), and bone loss (cumulative chronicity) — a dental chart as a graded inflammatory dose.",
  },
  {
    n: 3,
    title: "Stage → systemic risk → action",
    blurb:
      "The Stage I–IV table mapped to a systemic-exposure reading and a concrete, defensible co-management step for each stage.",
  },
  {
    n: 4,
    title: "Biomarkers in co-management",
    blurb:
      "hs-CRP by the familiar cardiovascular bands (<1 / 1–3 / >3 mg/L) and IL-6 as corroboration — including the honest ~20–30% post-therapy expectation and the non-specificity caveat.",
  },
  {
    n: 5,
    title: "The two-question intake + the loop",
    blurb:
      "“When did you last see a dentist, and do your gums bleed?” The referral trigger, a ready dentist↔PCP consult letter, and the 3–6 month re-measurement that closes the loop.",
  },
  {
    n: 6,
    title: "Saying it right — three cases",
    blurb:
      "Cardiology, geriatric-cognitive, and diabetic vignettes, each run through the evidence-tier filter so you know exactly what you can and cannot tell the patient.",
  },
];

export default function DentistryForDoctors() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-aurora">
          <div className="container py-16 sm:py-24 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
              For physicians · Medical CME (in development)
            </p>
            <h1 className="mx-auto max-w-3xl text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.02] text-balance">
              Dentistry for <span className="line-through decoration-2 opacity-40">Dummies</span>{" "}
              <span className="text-primary">Doctors</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
              You were never taught the oral exam. In an afternoon, this course puts the mouth back in
              your History &amp; Physical — as a cheap, modifiable index of systemic inflammatory exposure
              a colleague down the hall is already collecting.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/ce/foundations-oral-systemic"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                Start the Foundations course <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:thad@gengyveusa.com?subject=Dentistry%20for%20Doctors%20%E2%80%94%20CME%20availability"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Get notified when CME is live
              </a>
            </div>
          </div>
        </section>

        {/* The exam medicine skips */}
        <section className="container py-14">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border bg-card p-8 sm:p-10 shadow-soft">
              <div className="flex items-center gap-2 text-primary">
                <Stethoscope className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">The exam medicine skips</span>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The history and physical is medicine&rsquo;s oldest instrument, and almost every part of it
                survived into modern practice — except the mouth. Most adult H&amp;Ps note
                &ldquo;oropharynx clear&rdquo; and move on. Yet the periodontal exam is the only routine
                examination that directly quantifies a chronic, modifiable, gram-negative infection sitting
                against the systemic circulation.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                The argument is deliberately conservative. We are <strong className="text-foreground">not</strong>{" "}
                asking you to attribute a patient&rsquo;s coronary disease or cognitive decline to their gums.
                We are asking you to treat the periodontal exam as what the evidence supports it being: a{" "}
                <strong className="text-foreground">graded index of systemic inflammatory exposure</strong> —
                cheap, already collected by a colleague, and correlated with markers you already order.
              </p>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="container pb-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold tracking-tight">What you&rsquo;ll be able to do</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {OBJECTIVES.map((o) => (
                <div key={o} className="flex items-start gap-3 rounded-2xl border bg-card p-5 shadow-soft">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="container py-14">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-2 text-primary">
              <ClipboardList className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">The outline</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Six modules, one afternoon</h2>
            <div className="mt-6 space-y-4">
              {MODULES.map((m) => (
                <div key={m.n} className="flex gap-5 rounded-2xl border bg-card p-6 shadow-soft">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                    {m.n}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{m.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{m.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honesty band */}
        <section className="container pb-14">
          <div className="mx-auto max-w-3xl rounded-3xl border bg-secondary/40 p-8 sm:p-10">
            <div className="flex items-center gap-2 text-primary">
              <MessageSquareQuote className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">The honesty rule</span>
            </div>
            <p className="mt-5 text-lg font-medium leading-relaxed">
              Evidence shows periodontal therapy <em>improves inflammatory markers.</em> It does{" "}
              <strong>not</strong> show periodontal therapy <em>prevents heart attacks.</em> This course
              teaches you to say the first and never the second.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="tier-badge tier-established">Established — say it</span>
              <span className="tier-badge tier-supported">Supported — hedge it</span>
              <span className="tier-badge tier-hypothesis">Hypothesis — research only</span>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Every claim in the course is tagged by how strong the evidence actually is. That discipline is
              the whole point — it is what makes this credible clinical education rather than marketing.
            </p>
          </div>
        </section>

        {/* Credential + CTA */}
        <section className="border-t bg-aurora">
          <div className="container py-16 text-center">
            <div className="mx-auto max-w-2xl">
              <Activity className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">Course director</p>
              <p className="mt-1 text-lg font-semibold">S. Thaddeus Connelly, DDS, MD, PhD, FACS</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Full Professor, University of California, San Francisco · founder of the oral–systemic
                platform Gengyve · expert in the oral–systemic connection, pain, cancer, and TMD
              </p>
              <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground">
                &ldquo;Dentistry for Doctors&rdquo; is in development as medical CME. The full nine-lesson
                Foundations course — which this material capstones — is available now.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/ce/foundations-oral-systemic"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
                >
                  Start the Foundations course <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/ce"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  All CE / CME
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
