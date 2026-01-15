import type { Skill } from "../models/skills";

export const COMBAT_SKILLS: Skill[] = [
  "attack",
  "strength",
  "defence",
  "hitpoints",
  "ranged",
  "prayer",
  "magic"
];

export function isCombatSkill(skill: Skill): boolean {
  return COMBAT_SKILLS.includes(skill);
}
