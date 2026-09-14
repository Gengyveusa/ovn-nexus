"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { COHORT_CONSENT, COHORT_SUCCESS, cohortAttribution, professions } from "@/lib/cohort-interest";
import styles from "./cohort-interest-form.module.css";

export function CohortInterestForm() {
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
      const response = await fetch("/api/cohort-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(60000),
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"), profession: form.get("profession"),
          question: form.get("question"), website: form.get("website"), consent: form.get("consent") === "on",
          ...cohortAttribution(window.location.search),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.error || "We couldn’t confirm your signup. Please try again.");
      setStatus("success");
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== "TimeoutError" ? failure.message : "We couldn’t confirm your signup. Please try again, or email Thad below.");
      setStatus("error");
    }
  }

  if (status === "success") return <div className={styles.success} ref={feedback} tabIndex={-1} role="status">
    <Check size={24} aria-hidden="true" />
    <h3>Thanks for putting your name down.</h3>
    <p>{COHORT_SUCCESS}</p>
    <p className={styles.small}>This is an expression of interest. You haven’t enrolled or committed to a payment.</p>
  </div>;

  return <form onSubmit={submit} className={styles.form} aria-label="Course interest form" aria-busy={status === "sending"}>
    <fieldset disabled={status === "sending"} className={styles.fields}>
      <div className={styles.field}><label htmlFor="cohort-name">Your name</label><input id="cohort-name" name="name" autoComplete="name" required minLength={2} maxLength={120} /></div>
      <div className={styles.field}><label htmlFor="cohort-email">Email address</label><input id="cohort-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      <div className={styles.field}><label htmlFor="cohort-profession">Profession</label><select id="cohort-profession" name="profession" required defaultValue=""><option value="" disabled>Select your profession</option>{professions.map(profession => <option key={profession}>{profession}</option>)}</select></div>
      <div className={styles.field}><label htmlFor="cohort-question">What would you like us to work through? <span>(optional)</span></label><textarea id="cohort-question" name="question" rows={3} maxLength={2000} aria-describedby="cohort-question-note" /><p id="cohort-question-note" className={styles.small}>Please leave out patient names and identifying details.</p></div>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="cohort-website">Leave this field empty</label><input id="cohort-website" name="website" autoComplete="off" tabIndex={-1} /></div>
      <label className={styles.consent}><input type="checkbox" name="consent" required /><span>{COHORT_CONSENT}</span></label>
      {status === "error" && <div className={styles.error} ref={feedback} tabIndex={-1} role="alert">{error}</div>}
      <button className={styles.button} type="submit">{status === "sending" ? "Saving your interest…" : "Keep me posted"}<ArrowRight size={17} aria-hidden="true" /></button>
    </fieldset>
    <p className={styles.small}>Course updates only. You can leave the list by <a href="mailto:thad@gengyveusa.com?subject=Remove%20me%20from%20the%201840%20course%20interest%20list">emailing Thad</a>. <a href="/privacy">Privacy policy</a>.</p>
    <noscript><p>Please enable JavaScript to use this form, or <a href="mailto:thad@gengyveusa.com?subject=1840%20hygienist%20course%20interest">email Thad to express interest</a>.</p></noscript>
  </form>;
}
