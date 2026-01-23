import type { Step } from "../models/step";

export type QuestTemplate = {
  id: string;
  name: string;
  questPoints: number;
  xpGains: Step["xpGains"];
};

export const QUESTS: QuestTemplate[] = [
  {
    id: "the_dig_site",
    name: "Dig Site",
    questPoints: 2,
    xpGains: [
      { skill: "mining", baseXp: 15300, source: "Dig Site" },
      { skill: "herblore", baseXp: 2000, source: "Dig Site" }
    ]
  },
  {
    id: "dragon_slayer_i",
    name: "Dragon Slayer I",
    questPoints: 2,
    xpGains: [
      { skill: "defence", baseXp: 18650, source: "Dragon Slayer I" },
      { skill: "strength", baseXp: 18650, source: "Dragon Slayer I" }
    ]
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
  },
  {
    id: "fight_arena",
    name: "Fight Arena",
    questPoints: 2,
    xpGains: [
      { skill: "attack", baseXp: 12175, source: "Fight Arena" },
      { skill: "thieving", baseXp: 2175, source: "Fight Arena" }
    ]
  },
  {
    id: "fremennik_trials",
    name: "Fremennik Trials",
    questPoints: 3,
    xpGains: [
      { skill: "agility", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "attack", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "crafting", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "defence", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "fishing", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "fletching", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "hitpoints", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "strength", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "thieving", baseXp: 2812.4, source: "Fremennik Trials" },
      { skill: "woodcutting", baseXp: 2812.4, source: "Fremennik Trials" }
    ]
  },
  {
    id: "the_knights_sword",
    name: "Knight's Sword",
    questPoints: 1,
    xpGains: [{ skill: "smithing", baseXp: 12725, source: "Knight's Sword" }]
  },
  {
    id: "monks_friend",
    name: "Monk's Friend",
    questPoints: 1,
    xpGains: [{ skill: "woodcutting", baseXp: 2000, source: "Monk's Friend" }]
  },
  {
    id: "murder_mystery",
    name: "Murder Mystery",
    questPoints: 3,
    xpGains: [{ skill: "crafting", baseXp: 1406, source: "Murder Mystery" }]
  },
  {
    id: "temple_of_ikov",
    name: "Temple of Ikov",
    questPoints: 3,
    xpGains: [
      { skill: "ranged", baseXp: 10500, source: "Temple of Ikov" },
      { skill: "fletching", baseXp: 8000, source: "Temple of Ikov" },
    ]
  },
  {
    id: "daddys_home",
    name: "Miniquest Daddy's Home",
    questPoints: 0,
    xpGains: [{ skill: "construction", baseXp: 400, source: "Daddy's Home" }]
  },
  {
    id: "museum",
    name: "Museum Natural history quiz",
    questPoints: 0,
    xpGains: [{ skill: "hunter", baseXp: 1000, source: "Museum" }, { skill: "slayer", baseXp: 1000, source: "Museum" }]
  }
];
