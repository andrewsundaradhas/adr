import type { AnalyzePrescriptionResponse } from "@/lib/api";

export default function DosageChart({ result }: { result: AnalyzePrescriptionResponse }) {
  const withDosage = result.drug_list.filter((d) => d.dosage_ratio !== null);

  if (withDosage.length === 0) {
    return (
      <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
        <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">
          Dosage vs. typical max
        </p>
        <p className="mt-3 text-caption text-lichen/50">
          No dosage could be matched against the reference table for the detected drugs.
        </p>
      </div>
    );
  }

  const maxRatio = Math.max(...withDosage.map((d) => d.dosage_ratio ?? 0), 1.2);

  return (
    <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">
          Dosage vs. typical max
        </p>
        <span className="inline-flex items-center gap-2 font-mono text-caption text-lichen/70">
          <span className="h-1.5 w-1.5 rounded-full bg-status-critical" />
          exceeds typical max
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {withDosage.map((drug) => {
          const ratio = drug.dosage_ratio ?? 0;
          const overMax = ratio > 1;
          const widthPct = Math.min(100, (ratio / maxRatio) * 100);
          return (
            <div key={drug.name} className="grid grid-cols-[9rem_1fr_3.5rem] items-center gap-3">
              <span className="truncate text-caption text-lichen">{drug.name}</span>
              <div className="relative h-2 w-full rounded-[4px] bg-graphite/20">
                <div
                  className="absolute top-0 h-full w-px bg-lichen/40"
                  style={{ left: `${Math.min(100, (1 / maxRatio) * 100)}%` }}
                />
                <div
                  data-tip={`${drug.dosage_mg}mg / ${drug.typical_max_mg}mg typical max`}
                  tabIndex={0}
                  className="h-2 rounded-[4px] outline-none focus-visible:ring-1 focus-visible:ring-bone-white"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: overMax ? "#ea7a68" : "#c9cbbe",
                  }}
                />
              </div>
              <span className="tabular text-right text-caption text-lichen/70">
                {(ratio * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
