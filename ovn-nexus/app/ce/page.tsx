import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Award, ArrowRight } from "lucide-react";
import { getAllCourseSlugs, getCourse } from "@/lib/ce/loader";

export const metadata: Metadata = {
  title: "Continuing Education — OVN Nexus by Gengyve",
  description:
    "Accredited-track CE / CME on the oral–systemic connection — for dentists, hygienists, and physicians. Evidence-tiered, from a full UCSF professor and the founder of Gengyve.",
};

export default function CeHub() {
  const courses = getAllCourseSlugs().map(getCourse).filter(Boolean);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-aurora">
          <div className="container py-16 sm:py-24 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">Continuing Education · by Gengyve</p>
            <h1 className="mx-auto max-w-3xl text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08] text-balance">
              CE credit for clinicians who take the mouth–body connection{" "}
              <span className="text-primary">seriously.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
              Evidence-tiered, dual-tracked continuing education — dental CE and medical CME — from a full
              UCSF professor and the founder of Gengyve. Rigor, not marketing dressed as science.
            </p>
          </div>
        </section>
        <section className="container py-14">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {courses.map((c) =>
              c ? (
                <Link key={c.slug} href={`/ce/${c.slug}`} className="group rounded-2xl border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift">
                  <div className="flex items-center gap-2 text-primary">
                    <Award className="h-5 w-5" />
                    <span className="text-sm font-semibold">{c.creditHours} CE hours</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">{c.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{c.audience}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Enroll <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
