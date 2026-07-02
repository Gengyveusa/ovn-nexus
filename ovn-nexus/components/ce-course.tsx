"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Award, ArrowRight, ArrowLeft, CheckCircle2, XCircle, ShoppingBag } from "lucide-react";

type Lesson = {
  slug: string; title: string; subtitle?: string; readingTime?: string;
  objectives: string[]; tiers: string[]; html: string;
};
type QuizQ = { q: string; options: string[]; answer: number; explanation: string };
type Course = {
  slug: string; title: string; subtitle?: string; creditHours: string; audience?: string;
  accreditationStatement: string; director?: string; passThreshold: number;
  quiz: QuizQ[]; evaluation: string[]; lessons: Lesson[];
};

const tierClass = (t: string) => {
  const s = t.toLowerCase();
  return s.startsWith("establ") ? "tier-established" : s.startsWith("supp") ? "tier-supported" : s.startsWith("hypo") ? "tier-hypothesis" : "";
};
const tierLabel = (t: string) => {
  const s = t.toLowerCase();
  return s.startsWith("establ") ? "Established" : s.startsWith("supp") ? "Supported" : s.startsWith("hypo") ? "Hypothesis" : t;
};

type Step = "gate" | "lesson" | "quiz" | "result" | "certificate" | "eval" | "done";

