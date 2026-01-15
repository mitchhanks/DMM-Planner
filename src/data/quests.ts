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
  },
  {
    id: "fremennik_trials",
    name: "The Fremennik Trials",
    questPoints: 3,
    xpGains: [
      { skill: "agility", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "attack", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "crafting", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "defence", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "fishing", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "fletching", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "hitpoints", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "strength", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "thieving", baseXp: 2812.4, source: "The Fremennik Trials" },
      { skill: "woodcutting", baseXp: 2812.4, source: "The Fremennik Trials" }
    ]
  },
  {
    id: "daddys_home",
    name: "Daddy's Home",
    questPoints: 0,
    xpGains: [{ skill: "construction", baseXp: 400, source: "Daddy's Home" }]
  },
  {
    id: "the_grand_tree",
    name: "The Grand Tree",
    questPoints: 5,
    xpGains: [
      { skill: "attack", baseXp: 18400, source: "The Grand Tree" },
      { skill: "agility", baseXp: 7900, source: "The Grand Tree" },
      { skill: "magic", baseXp: 2150, source: "The Grand Tree" }
    ]
  },
  {
    id: "dragon_slayer_i",
    name: "Dragon Slayer I",
    questPoints: 2,
    xpGains: [
      { skill: "strength", baseXp: 18650, source: "Dragon Slayer I" },
      { skill: "defence", baseXp: 18650, source: "Dragon Slayer I" }
    ]
  },
  {
    id: "the_dig_site",
    name: "The Dig Site",
    questPoints: 2,
    xpGains: [
      { skill: "mining", baseXp: 15300, source: "The Dig Site" },
      { skill: "herblore", baseXp: 2000, source: "The Dig Site" }
    ]
  },
  {
    id: "monks_friend",
    name: "Monk's Friend",
    questPoints: 1,
    xpGains: [{ skill: "woodcutting", baseXp: 2000, source: "Monk's Friend" }]
  },
  {
    id: "the_knights_sword",
    name: "The Knight's Sword",
    questPoints: 1,
    xpGains: [{ skill: "smithing", baseXp: 12725, source: "The Knight's Sword" }]
  },
  {
    id: "murder_mystery",
    name: "Murder Mystery",
    questPoints: 3,
    xpGains: [{ skill: "crafting", baseXp: 1406, source: "Murder Mystery" }]
  },
  {
    id: "elemental_workshop_i",
    name: "Elemental Workshop I",
    questPoints: 1,
    xpGains: [
      { skill: "crafting", baseXp: 5000, source: "Elemental Workshop I" },
      { skill: "smithing", baseXp: 5000, source: "Elemental Workshop I" }
    ]
  },
  {
    id: "elemental_workshop_ii",
    name: "Elemental Workshop II",
    questPoints: 1,
    xpGains: [
      { skill: "crafting", baseXp: 7500, source: "Elemental Workshop II" },
      { skill: "smithing", baseXp: 7500, source: "Elemental Workshop II" }
    ]
  }
];
