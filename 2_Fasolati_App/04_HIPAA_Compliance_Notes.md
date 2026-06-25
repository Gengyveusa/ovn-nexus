---
title: Fasolati App — HIPAA Compliance Notes
created: 2026-06-24
status: draft
tags: [fasolati-app, HIPAA, compliance, privacy, security, cloudkit]
---

# Fasolati App — HIPAA Compliance Notes

> [!warning] Legal Disclaimer
> These notes are engineering/architecture guidance, not legal advice. A qualified healthcare attorney and HIPAA compliance officer must review before clinical deployment.

> [!note] Related
> [[00_Index_and_Navigation]] | [[02_Data_Model]] | [[03_SciAgent_API_Contract]] | [[05_CloudKit_Architecture]]

## Why HIPAA Applies

The clinician layer of OVNnexus Dashboard handles Protected Health Information (PHI): patient identifiers linked to oral exam findings, biomarker results, and protocol histories. This triggers HIPAA requirements for any system that stores, transmits, or processes that data.

The patient layer (consumer) may also trigger HIPAA if the app is used by or on behalf of a covered entity (dental practice, physician office).

## PHI Definition in This App

PHI = any data that could identify a patient AND relates to their health. In OVNnexus:

| Data | PHI? | Reason |
|------|------|--------|
| Patient name / DOB / contact | Yes | Direct identifier |
| Biomarker values linked to patient | Yes | Health + identifier |
| Oral exam findings | Yes | Health + identifier |
| SciAgent protocol orders | Yes | Health + identifier |
| Three-vector scores | Yes | Health + identifier |
| De-identified research data | No | No re-identification possible |
| Aggregate population statistics | No | No individual linkage |
| Product catalog / reference ranges | No | Not patient-specific |

## Required Safeguards

### Technical Safeguards

- **Encryption at rest:** All PHI stored in CloudKit private zone (AES-256). SwiftData local store encrypted via Data Protection API (complete protection class).
- **Encryption in transit:** TLS 1.3 minimum for all network calls. Certificate pinning on SciAgent endpoint.
- **Access controls:** RBAC — clinician accounts can only access their own patients. Research accounts see de-identified data only.
- **Automatic logoff:** App locks after configurable inactivity period (default: 5 minutes for clinician layer).
- **Audit logs:** All PHI access events logged with timestamp, user, and action. Logs stored in CloudKit, immutable.
- **Unique user identification:** Each clinician has a unique Apple ID / iCloud account. No shared logins.

### Physical Safeguards

- Data lives on Apple infrastructure (CloudKit). Apple's data centers are SOC 2 Type II certified.
- No PHI on local device storage outside of encrypted SwiftData container.
- Remote wipe: If device is lost, CloudKit data is not accessible without Apple ID authentication.

### Administrative Safeguards

- **BAA required:** Apple offers a HIPAA Business Associate Agreement for CloudKit. Must be executed before clinical deployment.
- **BAA required:** SciAgent hosting provider must also sign a BAA.
- **BAA required:** Supabase — if any PHI flows through the Supabase bridge, Supabase must sign a BAA (Supabase does offer HIPAA-eligible plans).
- **Workforce training:** Anyone with access to PHI must complete HIPAA training.
- **Incident response plan:** Must be documented before launch.

## CloudKit HIPAA Posture

Apple supports HIPAA on CloudKit under a BAA. Key points:

- Private zone data is encrypted and accessible only to the authenticated iCloud account holder
- Apple cannot read private zone data
- BAA covers iCloud Drive, CloudKit, and related services
- BAA must be signed through Apple's enterprise agreements (not standard developer account)

> [!warning] Action Required
> Execute Apple BAA before any real patient data enters the system. Development and testing must use synthetic data only.

## SciAgent Endpoint HIPAA Posture

The SciAgent API endpoint must be hosted on HIPAA-eligible infrastructure:

| Option | HIPAA Eligible | BAA Available | Notes |
|--------|---------------|---------------|-------|
| AWS (HIPAA-eligible services) | Yes | Yes | Most common choice |
| Azure (HIPAA-eligible) | Yes | Yes | Strong healthcare tooling |
| Google Cloud (HIPAA) | Yes | Yes | Good ML infrastructure |
| OpenAI API | No | No | Cannot use for PHI |
| Anthropic API | No | No | Cannot use for PHI |

> [!warning] Critical
> If SciAgent is built on OpenAI or Anthropic APIs, the request payload must contain ZERO PHI. Our de-identified DTO approach (patientCode only, relative dates, no names) is designed for this. Confirm de-identification is legally sufficient with counsel.

## De-Identification Strategy

Research data shared from CloudKit to Supabase must be de-identified per HIPAA Safe Harbor (§164.514(b)):

18 identifiers must be removed or generalized, including: names, dates (except year), geographic data below state level, ages >89, and all unique identifiers.

The app's de-identification pipeline:
1. Strip all direct identifiers (name, DOB, contact info)
2. Replace patient ID with research code (UUID, not linked to identity)
3. Convert absolute dates to relative (days since enrollment)
4. Generalize ages to decade buckets (30s, 40s, 50s, etc.)
5. Strip clinic identifiers, replace with clinic code
6. Expert determination review before any dataset is published

## Minimum Necessary Principle

The app must only access and transmit the minimum PHI necessary for the task:

- Patient layer: patient sees only their own data
- Clinician layer: clinician sees only their enrolled patients
- Research layer: sees de-identified data only
- SciAgent requests: de-identified DTOs only (no PII)

## Pre-Launch HIPAA Checklist

- [ ] Apple BAA executed
- [ ] SciAgent hosting BAA executed
- [ ] Supabase BAA executed (if PHI touches Supabase)
- [ ] Privacy policy drafted and reviewed by counsel
- [ ] Terms of service drafted
- [ ] Incident response plan documented
- [ ] Workforce HIPAA training completed
- [ ] Penetration test completed
- [ ] Risk analysis documented (required by HIPAA Security Rule)
- [ ] Audit logging verified end-to-end
- [ ] Automatic logoff tested
- [ ] Data retention and deletion policy documented

---

#fasolati-app #HIPAA #compliance #privacy #security #cloudkit #BAA #PHI