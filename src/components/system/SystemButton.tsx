import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "system" | "danger" | "confirm";

const tones: Record<Variant, string> = {
  system: "var(--system)",
  danger: "var(--warn)",
  confirm: "var(--confirm)",
};

export function SystemButton({
  variant = "system",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md" }) {
  const tone = tones[variant];
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold uppercase tracking-[0.18em] transition-all",
        "disabled:cursor-not-allowed disabled:opacity-35",
        size === "sm" ? "h-7 min-w-7 px-2 text-xs" : "h-9 px-5 text-xs",
        "hover:brightness-125 active:scale-95",
        className,
      )}
      style={{
        color: tone,
        border: `1px solid color-mix(in oklab, ${tone} 80%, transparent)`,
        background: `color-mix(in oklab, ${tone} 12%, transparent)`,
        boxShadow: `0 0 10px color-mix(in oklab, ${tone} 30%, transparent), inset 0 0 12px color-mix(in oklab, ${tone} 10%, transparent)`,
        textShadow: `0 0 8px ${tone}`,
      }}
    />
  );
}
