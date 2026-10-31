import { ArrowUpRight } from "lucide-react";
import { CampaignLink } from "@/components/campaign-link";
import { LETTERS, LETTERS_CHOOSER, YOUTUBE_URL } from "@/lib/letters";

/**
 * Subscribe to the letters, from a domain VA networks allow.
 * Each button goes to the real Ghost Portal signup for the site that sends it.
 */
export function LettersSection() {
  return (
    <section className="clinical-section letters-section" id="letters" aria-labelledby="letters-title">
      <div className="section-heading">
        <div>
          <span className="clinical-eyebrow">The letters</span>
          <h2 id="letters-title">Three letters.<br />One surgeon-scientist.</h2>
        </div>
        <p>Free by email. 1840 and The Practice Ledger go out from the same list, so one signup brings both; <a href={LETTERS_CHOOSER}>choose just one</a> any time.</p>
      </div>
      <div className="letters-grid">
        {LETTERS.map((l) => (
          <article key={l.id}>
            <span className="clinical-eyebrow">{l.cadence}</span>
            <h3>{l.name}</h3>
            <p>{l.pitch}</p>
            <p className="letters-audience">For {l.audience.charAt(0).toLowerCase() + l.audience.slice(1)}.</p>
            <div className="letters-actions">
              <CampaignLink href={l.signupUrl} placement={`letters-${l.id}-subscribe`} className="clinical-button">Subscribe</CampaignLink>
              <CampaignLink href={l.readUrl} placement={`letters-${l.id}-read`} className="letters-read">Read <ArrowUpRight size={15} aria-hidden="true" /></CampaignLink>
            </div>
          </article>
        ))}
      </div>
      <p className="letters-watch">The Quantum Distillery is also a video series. <a href={YOUTUBE_URL}>Watch on YouTube</a>.</p>
    </section>
  );
}
