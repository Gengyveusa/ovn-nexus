---
title: Fasolati App — SciAgent API Contract
created: 2026-06-24
status: draft
tags: [fasolati-app, sciagent, api, llm, contract, architecture]
---

# Fasolati App — SciAgent API Contract

> [!note] Related
> [[00_Index_and_Navigation]] | [[02_Data_Model]] | [[04_HIPAA_Compliance_Notes]]

## What SciAgent Is

SciAgent is a fine-tuned LLM trained on oral-systemic health literature, Fasolati product pharmacology, and clinical guidelines. It is the reasoning core of the Fasolati Engine.

From the app's perspective, SciAgent is an **API** — the app sends structured patient data in, receives structured protocol outputs with confidence scores and reasoning chains out.

> [!warning] Not On-Device (v1)
> SciAgent v1 runs server-side. On-device inference via Core ML / Apple Intelligence is a v2 consideration. See [[07_Roadmap]].

## API Request Schema

```swift
struct SciAgentRequest: Codable {
    var patientCode: String             // de-identified — never PII in transit
    var requestedFor: Date
    var modelVersion: String?           // nil = latest
    var latestBiomarkers: BiomarkerPanelDTO?
    var latestOralExam: OralExamDTO?
    var recentAdherence: [AdherenceLogDTO]   // last 14 days
    var recentVectorScores: [ThreeVectorScoreDTO] // last 90 days
    var wearableSnapshot: WearableSnapshotDTO?
    var patientRole: PatientRole
    var activeProducts: [String]
    var clinicianOverrides: [String]?
}
```

### DTOs — No PII Ever Leaves the Device

```swift
struct BiomarkerPanelDTO: Codable {
    var collectedDaysAgo: Int           // relative, not absolute date
    var hsCRP: Double?                  // mg/L
    var hba1c: Double?                  // %
    var zonulin: Double?                // ng/mL
    var calprotectin: Double?           // μg/g
    var lpbp: Double?                   // ng/mL
    var nitricOxide: Double?            // μmol/L
}

struct OralExamDTO: Codable {
    var examinedDaysAgo: Int
    var meanPocketDepth: Double
    var bleedingOnProbing: Double
    var biofilmScore: Double
    var periodontitisStage: Int?
    var periImplantitis: Bool
}

struct WearableSnapshotDTO: Codable {
    var averageHRV7Day: Double?
    var averageSleep7Day: Double?
    var averageSteps7Day: Double?
    var source: String
}
```

## API Response Schema

```swift
struct SciAgentResponse: Codable {
    var patientCode: String
    var generatedAt: Date
    var modelVersion: String
    var threeVectorScore: ThreeVectorScoreDTO
    var protocol: SciAgentProtocolDTO
    var overallConfidence: Double       // 0.0–1.0
    var confidenceLevel: String         // "high" | "medium" | "low"
    var dataGaps: [String]
    var flagForClinicianReview: Bool
    var clinicianReviewReason: String?
}

struct SciAgentProtocolDTO: Codable {
    var rinse: [ProtocolItemDTO]
    var swallow: [ProtocolItemDTO]
    var avoid: [ProtocolItemDTO]
    var reasoningChain: String
    var triggeringDataPoints: [String]
    var patientFacingSummary: String
    var clinicianFacingSummary: String
}

struct ProtocolItemDTO: Codable {
    var productName: String
    var action: String
    var frequency: String
    var rationale: String
    var priority: String                // "critical" | "recommended" | "optional"
    var evidenceCitation: String?
}
```

## Confidence Scoring

| Level | Score | Meaning | App Behavior |
|-------|-------|---------|--------------|
| High | 0.8–1.0 | Full panel + recent oral exam + adherence | Show protocol, no flag |
| Medium | 0.5–0.79 | Partial data | Show with "partial data" badge |
| Low | 0.0–0.49 | Minimal data or edge case | Flag for clinician review |

## SciAgent Guardrails (Hard-Coded)

1. **No diagnoses** — protocol recommendations only, never diagnostic conclusions
2. **No medications** — Fasolati products only, never Rx medications
3. **Contraindications** — always override protocol items
4. **Dose limits** — hard-capped at validated product limits
5. **Clinician overrides** — always take precedence over model output
6. **Escalation** — hs-CRP >10 triggers mandatory "consult physician" instruction

## Error Handling

```swift
enum SciAgentError: Error {
    case networkUnavailable      // show last cached protocol
    case modelUnavailable        // retry with exponential backoff
    case insufficientData        // prompt user to add more data
    case patientNotFound
    case versionMismatch
    case rateLimited
}
```

**Offline behavior:** Last successful response cached in encrypted SwiftData store. Shown with "Last updated X days ago" badge.

## Transport Security

- HTTPS / TLS 1.3 only
- No PII in request payload — patientCode is de-identified
- Per-device API key authentication, rotatable
- Certificate pinning on SciAgent endpoint
- Response encrypted at rest in SwiftData

## Open Questions

- [ ] Foundation model choice: GPT-4o fine-tune vs open-weight vs custom
- [ ] Hosting: must be HIPAA-eligible infrastructure
- [ ] Fine-tuning dataset curation plan and version control
- [ ] Rate limiting: consumer vs clinician tier
- [ ] On-device inference (Core ML) feasibility for v2

---

#fasolati-app #sciagent #api #llm #contract #HIPAA #protocol #confidence-scoring