import { SystemWindow } from "./SystemWindow";
import { SystemButton } from "./SystemButton";
import { SystemCheckbox } from "./SystemCheckbox";
import { useSystem } from "@/lib/system-state";

export function QuestInfoPopup({ onClose }: { onClose: () => void }) {
  const { goals, addGoal, questComplete, setQuestComplete } = useSystem();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{ background: "rgba(1,3,10,0.8)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div className="w-full max-w-sm sys-in" onClick={(e) => e.stopPropagation()}>
        <SystemWindow title="Quest Info">
          <div className="space-y-5 pt-2">
            <p className="text-center text-[11px] tracking-wide text-foreground/85 sys-glow-soft">
              [Daily Quest: Strength Training has arrived.]
            </p>

            <p className="text-center text-sm font-semibold tracking-[0.3em] text-system underline underline-offset-4 sys-glow">
              GOAL
            </p>

            <ul className="space-y-2.5">
              {goals.map((g) => {
                const done = g.current >= g.target;
                const capped = g.current >= g.target * 2;
                return (
                  <li key={g.name} className="flex items-center gap-2 text-xs">
                    <span className="flex-1 tracking-wide text-foreground/90">{g.name}</span>
                    <span
                      className="num text-[12px]"
                      style={{
                        color: done ? "var(--confirm)" : "var(--foreground)",
                        textShadow: done ? "0 0 8px var(--confirm)" : undefined,
                      }}
                    >
                      [{g.current}/{g.target}
                      {g.unit ?? ""}]
                    </span>
                    <SystemButton
                      size="sm"
                      variant={done ? "confirm" : "system"}
                      disabled={capped}
                      onClick={() => addGoal(g.name, g.unit === "km" ? 1 : 5)}
                    >
                      +
                    </SystemButton>
                  </li>
                );
              })}
            </ul>

            <p
              className="text-center text-[11px] leading-relaxed tracking-wide"
              style={{ color: "var(--warn)", textShadow: "0 0 8px color-mix(in oklab, var(--warn) 60%, transparent)" }}
            >
              If you do not complete this quest, your heart will stop.
            </p>

            <div className="flex flex-col items-center gap-3 pt-1">
              <SystemCheckbox checked={questComplete} onChange={setQuestComplete} />
              <SystemButton variant="danger" onClick={onClose}>
                Close
              </SystemButton>
            </div>
          </div>
        </SystemWindow>
      </div>
    </div>
  );
}
