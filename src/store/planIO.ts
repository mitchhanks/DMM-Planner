import type { Step } from "../models/step";

export type PlanExportV1 = {
    version: 1;
    name: string;
    createdAt: string; // ISO
    steps: Step[];
};

export function exportPlanToJson(planName: string, steps: Step[]): string {
    const payload: PlanExportV1 = {
        version: 1,
        name: planName,
        createdAt: new Date().toISOString(),
        steps
    };
    return JSON.stringify(payload, null, 2);
}

export function parseImportedPlan(jsonText: string): PlanExportV1 {
    let parsed: unknown;
    try {
        parsed = JSON.parse(jsonText);
    } catch {
        throw new Error("Invalid JSON.");
    }

    const p = parsed as any;

    if (!p || p.version !== 1) throw new Error("Unsupported plan version.");
    if (typeof p.name !== "string") throw new Error("Plan name is missing.");
    if (!Array.isArray(p.steps)) throw new Error("Steps must be an array.");

    // Very light validation; we can tighten later
    for (const s of p.steps) {
        if (typeof s?.id !== "string") throw new Error("A step is missing an id.");
        if (typeof s?.name !== "string") throw new Error("A step is missing a name.");
        if (typeof s?.category !== "string") throw new Error("A step is missing a category.");
        if (!Array.isArray(s?.xpGains)) throw new Error("A step has invalid xpGains.");
    }

    return p as PlanExportV1;
}

export function downloadTextFile(filename: string, text: string) {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
