export type UnlockBundle =
  | {
    type: "quest_unlock";
    id: string;
    name: string;
    pointCost: number;
  }

export const QUEST_UNLOCKS: UnlockBundle[] = [
  { type: "quest_unlock", id: "camelot", name: "Camelot", pointCost: 500 },
  { type: "quest_unlock", id: "fremennik", name: "Fremennik", pointCost: 1000 },
  { type: "quest_unlock", id: "elf", name: "Elf", pointCost: 1000 },
  { type: "quest_unlock", id: "myreque", name: "Myreque", pointCost: 1500 },
  { type: "quest_unlock", id: "recipe_for_disaster", name: "Recipe for Disaster", pointCost: 750 },
  { type: "quest_unlock", id: "kharidian", name: "Kharidian", pointCost: 1500 },
  { type: "quest_unlock", id: "mahjarrat_1", name: "Mahjarrat 1", pointCost: 2000 },
  { type: "quest_unlock", id: "gnome", name: "Gnome", pointCost: 2000 },
  { type: "quest_unlock", id: "dragonkin", name: "Dragonkin", pointCost: 3000 },
  { type: "quest_unlock", id: "mahjarrat_2", name: "Mahjarrat 2",  pointCost: 3000 },
];
