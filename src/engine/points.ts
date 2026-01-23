import type { SkillLevelMap } from "../models/skills";
import type { Step } from "../models/step";
import type { ClueTier, PointsConfig } from "../data/pointsConfig";

const START_HOUR_UTC = 17;
const START_MINUTE_UTC = 0;

const START_MINUTES = START_HOUR_UTC * 60 + START_MINUTE_UTC;
const MINUTES_PER_DAY = 24 * 60;
const MINUTES_UNTIL_MIDNIGHT = MINUTES_PER_DAY - START_MINUTES; // 420

function dayIndexFromElapsedMinutes(elapsed: number): number {
  if (elapsed < MINUTES_UNTIL_MIDNIGHT) return 1;
  return 2 + Math.floor((elapsed - MINUTES_UNTIL_MIDNIGHT) / MINUTES_PER_DAY);
}


type PointsState = {
  total: number;
  breachPointsEarned: number;
  breachAllowance: number;     // how many breach points you are allowed to earn right now
  breachDay: number;           // current day index (1-based)
  bossKillCounts: Record<string, number>;
  clueFirstClaimed: Partial<Record<ClueTier, boolean>>;
};

export type PointsBreakdown = {
  levels: number;
  clues: number;
  breaches: number;
  diaries: number;
  bosses: number;
  collectionLogSlots: number;
  manual: number;
  total: number;
};

export function createInitialPointsState(): PointsState {
  return {
    total: 0,
    breachPointsEarned: 0,
    breachAllowance: 5000, // start day 1 allowance
    breachDay: 1,
    bossKillCounts: {},
    clueFirstClaimed: {}
  };
}

function calculateSkillingPoints(
  prev: number,
  next: number,
  config: PointsConfig["skilling"]
) {
  let points = 0;

  for (let lvl = prev + 1; lvl <= next; lvl++) {
    if (lvl < 50) {
      points += config.pointsPerLevelBelow50;
    } else if (lvl <= 98) {
      points += config.pointsPerLevel50To98;
    } else if (lvl === 99) {
      points += config.pointsOn99;
    }
  }

  return points;
}


export function applyPointsForStep(args: {
  config: PointsConfig;
  prevLevels: SkillLevelMap;
  nextLevels: SkillLevelMap;
  step: Step;
  state: PointsState;
  elapsedMinutes: number;
}): { state: PointsState; breakdown: PointsBreakdown } {
  const { config, prevLevels, nextLevels, step } = args;

  const stateNext: PointsState = {
    total: args.state.total,
    breachPointsEarned: args.state.breachPointsEarned,
    breachAllowance: args.state.breachAllowance,
    breachDay: args.state.breachDay,
    bossKillCounts: { ...args.state.bossKillCounts },
    clueFirstClaimed: { ...args.state.clueFirstClaimed }
  };

  const day = step.events?.breachDay ?? stateNext.breachDay;

  // If day increased, add allowance for the skipped days
  if (day > stateNext.breachDay) {
    const daysPassed = day - stateNext.breachDay;
    stateNext.breachAllowance += daysPassed * config.breaches.capPerDay;
    stateNext.breachDay = day;
  }


  const breakdown: PointsBreakdown = {
    levels: 0,
    clues: 0,
    breaches: 0,
    diaries: 0,
    bosses: 0,
    collectionLogSlots: 0,
    manual: 0,
    total: 0
  };

  // 1) Skilling points (below 50 only + 99 bonus)
  for (const [skill, prevLvl] of Object.entries(prevLevels)) {
    const nextLvl = (nextLevels as any)[skill] as number;
    if (typeof nextLvl !== "number") continue;

    if (nextLvl > prevLvl) {
      breakdown.levels += calculateSkillingPoints(
        prevLvl,
        nextLvl,
        config.skilling
      );
    }
  }

  // 2) Clue caskets (base values only for now)
  const clues = step.events?.clueCaskets ?? {};
  const firsts = step.events?.clueFirsts ?? {};

  for (const [tierRaw, count] of Object.entries(clues)) {
    const tier = tierRaw as ClueTier;
    const n = Number(count) || 0;
    if (n <= 0) continue;

    const base = config.clues.base[tier];
    let points = n * base;

    const wantsFirst = !!firsts[tier];
    const alreadyClaimed = !!stateNext.clueFirstClaimed[tier];

    if (wantsFirst && !alreadyClaimed) {
      // Apply multiplier to ONE casket (cleanest interpretation)
      // total = (n-1)*base + 1*(base*mult)
      points = (n - 1) * base + base * config.clues.firstTierMultiplier;
      stateNext.clueFirstClaimed[tier] = true;
    }

    breakdown.clues += points;
  }


  // 3) Breach damage (capped)
  const dmg = step.events?.breachDamage ?? 0;
  if (dmg > 0) {
    const pointsPotential = dmg * config.breaches.pointsPerDamage;

    const remainingOverall = Math.max(
      0,
      config.breaches.capTotalPoints - stateNext.breachPointsEarned
    );

    const dayIndex = dayIndexFromElapsedMinutes(args.elapsedMinutes);
    const allowedByNow = dayIndex * config.breaches.capPerDay;

    const remainingAllowance = Math.max(
      0,
      allowedByNow - stateNext.breachPointsEarned
    );

    const earned = Math.min(pointsPotential, remainingOverall, remainingAllowance);

    breakdown.breaches += earned;
    stateNext.breachPointsEarned += earned;
  }


  // 4) Collection log slots
  breakdown.collectionLogSlots += (step.events?.collectionLogSlots ?? 0) * config.collectionLog.pointsPerSlot;

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
    breakdown.clues +
    breakdown.breaches +
    breakdown.diaries +
    breakdown.bosses +
    breakdown.manual;

  stateNext.total += breakdown.total;

  return { state: stateNext, breakdown };
}
