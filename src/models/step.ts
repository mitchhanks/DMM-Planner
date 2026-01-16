import type { Skill } from "./skills";

export type SigilTier = 1 | 2 | 3;

export type StepUnlock =
  | {
    type: "sigil";
    sigilId: string;
    tier: SigilTier;
  }
  | {
    type: "quest_unlock";
    unlockId: string;     // id of the bundle/template
    questIds: string[];   // quests auto-completed
  };

export type Step = {
  id: string;
  name: string;
  category: "quest" | "training" | "combat" | "unlock" | "misc";
  unlock?: StepUnlock;
  xpGains: {
    skill: Skill;
    baseXp: number;
    source?: string;
  }[];

  // Optional: planning inputs that generate points
  events?: {
    questPointsGained?: number; // e.g. +3 QP this step
    clueCaskets?: Partial<Record<"beginner" | "easy" | "medium" | "hard" | "elite" | "master", number>>;
    breachDamage?: number;      // total damage dealt in this step
    diaryTasks?: Partial<Record<"easy" | "medium" | "hard" | "elite", number>>; // tasks completed
    bossKills?: Partial<Record<string, number>>; // bossId -> kills in this step
  };
  estimatedMinutes?: number; // per step estimate
  manualPointsAdjustment?: number; // + or - (optional)
  notes?: string;
};
