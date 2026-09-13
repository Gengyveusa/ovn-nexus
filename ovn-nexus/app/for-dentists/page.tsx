import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EvidenceExplorer } from "@/components/clinical/evidence-explorer";
import { EditorialNote, FounderNote, GengyveBrandNote } from "@/components/clinical/editorial";
import { ShareBrief } from "@/components/clinical/share-brief";
import { briefUrl, evidence, evidenceReviewed, guideUrl, patientExplanation } from "@/lib/clinical-evidence";

const title = "The oral-systemic connection: a clinical brief | OVN Nexus";
const description = "A free, two-minute introduction for dentists: three evidence-based takeaways, an interactive research map, and a one-page team discussion guide.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: briefUrl },
  openGraph: { title, description, url: briefUrl, type: "article", images: [{ url: "/clinical-brief-og.png", width: 1200, height: 630, alt: "Oral-systemic science, translated for the dental chair. A clinical brief from OVN Nexus." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/clinical-brief-og.png"] },
};

export default function DentistBrief() {
  return <div className="clinical"><SiteHeader active="dentists" /><main id="main-content" className="clinical-wrap">
    <header className="brief-hero"><span className="clinical-eyebrow">The clinical brief / For dentists & their teams</span><h1>Oral-systemic science,<br />translated for the dental chair.</h1><p>A useful starting point for the connections your patients ask about—and the conversations worth having with your team.</p><div className="brief-meta"><span>2-minute essentials · optional deeper reading</span><span>Evidence checked {evidenceReviewed}</span></div><div className="clinical-actions"><a href="#essentials" className="clinical-button">Start with the essentials <ArrowRight size={17} aria-hidden="true" /></a><ShareBrief /></div></header>
    <section className="brief-takeaways" id="essentials" aria-label="Three clinical essentials">
      <article><span>01 / START WITH ORAL HEALTH</span><h2>The reason to treat is already here.</h2><p>Periodontal care protects the tissues supporting teeth. Systemic associations add context; they do not replace established oral indications for treatment.</p></article>
      <article><span>02 / KNOW WHAT WAS MEASURED</span><h2>A biomarker is one part of the story.</h2><p>Some trials report changes in endothelial function or glycaemic control. Those results do not establish prevention of heart attacks, stroke, or dementia.</p></article>
      <article><span>03 / KEEP THE CLAIM IN BOUNDS</span><h2>Match the conversation to the evidence.</h2><p>Distinguish human trials from animal models. Findings about periodontal treatment cannot be transferred to a particular mouthwash or ingredient.</p></article>
    </section>
    <section className="clinical-section" id="evidence"><div className="section-heading"><div><span className="clinical-eyebrow">Optional deeper reading</span><h2>Open a connection.<br />See what supports it.</h2></div><p>Each pathway includes the study type, a finding, a limitation, and the original source. The strength of a claim depends on all four.</p></div><EvidenceExplorer />
      <details className="clinical-references"><summary>Read all sources and clinical takeaways</summary><ol>{evidence.map(item => <li key={item.id}><strong>{item.name}: </strong>{item.takeaway}{item.sources.map(source => <span key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.detail} ↗</a></span>)}</li>)}</ol></details>
    </section>
    <section className="brief-quote"><span className="clinical-eyebrow">A patient conversation starter</span><blockquote>“{patientExplanation}”</blockquote><p>Suggested language to adapt to the patient and clinical context.</p></section>
    <section className="clinical-section"><div className="section-heading"><div><span className="clinical-eyebrow">Bring your team into the conversation</span><h2>One page.<br />A better starting point.</h2></div><p>Use the discussion guide at your next team meeting: three evidence checks, practical questions, and the sources to explore together.</p></div><div className="clinical-actions"><a href={guideUrl} className="clinical-button" download>Download the one-page guide <Download size={17} aria-hidden="true" /></a><Link href="/for-dentists/guide" className="clinical-button secondary">Read the guide online</Link></div></section>
    <div className="brief-invitation"><div><span className="clinical-eyebrow">Keep the discussion going</span><h2>What are your patients asking?</h2></div><p>Questions, corrections, and thoughtful disagreement are welcome. Bring a clinical question to Thad and help shape the next brief.</p><a href="mailto:thad@gengyveusa.com?subject=Question%20about%20the%20OVN%20clinical%20brief" className="clinical-button">Ask Thad a question <ArrowRight size={17} aria-hidden="true" /></a></div>
    <div className="brief-invitation"><div><span className="clinical-eyebrow">The business side</span><h2>The Practice Ledger</h2></div><p>Thad&rsquo;s weekly briefing on the business of dentistry: practice economics, DSO intelligence, and the Bench Test, a five-line scorecard that prices dental AI tools against the chair-hour. Free to read.</p><a href="https://ledger.gengyveusa.com/subscribe" target="_blank" rel="noopener noreferrer" className="clinical-button">Subscribe to The Practice Ledger <ArrowRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>
    <FounderNote /><GengyveBrandNote /><EditorialNote />
  </main><SiteFooter /></div>;
}