export function CeCourse({ course }: { course: Course }) {
  const [step, setStep] = useState<Step>("gate");
  const [li, setLi] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(course.quiz.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  const score = answers.reduce((n, a, i) => n + (a === course.quiz[i]?.answer ? 1 : 0), 0);
  const pct = course.quiz.length ? score / course.quiz.length : 0;
  const passed = pct >= course.passThreshold;
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  // ── Gate ─────────────────────────────────────────────
  if (step === "gate") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-8 sm:p-12 shadow-soft text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Lock className="h-6 w-6" /></div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Enroll in this CE activity</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          <strong className="text-foreground">{course.creditHours} CE credit hours.</strong> {course.audience}. Unlock the full course, assessment, and certificate.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border p-5 text-left">
            <div className="text-sm font-semibold">Purchase</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">$149</div>
            <div className="mt-1 text-xs text-muted-foreground">One-time · lifetime access + certificate</div>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 text-left">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-primary"><ShoppingBag className="h-4 w-4" /> Included with Gengyve</div>
            <div className="mt-1 text-sm text-muted-foreground">Free for active Gengyve subscribers — the science behind the product.</div>
          </div>
        </div>
        <Button size="lg" className="mt-8 w-full sm:w-auto gap-2" onClick={() => { setStep("lesson"); setLi(0); }}>
          Start (preview access) <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="mt-4 text-xs text-muted-foreground italic">Proof-of-format preview — payment + Gengyve entitlement wire in next. {course.accreditationStatement}</p>
      </div>
    );
  }

  // ── Lessons ──────────────────────────────────────────
  if (step === "lesson") {
    const lesson = course.lessons[li];
    const last = li === course.lessons.length - 1;
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>Lesson {li + 1} of {course.lessons.length}</span>
          <span>{lesson.readingTime}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted mb-8">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((li + 1) / (course.lessons.length + 1)) * 100}%` }} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">{lesson.title}</h1>
        {lesson.subtitle && <p className="mt-3 text-lg text-muted-foreground">{lesson.subtitle}</p>}
        <div className="mt-6 rounded-2xl border bg-secondary/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-3">Learning objectives</p>
          <ul className="space-y-2">
            {lesson.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-primary" /><span>{o}</span></li>
            ))}
          </ul>
          {lesson.tiers?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">{lesson.tiers.map((t) => (<span key={t} className={`tier-badge ${tierClass(t)}`}>{tierLabel(t)}</span>))}</div>
          )}
        </div>
        <div className="mt-8 prose-gengyve" dangerouslySetInnerHTML={{ __html: lesson.html }} />
        <div className="mt-12 flex items-center justify-between">
          <Button variant="ghost" className="gap-2" onClick={() => (li > 0 ? setLi(li - 1) : setStep("gate"))}>
            <ArrowLeft className="h-4 w-4" /> {li > 0 ? "Previous" : "Back"}
          </Button>
          <Button className="gap-2" onClick={() => (last ? (setStep("quiz"), setSubmitted(false)) : setLi(li + 1))}>
            {last ? "Take the assessment" : "Next lesson"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Quiz ─────────────────────────────────────────────
  if (step === "quiz") {
    const allAnswered = answers.every((a) => a >= 0);
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Assessment</h1>
        <p className="mt-2 text-muted-foreground">Answer all {course.quiz.length} questions. {Math.round(course.passThreshold * 100)}% required to pass.</p>
        <div className="mt-8 space-y-8">
          {course.quiz.map((qq, qi) => (
            <div key={qi} className="rounded-2xl border bg-card p-6">
              <p className="font-medium">{qi + 1}. {qq.q}</p>
              <div className="mt-4 space-y-2">
                {qq.options.map((opt, oi) => {
                  const chosen = answers[qi] === oi;
                  const showRight = submitted && oi === qq.answer;
                  const showWrong = submitted && chosen && oi !== qq.answer;
                  return (
                    <button key={oi} disabled={submitted}
                      onClick={() => { const n = [...answers]; n[qi] = oi; setAnswers(n); }}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors ${
                        showRight ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                        : showWrong ? "border-red-400 bg-red-50 dark:bg-red-950/30"
                        : chosen ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${chosen ? "border-primary bg-primary text-primary-foreground" : ""}`}>{String.fromCharCode(65 + oi)}</span>
                      <span>{opt}</span>
                      {showRight && <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" />}
                      {showWrong && <XCircle className="ml-auto h-4 w-4 text-red-600" />}
                    </button>
                  );
                })}
              </div>
              {submitted && <p className="mt-3 text-xs text-muted-foreground"><strong className="text-foreground">Why:</strong> {qq.explanation}</p>}
            </div>
          ))}
        </div>
        {!submitted ? (
          <Button size="lg" className="mt-8" disabled={!allAnswered} onClick={() => { setSubmitted(true); window.scrollTo(0, 0); }}>
            Submit answers
          </Button>
        ) : (
          <div className="mt-8 flex items-center gap-4">
            <Button size="lg" onClick={() => setStep("result")}>See result</Button>
          </div>
        )}
      </div>
    );
  }

  // ── Result ───────────────────────────────────────────
  if (step === "result") {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border bg-card p-10 text-center shadow-soft">
        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${passed ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40" : "bg-amber-100 text-amber-600 dark:bg-amber-950/40"}`}>
          {passed ? <CheckCircle2 className="h-7 w-7" /> : <XCircle className="h-7 w-7" />}
        </div>
        <h1 className="mt-6 text-2xl font-semibold">{passed ? "You passed" : "Not quite — try again"}</h1>
        <p className="mt-2 text-muted-foreground">You scored <strong className="text-foreground">{score}/{course.quiz.length}</strong> ({Math.round(pct * 100)}%). Passing is {Math.round(course.passThreshold * 100)}%.</p>
        <div className="mt-8">
          {passed ? (
            <Button size="lg" className="gap-2" onClick={() => setStep("certificate")}><Award className="h-4 w-4" /> Claim your certificate</Button>
          ) : (
            <Button size="lg" onClick={() => { setAnswers(Array(course.quiz.length).fill(-1)); setSubmitted(false); setStep("quiz"); }}>Retake the assessment</Button>
          )}
        </div>
      </div>
    );
  }

  // ── Certificate ──────────────────────────────────────
  if (step === "certificate") {
    return (
      <div className="mx-auto max-w-3xl">
        {!name ? (
          <div className="mx-auto max-w-md rounded-3xl border bg-card p-8 text-center shadow-soft">
            <Award className="mx-auto h-8 w-8 text-primary" />
            <h1 className="mt-4 text-xl font-semibold">Name for your certificate</h1>
            <input autoFocus placeholder="Full name + credentials" onKeyDown={(e) => { if (e.key === "Enter") setName((e.target as HTMLInputElement).value.trim()); }}
              className="mt-6 w-full rounded-xl border bg-background px-4 py-3 text-center" id="cename" />
            <Button className="mt-4" onClick={() => setName(((document.getElementById("cename") as HTMLInputElement)?.value || "").trim())}>Generate certificate</Button>
          </div>
        ) : (
          <div>
            <div className="ce-certificate rounded-2xl border-2 border-primary/30 bg-card p-10 sm:p-14 text-center shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Certificate of Completion</p>
              <p className="mt-8 text-sm text-muted-foreground">This certifies that</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{name}</p>
              <p className="mt-6 text-sm text-muted-foreground">has successfully completed</p>
              <p className="mt-2 text-xl font-semibold">{course.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{course.subtitle}</p>
              <p className="mt-6 font-mono text-sm">{course.creditHours} continuing-education credit hours</p>
              <div className="mt-10 flex items-end justify-between gap-6 text-left">
                <div>
                  <div className="border-t border-foreground/40 pt-1 text-xs text-muted-foreground">{course.director}</div>
                  <div className="text-[11px] text-muted-foreground">Course Director</div>
                </div>
                <div className="text-right">
                  <div className="border-t border-foreground/40 pt-1 text-xs text-muted-foreground">{dateStr}</div>
                  <div className="text-[11px] text-muted-foreground">Date</div>
                </div>
              </div>
              <p className="mt-8 text-[10px] leading-relaxed text-muted-foreground italic">{course.accreditationStatement}</p>
            </div>
            <div className="mt-6 flex justify-center gap-3 print:hidden">
              <Button variant="outline" onClick={() => window.print()}>Print / Save PDF</Button>
              <Button onClick={() => setStep("eval")}>Continue to evaluation</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Evaluation ───────────────────────────────────────
  if (step === "eval") {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Activity evaluation</h1>
        <p className="mt-2 text-muted-foreground">Required for CE credit. Takes a minute.</p>
        <div className="mt-8 space-y-6">
          {course.evaluation.map((q, i) => (
            <div key={i} className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-medium">{q}</p>
              {q.trim().endsWith("?") ? (
                <textarea className="mt-3 w-full rounded-xl border bg-background p-3 text-sm" rows={3} />
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"].map((opt) => (
                    <label key={opt} className="cursor-pointer rounded-full border px-3 py-1.5 text-xs hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                      <input type="radio" name={`ev${i}`} className="sr-only" /> {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <Button size="lg" className="mt-8" onClick={() => setStep("done")}>Submit evaluation</Button>
      </div>
    );
  }

  // ── Done ─────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-xl rounded-3xl border bg-card p-10 text-center shadow-soft">
      <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
      <h1 className="mt-4 text-2xl font-semibold">All done, {name || "clinician"}.</h1>
      <p className="mt-2 text-muted-foreground">Your certificate is issued and your evaluation is recorded. In the live version, your credit is reported to the accrediting body automatically.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button variant="outline" onClick={() => setStep("certificate")}>View certificate</Button>
        <a href="https://gengyveusa.com" target="_blank" rel="noopener noreferrer"><Button>Shop Gengyve</Button></a>
      </div>
    </div>
  );
}
