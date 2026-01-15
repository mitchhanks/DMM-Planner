import type { Step } from "../models/step";

export type QuestTemplate = {
  id: string;
  name: string;
  questPoints: number;
  xpGains: Step["xpGains"];
};

export const QUESTS: QuestTemplate[] = [
  {
    id: "waterfall_quest",
    name: "Waterfall Quest",
    questPoints: 1,
    xpGains: [
      { skill: "attack", baseXp: 13750, source: "Waterfall Quest" },
      { skill: "strength", baseXp: 13750, source: "Waterfall Quest" }
    ]
  },
  {
    id: "fight_arena",
    name: "Fight Arena",
    questPoints: 2,
    xpGains: [{ skill: "attack", baseXp: 12175, source: "Fight Arena" }]
  },
  {
    id: "tree_gnome_village",
    name: "Tree Gnome Village",
    questPoints: 2,
    xpGains: [{ skill: "attack", baseXp: 11450, source: "Tree Gnome Village" }]
  }
];
