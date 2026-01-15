import { XP_TABLE } from "./xpTable";

export function xpToLevel(xp: number): number {
  // Clamp negative values just in case
  if (xp <= 0) return 1;

  // Levels 99..1 search
  for (let lvl = 99; lvl >= 1; lvl--) {
    if (xp >= XP_TABLE[lvl]) return lvl;
  }
  return 1;
}