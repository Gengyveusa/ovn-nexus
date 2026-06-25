---
title: Fasolati App — Roadmap
created: 2026-06-24
status: active
tags: [fasolati-app, roadmap, milestones, planning]
---

# Fasolati App — Roadmap

> [!note] Related
> [[00_Index_and_Navigation]] | [[08_Session_Log]]

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🔄 | In progress |
| 📋 | Planned |
| ❓ | Open question / decision needed |
| 🚫 | Blocked |

---

## Phase 0 — Foundation (Current)

**Goal:** Get the development environment, repo, and architecture documented before writing app code.

| Task | Status | Notes |
|------|--------|-------|
| Xcode 27 beta 2 installed | ✅ | Build 27A5209h, at /Applications/Xcode-beta.app |
| macOS 27 beta | 📋 | Waiting for public beta (wipe risk without backup) |
| GitHub repo (ovn-nexus) | ✅ | Gengyveusa/ovn-nexus |
| 2_Fasolati_App folder created | ✅ | This folder |
| 00 Index and Navigation | ✅ | |
| 01 Architecture Overview | ✅ | |
| 02 Data Model | ✅ | |
| 03 SciAgent API Contract | ✅ | |
| 04 HIPAA Compliance Notes | ✅ | |
| 05 CloudKit Architecture | ✅ | |
| 06 Xcode Project Setup | ✅ | |
| 07 Roadmap | ✅ | This file |
| 08 Session Log | ✅ | |
| Xcode project created | 📋 | Next session |
| OVNnexusKit framework target | 📋 | Next session |

---

## Phase 1 — Data Layer

**Goal:** SwiftData models compile and sync to CloudKit. No UI yet.

| Task | Status | Notes |
|------|--------|-------|
| Patient.swift | 📋 | Per [[02_Data_Model]] |
| ThreeVectorScore.swift | 📋 | |
| BiomarkerPanel.swift | 📋 | |
| OralExam.swift | 📋 | |
| SciAgentProtocol.swift | 📋 | |
| AdherenceLog.swift | 📋 | |
| Clinic.swift | 📋 | |
| CloudKit container configured | 📋 | Needs Apple Developer account setup |
| ModelContainer setup in App entry | 📋 | |
| Basic CRUD tests passing | 📋 | |
| CloudKit sync verified | 📋 | |

---

## Phase 2 — SciAgent Client

**Goal:** App can send a request to SciAgent and receive a protocol response.

| Task | Status | Notes |
|------|--------|-------|
| SciAgentRequest DTO | 📋 | |
| SciAgentResponse DTO | 📋 | |
| SciAgentClient.swift (URLSession) | 📋 | |
| Mock SciAgent endpoint for dev | 📋 | Need a stub server for testing |
| De-identification pipeline | 📋 | Critical for HIPAA |
| Offline caching of last response | 📋 | |
| Error handling all cases | 📋 | Per [[03_SciAgent_API_Contract]] |
| SciAgent endpoint decision | ❓ | Where is it hosted? |
| Foundation model choice | ❓ | GPT-4o fine-tune vs other |

---

## Phase 3 — Patient Layer (iOS)

**Goal:** A patient can see their Today card and three-vector score.

| Task | Status | Notes |
|------|--------|-------|
| TodayCardView | 📋 | Rinse / Swallow / Avoid |
| ThreeVectorScoreView (phone) | 📋 | Liquid Glass cards |
| SciAgentExplanationView | 📋 | Plain language reasoning |
| BiomarkerLogView | 📋 | Manual entry |
| HealthKit integration | 📋 | HRV, sleep, steps |
| Widget (home screen) | 📋 | Today score |
| Apple Watch complication | 📋 | Protocol status |
| Notification system | 📋 | Protocol reminders |

---

## Phase 4 — Clinician Layer (iPadOS)

**Goal:** A clinician can manage patients, enter oral exams, and view SciAgent protocols.

| Task | Status | Notes |
|------|--------|-------|
| PatientListView (split left) | 📋 | |
| PatientDetailView (split right) | 📋 | Three-vector + history |
| OralExamEntryView | 📋 | Pocket depths, BOP, biofilm |
| Apple Pencil annotation | 📋 | Oral diagram |
| BiomarkerInputView | 📋 | Lab result entry |
| SciAgentProtocolPanelView | 📋 | With reasoning chain |
| ReferralNotesView | 📋 | SciAgent-drafted summary |
| HIPAA audit logging | 📋 | All PHI access events |

---

## Phase 5 — Research Layer (macOS)

**Goal:** Researchers can analyze cohort data and surface SciAgent population insights.

| Task | Status | Notes |
|------|--------|-------|
| CohortDashboardView | 📋 | Multi-patient grid |
| BiomarkerTrendExplorer | 📋 | Swift Charts multi-series |
| RiskRadarView | 📋 | CVD/neuro/metabolic |
| SciAgentInsightPanel | 📋 | Population patterns |
| Supabase bridge read views | 📋 | Experiment/trial registries |
| Export (CSV/PDF) | 📋 | Publication workflows |
| Multiple windows | 📋 | macOS-native |

---

## Open Questions

| Question | Priority | Notes |
|----------|---------|-------|
| SciAgent hosting (HIPAA) | 🔴 Critical | Blocks Phase 2 |
| Foundation model choice | 🔴 Critical | Blocks Phase 2 |
| Apple BAA execution | 🔴 Critical | Blocks real patient data |
| macOS 27 upgrade path | 🟡 Medium | Public beta coming |
| Co-founder / iOS engineer | 🟡 Medium | Solo currently |
| Supabase bridge design | 🟡 Medium | Needed for Phase 5 |
| App Store submission strategy | 🟢 Low | Phase 5+ concern |

---

#fasolati-app #roadmap #milestones #planning #phases