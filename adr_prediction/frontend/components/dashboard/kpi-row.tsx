import type { AnalyzePrescriptionResponse } from "@/lib/api";
import StatTile from "@/components/ui/stat-tile";

export default function KpiRow({ result }: { result: AnalyzePrescriptionResponse }) {
  const highRisk = result.drug_list.filter((d) => d.high_risk).length;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatTile label="Drugs detected" value={String(result.drug_list.length)} />
      <StatTile label="High-risk drugs" value={String(highRisk)} />
      <StatTile label="Conditions noted" value={String(result.conditions.length)} />
      <StatTile label="Interactions found" value={String(result.interactions.length)} />
    </div>
  );
}
