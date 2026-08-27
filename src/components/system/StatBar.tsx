import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function StatBar({
  label,
  icon,
  current,
  max,
  tone = "var(--system)",
  className,
}: {
  label?: string;
  icon?: ReactNode;
  current: number;
  max: number;
  tone?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {(icon || label) && (
        <div className="flex w-9 shrink-0 flex-col items-center leading-none">
          {icon}
          {label && (
            <span
              className="mt-0.5 text-[10px] font-bold tracking-widest"
              style={{ color: tone, textShadow: `0 0 8px ${tone}` }}
            >
              {label}
            </span>
          )}
        </div>
      )}
      <div className="relative min-w-0 flex-1">
        <div
          className="relative h-[7px] w-full overflow-hidden rounded-full"
          style={{
            border: `1px solid color-mix(in oklab, ${tone} 70%, transparent)`,
            boxShadow: `0 0 8px color-mix(in oklab, ${tone} 35%, transparent)`,
            background: "rgba(2,8,20,0.8)",
          }}
        >
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, color-mix(in oklab, ${tone} 70%, white), ${tone})`,
              boxShadow: `0 0 10px ${tone}`,
            }}
          />
        </div>
        <div className="mt-1 text-right num text-[11px] leading-none text-foreground/85">
          {current}
          <span className="text-foreground/45">/{max}</span>
        </div>
      </div>
    </div>
  );
}
