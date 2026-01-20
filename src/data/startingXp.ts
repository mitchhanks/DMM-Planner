import type { SkillXpMap } from "../models/skills";
import { SKILLS } from "../models/skills";

export const DEFAULT_STARTING_XP: SkillXpMap = SKILLS.reduce((acc, skill) => {
  (acc as any)[skill] = 0;
  return acc;
}, {} as SkillXpMap);

// Deadman start: 250 Herblore XP
DEFAULT_STARTING_XP.herblore = 250; // Level 3
DEFAULT_STARTING_XP.hitpoints = 1154; // Level 10
