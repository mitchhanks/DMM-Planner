export type ClueTier = "beginner" | "easy" | "medium" | "hard" | "elite" | "master";
export type DiaryTier = "easy" | "medium" | "hard" | "elite";

export type PointsConfig = {
  skilling: {
    pointsPerLevelBelow50: number;
    pointsPerLevel50To98: number;
    pointsOn99: number;
  };


  clues: {
    base: Record<ClueTier, number>;
    firstTierMultiplier: number;
  };

  breaches: {
    pointsPerDamage: number;
    capTotalPoints: number;
  };

  diaries: {
    pointsPerTask: Record<DiaryTier, number>;
  };

  collectionLog: {
    pointsPerSlot: number;
  };

  // Bosses intentionally kept, but treated as manual for now
  bosses: {
    firstKillMultiplier: number;
    normalKillCap: number;
    postCapMultiplier: number;
    table: Record<string, { pointsPerKill: number }>;
  };
};

export const DEFAULT_POINTS_CONFIG: PointsConfig = {
  skilling: {
    pointsPerLevelBelow50: 5,
    pointsPerLevel50To98: 10,
    pointsOn99: 300
  },

  clues: {
    base: {
      beginner: 5,
      easy: 8,
      medium: 15,
      hard: 20,
      elite: 30,
      master: 55
    },
    firstTierMultiplier: 5
  },

  breaches: {
    pointsPerDamage: 1,
    capTotalPoints: 42000
  },

  diaries: {
    pointsPerTask: {
      easy: 15,
      medium: 25,
      hard: 40,
      elite: 60
    }
  },

  collectionLog: {
    pointsPerSlot: 10
  },

  bosses: {
    // Placeholder only – NOT relied on
    firstKillMultiplier: 5,
    normalKillCap: 0,
    postCapMultiplier: 1,
    table: {}
  }
};
