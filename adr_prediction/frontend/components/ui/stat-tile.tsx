interface Props {
  label: string;
  value: string;
  hint?: string;
}

export default function StatTile({ label, value, hint }: Props) {
  return (
    <div className="rounded-card border border-graphite/60 bg-abyssal-ink p-6">
      <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">{label}</p>
      <p className="tabular mt-2 text-heading-sm text-bone-white">{value}</p>
      {hint && <p className="mt-1 text-caption text-lichen/70">{hint}</p>}
    </div>
  );
}
