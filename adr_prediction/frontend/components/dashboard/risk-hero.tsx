import type { AnalyzePrescriptionResponse } from "@/lib/api";
import { SEVERITY_STATUS, formatPercent } from "@/lib/design";
import Meter from "@/components/ui/meter";

export default function RiskHero({ result }: { result: AnalyzePrescriptionResponse }) {
  const status = SEVERITY_STATUS[result.severity] ?? SEVERITY_STATUS.Moderate;

  return (
    <div className="rounded-card-lg border border-graphite bg-abyssal-ink p-10 md:p-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">ADR risk assessment</p>
          <p className="tabular mt-2 text-display-lg text-bone-white md:text-display-xl">
            {formatPercent(result.adr_risk_score)}
          </p>
        </div>
        <span
          data-tip="Predicted probability the model assigns to an adverse drug reaction"
          className="rounded-tag px-4 py-2 font-mono text-caption uppercase tracking-[-0.02em]"
          style={{ backgroundColor: status.hex, color: status.ink }}
        >
          {status.label} risk
        </span>
      </div>

      <div className="mt-8">
        <Meter
          value={result.adr_risk_score}
          max={1}
          color={status.hex}
          height={14}
          ariaLabel="ADR risk score"
          thresholds={[
            { value: 0.33, label: "Low / Moderate" },
            { value: 0.66, label: "Moderate / High" },
          ]}
        />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 border-t border-graphite pt-8 md:grid-cols-4">
        <div>
          <p className="font-mono text-caption uppercase text-lichen/60">Confidence</p>
          <p className="tabular mt-1 text-subheading text-bone-white">{formatPercent(result.confidence)}</p>
        </div>
        <div>
          <p className="font-mono text-caption uppercase text-lichen/60">Patient age</p>
          <p className="tabular mt-1 text-subheading text-bone-white">
            {result.patient_age}
            {result.age_estimated && <span className="ml-1 text-caption text-lichen/50">est.</span>}
          </p>
        </div>
        <div>
          <p className="font-mono text-caption uppercase text-lichen/60">Extraction</p>
          <p className="mt-1 text-subheading capitalize text-bone-white">{result.extraction_method}</p>
        </div>
        <div>
          <p className="font-mono text-caption uppercase text-lichen/60">PRR signal</p>
          <p className="tabular mt-1 text-subheading text-bone-white">
            {result.prr.toFixed(2)}
            {result.prr_signal && <span className="ml-2 text-caption text-status-warning">≥ 2.0</span>}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-card border border-graphite bg-void/40 p-6">
        <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">Recommendation</p>
        <p className="mt-2 text-body-lg text-bone-white">{result.recommendation}</p>
      </div>

      {result.conditions.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {result.conditions.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 font-mono text-caption text-lichen">
              <span className="h-1.5 w-1.5 rounded-full bg-bioluminescent-lime" />
              {c.replace(/_/g, " ").toUpperCase()}
            </span>
          ))}
        </div>
      )}

      {result.warnings.length > 0 && (
        <ul className="mt-6 space-y-1 font-mono text-caption text-status-warning">
          {result.warnings.map((w) => (
            <li key={w}>⚠ {w}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
