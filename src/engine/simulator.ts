import type { Step } from "../models/step";
import type { SkillXpMap, SkillLevelMap } from "../models/skills";
import { SKILLS } from "../models/skills";
import { xpToLevel } from "./xp";
import { calculateCombatLevel } from "./combat";
import { getDmmRates } from "./dmmRates";
import { isCombatSkill } from "../data/combatSkills";
import type { PointsBreakdown } from "./points";

import { DEFAULT_POINTS_CONFIG } from "../data/pointsConfig";
import { applyPointsForStep, createInitialPointsState } from "./points";

export type SimulationResult = {
  xp: SkillXpMap;
  levels: SkillLevelMap;
  points: number;

  combatLevel: number;
  dropMultiplier: number;
  combatXpMultiplier: number;
  skillingXpMultiplier: number;
  stepPoints: number[]; // points gained (net) per step (auto + manual)
  stepPointsBreakdown: PointsBreakdown[];
};

export function simulateSteps(
  steps: Step[],
  upToIndex: number,
  startingXp?: SkillXpMap
): SimulationResult {
  const xp = {} as SkillXpMap;
  const levels = {} as SkillLevelMap;
  const stepPoints: number[] = [];
  const stepPointsBreakdown: PointsBreakdown[] = [];

  for (const skill of SKILLS) {
    xp[skill] = startingXp?.[skill] ?? 0;
    levels[skill] = xpToLevel(xp[skill]);
  }

  let pointsState = createInitialPointsState();

  for (let i = 0; i <= upToIndex; i++) {
  const step = steps[i];
  if (!step) break;

  // snapshot levels BEFORE step XP is applied (for level-up points)
  const prevLevels = { ...levels };

  // rates based on combat level BEFORE applying this step
  const combatLevelBefore = calculateCombatLevel({
    attack: levels.attack,
    strength: levels.strength,
    defence: levels.defence,
    hitpoints: levels.hitpoints,
    prayer: levels.prayer,
    ranged: levels.ranged,
    magic: levels.magic
  });

  const ratesBefore = getDmmRates(combatLevelBefore);

  // apply XP (auto DMM rates)
  for (const gain of step.xpGains) {
    const mult = isCombatSkill(gain.skill)
      ? ratesBefore.combatXpMultiplier
      : ratesBefore.skillingXpMultiplier;

    xp[gain.skill] += gain.baseXp * mult;
    levels[gain.skill] = xpToLevel(xp[gain.skill]);
  }

  // apply points ONCE (after XP/level updates), and store per-step result
  const result = applyPointsForStep({
    config: DEFAULT_POINTS_CONFIG,
    prevLevels,
    nextLevels: levels,
    step,
    state: pointsState
  });

  pointsState = result.state;
  stepPoints[i] = result.breakdown.total;
  stepPointsBreakdown[i] = result.breakdown;
}



  // Final snapshot rates for the selected step
  const finalCombatLevel = calculateCombatLevel({
    attack: levels.attack,
    strength: levels.strength,
    defence: levels.defence,
    hitpoints: levels.hitpoints,
    prayer: levels.prayer,
    ranged: levels.ranged,
    magic: levels.magic
  });

  const finalRates = getDmmRates(finalCombatLevel);

  return {
    xp,
    levels,
    points: pointsState.total,
    stepPoints,
    stepPointsBreakdown,
    combatLevel: finalCombatLevel,
    dropMultiplier: finalRates.dropMultiplier,
    combatXpMultiplier: finalRates.combatXpMultiplier,
    skillingXpMultiplier: finalRates.skillingXpMultiplier
  };
}
