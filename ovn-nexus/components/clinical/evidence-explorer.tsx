"use client";

import { useState } from "react";
import { Activity, Brain, Heart, ArrowUpRight } from "lucide-react";
import { evidence } from "@/lib/clinical-evidence";

const icons = [Heart, Activity, Brain];

export function EvidenceExplorer() {
  const [selected, setSelected] = useState(0);
  const item = evidence[selected];
  return (
    <div className="evidence-explorer">
      <div className="evidence-map">
        <div className="map-topline"><span className="clinical-eyebrow">The connection, in context</span><span className="map-key"><i /> Explore a pathway</span></div>
        <div className="map-origin"><span className="origin-orbit" aria-hidden="true"><i /><i /><i /><i /><i /></span><strong>The oral environment</strong><span>Inflammation · microbial signals · host response</span></div>
        <div className="map-branches" aria-hidden="true"><svg viewBox="0 0 600 62" preserveAspectRatio="none"><path d="M300 0 V22 M100 62 V22 H500 V62 M300 22 V62" /></svg></div>
        <div className="map-options" aria-label="Explore the evidence">
          {evidence.map((entry, index) => {
            const Icon = icons[index];
            return <button type="button" key={entry.id} aria-pressed={selected === index} aria-controls="evidence-detail" onClick={() => setSelected(index)}><Icon size={26} aria-hidden="true" /><strong>{entry.short}</strong><span>{index === 2 ? "Preclinical" : "Human studies"}</span></button>;
          })}
        </div>
        <p className="map-caption">A map of research questions. Connecting lines do not establish causation.</p>
      </div>
      <div className="evidence-detail" id="evidence-detail" aria-live="polite" aria-atomic="true">
        <span className="clinical-eyebrow">{item.number} / {item.tier}</span>
        <h3>{item.headline}</h3>
        <p>{item.finding}</p>
        <div className="evidence-limit"><strong>What it does not tell us</strong><p>{item.limit}</p></div>
        <div className="evidence-sources">{item.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div>
      </div>
    </div>
  );
}
