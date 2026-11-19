// Codes a dental team may use when teaching patients about oral-systemic health.
// Labels are plain-language summaries, not official CDT or CPT nomenclature.
// Review each January (CDT, CPT) and each October (ICD-10-CM).

export const codingUrl = "https://www.ovnnexus.com/for-dentists/coding";
export const codesReviewed = "November 18, 2026";

export interface CodeRow {
  code: string;
  label: string;
  note: string;
}

export const dentalCodes: CodeRow[] = [
  { code: "D9994", label: "Case management: patient education to improve oral health literacy", note: "The closest fit for oral-systemic teaching. Rarely reimbursed; useful for tracking and patient-pay." },
  { code: "D9993", label: "Case management: motivational interviewing", note: "Must be distinct from routine hygiene instruction. Rarely reimbursed." },
  { code: "D9992", label: "Case management: care coordination", note: "Coordinating care with the patient’s physician or other providers." },
  { code: "D9311", label: "Consultation with a medical health care professional", note: "The dentist confers with a medical provider about the patient’s care." },
  { code: "D1330", label: "Oral hygiene instructions", note: "Most plans treat it as part of the prophylaxis or periodontal visit." },
  { code: "D1310", label: "Nutritional counseling for control of dental disease", note: "Fits diet and diabetes discussions. Paid more often by Medicaid programs than by commercial plans." },
  { code: "D1320", label: "Tobacco counseling for control and prevention of oral disease", note: "Record the minutes and the content of the counseling." },
  { code: "D1321", label: "Counseling on the oral, behavioral, and systemic effects of high-risk substance use", note: "Covers vaping, cannabis, opioids, and similar exposures." },
  { code: "D0601–D0603", label: "Caries risk assessment: low, moderate, or high", note: "A documented risk level supports the need for counseling." },
  { code: "D0411", label: "In-office HbA1c test", note: "Pairs with diabetes and periodontitis education. Check your state’s scope-of-practice and CLIA rules." },
  { code: "D0412", label: "In-office blood glucose test", note: "Same considerations as D0411." },
  { code: "D0417 / D0418", label: "Saliva sample collection / analysis", note: "For salivary testing when it informs the conversation." },
];

export const medicalCodes: CodeRow[] = [
  { code: "99401–99404", label: "Preventive medicine counseling, individual", note: "Time-based: about 15, 30, 45, or 60 minutes." },
  { code: "99411–99412", label: "Preventive medicine counseling, group", note: "About 30 or 60 minutes." },
  { code: "99406 / 99407", label: "Tobacco cessation counseling", note: "3 to 10 minutes, or more than 10 minutes." },
  { code: "98960–98962", label: "Self-management education by a qualified non-physician", note: "Per 30 minutes, for one patient, 2 to 4, or 5 to 8. Requires a standardized curriculum." },
  { code: "S9445 / S9446", label: "Patient education by a non-physician, individual or group", note: "Recognized by some commercial payers; not by Medicare." },
  { code: "96160", label: "Patient-focused health risk assessment instrument", note: "A scored, standardized questionnaire." },
  { code: "83036 / 83037", label: "HbA1c, laboratory or point-of-care device", note: "The medical-claim counterpart to D0411." },
];

export const diagnosisCodes: CodeRow[] = [
  { code: "E11.630", label: "Type 2 diabetes mellitus with periodontal disease", note: "Links the periodontal finding to the medical condition." },
  { code: "E10.630", label: "Type 1 diabetes mellitus with periodontal disease", note: "As above, for type 1 diabetes." },
  { code: "K05.–", label: "Gingivitis and periodontal diseases", note: "Code to the highest specificity the chart supports." },
  { code: "Z71.3", label: "Dietary counseling and surveillance", note: "Supports nutritional counseling." },
  { code: "Z71.6", label: "Tobacco abuse counseling", note: "Pair with Z72.0 or a nicotine dependence code (F17.2–)." },
  { code: "Z71.89", label: "Other specified counseling", note: "When no more specific counseling code applies." },
  { code: "Z72.0", label: "Tobacco use", note: "Use when dependence is not documented." },
  { code: "Z91.841–Z91.843", label: "Risk for dental caries: low, moderate, or high", note: "Mirrors the caries risk assessment." },
  { code: "Z13.84", label: "Encounter for screening for dental disorders", note: "For screening encounters." },
];
