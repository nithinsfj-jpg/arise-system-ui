export function FatigueGauge({ value, max = 8 }: { value: number; max?: number }) {
  const size = 44;
  const r = 16;
  const c = size / 2;
  const segs = Array.from({ length: max });
  return (
    <div className="flex shrink-0 flex-col items-center leading-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={c} cy={c} r={r - 6} fill="none" stroke="var(--system-dim)" strokeWidth="1" />
        {segs.map((_, i) => {
          const active = i < value;
          const a = (i / max) * Math.PI * 2 - Math.PI / 2;
          const gap = 0.16;
          const a2 = ((i + 1 - gap) / max) * Math.PI * 2 - Math.PI / 2;
          const x1 = c + r * Math.cos(a);
          const y1 = c + r * Math.sin(a);
          const x2 = c + r * Math.cos(a2);
          const y2 = c + r * Math.sin(a2);
          const tone = active ? "var(--warn)" : "var(--system)";
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              stroke={tone}
              strokeOpacity={active ? 1 : 0.35}
              strokeWidth="4"
              fill="none"
              style={active ? { filter: `drop-shadow(0 0 4px ${tone})` } : undefined}
            />
          );
        })}
      </svg>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[9px] font-bold tracking-widest text-system sys-glow-soft">FATIGUE:</span>
        <span className="num text-xs text-foreground">{value}</span>
      </div>
    </div>
  );
}
