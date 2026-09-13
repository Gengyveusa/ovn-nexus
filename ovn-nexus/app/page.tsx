import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EvidenceExplorer } from "@/components/clinical/evidence-explorer";
import { EditorialNote, FounderNote } from "@/components/clinical/editorial";

function SignalFigure() {
  return <figure className="hero-figure"><div className="hero-figure-top"><span>Oral · Vascular · Neural</span><span>Field notes / 01</span></div>
    <svg viewBox="0 0 510 370" role="img" aria-labelledby="signal-title signal-description">
      <title id="signal-title">Exploring connections beyond the mouth</title><desc id="signal-description">An abstract research map of the oral environment and systemic pathways. Dotted lines represent questions under investigation, not proven causation.</desc>
      <defs><radialGradient id="signal-glow"><stop stopColor="#daa17b" stopOpacity=".13"/><stop offset="1" stopColor="#daa17b" stopOpacity="0"/></radialGradient><pattern id="signal-dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#829b83" opacity=".3"/></pattern></defs>
      <rect width="510" height="370" fill="url(#signal-dots)"/>
      <circle cx="210" cy="185" r="168" fill="url(#signal-glow)"/>
      <g fill="none" stroke="#d09b7b"><circle cx="198" cy="185" r="60" strokeWidth="1.2"/><circle cx="198" cy="185" r="91" opacity=".4"/><circle cx="198" cy="185" r="122" opacity=".15"/></g>
      <g fill="#e1a684"><rect x="175" y="150" width="16" height="34" rx="8" transform="rotate(-32 183 167)"/><rect x="209" y="169" width="13" height="28" rx="6.5" transform="rotate(35 215 183)"/><rect x="183" y="202" width="12" height="22" rx="6" transform="rotate(26 189 213)"/><circle cx="217" cy="211" r="6"/><circle cx="165" cy="193" r="4"/><circle cx="207" cy="144" r="3"/></g>
      <g stroke="#9ba98c" fill="none" strokeDasharray="3 5"><path d="M247 145 Q320 70 378 82"/><path d="M259 186 H389"/><path d="M247 222 Q320 298 378 293"/></g>
      <g fill="#e3eadb" stroke="#728c77"><circle cx="395" cy="83" r="18"/><circle cx="405" cy="185" r="18"/><circle cx="395" cy="293" r="18"/></g>
      <g fontFamily="Arial,sans-serif" fill="#dbe4d6" fontSize="10" letterSpacing="1.5"><text x="362" y="121">VASCULAR</text><text x="367" y="226">METABOLIC</text><text x="371" y="334">NEURAL</text><text x="130" y="280" fill="#e0b297">THE ORAL ENVIRONMENT</text></g>
      <g fill="none" stroke="#244743" strokeWidth="1.3"><path d="M387 81 C385 72 395 75 395 79 C396 73 405 75 403 81 Q401 86 395 91 Q389 86 387 81"/><path d="M395 185 H400 L403 178 L407 193 L410 185 H415"/><path d="M390 287 C382 287 384 296 389 296 C387 302 396 302 395 296 V284 C391 281 389 283 390 287 M397 284 C403 280 406 286 402 289 C409 291 405 299 398 298"/></g>
    </svg><figcaption className="hero-figure-caption">Follow the evidence. Keep the open questions visible.</figcaption></figure>;
}

export default function HomePage() {
  return <div className="clinical"><SiteHeader /><main id="main-content" className="clinical-wrap">
    <section className="clinical-hero"><div><span className="clinical-eyebrow">OVN Nexus / Research & clinical education</span><h1>The mouth is<br />part of a<br /><em>bigger story.</em></h1><p className="hero-description">Oral-systemic science, translated for the dental chair. Explore the connections, understand the evidence, and bring a better conversation into your practice.</p><div className="clinical-actions"><Link href="/for-dentists" className="clinical-button">Read the clinical brief <ArrowRight size={17} aria-hidden="true" /></Link><a href="#evidence" className="clinical-button secondary">Explore the evidence</a></div><p className="hero-small">A two-minute introduction. Free to read. No sign-up.</p></div><SignalFigure /></section>
    <div className="clinical-trust"><div><strong>Built around clinical questions</strong>For dentists and their teams</div><div><strong>Sources alongside the science</strong>Human studies and models clearly labeled</div><div><strong>Room for uncertainty</strong>What we know, and what remains open</div></div>
    <section className="clinical-section" id="evidence"><div className="section-heading"><div><span className="clinical-eyebrow">From association to understanding</span><h2>Three connections.<br />Different kinds of evidence.</h2></div><p>“Connected” can mean many things. Select a pathway to see what was studied, what was found, and where the clinical conclusions stop.</p></div><EvidenceExplorer /></section>
    <section className="brief-invitation"><div><span className="clinical-eyebrow">Made for a busy practice</span><h2>Read it today.<br />Discuss it tomorrow.</h2></div><p>The clinical brief puts the essentials in one place, with a patient-friendly explanation and a one-page guide for your next team conversation.</p><Link href="/for-dentists" className="clinical-button">Open the brief <ArrowRight size={17} aria-hidden="true" /></Link></section>
    <FounderNote />
    <div className="resource-grid"><Link href="/science"><span className="clinical-eyebrow">01 / Go deeper</span><h3>The research framework</h3><p>Explore the oral-vascular-neural axis and the hypotheses driving the next questions.</p><ArrowUpRight size={19} aria-hidden="true" /></Link><Link href="/education"><span className="clinical-eyebrow">02 / Keep learning</span><h3>Clinical education</h3><p>Build your understanding through modules on oral-systemic science.</p><ArrowUpRight size={19} aria-hidden="true" /></Link><Link href="/blog"><span className="clinical-eyebrow">03 / Follow the field</span><h3>The Oral Health Bulletin</h3><p>Read perspectives on the research and the questions it raises for practice.</p><ArrowUpRight size={19} aria-hidden="true" /></Link></div>
    <EditorialNote />
  </main><SiteFooter /></div>;
}
