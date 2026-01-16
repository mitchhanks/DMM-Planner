export type UnlockBundle =
  | {
    type: "quest_unlock";
    id: string;
    name: string;
    questIds: string[];
    pointCost: number;
  }
  | {
    type: "prayer_book";
    id: string;
    name: string;
    pointCost: number;
  };

export const QUEST_UNLOCKS: UnlockBundle[] = [
  { type: "quest_unlock", id: "camelot", name: "Camelot", questIds: ["camelot"], pointCost: 500 },
  { type: "quest_unlock", id: "fremennik", name: "Fremennik", questIds: ["fremennik"], pointCost: 1000 },
  { type: "quest_unlock", id: "elf", name: "Elf", questIds: ["elf"], pointCost: 1000 },
  { type: "quest_unlock", id: "myreque", name: "Myreque", questIds: ["myreque"], pointCost: 1500 },
  { type: "quest_unlock", id: "recipe_for_disaster", name: "Recipe for Disaster", questIds: ["recipe_for_disaster"], pointCost: 750 },
  { type: "quest_unlock", id: "kharidian", name: "Kharidian", questIds: ["kharidian"], pointCost: 1500 },
  { type: "quest_unlock", id: "mahjarrat_1", name: "Mahjarrat 1", questIds: ["mahjarrat_1"], pointCost: 2000 },
  { type: "quest_unlock", id: "gnome", name: "Gnome", questIds: ["gnome"], pointCost: 2000 },
  { type: "quest_unlock", id: "dragonkin", name: "Dragonkin", questIds: ["dragonkin"], pointCost: 3000 },
  { type: "quest_unlock", id: "mahjarrat_2", name: "Mahjarrat 2", questIds: ["mahjarrat_2"], pointCost: 3000 },

  { type: "prayer_book", id: "ruinous_powers", name: "Ruinous Powers (Prayer book)", pointCost: 3000 }
];
