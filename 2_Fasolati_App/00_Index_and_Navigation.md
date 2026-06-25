---
title: Fasolati App — Master Index & Navigation
created: 2026-06-24
status: active
tags: [fasolati-app, MOC, index, navigation, architecture]
---

# Fasolati App — Master Index & Navigation

> [!note] About This Folder
> `2_Fasolati_App` is the canonical home for the OVNnexus Dashboard native app — the iOS/macOS SwiftUI application that sits on top of the Fasolati platform. Everything from architecture decisions to data models to session logs lives here. It is designed to be read in Obsidian and navigated by both the builder (Thad) and the AI co-architect (Claude).

## Vault Map of Contents (MOC)

| # | File | Covers |
|---|------|--------|
| 00 | [[00_Index_and_Navigation]] | This file — master index, folder map, orientation |
| 01 | [[01_Architecture_Overview]] | Three-layer architecture: Research / Clinician / Patient, platform decisions, Apple stack rationale |
| 02 | [[02_Data_Model]] | Canonical data model — Patient, ThreeVectorScore, BiomarkerPanel, SciAgentProtocol, all entities |
| 03 | [[03_SciAgent_API_Contract]] | SciAgent inputs, outputs, confidence scoring, guardrails, on-device vs server-side |
| 04 | [[04_HIPAA_Compliance_Notes]] | PHI handling, BAA requirements, CloudKit vs Supabase HIPAA posture, encryption |
| 05 | [[05_CloudKit_Architecture]] | Sync strategy, private/public/shared zones, schema, entitlements |
| 06 | [[06_Xcode_Project_Setup]] | Xcode 27 beta setup, targets, schemes, SwiftUI project structure, signing |
| 07 | [[07_Roadmap]] | Decided, in progress, open questions, milestone targets |
| 08 | [[08_Session_Log]] | Running log of every build session — decisions, progress, next steps |

## What We Are Building

The **OVNnexus Dashboard** is a native SwiftUI application targeting macOS and iOS (cross-platform) that serves as the primary interface for the Fasolati three-vector health operating system.

Three layers, one codebase:

- **Research / Analytics (heavy)** — macOS-first, dense data, biomarker cohort analysis, SciAgent pattern surfaces, multi-vector inflammatory trend visualization
- **Clinician (medium)** — iPadOS-first, chairside patient three-vector scores, oral exam integration, protocol orders, SciAgent recommendations with reasoning chains
- **Patient (light, sophisticated)** — iOS-first, daily protocol card (rinse / swallow / avoid — today), three-vector trend, SciAgent plain-language explanations, Liquid Glass design

## Relationship to Existing Platform

This app sits on top of the existing OVN Nexus platform. See [[01_OVN_Axis_Framework]] and [[15_Research_Portal_Backend]] for the scientific and data foundation this app consumes.

- Existing backend: Next.js + Supabase (see `1_OVN_Web_Wiki`)
- App data layer: CloudKit (primary) with Supabase bridge for research data
- AI engine: SciAgent (LLM fine-tuned on oral-systemic literature — see [[03_SciAgent_API_Contract]])
- HIPAA: Required — clinician layer touches PHI (see [[04_HIPAA_Compliance_Notes]])

## Tech Stack Decisions (as of 2026-06-24)

| Decision | Choice | Status |
|----------|--------|--------|
| Language | Swift 6.4 | Decided |
| UI Framework | SwiftUI (cross-platform) | Decided |
| IDE | Xcode 27 beta 2 | Decided |
| Target OS | macOS 27 + iOS 27 | Decided |
| Data sync | CloudKit | Decided |
| Backend bridge | Supabase (existing) | Decided |
| AI engine | SciAgent (fine-tuned LLM) | Architecture in progress |
| HIPAA compliance | Required | Open — needs BAA |
| Design language | Liquid Glass (iOS/macOS 27) | Decided |

## Navigation

```
2_Fasolati_App/
├── 00_Index_and_Navigation.md     ← you are here
├── 01_Architecture_Overview.md
├── 02_Data_Model.md
├── 03_SciAgent_API_Contract.md
├── 04_HIPAA_Compliance_Notes.md
├── 05_CloudKit_Architecture.md
├── 06_Xcode_Project_Setup.md
├── 07_Roadmap.md
└── 08_Session_Log.md
```

---

#fasolati-app #ovn-nexus #MOC #index #architecture #swiftui #ios #macos
