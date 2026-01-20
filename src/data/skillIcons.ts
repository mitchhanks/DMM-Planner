// src/data/skillIcons.ts

import agility from "../assets/skills/Agility_icon.png";
import attack from "../assets/skills/Attack_icon.png";
import combat from "../assets/skills/Combat.png";
import construction from "../assets/skills/Construction_icon.png";
import cooking from "../assets/skills/Cooking_icon.png";
import crafting from "../assets/skills/Crafting_icon.png";
import defence from "../assets/skills/Defence_icon.png";
import farming from "../assets/skills/Farming_icon.png";
import firemaking from "../assets/skills/Firemaking_icon.png";
import fishing from "../assets/skills/Fishing_icon.png";
import fletching from "../assets/skills/Fletching_icon.png";
import herblore from "../assets/skills/Herblore_icon.png";
import hitpoints from "../assets/skills/Hitpoints_icon.png";
import hunter from "../assets/skills/Hunter_icon.png";
import magic from "../assets/skills/Magic_icon.png";
import mining from "../assets/skills/Mining_icon.png";
import prayer from "../assets/skills/Prayer_icon.png";
import ranged from "../assets/skills/Ranged_icon.png";
import runecraft from "../assets/skills/Runecraft_icon.png";
import slayer from "../assets/skills/Slayer_icon.png";
import smithing from "../assets/skills/Smithing_icon.png";
import strength from "../assets/skills/Strength_icon.png";
import thieving from "../assets/skills/Thieving_icon.png";
import woodcutting from "../assets/skills/Woodcutting_icon.png";

export const SKILL_ICONS = {
  attack,
  strength,
  defence,
  ranged,
  prayer,
  magic,
  hitpoints,

  agility,
  herblore,
  thieving,
  crafting,
  fletching,
  slayer,
  hunter,
  mining,
  smithing,
  fishing,
  cooking,
  firemaking,
  woodcutting,
  runecraft,
  construction,
  farming,

  // Derived (not a real skill)
  combat
} as const;
