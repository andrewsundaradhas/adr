export const FEATURE_LABELS: Record<string, string> = {
  age: "Patient age",
  drug_count: "Drug count",
  condition_count: "Conditions",
  high_risk_drug_count: "High-risk drugs",
  max_dosage_ratio: "Max dosage ratio",
  interaction_score: "Interaction score",
  polypharmacy: "Polypharmacy",
};

export const SEVERITY_STATUS = {
  Low: { label: "Low", hex: "#b8df55", ink: "#101313" },
  Moderate: { label: "Moderate", hex: "#f4c76a", ink: "#101313" },
  High: { label: "High", hex: "#ef7878", ink: "#101313" },
} as const;

export const DIVERGING = { negative: "#ef7878", positive: "#b8df55" };

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
