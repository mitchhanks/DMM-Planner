export type SigilTier = 1 | 2 | 3;

export type Sigil = {
  id: string;
  name: string;
  tier: SigilTier;
  pointCost?: number; // optional override (uses tier default if omitted)
};

export const DEFAULT_SIGIL_COST: Record<SigilTier, number> = {
  1: 100,
  2: 500,
  3: 1500
};

export function sigilCost(s: Sigil): number {
  return s.pointCost ?? DEFAULT_SIGIL_COST[s.tier];
}

export const SIGILS: Sigil[] = [
  // --- Tier 1 ---
  { id: "resistance", name: "Sigil of resistance", tier: 1 },
  { id: "resilience", name: "Sigil of resilience", tier: 1 },
  { id: "consistency", name: "Sigil of consistency", tier: 1 },
  { id: "rigorous_ranger", name: "Sigil of the rigorous ranger", tier: 1 },
  { id: "meticulous_mage", name: "Sigil of the meticulous mage", tier: 1 },
  { id: "deft_strikes", name: "Sigil of deft strikes", tier: 1 },
  { id: "agile_fortune", name: "Sigil of agile fortune", tier: 1 },
  { id: "hoarding", name: "Sigil of hoarding", tier: 1 },
  { id: "sustenance", name: "Sigil of sustenance", tier: 1 },
  { id: "forager", name: "Sigil of the forager", tier: 1 },
  { id: "enhanced_harvest", name: "Sigil of enhanced harvest", tier: 1 },
  { id: "storage", name: "Sigil of storage", tier: 1 },
  { id: "abyss", name: "Sigil of the abyss", tier: 1 },
  { id: "deception", name: "Sigil of deception", tier: 1 },
  { id: "lithe", name: "Sigil of lithe", tier: 1 },
  { id: "alchemaniac", name: "Sigil of the alchemaniac", tier: 1 },
  { id: "food_master", name: "Sigil of the food master", tier: 1 },
  { id: "well_fed", name: "Sigil of the well-fed", tier: 1 },
  { id: "potion_master", name: "Sigil of the potion master", tier: 1 },
  { id: "eternal_jeweller", name: "Sigil of the eternal jeweller", tier: 1 },
  { id: "treasure_hunter", name: "Sigil of the treasure hunter", tier: 1 },
  { id: "mobility", name: "Sigil of mobility", tier: 1 },
  { id: "exaggeration", name: "Sigil of exaggeration", tier: 1 },

  // --- Tier 2 ---
  { id: "augmented_thrall", name: "Sigil of the augmented thrall", tier: 2 },
  { id: "lightbearer", name: "Sigil of the lightbearer", tier: 2 },
  { id: "specialised_strikes", name: "Sigil of specialised strikes", tier: 2 },
  { id: "porcupine", name: "Sigil of the porcupine", tier: 2 },
  { id: "binding", name: "Sigil of binding", tier: 2 },
  { id: "fortification", name: "Sigil of fortification", tier: 2 },
  { id: "ruthless_ranger", name: "Sigil of the ruthless ranger", tier: 2 },
  { id: "formidable_fighter", name: "Sigil of the formidable fighter", tier: 2 },
  { id: "menacing_mage", name: "Sigil of the menacing mage", tier: 2 },
  { id: "swashbuckler", name: "Sigil of swashbuckler", tier: 2 },
  { id: "gunslinger", name: "Sigil of gunslinger", tier: 2 },
  { id: "arcane_swiftness", name: "Sigil of arcane swiftness", tier: 2 },
  { id: "adroit", name: "Sigil of adroit", tier: 2 },
  { id: "onslaught", name: "Sigil of onslaught", tier: 2, pointCost: 150 },
  { id: "restoration", name: "Sigil of restoration", tier: 2 },
  { id: "barrows", name: "Sigil of barrows", tier: 2 },
  { id: "hunter", name: "Sigil of the hunter", tier: 2 },
  { id: "infernal_chef", name: "Sigil of the infernal chef", tier: 2 },
  { id: "infernal_smith", name: "Sigil of the infernal smith", tier: 2 },
  { id: "nature", name: "Sigil of nature", tier: 2 },
  { id: "devotion", name: "Sigil of devotion", tier: 2 },
  { id: "revoked_limitation", name: "Sigil of revoked limitation", tier: 2 },
  { id: "last_recall", name: "Sigil of last recall", tier: 2 },
  { id: "bloodhound", name: "Sigil of the bloodhound", tier: 2 },
  { id: "faith", name: "Sigil of faith", tier: 2 },
  { id: "prosperity", name: "Sigil of prosperity", tier: 2 },
  { id: "slaughter", name: "Sigil of slaughter", tier: 2 },
  { id: "fortune_farmer", name: "Sigil of the fortune farmer", tier: 2 },
  { id: "versatility", name: "Sigil of versatility", tier: 2 },
  { id: "serpent", name: "Sigil of the serpent", tier: 2 },
  { id: "preservation", name: "Sigil of preservation", tier: 2 },

  // --- Tier 3 ---
  { id: "titanium", name: "Sigil of titanium", tier: 3 },
  { id: "finality", name: "Sigil of finality", tier: 3 },
  { id: "pious_protection", name: "Sigil of pious protection", tier: 3 },
  { id: "aggression", name: "Sigil of aggression", tier: 3 },
  { id: "rampage", name: "Sigil of rampage", tier: 3 },
  { id: "meticulousness", name: "Sigil of meticulousness", tier: 3 },
  { id: "rampart", name: "Sigil of rampart", tier: 3 },
  { id: "woodcraft", name: "Sigil of woodcraft", tier: 3 },
  { id: "remote_storage", name: "Sigil of remote storage", tier: 3 },
  { id: "eternal_belief", name: "Sigil of eternal belief", tier: 3, pointCost: 2000 },
  { id: "ruinous powers", name: "Ruinous powers", tier: 3, pointCost: 3000 },
];
