import type { AnalyzePrescriptionResponse } from "@/lib/api";

export default function DrugTable({ result }: { result: AnalyzePrescriptionResponse }) {
  if (result.drug_list.length === 0) {
    return (
      <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
        <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">Detected drugs</p>
        <p className="mt-3 text-caption text-lichen/50">No recognized drug names were found in this document.</p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-graphite bg-abyssal-ink p-8">
      <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">
        Detected drugs ({result.drug_list.length})
      </p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="font-mono text-caption uppercase text-lichen/50">
              <th className="pb-3 pr-4 font-normal">Drug</th>
              <th className="pb-3 pr-4 font-normal">Dosage</th>
              <th className="pb-3 pr-4 font-normal">Frequency</th>
              <th className="pb-3 font-normal">Risk class</th>
            </tr>
          </thead>
          <tbody>
            {result.drug_list.map((drug) => (
              <tr key={drug.name} className="hairline-x">
                <td className="py-3 pr-4 text-body text-bone-white">{drug.name}</td>
                <td className="tabular py-3 pr-4 text-body text-lichen">
                  {drug.dosage_mg !== null ? `${drug.dosage_mg} mg` : "—"}
                </td>
                <td className="py-3 pr-4 text-body text-lichen">{drug.frequency ?? "—"}</td>
                <td className="py-3">
                  {drug.high_risk ? (
                    <span className="inline-flex items-center gap-2 font-mono text-caption text-status-critical">
                      <span className="h-1.5 w-1.5 rounded-full bg-status-critical" />
                      narrow index
                    </span>
                  ) : (
                    <span className="font-mono text-caption text-lichen/40">standard</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
