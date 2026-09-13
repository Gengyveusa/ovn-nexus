export const briefUrl = "https://www.ovnnexus.com/for-dentists";
export const guideUrl = "/downloads/ovn-clinical-conversation-guide.pdf";
export const evidenceReviewed = "September 13, 2026";

export const evidence = [
  {
    id: "vascular", number: "01", name: "Heart & vessels", short: "Vascular",
    tier: "Human association + clinical trial", strength: "Clinical evidence",
    headline: "An association worth understanding. An outcome still to prove.",
    finding: "Periodontitis is associated with atherosclerotic cardiovascular disease. A randomized trial of 120 patients found improved endothelial function six months after intensive periodontal treatment.",
    limit: "Endothelial function is an intermediate measure. This does not establish that periodontal treatment prevents heart attacks or strokes.",
    takeaway: "Treat periodontal disease for its established oral benefits. Discuss cardiovascular risk with the patient’s medical team without promising cardiovascular prevention.",
    sources: [
      { label: "AHA scientific statement · 2026", detail: "Tran et al. Periodontal Disease and Atherosclerotic Cardiovascular Disease. Circulation.", url: "https://doi.org/10.1161/CIR.0000000000001390" },
      { label: "Randomized trial · 2007", detail: "Tonetti et al. Treatment of Periodontitis and Endothelial Function. New England Journal of Medicine.", url: "https://doi.org/10.1056/NEJMoa063186" },
    ],
  },
  {
    id: "metabolic", number: "02", name: "Diabetes & gums", short: "Metabolic",
    tier: "Systematic review of clinical trials", strength: "Clinical evidence",
    headline: "A measurable effect, in a defined group of patients.",
    finding: "A Cochrane review found that periodontal treatment reduced HbA1c by an average of 0.43 percentage points at three to four months in people with diabetes and periodontitis, compared with no active treatment or usual care.",
    limit: "The evidence was of moderate certainty. This is an average treatment effect, mainly in type 2 diabetes, not a guaranteed result or a substitute for diabetes care.",
    takeaway: "Coordinate periodontal and diabetes care. The reviewed intervention was professional periodontal treatment; this result is not evidence for a particular mouthwash.",
    sources: [
      { label: "Cochrane review · 2022", detail: "Simpson et al. Treatment of periodontitis for glycaemic control in people with diabetes mellitus. CD004714.", url: "https://doi.org/10.1002/14651858.CD004714.pub4" },
    ],
  },
  {
    id: "neural", number: "03", name: "Brain & vesicles", short: "Neural",
    tier: "Animal and cell models", strength: "Preclinical research",
    headline: "An intriguing mechanism. An open clinical question.",
    finding: "In an experimental study, outer membrane vesicles from P. gingivalis were associated with neuroinflammation, tau changes, and impaired memory in mice. Cell experiments explored possible mechanisms.",
    limit: "Mouse and cell findings do not demonstrate that the same pathway causes dementia in humans, or that oral care prevents or treats Alzheimer’s disease.",
    takeaway: "Use this work to explain a research question. Keep it separate from established clinical benefits when speaking with patients.",
    sources: [
      { label: "Experimental study · 2022", detail: "Gong et al. Porphyromonas gingivalis outer membrane vesicles cause cognitive dysfunction in mice. Frontiers in Cellular and Infection Microbiology.", url: "https://doi.org/10.3389/fcimb.2022.925435" },
    ],
  },
] as const;

export const patientExplanation = "Gum health is part of your overall health. Gum disease is linked with some medical conditions, and treating it protects the tissues that support your teeth. We can coordinate with your medical team, but we cannot promise that dental treatment will prevent heart disease or dementia.";
