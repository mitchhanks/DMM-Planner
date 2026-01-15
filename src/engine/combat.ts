export function calculateCombatLevel(stats: {
  attack: number;
  strength: number;
  defence: number;
  hitpoints: number;
  prayer: number;
  ranged: number;
  magic: number;
}): number {
  const base =
    0.25 * (
      stats.defence +
      stats.hitpoints +
      Math.floor(stats.prayer / 2)
    );

  const melee = 0.325 * (stats.attack + stats.strength);
  const range = 0.325 * (Math.floor(stats.ranged * 1.5));
  const mage  = 0.325 * (Math.floor(stats.magic * 1.5));

  return Math.floor(base + Math.max(melee, range, mage));
}
