import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "system" | "warn" | "rank";

const toneVar: Record<Tone, string> = {
  system: "var(--system)",
  warn: "var(--warn)",
  rank: "var(--rank)",
};

function Bracket({ pos, color }: { pos: "tl" | "tr" | "bl" | "br"; color: string }) {
  const base = "pointer-events-none absolute h-4 w-4 border-[1.5px] border-transparent";
  const map = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "left-0 bottom-0 border-l border-b",
    br: "right-0 bottom-0 border-r border-b",
  } as const;
  return (
    <span
      className={cn(base, map[pos])}
      style={{ borderColor: color, boxShadow: `0 0 10px color-mix(in oklab, ${color} 70%, transparent)` }}
    />
  );
}

export function SystemWindow({
  title,
  icon = true,
  tone = "system",
  className,
  children,
  onClick,
}: {
  title?: string;
  icon?: boolean;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const color = toneVar[tone];
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      className={cn(
        "relative block w-full text-left",
        title ? "pt-7" : "",
        onClick && "transition-transform active:scale-[0.99]",
        className,
      )}
    >
      {/* outer faint frame */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          border: `1px solid color-mix(in oklab, ${color} 28%, transparent)`,
          boxShadow: `0 0 26px color-mix(in oklab, ${color} 18%, transparent)`,
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--system) 6%, transparent), transparent 55%), rgba(2,8,20,0.72)",
        }}
      />
      <Bracket pos="tl" color={color} />
      <Bracket pos="tr" color={color} />
      <Bracket pos="bl" color={color} />
      <Bracket pos="br" color={color} />

      {title && (
        <span className="absolute -top-3.5 left-0 right-0 flex items-center justify-center gap-2 px-4">
          {icon && (
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center text-sm font-bold"
              style={{
                border: `1px solid ${color}`,
                color,
                boxShadow: `0 0 10px color-mix(in oklab, ${color} 45%, transparent)`,
                background: "#02040f",
                textShadow: `0 0 8px ${color}`,
              }}
            >
              !
            </span>
          )}
          <span
            className="px-5 py-1 text-center text-sm font-semibold tracking-[0.32em] uppercase"
            style={{
              border: `1px solid ${color}`,
              color,
              background: "#02040f",
              boxShadow: `0 0 12px color-mix(in oklab, ${color} 40%, transparent)`,
              textShadow: `0 0 10px ${color}, 0 0 22px color-mix(in oklab, ${color} 60%, transparent)`,
            }}
          >
            {title}
          </span>
        </span>
      )}

      <div className="relative px-5 py-5">{children}</div>
    </Tag>
  );
}
