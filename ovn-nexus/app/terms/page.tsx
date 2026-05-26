import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { AuthNavButtons } from "@/components/auth-nav-buttons";

export const metadata: Metadata = {
  title: "Terms of Service — OVN Nexus",
  description:
    "Terms governing use of the OVN Nexus research and education platform for clinicians, researchers, and students.",
};

const LAST_UPDATED = "May 25, 2026";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              OVN
            </div>
            <span className="text-xl font-bold">Nexus</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/education" className="text-muted-foreground hover:text-foreground transition-colors">Education</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Bulletin</Link>
            <Link href="/showcase" className="text-muted-foreground hover:text-foreground transition-colors">Showcase</Link>
            <Link href="/music" className="text-muted-foreground hover:text-foreground transition-colors">Music Studio</Link>
            <Link href="/#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link>
          </nav>
          <AuthNavButtons />
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the OVN Nexus
                website at <strong>ovnnexus.com</strong>, the authenticated research portal, the Oral
                Health Bulletin, and related services (collectively, the &ldquo;Service&rdquo;). By
                accessing or using the Service you agree to these Terms. If you do not agree, do not use
                the Service.
              </p>

              <h2>1. Who can use the Service</h2>
              <p>
                The Service is intended for clinicians, researchers, students, and professionals
                interested in the oral-vascular-neural axis. You must be at least 18 years old and able
                to form a binding contract. If you create an account on behalf of an organization, you
                represent that you have authority to bind that organization to these Terms.
              </p>

              <h2>2. Accounts</h2>
              <ul>
                <li>You are responsible for the accuracy of information you provide and for keeping your credentials confidential.</li>
                <li>You are responsible for all activity that occurs under your account.</li>
                <li>Notify us promptly at <a href="mailto:thad@gengyveusa.com">thad@gengyveusa.com</a> of any unauthorized use.</li>
                <li>We may suspend or terminate accounts that violate these Terms or that pose a risk to other users or the Service.</li>
              </ul>

              <h2>3. Research portal and user content</h2>
              <p>
                Authenticated users with research access may submit notes, datasets, patient records,
                biomarker entries, experiments, clinical-trial information, and papers
                (&ldquo;User Content&rdquo;). You retain ownership of your User Content. You grant OVN
                Nexus a worldwide, non-exclusive, royalty-free license to host, store, reproduce, and
                process your User Content solely to operate, secure, and improve the Service for you and
                your authorized collaborators.
              </p>
              <p>You represent and warrant that:</p>
              <ul>
                <li>You have all rights necessary to submit the User Content.</li>
                <li>Any patient or human-subject data you submit has been properly de-identified and uploaded in accordance with applicable law, IRB approvals, and institutional policies.</li>
                <li>Your User Content does not infringe or violate the rights of any third party.</li>
              </ul>

              <h2>4. Acceptable use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Upload identifiable patient information without proper authorization and de-identification.</li>
                <li>Reverse-engineer, scrape, or attempt to gain unauthorized access to the Service or its underlying systems.</li>
                <li>Use the Service to transmit malware, spam, or unlawful content.</li>
                <li>Interfere with the integrity or performance of the Service.</li>
                <li>Use the Service to provide medical advice to patients or to make individual treatment decisions without independent clinical judgment.</li>
              </ul>

              <h2>5. Intellectual property</h2>
              <p>
                The Service, including its software, design, text, graphics, and the Oral Health Bulletin
                content authored by OVN Nexus and its contributors, is owned by OVN Nexus or its
                licensors and is protected by intellectual-property laws. Except for the limited license
                to use the Service, no rights are transferred to you.
              </p>

              <h2>6. Newsletter and communications</h2>
              <p>
                When you subscribe to the Oral Health Bulletin or another mailing list, you consent to
                receive related communications. You may unsubscribe at any time. Operational messages
                related to your account or security may still be sent.
              </p>

              <h2>7. Third-party services</h2>
              <p>
                The Service uses third-party providers including Supabase, Vercel, and Resend. We are not
                responsible for the practices of third-party sites or services linked from the platform
                (e.g., LinkedIn, PubMed, academic publishers).
              </p>

              <h2>8. Medical and research disclaimer</h2>
              <p>
                Content on the Service is provided for professional education and scientific discussion.
                It is not medical advice, does not establish a clinician-patient relationship, and does
                not establish a causal relationship between periodontal disease and any systemic
                condition. Always exercise independent clinical judgment and consult primary literature
                and your institution&rsquo;s policies before making clinical decisions.
              </p>

              <h2>9. Disclaimers</h2>
              <p>
                THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
                WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
                UNINTERRUPTED, ERROR-FREE, OR SECURE.
              </p>

              <h2>10. Limitation of liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, OVN NEXUS AND ITS AFFILIATES WILL NOT BE LIABLE
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
                PROFITS OR DATA, ARISING OUT OF OR RELATED TO THE SERVICE. OUR AGGREGATE LIABILITY FOR
                ANY CLAIM RELATING TO THE SERVICE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US$100) OR
                THE AMOUNT YOU PAID US FOR THE SERVICE IN THE TWELVE MONTHS PRECEDING THE CLAIM,
                WHICHEVER IS GREATER.
              </p>

              <h2>11. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless OVN Nexus, its affiliates, and its personnel
                from any claim, loss, or expense (including reasonable attorneys&rsquo; fees) arising out
                of your use of the Service, your User Content, or your violation of these Terms or
                applicable law.
              </p>

              <h2>12. Termination</h2>
              <p>
                You may stop using the Service at any time and may request account deletion by emailing
                us. We may suspend or terminate your access if you violate these Terms or if we
                discontinue the Service. Sections intended to survive termination (including ownership,
                disclaimers, limitations of liability, and indemnification) will survive.
              </p>

              <h2>13. Governing law</h2>
              <p>
                These Terms are governed by the laws of the State of California, without regard to its
                conflict-of-laws principles. The exclusive venue for any dispute that is not subject to
                arbitration will be the state or federal courts located in San Francisco, California.
              </p>

              <h2>14. Changes to these Terms</h2>
              <p>
                We may update these Terms from time to time. Material changes will be posted on this
                page with a new &ldquo;Last updated&rdquo; date and, where appropriate, communicated by
                email. Your continued use of the Service after the changes take effect constitutes
                acceptance of the updated Terms.
              </p>

              <h2>15. Contact</h2>
              <p>
                Questions about these Terms:{" "}
                <a href="mailto:thad@gengyveusa.com">thad@gengyveusa.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t bg-muted/50 py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                OVN
              </div>
              <div>
                <div className="font-bold text-sm">OVN Nexus</div>
                <div className="text-xs text-muted-foreground">Oral-Vascular-Neural Research Network</div>
              </div>
            </Link>
            <div className="text-center text-sm text-muted-foreground">
              <p className="font-medium">S. Thaddeus Connelly, DDS, MD, PhD, FACS</p>
              <p>UCSF / SFVAMC / GengyeUSA</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/science" className="inline-flex items-center gap-1 text-primary hover:underline">
                Explore the Science <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="text-foreground">Terms</Link>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
            Content on this platform is for professional education. It does not constitute medical
            advice and does not establish a causal relationship between periodontal disease and any
            systemic condition.
          </div>
        </div>
      </footer>
    </div>
  );
}
