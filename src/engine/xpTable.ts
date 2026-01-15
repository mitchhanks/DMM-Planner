// Generates cumulative XP required for each level (1..99) using OSRS formula.
export function generateXpTable(maxLevel = 99): Record<number, number> {
  const table: Record<number, number> = { 1: 0 };

  let points = 0;

  for (let level = 2; level <= maxLevel; level++) {
    points += Math.floor(level - 1 + 300 * Math.pow(2, (level - 1) / 7));
    table[level] = Math.floor(points / 4);
  }

  return table;
}

export const XP_TABLE = generateXpTable(99);
