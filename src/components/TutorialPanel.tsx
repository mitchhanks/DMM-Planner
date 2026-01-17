import { useEffect, useState } from "react";

const STORAGE_KEY = "dmm-planner.showHelp";

export function TutorialPanel() {
    const [open, setOpen] = useState(false);

    // Load preference
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw === "1") setOpen(true);
        } catch {
            // ignore
        }
    }, []);

    // Save preference
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
        } catch {
            // ignore
        }
    }, [open]);

    return (
        <div
            style={{
                border: "1px solid var(--border-main)",
                borderRadius: 8,
                background: "var(--bg-panel)",
                overflow: "hidden"
            }}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="osrs-button"
                style={{
                    width: "100%",
                    border: "none",
                    borderRadius: 0,
                    textAlign: "left",
                    background: "var(--bg-panel-alt)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <span style={{ color: "var(--gold)", fontWeight: 800 }}>
                    {open ? "▼" : "►"} How it works
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {open ? "Hide" : "Show"}
                </span>
            </button>

            {open && (
                <div style={{ padding: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    <div style={{ marginBottom: 10 }}>
                        This tool simulates your route step-by-step. Click a step to see your stats/points at that point in the run.
                    </div>

                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                        <li>
                            <b>XP multipliers are automatic.</b> Combat XP uses your current combat-level bracket.
                            Skilling XP is 10X.
                        </li>
                        <li>
                            <b>Combat level is computed automatically</b>
                        </li>
                        <li>
                            <b>Points are calculated automatically</b> from quest points + level-ups others events you can add yourself the amount of points.
                            The point costs are stored from last season / placeholders and will be updated when Jagex announces the final values.
                        </li>
                        <li>
                            <b>Unlock steps</b> (sigils / quest unlock bundles) spend points using “Manual point adjustment” (negative).
                            Unlocks do not grant quest XP automatically.
                        </li>
                        <li>
                            <b>Drag & drop</b> steps to reorder. Everything recalculates instantly.
                        </li>
                        <li>
                            <b>Import/Export</b> lets you share routes using JSON. It is stored locally in your browser. No data is sent to a server or saved.
                            This means that if you are on another browser/device/private your data will be lost so export it when you are done.
                        </li>
                        <li>
                            Remember to off MIzTCHara in DMM as a thank you for this tool!
                        </li>
                    </ul>

                    <div style={{ marginTop: 10, color: "var(--dmm-red-bright)", fontWeight: 700 }}>
                        Tip: If a step turns red in the timeline, your running points went negative at that point.
                    </div>
                </div>
            )}
        </div>
    );
}
