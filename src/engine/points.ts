import type { SkillLevelMap } from "../models/skills";
import type { Step } from "../models/step";
import type { PointsConfig } from "../data/pointsConfig";

type PointsState = {
  total: number;
  breachPointsEarned: number;
  bossKillCounts: Record<string, number>;
};

export type PointsBreakdown = {
  levels: number;
  quests: number;
  clues: number;
  breaches: number;
  diaries: number;
  bosses: number;
  manual: number;
  total: number;
};

export function createInitialPointsState(): PointsState {
  return { total: 0, breachPointsEarned: 0, bossKillCounts: {} };
}

export function applyPointsForStep(args: {
  config: PointsConfig;
  prevLevels: SkillLevelMap;
  nextLevels: SkillLevelMap;
  step: Step;
  state: PointsState;
}): { state: PointsState; breakdown: PointsBreakdown } {
  const { config, prevLevels, nextLevels, step } = args;

  const stateNext: PointsState = {
    total: args.state.total,
    breachPointsEarned: args.state.breachPointsEarned,
    bossKillCounts: { ...args.state.bossKillCounts }
  };

  const breakdown: PointsBreakdown = {
    levels: 0,
    quests: 0,
    clues: 0,
    breaches: 0,
    diaries: 0,
    bosses: 0,
    manual: 0,
    total: 0
  };

  // 1) Points from level-ups (+99 bonus)
  for (const [skill, prevLvl] of Object.entries(prevLevels)) {
    const nextLvl = (nextLevels as any)[skill] as number;
    if (typeof nextLvl !== "number") continue;

    const gained = Math.max(0, nextLvl - prevLvl);
    if (gained > 0) {
      breakdown.levels += gained * config.skilling.pointsPerLevel;

      if (prevLvl < 99 && nextLvl >= 99) {
        breakdown.levels += config.skilling.pointsOn99;
      }
    }
  }

  // 2) Quest points
  const qp = step.events?.questPointsGained ?? 0;
  if (qp > 0) breakdown.quests += qp * config.quests.pointsPerQuestPoint;

  // 3) Clue caskets
  const clues = step.events?.clueCaskets ?? {};
  for (const [tier, count] of Object.entries(clues)) {
    const n = Number(count) || 0;
    if (n > 0) breakdown.clues += n * (config.clues as any)[tier];
  }

  // 4) Breach damage (capped)
  const dmg = step.events?.breachDamage ?? 0;
  if (dmg > 0) {
    const pointsPotential = dmg * config.breaches.pointsPerDamage;
    const remaining = Math.max(
      0,
      config.breaches.capTotalPoints - stateNext.breachPointsEarned
    );
    const earned = Math.min(pointsPotential, remaining);

    breakdown.breaches += earned;
    stateNext.breachPointsEarned += earned;
  }

  // 5) Diary tasks (base points only for now)
  const diaryTasks = step.events?.diaryTasks ?? {};
  for (const [tier, count] of Object.entries(diaryTasks)) {
    const n = Number(count) || 0;
    if (n > 0) breakdown.diaries += n * (config.diaries.pointsPerTask as any)[tier];
  }

  // 6) Boss kills (first kill bonus, 76+ reduced)
  const bossKills = step.events?.bossKills ?? {};
  for (const [bossIdRaw, countRaw] of Object.entries(bossKills)) {
    const bossId = bossIdRaw.toLowerCase();
    const killsThisStep = Number(countRaw) || 0;
    if (killsThisStep <= 0) continue;

    const base = config.bosses.table[bossId]?.pointsPerKill ?? 0;
    let prevKills = stateNext.bossKillCounts[bossId] ?? 0;

    for (let k = 0; k < killsThisStep; k++) {
      const killNumber = prevKills + 1;

      let points = base;
      if (killNumber === 1) points = base * config.bosses.firstKillMultiplier;

      if (killNumber > config.bosses.normalKillCap) {
        points = Math.floor(base * config.bosses.postCapMultiplier);
      }

      breakdown.bosses += points;
      prevKills++;
    }

    stateNext.bossKillCounts[bossId] = prevKills;
  }

  // 7) Manual adjustment
  const manual = Number(step.manualPointsAdjustment ?? 0);
  breakdown.manual += Number.isFinite(manual) ? manual : 0;


  breakdown.total =
    breakdown.levels +
    breakdown.quests +
    breakdown.clues +
    breakdown.breaches +
    breakdown.diaries +
    breakdown.bosses +
    breakdown.manual;

  stateNext.total += breakdown.total;

  return { state: stateNext, breakdown };
}
