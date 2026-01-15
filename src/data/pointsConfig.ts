export type ClueTier = "beginner" | "easy" | "medium" | "hard" | "elite" | "master";
export type DiaryTier = "easy" | "medium" | "hard" | "elite";

export type PointsConfig = {
  skilling: {
    pointsPerLevel: number;     // e.g. 10
    pointsOn99: number;         // e.g. 300
  };

  quests: {
    pointsPerQuestPoint: number; // e.g. 25
  };

  clues: Record<ClueTier, number>;

  breaches: {
    pointsPerDamage: number;    // e.g. 1
    capTotalPoints: number;     // e.g. 42000
  };

  diaries: {
    pointsPerTask: Record<DiaryTier, number>; // e.g. easy 10, medium 20...
    // We can implement tier completion bonus later if you want
  };

  bosses: {
    firstKillMultiplier: number; // e.g. 10x
    normalKillCap: number;       // e.g. first 75 kills
    postCapMultiplier: number;   // e.g. 0.1 (10%), rounded down
    table: Record<string, { pointsPerKill: number }>; // placeholder values
  };
};

// Placeholder defaults (EDIT LATER when DMM rules update)
export const DEFAULT_POINTS_CONFIG: PointsConfig = {
  skilling: {
    pointsPerLevel: 10,
    pointsOn99: 300
  },
  quests: {
    pointsPerQuestPoint: 25
  },
  clues: {
    beginner: 3,
    easy: 5,
    medium: 15,
    hard: 20,
    elite: 30,
    master: 55
  },
  breaches: {
    pointsPerDamage: 1,
    capTotalPoints: 42000
  },
  diaries: {
    pointsPerTask: {
      easy: 10,
      medium: 20,
      hard: 40,
      elite: 80
    }
  },
  bosses: {
    firstKillMultiplier: 10,
    normalKillCap: 75,
    postCapMultiplier: 0.1,
    table: {
      // Only add bosses you care about for planning; expand later.
      zulrah: { pointsPerKill: 20 },
      vorkath: { pointsPerKill: 10 },
      wintertodt: { pointsPerKill: 20 },
      barrows: { pointsPerKill: 10 }
    }
  }
};
