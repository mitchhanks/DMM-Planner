export type BossId =
  | "abyssal_sire"
  | "alchemical_hydra"
  | "amoxliatl"
  | "araxxor"
  | "artio"
  | "barrows_brothers"
  | "bryophyta"
  | "callisto"
  | "calvarion"
  | "cerberus"
  | "cox"
  | "cox_cm"
  | "chaos_elemental"
  | "chaos_fanatic"
  | "colosseum"
  | "commander_zilyana"
  | "corrupted_hunllef"
  | "corporeal_beast"
  | "crazy_archaeologist"
  | "crystalline_hunllef"
  | "dagannoth_prime"
  | "dagannoth_rex"
  | "dagannoth_supreme"
  | "deranged_archaeology"
  | "duke_sucellus"
  | "duke_sucellus_awakened"
  | "fight_caves"
  | "general_graardor"
  | "giant_mole"
  | "grotesque_guardians"
  | "hespori"
  | "hueycoatl"
  | "inferno"
  | "kalphite_queen"
  | "king_black_dragon"
  | "kraken"
  | "kree_arra"
  | "kril_tsutsaroth"
  | "leviathan"
  | "leviathan_awakened"
  | "mimic"
  | "moons_of_peril"
  | "nex"
  | "obor"
  | "phosanis_nightmare"
  | "phantom_muspah"
  | "royal_titans"
  | "sarachnis"
  | "scorpia"
  | "scurrius"
  | "skotizo"
  | "spindel"
  | "tempoross"
  | "the_nightmare"
  | "tob_entry"
  | "tob"
  | "tob_hm"
  | "thermonuclear_smoke_devil"
  | "toa_entry"
  | "toa"
  | "toa_expert"
  | "vardorvis"
  | "vardorvis_awakened"
  | "venenatis"
  | "vetion"
  | "vorkath"
  | "wintertodt"
  | "whisperer"
  | "whisperer_awakened"
  | "yama"
  | "zalcano"
  | "zulrah";

// Display name + points per kill/clear as per your list
export const BOSS_POINTS: Record<BossId, { name: string; points: number }> = {
  abyssal_sire: { name: "Abyssal Sire", points: 20 },
  alchemical_hydra: { name: "Alchemical Hydra", points: 10 },
  amoxliatl: { name: "Amoxliatl", points: 5 },
  araxxor: { name: "Araxxor", points: 13 },
  artio: { name: "Artio", points: 10 },
  barrows_brothers: { name: "Barrows Brothers (clear)", points: 30 },
  bryophyta: { name: "Bryophyta", points: 15 },
  callisto: { name: "Callisto", points: 10 },
  calvarion: { name: "Calvar'ion", points: 10 },
  cerberus: { name: "Cerberus", points: 25 },
  cox: { name: "Chambers of Xeric", points: 120 },
  cox_cm: { name: "CoX: Challenge Mode", points: 180 },
  chaos_elemental: { name: "Chaos Elemental", points: 20 },
  chaos_fanatic: { name: "Chaos Fanatic", points: 10 },
  colosseum: { name: "Colosseum", points: 75 },
  commander_zilyana: { name: "Commander Zilyana", points: 20 },
  corrupted_hunllef: { name: "Corrupted Hunllef", points: 25 },
  corporeal_beast: { name: "Corporeal Beast", points: 35 },
  crazy_archaeologist: { name: "Crazy Archaeologist", points: 10 },
  crystalline_hunllef: { name: "Crystalline Hunllef", points: 17 },
  dagannoth_prime: { name: "Dagannoth Prime", points: 15 },
  dagannoth_rex: { name: "Dagannoth Rex", points: 15 },
  dagannoth_supreme: { name: "Dagannoth Supreme", points: 15 },
  deranged_archaeology: { name: "Deranged Archaeology", points: 3 },
  duke_sucellus: { name: "Duke Sucellus", points: 15 },
  duke_sucellus_awakened: { name: "Duke Sucellus (Awakened)", points: 35 },
  fight_caves: { name: "Fight Caves", points: 50 },
  general_graardor: { name: "General Graardor", points: 20 },
  giant_mole: { name: "Giant Mole", points: 12 },
  grotesque_guardians: { name: "Grotesque Guardians (clear)", points: 10 },
  hespori: { name: "Hespori", points: 25 },
  hueycoatl: { name: "Hueycoatl", points: 10 },
  inferno: { name: "Inferno", points: 100 },
  kalphite_queen: { name: "Kalphite Queen", points: 20 },
  king_black_dragon: { name: "King Black Dragon", points: 5 },
  kraken: { name: "Kraken", points: 15 },
  kree_arra: { name: "Kree'arra", points: 23 },
  kril_tsutsaroth: { name: "K'ril Tsutsaroth", points: 17 },
  leviathan: { name: "Leviathan", points: 15 },
  leviathan_awakened: { name: "Leviathan (Awakened)", points: 35 },
  mimic: { name: "Mimic", points: 10 },
  moons_of_peril: { name: "Moons of Peril (clear)", points: 30 },
  nex: { name: "Nex", points: 5 },
  obor: { name: "Obor", points: 15 },
  phosanis_nightmare: { name: "Phosani's Nightmare", points: 30 },
  phantom_muspah: { name: "Phantom Muspah", points: 10 },
  royal_titans: { name: "Royal Titans", points: 10 },
  sarachnis: { name: "Sarachnis", points: 10 },
  scorpia: { name: "Scorpia", points: 10 },
  scurrius: { name: "Scurrius", points: 5 },
  skotizo: { name: "Skotizo", points: 25 },
  spindel: { name: "Spindel", points: 10 },
  tempoross: { name: "Tempoross", points: 20 },
  the_nightmare: { name: "The Nightmare", points: 18 },
  tob_entry: { name: "ToB (Entry)", points: 100 },
  tob: { name: "Theatre of Blood", points: 120 },
  tob_hm: { name: "ToB (Hard Mode)", points: 180 },
  thermonuclear_smoke_devil: { name: "Thermonuclear Smoke Devil", points: 10 },
  toa_entry: { name: "ToA (Entry)", points: 100 },
  toa: { name: "Tombs of Amascut", points: 120 },
  toa_expert: { name: "ToA (Expert)", points: 150 },
  vardorvis: { name: "Vardorvis", points: 15 },
  vardorvis_awakened: { name: "Vardorvis (Awakened)", points: 35 },
  venenatis: { name: "Venenatis", points: 10 },
  vetion: { name: "Vet'ion", points: 10 },
  vorkath: { name: "Vorkath", points: 10 },
  wintertodt: { name: "Wintertodt", points: 20 },
  whisperer: { name: "Whisperer", points: 15 },
  whisperer_awakened: { name: "Whisperer (Awakened)", points: 35 },
  yama: { name: "Yama", points: 15 },
  zalcano: { name: "Zalcano", points: 10 },
  zulrah: { name: "Zulrah", points: 20 }
};
