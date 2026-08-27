import { createFileRoute, Link } from "@tanstack/react-router";
import { SystemWindow } from "@/components/system/SystemWindow";
import { StatBar } from "@/components/system/StatBar";
import { FatigueGauge } from "@/components/system/FatigueGauge";
import { SystemButton } from "@/components/system/SystemButton";
import { RankPath } from "@/components/system/RankPath";
import { useSystem, type AttrKey } from "@/lib/system-state";
import { ChevronLeft, Dumbbell, Wind, Radar, Heart, Brain, Plus, Droplet } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Status Window — ARISE" },
      {
        name: "description",
        content:
          "The ARISE status window: level, job, title, attributes, ability points and hunter rank progression from E-Rank to Shadow Monarch.",
      },
      { property: "og:title", content: "Status Window — ARISE" },
      {
        property: "og:description",
        content: "Level, job, title, attributes and hunter rank progression in the ARISE System interface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Status,
});

const ATTRS: { key: AttrKey; icon: typeof Dumbbell }[] = [
  { key: "STR", icon: Dumbbell },
  { key: "AGI", icon: Wind },
  { key: "PER", icon: Radar },
  { key: "VIT", icon: Heart },
  { key: "INT", icon: Brain },
];

function Status() {
  const s = useSystem();
  const [saved, setSaved] = useState(false);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md px-5 pt-6 pb-16">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          aria-label="Return"
          className="flex h-10 w-10 items-center justify-center transition-transform active:scale-95"
          style={{
            border: "1px solid var(--system)",
            boxShadow: "0 0 12px color-mix(in oklab, var(--system) 40%, transparent)",
            background: "rgba(2,8,20,0.6)",
          }}
        >
          <ChevronLeft className="h-5 w-5 text-system" />
        </Link>
        <h1 className="text-sm font-semibold tracking-[0.4em] text-system uppercase sys-glow">Status</h1>
        <span className="h-10 w-10" />
      </header>

      <section className="mt-8">
        <SystemWindow>
          <div className="flex items-start gap-5">
            <div className="flex flex-col items-center">
              <span className="num text-4xl text-system sys-glow">{s.level}</span>
              <span className="text-[9px] tracking-[0.35em] text-muted-foreground uppercase">Level</span>
            </div>
            <div className="flex-1 space-y-1.5 text-xs">
              <p className="tracking-wide text-muted-foreground">
                JOB: <span className="text-foreground">{s.job}</span>
              </p>
              <p className="tracking-wide text-muted-foreground">
                TITLE: <span className="font-semibold text-foreground sys-glow-soft">{s.title}</span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1 space-y-3">
              <StatBar label="HP" icon={<Plus className="h-3.5 w-3.5 text-system" />} current={s.hp.current} max={s.hp.max} />
              <StatBar label="MP" icon={<Droplet className="h-3.5 w-3.5 text-system" />} current={s.mp.current} max={s.mp.max} />
            </div>
            <FatigueGauge value={s.fatigue} />
          </div>
        </SystemWindow>
      </section>

      <section className="mt-8">
        <SystemWindow>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {ATTRS.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-system" style={{ filter: "drop-shadow(0 0 5px var(--system))" }} />
                <span className="text-xs font-semibold tracking-widest text-foreground/90">{key}:</span>
                <span className="num flex-1 text-sm text-foreground">{s.attrs[key]}</span>
                <SystemButton
                  size="sm"
                  disabled={s.points <= 0}
                  onClick={() => {
                    s.addAttr(key);
                    setSaved(false);
                  }}
                >
                  +
                </SystemButton>
              </li>
            ))}
            <li className="flex items-center justify-end gap-2">
              <span className="text-right text-[9px] leading-tight tracking-widest text-muted-foreground uppercase">
                Available
                <br />
                Ability Points:
              </span>
              <span className="num text-xl text-system sys-glow">{s.points}</span>
            </li>
          </ul>

          <div className="mt-5 flex justify-center">
            <SystemButton variant={saved ? "confirm" : "system"} onClick={() => setSaved(true)}>
              {saved ? "[Saved]" : "Save"}
            </SystemButton>
          </div>
        </SystemWindow>
      </section>

      <section className="mt-9">
        <p className="mb-4 text-center text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--rank)", textShadow: "0 0 10px var(--rank)" }}>
          Rank Progression
        </p>
        <RankPath current={2} />
      </section>
    </main>
  );
}
