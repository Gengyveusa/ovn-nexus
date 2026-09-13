"use client";
import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { briefUrl } from "@/lib/clinical-evidence";

export function ShareBrief() {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(briefUrl); setStatus("copied"); }
    catch { setStatus("manual"); }
  }
  return <div className="share-brief"><button type="button" className="clinical-button secondary" onClick={copy}>{status === "copied" ? <Check size={16} aria-hidden="true" /> : <LinkIcon size={16} aria-hidden="true" />} {status === "copied" ? "Link copied" : "Copy brief link"}</button><span className="sr-only" role="status">{status === "copied" ? "Brief link copied to clipboard." : status === "manual" ? "Select and copy the link below." : ""}</span>{status === "manual" && <label className="share-fallback">Copy this link<input readOnly value={briefUrl} onFocus={event => event.target.select()} /></label>}</div>;
}
