import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CohortInterestForm } from "@/components/cohort-interest-form";
import styles from "./cohort.module.css";

const title = "Hygienists first. | The first 1840 course at OVN Nexus";
const description =
  "Join the interest list for the first 1840 course: six weeks with Thad Connelly, live case discussions, and clinical conversations you can bring back to your practice.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hygienists-first" },
  openGraph: {
    title,
    description,
    url: "/hygienists-first",
    siteName: "OVN Nexus",
    type: "website",
    images: [{ url: "/hygienists-first-og.png", width: 1200, height: 630, alt: "Hygienists first. The first 1840 course at OVN Nexus." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/hygienists-first-og.png"] },
};

export default function HygienistsFirstPage() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" aria-label="OVN Nexus home" className={styles.brand}>
            <span className={styles.brandMark}>OVN</span>
            <span>
              <span className={styles.brandName}>Nexus</span>
              <span className={styles.brandCaption}>Research &amp; education</span>
            </span>
          </Link>
          <a href="https://letters.undo1840.com" className={styles.letterLink}>
            <span>From the letters at</span> <strong>1840</strong>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main-content" className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="course-title">
          <div className={styles.introduction}>
            <p className={styles.eyebrow}>The first 1840 course · at OVN Nexus</p>
            <h1 id="course-title">Hygienists<br /><em>first.</em></h1>
            <p className={styles.lede}>
              You may have cared for someone for fifteen years. What you’ve
              noticed ought to matter to everyone treating them.
            </p>
            <p className={styles.introBody}>
              I’m putting together a course to help us get that conversation
              going. We’ll work through patient records together, ask better
              questions, and practice bringing what we find back to the team.
            </p>
            <div className={styles.signature}>
              <span className={styles.signatureName}>Thad Connelly</span>
              <span>Oral and maxillofacial surgeon</span>
            </div>
            <a href="#interest" className={styles.primaryLink}>
              I’m interested <ArrowDown size={16} aria-hidden="true" />
            </a>
            <p className={styles.heroNote}>Six weeks together. The first cohort is for hygienists.</p>
          </div>

          <aside id="interest" className={styles.interest} aria-labelledby="interest-title">
            <p className={styles.eyebrow}>The first cohort</p>
            <h2 id="interest-title">Interested in<br />joining us?</h2>
            <p className={styles.interestIntro}>
              Leave your name and we’ll send you the dates and enrollment
              details when they’re ready.
            </p>
            <CohortInterestForm />
          </aside>
        </section>

        <section className={styles.course} aria-labelledby="course-work-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>What we’ll work on</p>
            <h2 id="course-work-title">Bring a question.<br />We’ll start there.</h2>
            <p>
              I want you to bring your experience into the room. Tell me where
              this works in theory and falls apart at eleven on a Thursday.
            </p>
          </div>
          <div className={styles.outline}>
            <article className={styles.outlineItem}>
              <span className={styles.outlineNumber} aria-hidden="true">01</span>
              <div>
                <h3>Read the case together.</h3>
                <p>
                  Live rounds each week with me and guest faculty. We’ll look at
                  de-identified charts and images, compare visits, and discuss
                  what we think is happening—and why we think it.
                </p>
              </div>
            </article>
            <article className={styles.outlineItem}>
              <span className={styles.outlineNumber} aria-hidden="true">02</span>
              <div>
                <h3>Make time for the foundations.</h3>
                <p>
                  Between meetings, eight lessons and a capstone covering the
                  history and examination. We’ll spend time on what a finding
                  tells us, what it doesn’t, and when we need to look again.
                </p>
              </div>
            </article>
            <article className={styles.outlineItem}>
              <span className={styles.outlineNumber} aria-hidden="true">03</span>
              <div>
                <h3>Have the conversation.</h3>
                <p>
                  How do you bring something forward when the dentist has three
                  minutes? What do you say when you’re concerned but not certain?
                  We’ll practice the two-minute report and work out what should
                  happen next.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.details} aria-labelledby="details-title">
          <div>
            <p className={styles.eyebrow}>Before you join</p>
            <h2 id="details-title">The practical details.</h2>
            <p>
              We’re gathering the first group now. Joining the interest list
              doesn’t enroll you in the course or ask you to pay anything.
            </p>
          </div>
          <dl className={styles.detailsList}>
            <div><dt>Format</dt><dd>Six weeks · live online rounds and lessons between meetings</dd></div>
            <div><dt>Dates</dt><dd>To be announced</dd></div>
            <div><dt>Tuition</dt><dd>To be announced</dd></div>
            <div><dt>CE credit</dt><dd>Not yet confirmed. We are pursuing AGD PACE provider approval. We’ll share the exact credit details when available.</dd></div>
          </dl>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div>
            <p className={styles.eyebrow}>A note from Thad</p>
            <h2 id="closing-title">There’s room for your experience here.</h2>
            <p>
              The letters at 1840 opened this conversation. OVN Nexus is where
              we’ll do the work together. Hygienists go first; dentist and
              physician cohorts are planned to follow.
            </p>
            <p>
              If there’s something you’d like to ask me before leaving your
              name, reply to the letter or <a href="mailto:thad@gengyveusa.com?subject=Hygienists%20first%20%E2%80%94%20a%20question">send me a note</a>.
              I’d like to hear from you.
            </p>
            <a href="#interest" className={styles.textLink}>
              Join the interest list <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.disclosure}>
            <h3>About my commercial interests</h3>
            <p>
              I’m involved in oral-health products, including Gengyve. I won’t
              be selling them during the teaching. Any product sessions will be
              separate and clearly labelled, with the evidence and its limits
              made explicit. My products will have to answer the same questions
              as everyone else’s.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© {new Date().getFullYear()} OVN Nexus <span>Research &amp; clinical education</span></p>
          <nav aria-label="Footer navigation">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:thad@gengyveusa.com">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
