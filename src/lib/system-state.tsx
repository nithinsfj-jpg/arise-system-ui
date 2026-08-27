import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type AttrKey = "STR" | "AGI" | "PER" | "VIT" | "INT";

export type QuestGoal = {
  name: string;
  current: number;
  target: number;
  unit?: string;
};

type SystemState = {
  level: number;
  job: string;
  title: string;
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  xp: { current: number; max: number };
  fatigue: number;
  attrs: Record<AttrKey, number>;
  points: number;
  goals: QuestGoal[];
  questComplete: boolean;
  addAttr: (k: AttrKey) => void;
  saveAttrs: () => void;
  addGoal: (name: string, step: number) => void;
  setQuestComplete: (v: boolean) => void;
};

const Ctx = createContext<SystemState | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [attrs, setAttrs] = useState<Record<AttrKey, number>>({
    STR: 19,
    AGI: 10,
    PER: 10,
    VIT: 10,
    INT: 10,
  });
  const [points, setPoints] = useState(3);
  const [goals, setGoals] = useState<QuestGoal[]>([
    { name: "Push-ups", current: 62, target: 100 },
    { name: "Sit-ups", current: 40, target: 100 },
    { name: "Squats", current: 28, target: 100 },
    { name: "Running", current: 4, target: 10, unit: "km" },
  ]);
  const [questComplete, setQuestComplete] = useState(false);

  const value = useMemo<SystemState>(
    () => ({
      level: 18,
      job: "None",
      title: "Wolf Assassin",
      hp: { current: 8000, max: 12000 },
      mp: { current: 350, max: 350 },
      xp: { current: 4200, max: 9000 },
      fatigue: 3,
      attrs,
      points,
      goals,
      questComplete,
      addAttr: (k) =>
        setPoints((p) => {
          if (p <= 0) return p;
          setAttrs((a) => ({ ...a, [k]: a[k] + 1 }));
          return p - 1;
        }),
      saveAttrs: () => undefined,
      addGoal: (name, step) =>
        setGoals((gs) =>
          gs.map((g) =>
            g.name === name
              ? { ...g, current: Math.min(g.current + step, g.target * 2) }
              : g,
          ),
        ),
      setQuestComplete,
    }),
    [attrs, points, goals, questComplete],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSystem() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSystem must be used inside SystemProvider");
  return ctx;
}
