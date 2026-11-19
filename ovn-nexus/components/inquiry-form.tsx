"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { INQUIRY_RECIPIENT, inquiryRoles, inquiryTopics } from "@/lib/inquiry";
import { currentCampaign } from "@/lib/campaign-attribution";
import styles from "./cohort-interest-form.module.css";

const FALLBACK = "We couldn’t send your question. Please try again, or email Thad below.";

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const feedback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" || status === "error") feedback.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(30000),
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"), role: form.get("role"), topic: form.get("topic"),
          message: form.get("message"), website: form.get("website"), page: window.location.pathname,
          ...currentCampaign(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.error || FALLBACK);
      setStatus("success");
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== "TimeoutError" ? failure.message : FALLBACK);
      setStatus("error");
    }
  }

  if (status === "success") return <div className={styles.success} ref={feedback} tabIndex={-1} role="status">
    <Check size={24} aria-hidden="true" />
    <h3>Your question is on its way to Thad.</h3>
    <p>He reads these himself and will reply to the email address you gave.</p>
  </div>;

  return <form onSubmit={submit} className={styles.form} aria-label="Ask Thad a question" aria-busy={status === "sending"}>
    <fieldset disabled={status === "sending"} className={styles.fields}>
      <div className={styles.field}><label htmlFor="inquiry-name">Your name</label><input id="inquiry-name" name="name" autoComplete="name" required minLength={2} maxLength={120} /></div>
      <div className={styles.field}><label htmlFor="inquiry-email">Email address</label><input id="inquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      <div className={styles.field}><label htmlFor="inquiry-role">I am a</label><select id="inquiry-role" name="role" required defaultValue=""><option value="" disabled>Select one</option>{inquiryRoles.map(role => <option key={role}>{role}</option>)}</select></div>
      <div className={styles.field}><label htmlFor="inquiry-topic">This is about</label><select id="inquiry-topic" name="topic" required defaultValue=""><option value="" disabled>Select a topic</option>{inquiryTopics.map(topic => <option key={topic}>{topic}</option>)}</select></div>
      <div className={styles.field}><label htmlFor="inquiry-message">Your question</label><textarea id="inquiry-message" name="message" rows={4} required minLength={10} maxLength={3000} aria-describedby="inquiry-message-note" /><p id="inquiry-message-note" className={styles.small}>Please leave out patient names and identifying details.</p></div>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="inquiry-website">Leave this field empty</label><input id="inquiry-website" name="website" autoComplete="off" tabIndex={-1} /></div>
      {status === "error" && <div className={styles.error} ref={feedback} tabIndex={-1} role="alert">{error}</div>}
      <button className={styles.button} type="submit">{status === "sending" ? "Sending your question…" : "Send to Thad"}<ArrowRight size={17} aria-hidden="true" /></button>
    </fieldset>
    <p className={styles.small}>Goes to Thad and is used only to reply to you. Prefer email? Write to <a href={`mailto:${INQUIRY_RECIPIENT}?subject=Question%20from%20OVN%20Nexus`}>{INQUIRY_RECIPIENT}</a>. <a href="/privacy">Privacy policy</a>.</p>
    <noscript><p>Please enable JavaScript to use this form, or <a href={`mailto:${INQUIRY_RECIPIENT}?subject=Question%20from%20OVN%20Nexus`}>email Thad</a>.</p></noscript>
  </form>;
}
