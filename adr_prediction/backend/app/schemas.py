"""Pydantic response models for the ADR prediction API."""

from typing import Optional

from pydantic import BaseModel


class DrugEntry(BaseModel):
    name: str
    dosage_mg: Optional[float] = None
    frequency: Optional[str] = None
    high_risk: bool = False
    typical_max_mg: Optional[float] = None
    dosage_ratio: Optional[float] = None


class InteractionEntry(BaseModel):
    drugs: list[str]
    severity: float
    reason: str


class AnalyzePrescriptionResponse(BaseModel):
    drug_list: list[DrugEntry]
    adr_risk_score: float
    severity: str
    confidence: float
    prr: float
    prr_signal: bool
    shap_values: dict[str, float]
    features: dict[str, float]
    interactions: list[InteractionEntry]
    recommendation: str
    patient_age: int
    age_estimated: bool
    conditions: list[str]
    extraction_method: str
    warnings: list[str] = []


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_version: Optional[str] = None


class ModelInfoResponse(BaseModel):
    model_type: Optional[str] = None
    trained_at: Optional[str] = None
    metrics: dict[str, float] = {}
    feature_importances: dict[str, float] = {}
    training_data: Optional[str] = None
