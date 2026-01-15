export type DmmRates = {
  dropMultiplier: number;
  combatXpMultiplier: number;
  skillingXpMultiplier: number;
};

export function getDmmRates(combatLevel: number): DmmRates {
  if (combatLevel >= 96) {
    return { dropMultiplier: 5, combatXpMultiplier: 20, skillingXpMultiplier: 10 };
  }
  if (combatLevel >= 81) {
    return { dropMultiplier: 4, combatXpMultiplier: 15, skillingXpMultiplier: 10 };
  }
  if (combatLevel >= 61) {
    return { dropMultiplier: 3, combatXpMultiplier: 15, skillingXpMultiplier: 10 };
  }
  // Default / early
  return { dropMultiplier: 3, combatXpMultiplier: 10, skillingXpMultiplier: 10 };
}
