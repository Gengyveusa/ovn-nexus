---
title: Fasolati App — Session Log
created: 2026-06-24
status: active
tags: [fasolati-app, session-log, decisions, progress]
---

# Fasolati App — Session Log

> [!note] Purpose
> This is the shared memory between Thad and Claude. Every build session is logged here — what was decided, what was built, what's next. Start every new session by reading this file.

> [!note] Related
> [[00_Index_and_Navigation]] | [[07_Roadmap]]

---

## Session 001 — 2026-06-24

**Duration:** ~3 hours
**Participants:** Thad Connely, Claude (Sonnet 4.6)
**Starting point:** Concept
**Ending point:** Full architecture documented, repo structured

### What Happened

Started with getting the Apple developer betas:

- **Xcode 27 beta 2** downloaded (18 GB .xip), extracted to Xcode-beta.app in Downloads, moved to /Applications. Terminal commands to run: `sudo xcode-select -s /Applications/Xcode-beta.app` and `sudo xcodebuild -license accept`.
- **macOS 27 beta** (.ipsw downloaded, 21.1 GB, build 26A5368g). Decided NOT to install yet — no external backup drive available, .ipsw is a full wipe. Waiting for public beta (beta.apple.com) which will offer safe in-place upgrade. Public beta for macOS 27 listed as "Coming Soon".

Explored the Fasolati platform at fasolati.live — much more developed than expected. Key findings:
- Existing platform: Next.js + Supabase, already live with research portal, ML risk engine, knowledge graph
- Products: Lytica (phage + enzyme biofilm intervention), Loria (HA-based daily maintenance), gut stack (Magisnat, Biolumen, Monch Monch)
- SciAgent: AI engine with three-layer verification, confidence scoring, explainable reasoning
- Existing ovn-nexus repo (Gengyveusa/ovn-nexus) already has 84 commits and a rich wiki in 1_OVN_Web_Wiki/

### Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| New repo vs existing | Use existing ovn-nexus | Already has 84 commits, rich wiki, active deployments |
| New folder | 2_Fasolati_App | Matches existing numbering convention |
| Language | Swift 6.4 | Native Apple, Xcode 27 |
| UI Framework | SwiftUI | Cross-platform macOS + iOS, single codebase |
| Local persistence | SwiftData | Modern Swift ORM, CloudKit sync built in |
| Cloud sync | CloudKit | HIPAA-eligible with BAA, Apple-native, private zone encryption |
| Backend bridge | Supabase (existing) | Research data stays in existing platform |
| AI engine | SciAgent as API | Server-side v1, on-device v2 consideration |
| Design | Liquid Glass (27 stack) | Native, sophisticated, patient-facing |
| macOS beta install | Wait | No backup drive, public beta safer |

### Architecture Decisions

Three-layer app on one SwiftUI codebase:
1. **Research/Analytics** (macOS-first, heavy) — cohort analysis, biomarker trends, SciAgent population insights
2. **Clinician** (iPadOS-first, medium) — chairside patient management, oral exam entry, protocol orders
3. **Patient** (iOS-first, light/sophisticated) — Today card, three-vector score, SciAgent plain-language

HIPAA applies to clinician layer. CloudKit private zone for all PHI. De-identified bridge to Supabase for research tier.

### Files Created

All 9 files in 2_Fasolati_App/:
- 00_Index_and_Navigation.md ✅
- 01_Architecture_Overview.md ✅
- 02_Data_Model.md ✅
- 03_SciAgent_API_Contract.md ✅
- 04_HIPAA_Compliance_Notes.md ✅
- 05_CloudKit_Architecture.md ✅
- 06_Xcode_Project_Setup.md ✅
- 07_Roadmap.md ✅
- 08_Session_Log.md ✅ (this file)

### What's Next (Session 002)

1. Run the two Terminal commands to complete Xcode setup
2. Create the Xcode project (OVNnexus, Multiplatform, SwiftData)
3. Add OVNnexusKit shared framework target
4. Write the first SwiftData model: Patient.swift
5. Configure CloudKit container
6. Verify build on simulator

### Open Questions Carried Forward

- Where will SciAgent be hosted? (Must be HIPAA-eligible)
- Which foundation model for SciAgent fine-tuning?
- Co-founder / iOS engineer search?
- macOS 27 public beta — when?

---

*Log template for future sessions:*

## Session 00N — YYYY-MM-DD

**Duration:**
**Participants:**
**Starting point:** (what was the state at start)
**Ending point:** (what was the state at end)

### What Happened

### Decisions Made

### Files Created / Modified

### What's Next

### Open Questions Carried Forward

---

#fasolati-app #session-log #decisions #progress