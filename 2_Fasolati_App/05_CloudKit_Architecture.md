---
title: Fasolati App — CloudKit Architecture
created: 2026-06-24
status: draft
tags: [fasolati-app, cloudkit, sync, architecture, swiftdata, zones]
---

# Fasolati App — CloudKit Architecture

> [!note] Related
> [[00_Index_and_Navigation]] | [[02_Data_Model]] | [[04_HIPAA_Compliance_Notes]]

## Overview

CloudKit is the primary sync and persistence layer for OVNnexus. It provides encrypted, Apple-managed cloud storage with automatic device sync, offline support, and (with BAA) HIPAA eligibility.

SwiftData handles the local on-device store. CloudKit sync is enabled via the `modelContainer` configuration — SwiftData and CloudKit are tightly integrated in the Apple 27 stack.

## Zone Architecture

CloudKit has three zone types. OVNnexus uses all three:

```
CloudKit Container: iCloud.com.fasolati.ovnnexus
│
├── Private Database (per user, encrypted)
│   └── com.fasolati.ovnnexus.private
│       ├── Patient records
│       ├── BiomarkerPanels
│       ├── OralExams
│       ├── ThreeVectorScores
│       ├── SciAgentProtocols
│       └── AdherenceLogs
│
├── Shared Database (shared between users)
│   └── com.fasolati.ovnnexus.shared
│       └── Clinic records (shared between clinicians at same practice)
│
└── Public Database (all users, read-only for most)
    └── com.fasolati.ovnnexus.public
        ├── BiomarkerReferenceRanges
        ├── ProductCatalog
        └── SciAgentModelRegistry
```

## SwiftData + CloudKit Setup

```swift
// App entry point
@main
struct OVNnexusApp: App {
    let container: ModelContainer
    
    init() {
        let schema = Schema([
            Patient.self,
            ThreeVectorScore.self,
            BiomarkerPanel.self,
            OralExam.self,
            SciAgentProtocol.self,
            AdherenceLog.self,
            Clinic.self
        ])
        
        let config = ModelConfiguration(
            schema: schema,
            cloudKitDatabase: .private("iCloud.com.fasolati.ovnnexus")
        )
        
        container = try! ModelContainer(
            for: schema,
            configurations: [config]
        )
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .modelContainer(container)
        }
    }
}
```

## Sync Strategy

### Automatic Sync (SwiftData default)
SwiftData + CloudKit sync automatically in the background. No manual sync code required for basic CRUD operations.

### Conflict Resolution
CloudKit uses last-write-wins by default. For OVNnexus:
- **BiomarkerPanel:** Last-write-wins is acceptable (clinician correcting an entry)
- **OralExam:** Last-write-wins (clinician edits)
- **SciAgentProtocol:** Immutable after generation — never overwritten, new record created
- **ThreeVectorScore:** Immutable after computation — append-only
- **AdherenceLog:** Append-only — new record each day

### Offline Behavior
SwiftData writes locally immediately. CloudKit syncs when network is available. The app is fully functional offline — the only degraded experience is SciAgent (requires network for API call, falls back to cached protocol).

## Entitlements Required

In Xcode project → Signing & Capabilities:

```
✅ iCloud
   ✅ CloudKit
      Container: iCloud.com.fasolati.ovnnexus

✅ Push Notifications (required for CloudKit silent push sync)

✅ HealthKit (for wearable data ingestion)
   Read: Heart Rate Variability, Sleep Analysis, Step Count, Active Energy

✅ Background Modes
   ✅ Background fetch
   ✅ Remote notifications (for CloudKit sync triggers)
```

## Data Protection Classes

All local SwiftData files use iOS Data Protection:

| Protection Class | When Accessible | Used For |
|-----------------|-----------------|----------|
| Complete | Only when unlocked | PHI (patient records, biomarkers, exams) |
| CompleteUnlessOpen | After first unlock | App preferences, cached protocols |
| None | Always | No PHI ever |

```swift
// Set in Info.plist
NSFileProtectionComplete // for all PHI containers
```

## Supabase Bridge

Research-tier data (de-identified) flows from CloudKit → Supabase for the analytics layer that feeds the existing web research portal.

```
CloudKit Private (PHI)
        ↓
De-identification pipeline (on-device)
        ↓
CloudKit Shared / Export
        ↓
Supabase Bridge Service (server-side, HIPAA BAA required)
        ↓
Supabase (existing research portal database)
        ↓
OVN Nexus Web Research Portal
```

The bridge service is a separate backend component (not part of the iOS/macOS app). It runs on HIPAA-eligible infrastructure and handles the de-identification verification before writing to Supabase.

## Open Questions

- [ ] CloudKit container identifier: confirm `iCloud.com.fasolati.ovnnexus`
- [ ] Apple BAA scope — confirm CloudKit private zone is covered
- [ ] Supabase bridge service: where does it live? (AWS Lambda, etc.)
- [ ] Shared zone strategy for multi-clinician practices — role-based access design
- [ ] Data retention policy: how long do we keep historical scores/panels?

---

#fasolati-app #cloudkit #sync #swiftdata #architecture #HIPAA #zones