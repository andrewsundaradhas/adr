export default function SectionCounter({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="rounded-tag border border-graphite px-3 py-1 font-mono text-caption text-lichen">
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen/70">{label}</span>
    </div>
  );
}
