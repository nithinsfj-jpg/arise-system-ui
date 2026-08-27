const RANKS = [
  { short: "E", full: "E-RANK" },
  { short: "D", full: "D-RANK" },
  { short: "C", full: "C-RANK" },
  { short: "B", full: "B-RANK" },
  { short: "A", full: "A-RANK" },
  { short: "S", full: "S-RANK" },
  { short: "SS", full: "SS-RANK" },
  { short: "NL", full: "NATIONAL LEVEL HUNTER" },
  { short: "SM", full: "SHADOW MONARCH" },
];

export function RankPath({ current = 2 }: { current?: number }) {
  return (
    <div className="relative">
      <div
        className="absolute left-3 right-3 top-[18px] h-px"
        style={{
          background:
            "linear-gradient(90deg, var(--rank), color-mix(in oklab, var(--rank) 60%, var(--rank-deep)), var(--rank-deep))",
          boxShadow: "0 0 10px color-mix(in oklab, var(--rank) 45%, transparent)",
        }}
      />
      <div className="relative flex items-start justify-between gap-1">
        {RANKS.map((r, i) => {
          const t = i / (RANKS.length - 1);
          const tone = `color-mix(in oklab, var(--rank) ${Math.round(100 - t * 78)}%, var(--rank-deep))`;
          const reached = i <= current;
          return (
            <div key={r.short} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div
                className="flex h-9 w-9 rotate-45 items-center justify-center"
                style={{
                  border: `1px solid ${tone}`,
                  background: reached ? `color-mix(in oklab, ${tone} 22%, #02040f)` : "rgba(2,8,20,0.9)",
                  boxShadow: reached ? `0 0 12px ${tone}` : `0 0 6px color-mix(in oklab, ${tone} 25%, transparent)`,
                  opacity: reached ? 1 : 0.55,
                }}
              >
                <span
                  className="num -rotate-45 text-[11px]"
                  style={{ color: tone, textShadow: `0 0 8px ${tone}` }}
                >
                  {r.short}
                </span>
              </div>
              <span className="w-full truncate text-center text-[7px] tracking-widest text-muted-foreground uppercase">
                {r.full}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
