import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function EditorialNote() {
  return <aside className="editorial-note"><span className="clinical-eyebrow">A clear line between science and products</span><p>OVN Nexus is supported in part by Gengyve USA. Its founder, S. Thaddeus Connelly, also founded Gengyve. The studies discussed here evaluate periodontal disease, periodontal treatment, or experimental mechanisms; they do not establish clinical benefits for Gengyve products. Academic affiliations identify the author’s background and do not imply institutional endorsement.</p></aside>;
}

export function FounderNote() {
  return <section className="founder-note" id="community"><div className="founder-monogram" aria-hidden="true">TC<span>DDS · MD · PhD</span></div><div><span className="clinical-eyebrow">Meet the founder</span><h2>A clinician’s curiosity.<br />A scientist’s standard of proof.</h2><p>S. Thaddeus Connelly, DDS, MD, PhD, FACS is an oral and maxillofacial surgeon-scientist and the founder of OVN Nexus. This platform brings clinical questions into conversation with the oral-systemic literature.</p><div className="clinical-inline-links"><Link href="/about">Meet Thad <ArrowUpRight size={16} aria-hidden="true" /></Link><a href="mailto:thad@gengyveusa.com?subject=Question%20about%20the%20OVN%20clinical%20brief">Ask a question <ArrowUpRight size={16} aria-hidden="true" /></a></div></div></section>;
}
