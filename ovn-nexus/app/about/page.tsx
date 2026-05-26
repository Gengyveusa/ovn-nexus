import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, GraduationCap, Stethoscope, FlaskConical, Heart } from "lucide-react";
import { AuthNavButtons } from "@/components/auth-nav-buttons";

export const metadata: Metadata = {
  title: "About — OVN Nexus",
  description:
    "About OVN Nexus and S. Thaddeus Connelly, DDS, MD, PhD, FACS — the clinician-scientist behind the Oral-Vascular-Neural research framework, the Oral Health Bulletin, and Gengyve USA.",
};

export default function AboutPage() {
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
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Bulletin</Link>
            <Link href="/showcase" className="text-muted-foreground hover:text-foreground transition-colors">Showcase</Link>
            <Link href="/music" className="text-muted-foreground hover:text-foreground transition-colors">Music Studio</Link>
            <Link href="/#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link>
            <Link href="/about" className="text-foreground transition-colors">About</Link>
          </nav>
          <AuthNavButtons />
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="mb-4">About</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              A research platform built by a clinician, for clinicians.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              OVN Nexus exists because the mouth-body connection deserves to be studied with
              the same rigor we apply to any other part of medicine — and because the people
              best positioned to move that science forward are the dentists, surgeons,
              physicians, and researchers who see patients every week.
            </p>
          </div>
        </section>

        {/* ── Founder section ──────────────────────────────────── */}
        <section className="border-t bg-muted/50 py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Founder</p>
                <h2 className="mt-2 text-3xl font-bold">S. Thaddeus Connelly, DDS, MD, PhD, FACS</h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Oral &amp; maxillofacial surgeon · Clinician-scientist · San Francisco, California
                </p>
              </div>

              <div className="prose prose-slate max-w-none dark:prose-invert">
                <p>
                  Thad is a practicing oral &amp; maxillofacial surgeon who has spent his career at
                  the intersection of clinical care and basic science. He trained as a dentist and
                  a physician, completed surgical residency, and earned a PhD focused on the
                  biology of the mouth and its connections to the rest of the body. He continues
                  to see patients and operate, and most of what shows up on this platform started
                  as a question he couldn&rsquo;t answer in clinic.
                </p>
                <p>
                  His clinical and academic affiliations include UCSF, the San Francisco VA
                  Medical Center, and Sutter Health. He is a Fellow of the American College of
                  Surgeons. He is also the founder of <strong>Gengyve USA</strong>, a small,
                  disabled-veteran-owned oral-health company building products in the same
                  scientific spirit as this platform, and co-founder of{" "}
                  <a
                    href="https://boutiqueventurepartners.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Boutique Venture Partners
                  </a>
                  , a venture firm supporting early-stage healthcare and technology founders.
                </p>
                <p>
                  He writes <Link href="/blog">The Oral Health Bulletin</Link>, a weekly clinical
                  newsletter on the oral-vascular-neural axis, read by roughly 2,800 clinicians
                  and researchers. The point of the writing — and of OVN Nexus — isn&rsquo;t to
                  overclaim. It&rsquo;s to give the field a careful, evidence-tiered way to talk
                  about what we know, what we suspect, and what we are still testing.
                </p>
              </div>

              {/* Credentials grid */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: GraduationCap, label: "DDS · MD · PhD", sub: "Dentistry, medicine, and basic science" },
                  { icon: Stethoscope, label: "FACS", sub: "Fellow, American College of Surgeons" },
                  { icon: FlaskConical, label: "UCSF / SFVAMC", sub: "Academic and VA clinical affiliations" },
                  { icon: Heart, label: "Gengyve USA · Boutique Venture Partners", sub: "Founder / Co-founder" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                    <c.icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">{c.label}</div>
                      <div className="text-xs text-muted-foreground">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why this platform ─────────────────────────────── */}
        <section className="container py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold">Why OVN Nexus exists</h2>
            <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
              <p>
                Most dental and medical training treats the mouth and the rest of the body as
                separate problems. The literature increasingly suggests they aren&rsquo;t. Oral
                microbes release inflammatory signals that reach the heart, brain, and immune
                system. The question isn&rsquo;t whether the connection exists — it&rsquo;s how
                much of it is causal, how much is modifiable, and what clinicians should
                actually do about it on a Tuesday afternoon.
              </p>
              <p>
                OVN Nexus is the place where that conversation happens. The{" "}
                <Link href="/science">Science section</Link> uses an explicit evidence-tier
                framework — <em>Established</em>, <em>Supported but Not Settled</em>, and{" "}
                <em>Hypothesis Under Test</em> — so readers always know what footing a claim is
                on. The <Link href="/education">Education modules</Link> turn the literature
                into something usable in clinic. The <Link href="/blog">Bulletin</Link> tracks
                the field week by week. And the research portal (for credentialed members)
                lets clinicians actually contribute data and case observations back to the
                community.
              </p>
              <p>
                It is built and maintained by working clinicians. It is intentionally honest
                about what is and isn&rsquo;t known. And it is free to read — the science
                doesn&rsquo;t move forward if it sits behind a paywall.
              </p>
            </div>
          </div>
        </section>

        {/* ── Gengyve CTA ─────────────────────────────────────── */}
        <section className="border-t bg-primary/5 py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <Badge className="mb-4">A small ask</Badge>
              <h2 className="text-3xl font-bold">If this work has been useful, take a look at Gengyve.</h2>
              <div className="prose prose-slate mt-5 max-w-none dark:prose-invert">
                <p>
                  OVN Nexus is free and will stay free. The work behind it — the writing, the
                  research, the platform — is supported in part by{" "}
                  <strong>Gengyve USA</strong>, the oral-health company Thad founded with the
                  same science in mind. The flagship product is a fluoride-free, chlorhexidine-free
                  daily mouthwash built around hyaluronic acid and a short list of natural
                  ingredients, developed for the kind of long-term, low-irritation use that a
                  prescription rinse can&rsquo;t support.
                </p>
                <p>
                  If you&rsquo;ve gotten value from anything on this site — the Bulletin, the
                  education modules, the framework — the most direct way to keep it going is to
                  try a bottle. It&rsquo;s a small, veteran-owned company. Every order genuinely
                  matters.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
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

              <p className="mt-6 text-xs text-muted-foreground">
                Gengyve USA is a separate company from OVN Nexus. Nothing on this platform is a
                product endorsement of any specific therapy for any specific systemic condition.
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <section className="container py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <p className="mt-3 text-muted-foreground">
              Questions, collaborations, corrections, or pushback on the science — all welcome.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:thad@gengyveusa.com">
                <Button variant="outline" size="lg">Email Thad</Button>
              </a>
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Join OVN Nexus <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
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
              <p>UCSF / SFVAMC / Gengyve USA</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/about" className="text-foreground">About</Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
            Content on this platform is for professional education. It does not constitute medical
            advice and does not establish a causal relationship between periodontal disease and any
            systemic condition.
          </div>
        </div>
      </footer>
    </div>
  );
}
