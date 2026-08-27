import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SystemWindow } from "@/components/system/SystemWindow";
import { StatBar } from "@/components/system/StatBar";
import { FatigueGauge } from "@/components/system/FatigueGauge";
import { QuestInfoPopup } from "@/components/system/QuestInfoPopup";
import { useSystem } from "@/lib/system-state";
import { UserRound, Plus, Droplet } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARISE — Daily Quest System" },
      {
        name: "description",
        content:
          "ARISE is a System-style fitness interface: track HP, MP, fatigue and your daily quest in a Solo Leveling inspired HUD.",
      },
      { property: "og:title", content: "ARISE — Daily Quest System" },
      {
        property: "og:description",
        content: "Track HP, MP, fatigue and daily quests in a System-style fitness HUD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const s = useSystem();
  const [open, setOpen] = useState(false);
  const done = s.goals.filter((g) => g.current >= g.target).length;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md px-5 pt-6 pb-16">
      <header className="flex items-center justify-between">
        <h1 className="num text-lg tracking-[0.45em] text-system sys-glow">ARISE</h1>
        <Link
          to="/status"
          aria-label="Open status window"
          className="flex h-10 w-10 items-center justify-center transition-transform active:scale-95"
          style={{
            border: "1px solid var(--system)",
            boxShadow: "0 0 12px color-mix(in oklab, var(--system) 40%, transparent)",
            background: "rgba(2,8,20,0.6)",
          }}
        >
          <UserRound className="h-5 w-5 text-system" />
        </Link>
      </header>

      <section className="mt-8">
        <SystemWindow>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-3">
              <StatBar label="HP" icon={<Plus className="h-3.5 w-3.5 text-system" />} current={s.hp.current} max={s.hp.max} />
              <StatBar label="MP" icon={<Droplet className="h-3.5 w-3.5 text-system" />} current={s.mp.current} max={s.mp.max} />
            </div>
            <FatigueGauge value={s.fatigue} />
          </div>
        </SystemWindow>
      </section>

      <section className="mt-5 px-1">
        <div className="mb-1 flex items-center justify-between text-[10px] tracking-[0.3em] text-system/80 uppercase">
          <span>Experience</span>
          <span className="num">Lv.{s.level}</span>
        </div>
        <StatBar current={s.xp.current} max={s.xp.max} />
      </section>

      <section className="mt-10">
        <SystemWindow title="Today's Daily Quest" onClick={() => setOpen(true)}>
          <div className="space-y-3 pt-1">
            <p className="text-center text-[11px] tracking-wide text-foreground/85">
              [Daily Quest: Strength Training has arrived.]
            </p>
            <p className="text-center text-[11px] tracking-wide text-muted-foreground">
              OBJECTIVES CLEARED{" "}
              <span className="num text-foreground">
                [{done}/{s.goals.length}]
              </span>
            </p>
            <p
              className="text-center text-[10px] tracking-[0.25em] uppercase"
              style={{ color: "var(--warn)", textShadow: "0 0 8px color-mix(in oklab, var(--warn) 55%, transparent)" }}
            >
              Penalty pending
            </p>
            <p className="text-center text-[10px] tracking-[0.25em] text-system/70 uppercase">
              [Tap to open quest info]
            </p>
          </div>
        </SystemWindow>
      </section>

      {open && <QuestInfoPopup onClose={() => setOpen(false)} />}
    </main>
  );
}
