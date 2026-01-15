import type { Step } from "../models/step";

export type StoredPlan = {
    version: 1;
    name: string;
    steps: Step[];
};

const KEY = "osrs-dmm-planner.plan.v1";

export function loadPlan(): StoredPlan | null {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as StoredPlan;
        if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.steps)) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function savePlan(plan: StoredPlan): void {
    localStorage.setItem(KEY, JSON.stringify(plan));
}

export function clearPlan(): void {
    localStorage.removeItem(KEY);
}
