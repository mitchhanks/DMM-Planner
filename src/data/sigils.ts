export type UnlockCategory = "PVP" | "Permanent" | "Toggle" | "Quest lamp";

export type Unlock = {
  id: string;
  name: string;
  category: UnlockCategory;
  pointCost: number;
};

// Helper for UI filters
export const UNLOCK_CATEGORIES: UnlockCategory[] = ["PVP", "Permanent", "Toggle", "Quest lamp"];

export const UNLOCKS: Unlock[] = [
  // --- PVP ---
  { id: "spec_strikes", name: "Spec Strikes", pointCost: 100, category: "PVP" },
  { id: "consistency", name: "Consistency", pointCost: 150, category: "PVP" },
  { id: "lightbearer", name: "Lightbearer", pointCost: 250, category: "PVP" },
  { id: "rig_ranger", name: "Rig Ranger", pointCost: 350, category: "PVP" },
  { id: "metic_mage", name: "Metic Mage", pointCost: 350, category: "PVP" },
  { id: "porcupine", name: "Porcupine", pointCost: 500, category: "PVP" },
  { id: "fortif", name: "Fortif", pointCost: 500, category: "PVP" },
  { id: "ruthless_ranger", name: "Ruthless Ranger", pointCost: 500, category: "PVP" },
  { id: "formid_fighter", name: "Formid Fighter", pointCost: 500, category: "PVP" },
  { id: "menacing_mage", name: "Menacing Mage", pointCost: 500, category: "PVP" },
  { id: "barrows", name: "Barrows", pointCost: 500, category: "PVP" },
  { id: "finality", name: "Finality", pointCost: 500, category: "PVP" },
  { id: "gods", name: "Gods", pointCost: 500, category: "PVP" },
  { id: "pious_prot", name: "Pious Prot", pointCost: 3000, category: "PVP" },
  { id: "swashbuckler", name: "Swashbuckler", pointCost: 5000, category: "PVP" },
  { id: "gunslinger", name: "Gunslinger", pointCost: 5000, category: "PVP" },
  { id: "arcane_swiftness", name: "Arcane Swiftness", pointCost: 5000, category: "PVP" },
  { id: "adroit", name: "Adroit", pointCost: 5000, category: "PVP" },
  { id: "aggression", name: "Aggression", pointCost: 10000, category: "PVP" },
  { id: "rampage", name: "Rampage", pointCost: 10000, category: "PVP" },

  // --- Permanent ---
  { id: "alchemaniac", name: "Alchemaniac", pointCost: 100, category: "Permanent" },
  { id: "resistance", name: "Resistance", pointCost: 100, category: "Permanent" },
  { id: "deft_strikes", name: "Deft Strikes", pointCost: 100, category: "Permanent" },
  { id: "onslaught", name: "Onslaught", pointCost: 150, category: "Permanent" },
  { id: "infernal_chef", name: "Infernal Chef", pointCost: 150, category: "Permanent" },
  { id: "deception", name: "Deception", pointCost: 150, category: "Permanent" },
  { id: "hoarding", name: "Hoarding", pointCost: 250, category: "Permanent" },
  { id: "litheness", name: "Litheness", pointCost: 250, category: "Permanent" },
  { id: "faith", name: "Faith", pointCost: 250, category: "Permanent" },
  { id: "automation", name: "Automation", pointCost: 250, category: "Permanent" },
  { id: "agile_fortune", name: "Agile Fortune", pointCost: 500, category: "Permanent" },
  { id: "treasure_hunter", name: "Treasure Hunter", pointCost: 500, category: "Permanent" },
  { id: "hunter", name: "Hunter", pointCost: 500, category: "Permanent" },
  { id: "nature", name: "Nature", pointCost: 500, category: "Permanent" },
  { id: "restoration", name: "Restoration", pointCost: 500, category: "Permanent" },
  { id: "efficiency", name: "Efficiency", pointCost: 500, category: "Permanent" },
  { id: "food_master", name: "Food Master", pointCost: 1000, category: "Permanent" },
  { id: "well_fed", name: "Well Fed", pointCost: 1000, category: "Permanent" },
  { id: "potion_master", name: "Potion Master", pointCost: 1000, category: "Permanent" },
  { id: "revoked_limitation", name: "Revoked Limitation", pointCost: 1000, category: "Permanent" },
  { id: "meticulousness", name: "Meticulousness", pointCost: 1500, category: "Permanent" },
  { id: "eternal_belief", name: "Eternal Belief", pointCost: 2000, category: "Permanent" },
  { id: "titanium", name: "Titanium", pointCost: 3000, category: "Permanent" },
  { id: "augmented_thrall", name: "Augmented Thrall", pointCost: 5000, category: "Permanent" },
  { id: "conclusion", name: "Conclusion", pointCost: 5000, category: "Permanent" },
  { id: "ruinous_powers", name: "Ruinous Powers", pointCost: 5000, category: "Permanent" },



  // --- Toggle ---
  { id: "enhanced_harvest", name: "Enhanced Harvest", pointCost: 100, category: "Toggle" },
  { id: "remote_storage", name: "Remote Storage", pointCost: 100, category: "Toggle" },
  { id: "slaughter", name: "Slaughter", pointCost: 500, category: "Toggle" },
  { id: "woodcraft", name: "Woodcraft", pointCost: 1000, category: "Toggle" },
  { id: "devotion", name: "Devotion", pointCost: 1500, category: "Toggle" },

  // --- Quest lamp ---
  { id: "fremmy", name: "Fremmy", pointCost: 250, category: "Quest lamp" },
  { id: "elf", name: "Elf", pointCost: 500, category: "Quest lamp" },
  { id: "camelot", name: "Camelot", pointCost: 1000, category: "Quest lamp" },
  { id: "myreque", name: "Myreque", pointCost: 1000, category: "Quest lamp" },
  { id: "rfd", name: "RFD", pointCost: 1500, category: "Quest lamp" },
  { id: "kharidian", name: "Kharidian", pointCost: 1500, category: "Quest lamp" },
  { id: "dt1", name: "DT1", pointCost: 1500, category: "Quest lamp" },
  { id: "mm2", name: "MM2", pointCost: 5000, category: "Quest lamp" },
  { id: "ds2", name: "DS2", pointCost: 5000, category: "Quest lamp" },
  { id: "mahj_2", name: "Mahj 2", pointCost: 5000, category: "Quest lamp" }
];
