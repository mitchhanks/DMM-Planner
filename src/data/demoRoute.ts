import type { Step } from "../models/step";

export const DEMO_ROUTE: Step[] = [
    {
        id: "demo-1",
        name: "Waterfall Quest",
        category: "quest",
        xpGains: [
            { skill: "attack", baseXp: 13750, source: "Waterfall Quest" },
            { skill: "strength", baseXp: 13750, source: "Waterfall Quest" }
        ],
        events: { questPointsGained: 1 },
        notes:
            "Quest steps: enter XP rewards + quest points gained. Points are computed automatically from quest points."
    },
    {
        id: "demo-2",
        name: "Train Agility",
        category: "training",
        xpGains: [{ skill: "agility", baseXp: 5000, source: "Gnome course" }],
        notes:
            "Training steps: enter XP you expect to gain. Levels and skilling points update automatically."
    },
    {
        id: "demo-3",
        name: "Buy Alchemaniac sigil",
        category: "unlock",
        xpGains: [],
        unlock: { type: "unlock", unlockId: "alchemaniac" },
        manualPointsAdjustment: -100,
        notes:
            "Unlock steps spend points. Sigil costs are applied as a negative manual adjustment. No XP is granted automatically."
    }
];
