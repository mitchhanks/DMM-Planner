import type { Skill } from "./skills";

export type StepUnlock =
  | {
    type: "unlock";
    unlockId: string;
  };


export type Step = {
  id: string;
  name: string;
  category: "quest" | "training" | "unlock" | "misc" | "breach";
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
    clueFirsts?: Partial<Record<"beginner" | "easy" | "medium" | "hard" | "elite" | "master", boolean>>;
    breachDamage?: number;      // total damage dealt in this step
    collectionLogSlots?: number;
    diaryTasks?: Partial<Record<"easy" | "medium" | "hard" | "elite", number>>; // tasks completed
    bossKills?: Partial<Record<string, number>>; // bossId -> kills in this step
  };
  estimatedMinutes?: number; // per step estimate
  manualPointsAdjustment?: number; // + or - (optional)
  notes?: string;
};
