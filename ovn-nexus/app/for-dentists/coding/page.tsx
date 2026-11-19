import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AskAndShop, EditorialNote, GengyveBrandNote } from "@/components/clinical/editorial";
import { codesReviewed, codingUrl, dentalCodes, diagnosisCodes, medicalCodes, type CodeRow } from "@/lib/oral-systemic-codes";

const title = "Coding the oral-systemic conversation | OVN Nexus";
const description = "A reference for dental teams: the CDT, CPT, and ICD-10-CM codes that describe oral-systemic patient education, and what payers usually do with them.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: codingUrl },
  openGraph: { title, description, url: codingUrl, type: "article", images: [{ url: "/clinical-brief-og.png", width: 1200, height: 630, alt: "Oral-systemic science, translated for the dental chair. A clinical brief from OVN Nexus." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/clinical-brief-og.png"] },
};

function CodeTable({ caption, noteHeading, rows }: { caption: string; noteHeading: string; rows: CodeRow[] }) {
  return (
    <div className="code-table-scroll">
      <table className="code-table">
        <caption className="sr-only">{caption}</caption>
        <thead><tr><th scope="col">Code</th><th scope="col">What it describes</th><th scope="col">{noteHeading}</th></tr></thead>
        <tbody>{rows.map(row => <tr key={row.code}><th scope="row">{row.code}</th><td>{row.label}</td><td>{row.note}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default function CodingReference() {
  return <div className="clinical"><SiteHeader active="dentists" /><main id="main-content" className="clinical-wrap">
    <header className="brief-hero"><span className="clinical-eyebrow">The practice conversation / Coding</span><h1>Coding the<br />oral-systemic conversation.</h1><p>You explained how gum health relates to the rest of the body. These are the codes that describe that teaching, and what payers usually do with them.</p><div className="brief-meta"><span>A reference for dentists, hygienists, and billing teams</span><span>Codes checked {codesReviewed}</span></div><div className="clinical-actions"><a href="#dental" className="clinical-button">See the codes <ArrowRight size={17} aria-hidden="true" /></a><Link href="/for-dentists" className="clinical-button secondary">Back to the clinical brief</Link></div></header>
    <section className="brief-takeaways" aria-label="Three coding essentials">
      <article><span>01 / BILLABLE IS NOT PAYABLE</span><h2>A valid code can still be denied.</h2><p>Most dental plans treat education as part of the visit. Report it for an accurate record, and tell patients in advance when a service may be their responsibility.</p></article>
      <article><span>02 / DOCUMENT THE TEACHING</span><h2>Minutes, topics, and who taught.</h2><p>Counseling codes depend on the chart. Record the time spent, what was covered, the patient’s risk factors, and the provider who delivered it.</p></article>
      <article><span>03 / CODE WHAT YOU DID</span><h2>Keep the claim in bounds here too.</h2><p>A code reports a service and a documented condition. It is not a statement that periodontal care prevents a heart attack, a stroke, or dementia.</p></article>
    </section>
    <section className="clinical-section" id="dental"><div className="section-heading"><div><span className="clinical-eyebrow">On the dental claim</span><h2>CDT codes for education<br />and coordination.</h2></div><p>Case management codes are the closest match for oral-systemic teaching. Screening and counseling codes apply when the visit includes them.</p></div><CodeTable caption="CDT codes for oral-systemic patient education" noteHeading="What to expect" rows={dentalCodes} /></section>
    <section className="clinical-section" id="medical"><div className="section-heading"><div><span className="clinical-eyebrow">On the medical claim</span><h2>CPT and HCPCS codes,<br />where cross-coding applies.</h2></div><p>These apply only when the payer accepts the claim and recognizes the rendering provider. Whether a dentist or hygienist qualifies varies by payer and by state.</p></div><CodeTable caption="CPT and HCPCS codes for counseling and education" noteHeading="How it is reported" rows={medicalCodes} /></section>
    <section className="clinical-section" id="diagnosis"><div className="section-heading"><div><span className="clinical-eyebrow">Supporting the claim</span><h2>ICD-10-CM diagnosis codes.</h2></div><p>Medical claims need a diagnosis, and more dental payers now ask for one. Use only the codes the chart supports.</p></div><CodeTable caption="ICD-10-CM diagnosis codes that support counseling" noteHeading="When to use it" rows={diagnosisCodes} /></section>
    <div className="brief-invitation"><div><span className="clinical-eyebrow">Start with the science</span><h2>The clinical brief</h2></div><p>The evidence behind the conversation you are coding: what was studied, what was found, and where the clinical conclusions stop.</p><Link href="/for-dentists" className="clinical-button">Read the clinical brief <ArrowRight size={17} aria-hidden="true" /></Link></div>
    <aside className="editorial-note"><span className="clinical-eyebrow">Before you file a claim</span><p>This page is professional education, not coding, legal, or reimbursement advice. Coverage, provider eligibility, and documentation rules vary by payer and state, and code sets change every year. Confirm each code against the current CDT and CPT manuals and the payer’s policy. Descriptions are plain-language summaries, not official nomenclature. CDT is a registered trademark of the American Dental Association. CPT is a registered trademark of the American Medical Association.</p></aside>
    <AskAndShop /><GengyveBrandNote /><EditorialNote />
  </main><SiteFooter /></div>;
}
