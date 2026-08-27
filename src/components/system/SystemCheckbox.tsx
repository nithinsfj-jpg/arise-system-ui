import { cn } from "@/lib/utils";

export function SystemCheckbox({
  checked,
  onChange,
  size = 40,
  className,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: number;
  className?: string;
}) {
  const tone = checked ? "var(--confirm)" : "var(--system)";
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label="Complete quest"
      onClick={() => onChange(!checked)}
      className={cn("relative inline-flex items-center justify-center transition-all active:scale-95", className)}
      style={{
        width: size,
        height: size,
        border: `1px solid ${tone}`,
        background: checked ? `color-mix(in oklab, ${tone} 14%, transparent)` : "rgba(2,8,20,0.6)",
        boxShadow: `0 0 12px color-mix(in oklab, ${tone} 45%, transparent)`,
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none">
        {/* square with clipped corner tick */}
        <path
          d="M4 4 H20 V16 L16 20 H4 Z"
          stroke={tone}
          strokeWidth="1.4"
          style={{ filter: `drop-shadow(0 0 4px ${tone})` }}
        />
        <path
          d="M7.5 12.2 L10.8 15.5 L17 8"
          stroke={tone}
          strokeWidth="2"
          strokeLinecap="square"
          style={{
            filter: `drop-shadow(0 0 6px ${tone})`,
            strokeDasharray: 24,
            strokeDashoffset: checked ? 0 : 24,
            transition: "stroke-dashoffset 320ms ease-out",
          }}
        />
      </svg>
    </button>
  );
}
