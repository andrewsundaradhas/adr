"use client";

import { useEffect, useState } from "react";
import { fetchModelInfo, type ModelInfoResponse } from "@/lib/api";
import { FEATURE_LABELS } from "@/lib/design";

// Sequential single-hue ramp built only from the brand's own neutrals —
// dim (graphite) -> bright (paper) reads as "signal strength" on the dark canvas.
const RAMP = ["#4d5757", "#7d8886", "#9ea59c", "#c9cbbe", "#e7e8e1", "#ffffff"];

function rampColor(t: number): string {
  const idx = Math.round(t * (RAMP.length - 1));
  return RAMP[Math.min(RAMP.length - 1, Math.max(0, idx))];
}

export default function FeatureImportanceChart() {
  const [info, setInfo] = useState<ModelInfoResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchModelInfo()
      .then(setInfo)
      .catch(() => setError(true));
  }, []);

  const entries = Object.entries(info?.feature_importances ?? {}).sort((a, b) => b[1] - a[1]);
  const maxValue = Math.max(...entries.map(([, v]) => v), 0.0001);

  return (
    <div id="model" className="rounded-card border border-graphite bg-abyssal-ink p-8">
      <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">
        Global feature importance
      </p>
      <p className="mt-1 text-caption text-lichen/50">
        How much each feature matters to the model overall, not just this prediction.
      </p>

      {error && <p className="mt-4 text-caption text-status-critical">Could not load model info.</p>}

      {!error && entries.length === 0 && (
        <div className="mt-6 space-y-3" aria-hidden>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded-[4px] bg-graphite/30" />
          ))}
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-6 space-y-3">
          {entries.map(([feature, value]) => {
            const t = value / maxValue;
            const color = rampColor(t);
            return (
              <div key={feature} className="grid grid-cols-[9rem_1fr_3.5rem] items-center gap-3">
                <span className="text-caption text-lichen">{FEATURE_LABELS[feature] ?? feature}</span>
                <div className="h-2 w-full rounded-[4px] bg-graphite/20">
                  <div
                    data-tip={`${(value * 100).toFixed(1)}% of total importance`}
                    tabIndex={0}
                    className="h-2 rounded-[4px] outline-none focus-visible:ring-1 focus-visible:ring-bone-white"
                    style={{ width: `${t * 100}%`, backgroundColor: color }}
                  />
                </div>
                <span className="tabular text-right text-caption text-lichen/70">
                  {(value * 100).toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      )}

      {info?.metrics && (
        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-graphite pt-6 font-mono text-caption text-lichen/60">
          <span>ROC-AUC {info.metrics.roc_auc?.toFixed(3)}</span>
          <span>Accuracy {(info.metrics.accuracy * 100)?.toFixed(1)}%</span>
          <span>Trained on {info.metrics.n_train?.toLocaleString()} samples</span>
        </div>
      )}
    </div>
  );
}
