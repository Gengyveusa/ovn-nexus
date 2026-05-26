import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy — OVN Nexus",
  description:
    "How OVN Nexus collects, uses, and protects information from researchers and clinicians using the Oral-Vascular-Neural research platform.",
};

const LAST_UPDATED = "May 25, 2026";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <p>
                OVN Nexus (&ldquo;OVN Nexus,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the
                research and education platform at <strong>ovnnexus.com</strong> for clinicians, scientists,
                and students studying the oral-vascular-neural axis. This Privacy Policy explains what
                information we collect, how we use it, and the choices you have. It applies to the public
                website, the authenticated research portal, the Oral Health Bulletin, and related services.
              </p>

              <h2>Information we collect</h2>
              <ul>
                <li>
                  <strong>Account information.</strong> When you create an account, we collect your name,
                  email address, professional affiliation, and any optional credentials you choose to share
                  (e.g., DDS, MD, PhD, research focus).
                </li>
                <li>
                  <strong>Research-portal content.</strong> If you are granted research access, we store the
                  notes, datasets, patient records, biomarker entries, experiments, trials, and papers that
                  you submit. You are responsible for ensuring that any patient-identifying data you upload
                  is properly de-identified and that you have authority to upload it.
                </li>
                <li>
                  <strong>Communications.</strong> We retain emails and messages you send to us, including
                  newsletter sign-ups and support requests.
                </li>
                <li>
                  <strong>Usage data.</strong> Our hosting and analytics providers collect standard log data
                  (IP address, browser, device, pages visited, timestamps) to operate and secure the site.
                </li>
                <li>
                  <strong>Cookies.</strong> We use first-party cookies that are strictly necessary for
                  authentication and session management. We do not use third-party advertising cookies.
                </li>
              </ul>

              <h2>How we use information</h2>
              <ul>
                <li>To operate, secure, and improve the platform.</li>
                <li>To authenticate you and enforce role-based access (e.g., research access, admin).</li>
                <li>To send the Oral Health Bulletin and operational notifications you have requested.</li>
                <li>To respond to questions, support requests, and legal obligations.</li>
                <li>
                  To produce aggregated, de-identified analytics about platform usage and the research it
                  supports.
                </li>
              </ul>

              <h2>How we share information</h2>
              <p>
                We do not sell personal information. We share information only with:
              </p>
              <ul>
                <li>
                  <strong>Service providers</strong> that host and operate the platform on our behalf
                  (e.g., Supabase for authentication and database, Vercel for hosting, Resend for
                  transactional email). These providers process data under contract and only as needed to
                  provide their services.
                </li>
                <li>
                  <strong>Research collaborators</strong> you explicitly designate within the research
                  portal.
                </li>
                <li>
                  <strong>Authorities</strong> when required by law, court order, or to protect the rights,
                  property, or safety of OVN Nexus, our users, or the public.
                </li>
              </ul>

              <h2>Data retention</h2>
              <p>
                We keep account and research-portal data for as long as your account is active and as
                needed to provide the service. You may request deletion of your account and associated
                content at any time by emailing the address below; we will delete or de-identify your data
                within a reasonable period, except where retention is required for legal, security, or
                research-integrity reasons.
              </p>

              <h2>Security</h2>
              <p>
                We use industry-standard safeguards including TLS in transit, encryption at rest by our
                cloud providers, role-based access controls, and audit logging. No method of transmission
                or storage is perfectly secure, so we cannot guarantee absolute security.
              </p>

              <h2>Your choices and rights</h2>
              <ul>
                <li>
                  <strong>Access, correction, deletion.</strong> You can review and update your profile from
                  the portal, and you can request a copy or deletion of your data by emailing us.
                </li>
                <li>
                  <strong>Marketing communications.</strong> You can unsubscribe from the Oral Health
                  Bulletin and other non-essential email at any time using the unsubscribe link or by
                  contacting us. Operational and security messages may still be sent.
                </li>
                <li>
                  <strong>Regional rights.</strong> Depending on your location (e.g., California, EU/EEA,
                  UK), you may have additional rights such as data portability or the right to lodge a
                  complaint with a supervisory authority.
                </li>
              </ul>

              <h2>Children</h2>
              <p>
                OVN Nexus is intended for professional and academic audiences and is not directed to
                children under 13. We do not knowingly collect information from children.
              </p>

              <h2>Research and medical disclaimer</h2>
              <p>
                Content on OVN Nexus is for professional education and scientific discussion. It does not
                constitute medical advice and does not establish a causal relationship between periodontal
                disease and any systemic condition.
              </p>

              <h2>International users</h2>
              <p>
                The platform is operated from the United States. If you access it from outside the U.S.,
                you understand that your information will be transferred to and processed in the United
                States and other jurisdictions where our service providers operate.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be posted on
                this page with a new &ldquo;Last updated&rdquo; date and, where appropriate, communicated by
                email.
              </p>

              <h2>Contact</h2>
              <p>
                Questions or requests: <a href="mailto:thad@gengyveusa.com">thad@gengyveusa.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
