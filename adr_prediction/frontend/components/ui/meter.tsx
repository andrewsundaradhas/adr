interface Threshold {
  value: number; // in the same units as `value`/`max`
  label: string;
}

interface Props {
  value: number;
  max: number;
  color: string;
  thresholds?: Threshold[];
  height?: number;
  ariaLabel: string;
}

export default function Meter({ value, max, color, thresholds = [], height = 12, ariaLabel }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      <div
        role="meter"
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="relative w-full overflow-hidden rounded-full"
        style={{ height, backgroundColor: `${color}26` /* ~15% opacity track, same hue as fill */ }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        {thresholds.map((t) => (
          <div
            key={t.label}
            data-tip={t.label}
            className="absolute top-0 h-full w-px bg-abyssal-ink/70"
            style={{ left: `${Math.min(100, (t.value / max) * 100)}%` }}
          />
        ))}
      </div>
      {thresholds.length > 0 && (
        <div className="relative mt-1.5 h-4 font-mono text-caption text-lichen/60">
          {thresholds.map((t) => (
            <span
              key={t.label}
              className="absolute -translate-x-1/2"
              style={{ left: `${Math.min(100, (t.value / max) * 100)}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
