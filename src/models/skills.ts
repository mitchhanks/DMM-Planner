export const SKILLS = [
  "attack", "strength", "defence", "ranged", "prayer", "magic",
  "hitpoints", "agility", "herblore", "thieving", "crafting",
  "fletching", "slayer", "hunter", "mining", "smithing",
  "fishing", "cooking", "firemaking", "woodcutting",
  "runecraft", "construction", "farming"
] as const;

export const SKILLS_ALPHA = [
  "agility",
  "attack",
  "construction",
  "cooking",
  "crafting",
  "defence",
  "farming",
  "firemaking",
  "fishing",
  "fletching",
  "herblore",
  "hitpoints",
  "hunter",
  "magic",
  "mining",
  "prayer",
  "ranged",
  "runecraft",
  "slayer",
  "smithing",
  "strength",
  "thieving",
  "woodcutting"
] as const;

export type Skill = typeof SKILLS[number];

export type SkillXpMap = Record<Skill, number>;
export type SkillLevelMap = Record<Skill, number>;
