---
title: Fasolati App — Xcode Project Setup
created: 2026-06-24
status: draft
tags: [fasolati-app, xcode, setup, swift, swiftui, targets, schemes]
---

# Fasolati App — Xcode Project Setup

> [!note] Related
> [[00_Index_and_Navigation]] | [[01_Architecture_Overview]] | [[07_Roadmap]]

## Prerequisites

- Xcode 27 beta 2 (build 27A5209h) installed at `/Applications/Xcode-beta.app`
- macOS 26.4 or later (macOS 27 beta recommended for full testing)
- Apple Developer account with iCloud / CloudKit entitlements
- `sudo xcode-select -s /Applications/Xcode-beta.app` run in Terminal
- `sudo xcodebuild -license accept` run in Terminal

## Project Structure

```
OVNnexus/
├── OVNnexus.xcodeproj
├── OVNnexusKit/                    # Shared framework target
│   ├── Models/                     # SwiftData model definitions
│   │   ├── Patient.swift
│   │   ├── ThreeVectorScore.swift
│   │   ├── BiomarkerPanel.swift
│   │   ├── OralExam.swift
│   │   ├── SciAgentProtocol.swift
│   │   ├── AdherenceLog.swift
│   │   └── Clinic.swift
│   ├── Services/
│   │   ├── SciAgentClient.swift    # API client for SciAgent
│   │   ├── CloudKitSync.swift      # Sync utilities
│   │   └── HealthKitBridge.swift   # HealthKit integration
│   ├── DTOs/                       # Data Transfer Objects (de-identified)
│   └── Utilities/
├── OVNnexus-iOS/                   # iOS app target
│   ├── App/
│   │   └── OVNnexusApp.swift
│   ├── Views/
│   │   ├── Patient/                # Patient layer views
│   │   ├── Clinician/              # Clinician layer views (iPad)
│   │   └── Shared/                 # Shared components
│   └── Assets.xcassets
├── OVNnexus-macOS/                 # macOS app target
│   ├── App/
│   │   └── OVNnexusMacApp.swift
│   ├── Views/
│   │   ├── Research/               # Research/Analytics views
│   │   ├── Clinician/              # Clinician views (Mac)
│   │   └── Shared/
│   └── Assets.xcassets
└── OVNnexusTests/
    ├── ModelTests/
    ├── SciAgentClientTests/
    └── ViewTests/
```

## Creating the Project

1. Open Xcode 27 beta
2. File → New → Project
3. Choose **Multiplatform → App**
4. Product Name: `OVNnexus`
5. Team: your Apple Developer team
6. Bundle Identifier: `com.fasolati.ovnnexus`
7. Storage: **SwiftData**
8. Check **Include Tests**

## Adding the Shared Framework Target

1. File → New → Target → **Framework**
2. Name: `OVNnexusKit`
3. Language: Swift
4. Link to both iOS and macOS targets

## Capabilities to Add (Both Targets)

In each target → Signing & Capabilities → + Capability:

```
✅ iCloud
   ✅ CloudKit
      Add container: iCloud.com.fasolati.ovnnexus

✅ HealthKit
   (iOS only — macOS HealthKit is read-only)

✅ Push Notifications

✅ Background Modes
   ✅ Remote notifications
   ✅ Background fetch
```

## Minimum Deployment Targets

| Target | Minimum OS | Reason |
|--------|-----------|--------|
| OVNnexus-iOS | iOS 27.0 | Liquid Glass, latest HealthKit |
| OVNnexus-macOS | macOS 27.0 | Liquid Glass, SwiftData improvements |
| OVNnexusKit | iOS 27.0 / macOS 27.0 | Shared with above |

> [!note] Beta Note
> During development on Xcode 27 beta, set deployment target to macOS 26.4 / iOS 26.0 if you need to test on non-beta hardware. Raise to 27.0 before App Store submission.

## Swift Package Dependencies

Add via File → Add Package Dependencies:

```
None required at project start — the Apple 27 stack (SwiftUI, SwiftData,
CloudKit, HealthKit, Swift Charts) covers all initial needs natively.

Future additions (as needed):
- Supabase Swift SDK (for bridge layer)
- Any analytics SDK (privacy-preserving only)
```

## First Build Verification

After setup, the project should build clean with:

```bash
# From Terminal, after xcode-select points to Xcode-beta
xcodebuild -scheme OVNnexus-iOS -destination 'platform=iOS Simulator,name=iPhone 16 Pro' build
xcodebuild -scheme OVNnexus-macOS build
```

## Schemes

| Scheme | Purpose |
|--------|---------|
| OVNnexus-iOS | iOS simulator + device builds |
| OVNnexus-macOS | macOS builds |
| OVNnexusKit | Framework unit tests |
| OVNnexus-All | Build all targets |

---

#fasolati-app #xcode #setup #swift #swiftui #targets #cloudkit #healthkit