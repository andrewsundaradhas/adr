import type { AnalyzePrescriptionResponse } from "@/lib/api";

export default function InteractionChart({ result }: { result: AnalyzePrescriptionResponse }) {
  if (result.interactions.length === 0) {
    return (
      <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
        <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">
          Drug-drug interactions
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-body text-bioluminescent-lime">
          <span className="h-1.5 w-1.5 rounded-full bg-bioluminescent-lime" />
          No known dangerous interactions detected among identified drugs.
        </p>
      </div>
    );
  }

  const sorted = [...result.interactions].sort((a, b) => b.severity - a.severity);

  return (
    <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
      <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">
        Drug-drug interactions ({sorted.length})
      </p>

      <div className="mt-6 space-y-5">
        {sorted.map((interaction) => {
          const opacity = 0.45 + interaction.severity * 0.55;
          return (
            <div key={interaction.drugs.join("+")}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-body text-bone-white">{interaction.drugs.join(" + ")}</span>
                <span className="tabular font-mono text-caption text-lichen/70">
                  severity {interaction.severity.toFixed(2)}
                </span>
              </div>
              <div
                data-tip={interaction.reason}
                tabIndex={0}
                className="mt-2 h-2 rounded-[4px] outline-none focus-visible:ring-1 focus-visible:ring-bone-white"
                style={{
                  width: `${interaction.severity * 100}%`,
                  backgroundColor: `rgba(234, 122, 104, ${opacity})`,
                }}
              />
              <p className="mt-1.5 text-caption text-lichen/60">{interaction.reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
