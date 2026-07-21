export interface DrugEntry {
  name: string;
  dosage_mg: number | null;
  frequency: string | null;
  high_risk: boolean;
  typical_max_mg: number | null;
  dosage_ratio: number | null;
}

export interface InteractionEntry {
  drugs: string[];
  severity: number;
  reason: string;
}

export interface AnalyzePrescriptionResponse {
  drug_list: DrugEntry[];
  adr_risk_score: number;
  severity: "Low" | "Moderate" | "High";
  confidence: number;
  prr: number;
  prr_signal: boolean;
  shap_values: Record<string, number>;
  features: Record<string, number>;
  interactions: InteractionEntry[];
  recommendation: string;
  patient_age: number;
  age_estimated: boolean;
  conditions: string[];
  extraction_method: "embedded" | "ocr";
  warnings: string[];
}

export interface ModelInfoResponse {
  model_type: string | null;
  trained_at: string | null;
  metrics: Record<string, number>;
  feature_importances: Record<string, number>;
  training_data: string | null;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, { ...init, cache: "no-store" });
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new ApiError(payload?.detail ?? `Request failed (${response.status}).`, response.status);
  }
  return response.json() as Promise<T>;
}

export function analyzePrescription(file: File): Promise<AnalyzePrescriptionResponse> {
  const form = new FormData();
  form.append("file", file);
  return request<AnalyzePrescriptionResponse>("/analyze-prescription", { method: "POST", body: form });
}

export function fetchModelInfo(): Promise<ModelInfoResponse> {
  return request<ModelInfoResponse>("/model-info");
}
