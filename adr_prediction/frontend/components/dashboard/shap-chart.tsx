import type { AnalyzePrescriptionResponse } from "@/lib/api";
import { DIVERGING, FEATURE_LABELS } from "@/lib/design";

export default function ShapChart({ result }: { result: AnalyzePrescriptionResponse }) {
  const entries = Object.entries(result.shap_values);

  if (entries.length === 0) {
    return (
      <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
        <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">Why this score (SHAP)</p>
        <p className="mt-3 text-body text-lichen/60">Explanation unavailable for this prediction.</p>
      </div>
    );
  }

  const sorted = [...entries].sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const maxAbs = Math.max(...sorted.map(([, v]) => Math.abs(v)), 0.0001);

  return (
    <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">Why this score (SHAP)</p>
        <div className="flex items-center gap-4 font-mono text-caption text-lichen/70">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: DIVERGING.positive }} />
            increases risk
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: DIVERGING.negative }} />
            decreases risk
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {sorted.map(([feature, value]) => {
          const widthPct = (Math.abs(value) / maxAbs) * 50;
          const positive = value >= 0;
          const color = positive ? DIVERGING.positive : DIVERGING.negative;
          return (
            <div key={feature} className="grid grid-cols-[9rem_1fr_4.5rem] items-center gap-3">
              <span className="text-caption text-lichen">{FEATURE_LABELS[feature] ?? feature}</span>
              <div className="relative h-4">
                <div className="absolute left-1/2 top-0 h-full w-px bg-graphite" />
                <div
                  data-tip={`${FEATURE_LABELS[feature] ?? feature}: ${value >= 0 ? "+" : ""}${value.toFixed(3)}`}
                  tabIndex={0}
                  className="absolute top-1 h-2 rounded-[4px] outline-none focus-visible:ring-1 focus-visible:ring-bone-white"
                  style={{
                    backgroundColor: color,
                    width: `${widthPct}%`,
                    left: positive ? "50%" : `${50 - widthPct}%`,
                  }}
                />
              </div>
              <span className="tabular text-right text-caption text-lichen/70">
                {value >= 0 ? "+" : ""}
                {value.toFixed(3)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
