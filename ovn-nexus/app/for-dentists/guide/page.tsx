import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { evidence, evidenceReviewed, guideUrl, patientExplanation } from "@/lib/clinical-evidence";

export const metadata: Metadata = {
  title: "A team conversation about oral-systemic health | OVN Nexus",
  description: "A practical discussion guide for dental teams, with evidence checks, a patient conversation starter, and linked references.",
  alternates: { canonical: "/for-dentists/guide" },
  openGraph: { title: "A team conversation about oral-systemic health", description: "A free discussion guide for dental teams from OVN Nexus.", url: "/for-dentists/guide", images: ["/clinical-brief-og.png"] },
};

export default function TeamGuide() {
  return <div className="clinical clinical-print"><SiteHeader active="dentists" /><main id="main-content" className="clinical-wrap guide-page"><span className="clinical-eyebrow">OVN Nexus / The practice conversation</span><h1>Gum health.<br />Whole-patient thinking.</h1><p>A discussion guide for dental teams. Evidence checked {evidenceReviewed}.</p><div className="clinical-actions"><a href={guideUrl} download className="clinical-button">Download the one-page PDF</a><Link href="/for-dentists" className="clinical-button secondary">Back to the clinical brief</Link></div>
    <section><h2>Start with three evidence checks</h2><ul><li><strong>Association is not causation.</strong> Shared risk factors can help explain relationships between oral and systemic conditions.</li><li><strong>What did the study measure?</strong> Biomarker changes are different from fewer heart attacks or cases of dementia.</li><li><strong>Who—and what—was studied?</strong> Animal findings and periodontal treatment trials do not establish benefits for a commercial rinse.</li></ul></section>
    <section><h2>Ask your team</h2><ul><li>How do we explain the oral-systemic connection without promising an unproven benefit?</li><li>When would coordination with a patient’s medical team help us provide better periodontal care?</li><li>Can we identify the source and the limitation behind each claim in our patient materials?</li></ul></section>
    <section><h2>A patient conversation starter</h2><p>“{patientExplanation}”</p></section>
    <section><h2>Explore the evidence together</h2><ul>{evidence.map(item => <li key={item.id}><strong>{item.name}: </strong>{item.sources.map((source, index) => <span key={source.url}>{index > 0 ? "; " : ""}<a href={source.url} className="underline">{source.label}</a></span>)}</li>)}</ul></section>
    <p className="mt-6 text-xs">Professional education; this guide does not carry CE credit. OVN Nexus is supported in part by Gengyve USA. These studies do not establish benefits for Gengyve products. Academic affiliations do not imply institutional endorsement.</p>
  </main><SiteFooter /></div>;
}
